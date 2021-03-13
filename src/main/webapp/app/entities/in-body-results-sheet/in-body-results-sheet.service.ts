import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IInBodyResultsSheet } from 'app/shared/model/in-body-results-sheet.model';

type EntityResponseType = HttpResponse<IInBodyResultsSheet>;
type EntityArrayResponseType = HttpResponse<IInBodyResultsSheet[]>;

@Injectable({ providedIn: 'root' })
export class InBodyResultsSheetService {
  public resourceUrl = SERVER_API_URL + 'api/in-body-results-sheets';

  constructor(protected http: HttpClient) {}

  create(inBodyResultsSheet: IInBodyResultsSheet): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(inBodyResultsSheet);
    return this.http
      .post<IInBodyResultsSheet>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(inBodyResultsSheet: IInBodyResultsSheet): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(inBodyResultsSheet);
    return this.http
      .put<IInBodyResultsSheet>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IInBodyResultsSheet>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IInBodyResultsSheet[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(inBodyResultsSheet: IInBodyResultsSheet): IInBodyResultsSheet {
    const copy: IInBodyResultsSheet = Object.assign({}, inBodyResultsSheet, {
      datetimes: inBodyResultsSheet.datetimes && inBodyResultsSheet.datetimes.isValid() ? inBodyResultsSheet.datetimes.toJSON() : undefined,
      orderDate: inBodyResultsSheet.orderDate && inBodyResultsSheet.orderDate.isValid() ? inBodyResultsSheet.orderDate.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.datetimes = res.body.datetimes ? moment(res.body.datetimes) : undefined;
      res.body.orderDate = res.body.orderDate ? moment(res.body.orderDate) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((inBodyResultsSheet: IInBodyResultsSheet) => {
        inBodyResultsSheet.datetimes = inBodyResultsSheet.datetimes ? moment(inBodyResultsSheet.datetimes) : undefined;
        inBodyResultsSheet.orderDate = inBodyResultsSheet.orderDate ? moment(inBodyResultsSheet.orderDate) : undefined;
      });
    }
    return res;
  }
}
