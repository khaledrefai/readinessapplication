import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IInbodyData } from 'app/shared/model/inbody-data.model';
import { InbodyDataService } from './inbody-data.service';

@Component({
  templateUrl: './inbody-data-delete-dialog.component.html',
})
export class InbodyDataDeleteDialogComponent {
  inbodyData?: IInbodyData;

  constructor(
    protected inbodyDataService: InbodyDataService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.inbodyDataService.delete(id).subscribe(() => {
      this.eventManager.broadcast('inbodyDataListModification');
      this.activeModal.close();
    });
  }
}
