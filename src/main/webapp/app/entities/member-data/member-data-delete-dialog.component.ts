import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMemberData } from 'app/shared/model/member-data.model';
import { MemberDataService } from './member-data.service';

@Component({
  templateUrl: './member-data-delete-dialog.component.html',
})
export class MemberDataDeleteDialogComponent {
  memberData?: IMemberData;

  constructor(
    protected memberDataService: MemberDataService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.memberDataService.delete(id).subscribe(() => {
      this.eventManager.broadcast('memberDataListModification');
      this.activeModal.close();
    });
  }
}
