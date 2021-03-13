import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ReadinessapplicationTestModule } from '../../../test.module';
import { MemberDataDetailComponent } from 'app/entities/member-data/member-data-detail.component';
import { MemberData } from 'app/shared/model/member-data.model';

describe('Component Tests', () => {
  describe('MemberData Management Detail Component', () => {
    let comp: MemberDataDetailComponent;
    let fixture: ComponentFixture<MemberDataDetailComponent>;
    const route = ({ data: of({ memberData: new MemberData(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ReadinessapplicationTestModule],
        declarations: [MemberDataDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(MemberDataDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(MemberDataDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load memberData on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.memberData).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
