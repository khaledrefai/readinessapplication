import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'member-data',
        loadChildren: () => import('./member-data/member-data.module').then(m => m.ReadinessapplicationMemberDataModule),
      },
      {
        path: 'inbody-data',
        loadChildren: () => import('./inbody-data/inbody-data.module').then(m => m.ReadinessapplicationInbodyDataModule),
      },
      {
        path: 'in-body-results-sheet',
        loadChildren: () =>
          import('./in-body-results-sheet/in-body-results-sheet.module').then(m => m.ReadinessapplicationInBodyResultsSheetModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class ReadinessapplicationEntityModule {}
