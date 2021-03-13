import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IMemberData, MemberData } from 'app/shared/model/member-data.model';
import { MemberDataService } from './member-data.service';
import { MemberDataComponent } from './member-data.component';
import { MemberDataDetailComponent } from './member-data-detail.component';
import { MemberDataUpdateComponent } from './member-data-update.component';

@Injectable({ providedIn: 'root' })
export class MemberDataResolve implements Resolve<IMemberData> {
  constructor(private service: MemberDataService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IMemberData> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((memberData: HttpResponse<MemberData>) => {
          if (memberData.body) {
            return of(memberData.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new MemberData());
  }
}

export const memberDataRoute: Routes = [
  {
    path: '',
    component: MemberDataComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'MemberData',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: MemberDataDetailComponent,
    resolve: {
      memberData: MemberDataResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'MemberData',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: MemberDataUpdateComponent,
    resolve: {
      memberData: MemberDataResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'MemberData',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: MemberDataUpdateComponent,
    resolve: {
      memberData: MemberDataResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'MemberData',
    },
    canActivate: [UserRouteAccessService],
  },
];
