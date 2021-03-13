import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { MemberDataService } from 'app/entities/member-data/member-data.service';
import { IMemberData, MemberData } from 'app/shared/model/member-data.model';

describe('Service Tests', () => {
  describe('MemberData Service', () => {
    let injector: TestBed;
    let service: MemberDataService;
    let httpMock: HttpTestingController;
    let elemDefault: IMemberData;
    let expectedResult: IMemberData | IMemberData[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(MemberDataService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new MemberData(0, currentDate, 0, 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 0, 0, currentDate);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            testDate: currentDate.format(DATE_TIME_FORMAT),
            orderDate: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a MemberData', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            testDate: currentDate.format(DATE_TIME_FORMAT),
            orderDate: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            testDate: currentDate,
            orderDate: currentDate,
          },
          returnedFromService
        );

        service.create(new MemberData()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a MemberData', () => {
        const returnedFromService = Object.assign(
          {
            testDate: currentDate.format(DATE_TIME_FORMAT),
            userId: 1,
            userName: 'BBBBBB',
            userGender: 'BBBBBB',
            userBirthday: 'BBBBBB',
            userAge: 1,
            userHeight: 1,
            orderDate: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            testDate: currentDate,
            orderDate: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of MemberData', () => {
        const returnedFromService = Object.assign(
          {
            testDate: currentDate.format(DATE_TIME_FORMAT),
            userId: 1,
            userName: 'BBBBBB',
            userGender: 'BBBBBB',
            userBirthday: 'BBBBBB',
            userAge: 1,
            userHeight: 1,
            orderDate: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            testDate: currentDate,
            orderDate: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a MemberData', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
