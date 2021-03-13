import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IInbodyData } from 'app/shared/model/inbody-data.model';

@Component({
  selector: 'jhi-inbody-data-detail',
  templateUrl: './inbody-data-detail.component.html',
})
export class InbodyDataDetailComponent implements OnInit {
  inbodyData: IInbodyData | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ inbodyData }) => (this.inbodyData = inbodyData));
  }

  previousState(): void {
    window.history.back();
  }
}
