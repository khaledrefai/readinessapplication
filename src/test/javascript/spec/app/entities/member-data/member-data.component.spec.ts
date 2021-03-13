import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ReadinessapplicationTestModule } from '../../../test.module';
import { MemberDataComponent } from 'app/entities/member-data/member-data.component';
import { MemberDataService } from 'app/entities/member-data/member-data.service';
import { MemberData } from 'app/shared/model/member-data.model';

describe('Component Tests', () => {
  describe('MemberData Management Component', () => {
    let comp: MemberDataComponent;
    let fixture: ComponentFixture<MemberDataComponent>;
    let service: MemberDataService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ReadinessapplicationTestModule],
        declarations: [MemberDataComponent],
      })
        .overrideTemplate(MemberDataComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MemberDataComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MemberDataService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new MemberData(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.memberData && comp.memberData[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
