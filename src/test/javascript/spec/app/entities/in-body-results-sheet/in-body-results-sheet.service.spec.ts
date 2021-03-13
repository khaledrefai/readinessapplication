import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { InBodyResultsSheetService } from 'app/entities/in-body-results-sheet/in-body-results-sheet.service';
import { IInBodyResultsSheet, InBodyResultsSheet } from 'app/shared/model/in-body-results-sheet.model';

describe('Service Tests', () => {
  describe('InBodyResultsSheet Service', () => {
    let injector: TestBed;
    let service: InBodyResultsSheetService;
    let httpMock: HttpTestingController;
    let elemDefault: IInBodyResultsSheet;
    let expectedResult: IInBodyResultsSheet | IInBodyResultsSheet[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(InBodyResultsSheetService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new InBodyResultsSheet(0, 0, currentDate, currentDate, 'AAAAAAA');
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            datetimes: currentDate.format(DATE_TIME_FORMAT),
            orderDate: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a InBodyResultsSheet', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            datetimes: currentDate.format(DATE_TIME_FORMAT),
            orderDate: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            datetimes: currentDate,
            orderDate: currentDate,
          },
          returnedFromService
        );

        service.create(new InBodyResultsSheet()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a InBodyResultsSheet', () => {
        const returnedFromService = Object.assign(
          {
            userId: 1,
            datetimes: currentDate.format(DATE_TIME_FORMAT),
            orderDate: currentDate.format(DATE_TIME_FORMAT),
            inbodyImage: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            datetimes: currentDate,
            orderDate: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of InBodyResultsSheet', () => {
        const returnedFromService = Object.assign(
          {
            userId: 1,
            datetimes: currentDate.format(DATE_TIME_FORMAT),
            orderDate: currentDate.format(DATE_TIME_FORMAT),
            inbodyImage: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            datetimes: currentDate,
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

      it('should delete a InBodyResultsSheet', () => {
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
