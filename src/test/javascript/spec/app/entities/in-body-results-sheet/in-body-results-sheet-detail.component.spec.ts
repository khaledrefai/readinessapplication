import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ReadinessapplicationTestModule } from '../../../test.module';
import { InBodyResultsSheetDetailComponent } from 'app/entities/in-body-results-sheet/in-body-results-sheet-detail.component';
import { InBodyResultsSheet } from 'app/shared/model/in-body-results-sheet.model';

describe('Component Tests', () => {
  describe('InBodyResultsSheet Management Detail Component', () => {
    let comp: InBodyResultsSheetDetailComponent;
    let fixture: ComponentFixture<InBodyResultsSheetDetailComponent>;
    const route = ({ data: of({ inBodyResultsSheet: new InBodyResultsSheet(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ReadinessapplicationTestModule],
        declarations: [InBodyResultsSheetDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(InBodyResultsSheetDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(InBodyResultsSheetDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load inBodyResultsSheet on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.inBodyResultsSheet).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
