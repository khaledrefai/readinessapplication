import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ReadinessapplicationSharedModule } from 'app/shared/shared.module';
import { InbodyDataComponent } from './inbody-data.component';
import { InbodyDataDetailComponent } from './inbody-data-detail.component';
import { InbodyDataUpdateComponent } from './inbody-data-update.component';
import { InbodyDataDeleteDialogComponent } from './inbody-data-delete-dialog.component';
import { inbodyDataRoute } from './inbody-data.route';

@NgModule({
  imports: [ReadinessapplicationSharedModule, RouterModule.forChild(inbodyDataRoute)],
  declarations: [InbodyDataComponent, InbodyDataDetailComponent, InbodyDataUpdateComponent, InbodyDataDeleteDialogComponent],
  entryComponents: [InbodyDataDeleteDialogComponent],
})
export class ReadinessapplicationInbodyDataModule {}
