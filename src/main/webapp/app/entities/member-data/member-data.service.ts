import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IMemberData } from 'app/shared/model/member-data.model';

type EntityResponseType = HttpResponse<IMemberData>;
type EntityArrayResponseType = HttpResponse<IMemberData[]>;

@Injectable({ providedIn: 'root' })
export class MemberDataService {
  public resourceUrl = SERVER_API_URL + 'api/member-data';

  constructor(protected http: HttpClient) {}

  create(memberData: IMemberData): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(memberData);
    return this.http
      .post<IMemberData>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(memberData: IMemberData): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(memberData);
    return this.http
      .put<IMemberData>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IMemberData>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IMemberData[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(memberData: IMemberData): IMemberData {
    const copy: IMemberData = Object.assign({}, memberData, {
      testDate: memberData.testDate && memberData.testDate.isValid() ? memberData.testDate.toJSON() : undefined,
      orderDate: memberData.orderDate && memberData.orderDate.isValid() ? memberData.orderDate.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.testDate = res.body.testDate ? moment(res.body.testDate) : undefined;
      res.body.orderDate = res.body.orderDate ? moment(res.body.orderDate) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((memberData: IMemberData) => {
        memberData.testDate = memberData.testDate ? moment(memberData.testDate) : undefined;
        memberData.orderDate = memberData.orderDate ? moment(memberData.orderDate) : undefined;
      });
    }
    return res;
  }
}
