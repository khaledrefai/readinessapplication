import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IInbodyData, InbodyData } from 'app/shared/model/inbody-data.model';
import { InbodyDataService } from './inbody-data.service';
import { InbodyDataComponent } from './inbody-data.component';
import { InbodyDataDetailComponent } from './inbody-data-detail.component';
import { InbodyDataUpdateComponent } from './inbody-data-update.component';

@Injectable({ providedIn: 'root' })
export class InbodyDataResolve implements Resolve<IInbodyData> {
  constructor(private service: InbodyDataService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IInbodyData> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((inbodyData: HttpResponse<InbodyData>) => {
          if (inbodyData.body) {
            return of(inbodyData.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new InbodyData());
  }
}

export const inbodyDataRoute: Routes = [
  {
    path: '',
    component: InbodyDataComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'InbodyData',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: InbodyDataDetailComponent,
    resolve: {
      inbodyData: InbodyDataResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'InbodyData',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: InbodyDataUpdateComponent,
    resolve: {
      inbodyData: InbodyDataResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'InbodyData',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: InbodyDataUpdateComponent,
    resolve: {
      inbodyData: InbodyDataResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'InbodyData',
    },
    canActivate: [UserRouteAccessService],
  },
];
