import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { ReadinessapplicationTestModule } from '../../../test.module';
import { MemberDataUpdateComponent } from 'app/entities/member-data/member-data-update.component';
import { MemberDataService } from 'app/entities/member-data/member-data.service';
import { MemberData } from 'app/shared/model/member-data.model';

describe('Component Tests', () => {
  describe('MemberData Management Update Component', () => {
    let comp: MemberDataUpdateComponent;
    let fixture: ComponentFixture<MemberDataUpdateComponent>;
    let service: MemberDataService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ReadinessapplicationTestModule],
        declarations: [MemberDataUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(MemberDataUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MemberDataUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MemberDataService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new MemberData(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new MemberData();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
