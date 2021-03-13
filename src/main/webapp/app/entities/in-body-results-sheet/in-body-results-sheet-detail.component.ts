import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IInBodyResultsSheet } from 'app/shared/model/in-body-results-sheet.model';

@Component({
  selector: 'jhi-in-body-results-sheet-detail',
  templateUrl: './in-body-results-sheet-detail.component.html',
})
export class InBodyResultsSheetDetailComponent implements OnInit {
  inBodyResultsSheet: IInBodyResultsSheet | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ inBodyResultsSheet }) => (this.inBodyResultsSheet = inBodyResultsSheet));
  }

  previousState(): void {
    window.history.back();
  }
}
