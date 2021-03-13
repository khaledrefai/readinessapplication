import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMemberData } from 'app/shared/model/member-data.model';

@Component({
  selector: 'jhi-member-data-detail',
  templateUrl: './member-data-detail.component.html',
})
export class MemberDataDetailComponent implements OnInit {
  memberData: IMemberData | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ memberData }) => (this.memberData = memberData));
  }

  previousState(): void {
    window.history.back();
  }
}
