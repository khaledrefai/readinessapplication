import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IInBodyResultsSheet } from 'app/shared/model/in-body-results-sheet.model';
import { InBodyResultsSheetService } from './in-body-results-sheet.service';

@Component({
  templateUrl: './in-body-results-sheet-delete-dialog.component.html',
})
export class InBodyResultsSheetDeleteDialogComponent {
  inBodyResultsSheet?: IInBodyResultsSheet;

  constructor(
    protected inBodyResultsSheetService: InBodyResultsSheetService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.inBodyResultsSheetService.delete(id).subscribe(() => {
      this.eventManager.broadcast('inBodyResultsSheetListModification');
      this.activeModal.close();
    });
  }
}
