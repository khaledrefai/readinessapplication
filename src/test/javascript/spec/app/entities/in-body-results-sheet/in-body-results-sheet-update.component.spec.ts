import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { ReadinessapplicationTestModule } from '../../../test.module';
import { InBodyResultsSheetUpdateComponent } from 'app/entities/in-body-results-sheet/in-body-results-sheet-update.component';
import { InBodyResultsSheetService } from 'app/entities/in-body-results-sheet/in-body-results-sheet.service';
import { InBodyResultsSheet } from 'app/shared/model/in-body-results-sheet.model';

describe('Component Tests', () => {
  describe('InBodyResultsSheet Management Update Component', () => {
    let comp: InBodyResultsSheetUpdateComponent;
    let fixture: ComponentFixture<InBodyResultsSheetUpdateComponent>;
    let service: InBodyResultsSheetService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ReadinessapplicationTestModule],
        declarations: [InBodyResultsSheetUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(InBodyResultsSheetUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(InBodyResultsSheetUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(InBodyResultsSheetService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new InBodyResultsSheet(123);
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
        const entity = new InBodyResultsSheet();
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
