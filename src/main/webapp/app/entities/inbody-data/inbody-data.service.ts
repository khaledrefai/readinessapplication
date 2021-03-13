import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IInbodyData } from 'app/shared/model/inbody-data.model';

type EntityResponseType = HttpResponse<IInbodyData>;
type EntityArrayResponseType = HttpResponse<IInbodyData[]>;

@Injectable({ providedIn: 'root' })
export class InbodyDataService {
  public resourceUrl = SERVER_API_URL + 'api/inbody-data';

  constructor(protected http: HttpClient) {}

  create(inbodyData: IInbodyData): Observable<EntityResponseType> {
    return this.http.post<IInbodyData>(this.resourceUrl, inbodyData, { observe: 'response' });
  }

  update(inbodyData: IInbodyData): Observable<EntityResponseType> {
    return this.http.put<IInbodyData>(this.resourceUrl, inbodyData, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IInbodyData>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IInbodyData[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
