import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ReadinessapplicationSharedModule } from 'app/shared/shared.module';
import { MemberDataComponent } from './member-data.component';
import { MemberDataDetailComponent } from './member-data-detail.component';
import { MemberDataUpdateComponent } from './member-data-update.component';
import { MemberDataDeleteDialogComponent } from './member-data-delete-dialog.component';
import { memberDataRoute } from './member-data.route';

@NgModule({
  imports: [ReadinessapplicationSharedModule, RouterModule.forChild(memberDataRoute)],
  declarations: [MemberDataComponent, MemberDataDetailComponent, MemberDataUpdateComponent, MemberDataDeleteDialogComponent],
  entryComponents: [MemberDataDeleteDialogComponent],
})
export class ReadinessapplicationMemberDataModule {}
