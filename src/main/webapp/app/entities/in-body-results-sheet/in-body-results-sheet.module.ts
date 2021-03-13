import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ReadinessapplicationSharedModule } from 'app/shared/shared.module';
import { InBodyResultsSheetComponent } from './in-body-results-sheet.component';
import { InBodyResultsSheetDetailComponent } from './in-body-results-sheet-detail.component';
import { InBodyResultsSheetUpdateComponent } from './in-body-results-sheet-update.component';
import { InBodyResultsSheetDeleteDialogComponent } from './in-body-results-sheet-delete-dialog.component';
import { inBodyResultsSheetRoute } from './in-body-results-sheet.route';

@NgModule({
  imports: [ReadinessapplicationSharedModule, RouterModule.forChild(inBodyResultsSheetRoute)],
  declarations: [
    InBodyResultsSheetComponent,
    InBodyResultsSheetDetailComponent,
    InBodyResultsSheetUpdateComponent,
    InBodyResultsSheetDeleteDialogComponent,
  ],
  entryComponents: [InBodyResultsSheetDeleteDialogComponent],
})
export class ReadinessapplicationInBodyResultsSheetModule {}
