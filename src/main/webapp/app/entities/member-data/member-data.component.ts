import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IMemberData } from 'app/shared/model/member-data.model';
import { MemberDataService } from './member-data.service';
import { MemberDataDeleteDialogComponent } from './member-data-delete-dialog.component';

@Component({
  selector: 'jhi-member-data',
  templateUrl: './member-data.component.html',
})
export class MemberDataComponent implements OnInit, OnDestroy {
  memberData?: IMemberData[];
  eventSubscriber?: Subscription;

  constructor(protected memberDataService: MemberDataService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.memberDataService.query().subscribe((res: HttpResponse<IMemberData[]>) => (this.memberData = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInMemberData();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IMemberData): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInMemberData(): void {
    this.eventSubscriber = this.eventManager.subscribe('memberDataListModification', () => this.loadAll());
  }

  delete(memberData: IMemberData): void {
    const modalRef = this.modalService.open(MemberDataDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.memberData = memberData;
  }
}
