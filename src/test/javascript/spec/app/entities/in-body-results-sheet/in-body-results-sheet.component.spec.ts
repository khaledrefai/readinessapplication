import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, convertToParamMap } from '@angular/router';

import { ReadinessapplicationTestModule } from '../../../test.module';
import { InBodyResultsSheetComponent } from 'app/entities/in-body-results-sheet/in-body-results-sheet.component';
import { InBodyResultsSheetService } from 'app/entities/in-body-results-sheet/in-body-results-sheet.service';
import { InBodyResultsSheet } from 'app/shared/model/in-body-results-sheet.model';

describe('Component Tests', () => {
  describe('InBodyResultsSheet Management Component', () => {
    let comp: InBodyResultsSheetComponent;
    let fixture: ComponentFixture<InBodyResultsSheetComponent>;
    let service: InBodyResultsSheetService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ReadinessapplicationTestModule],
        declarations: [InBodyResultsSheetComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: {
              data: of({
                defaultSort: 'id,asc',
              }),
              queryParamMap: of(
                convertToParamMap({
                  page: '1',
                  size: '1',
                  sort: 'id,desc',
                })
              ),
            },
          },
        ],
      })
        .overrideTemplate(InBodyResultsSheetComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(InBodyResultsSheetComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(InBodyResultsSheetService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new InBodyResultsSheet(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.inBodyResultsSheets && comp.inBodyResultsSheets[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });

    it('should load a page', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new InBodyResultsSheet(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.loadPage(1);

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.inBodyResultsSheets && comp.inBodyResultsSheets[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });

    it('should calculate the sort attribute for an id', () => {
      // WHEN
      comp.ngOnInit();
      const result = comp.sort();

      // THEN
      expect(result).toEqual(['id,desc']);
    });

    it('should calculate the sort attribute for a non-id attribute', () => {
      // INIT
      comp.ngOnInit();

      // GIVEN
      comp.predicate = 'name';

      // WHEN
      const result = comp.sort();

      // THEN
      expect(result).toEqual(['name,desc', 'id']);
    });
  });
});
