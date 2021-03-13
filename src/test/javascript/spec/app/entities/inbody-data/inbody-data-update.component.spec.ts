import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { ReadinessapplicationTestModule } from '../../../test.module';
import { InbodyDataUpdateComponent } from 'app/entities/inbody-data/inbody-data-update.component';
import { InbodyDataService } from 'app/entities/inbody-data/inbody-data.service';
import { InbodyData } from 'app/shared/model/inbody-data.model';

describe('Component Tests', () => {
  describe('InbodyData Management Update Component', () => {
    let comp: InbodyDataUpdateComponent;
    let fixture: ComponentFixture<InbodyDataUpdateComponent>;
    let service: InbodyDataService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ReadinessapplicationTestModule],
        declarations: [InbodyDataUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(InbodyDataUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(InbodyDataUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(InbodyDataService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new InbodyData(123);
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
        const entity = new InbodyData();
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
