import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ReadinessapplicationTestModule } from '../../../test.module';
import { InbodyDataDetailComponent } from 'app/entities/inbody-data/inbody-data-detail.component';
import { InbodyData } from 'app/shared/model/inbody-data.model';

describe('Component Tests', () => {
  describe('InbodyData Management Detail Component', () => {
    let comp: InbodyDataDetailComponent;
    let fixture: ComponentFixture<InbodyDataDetailComponent>;
    const route = ({ data: of({ inbodyData: new InbodyData(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ReadinessapplicationTestModule],
        declarations: [InbodyDataDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(InbodyDataDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(InbodyDataDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load inbodyData on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.inbodyData).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
