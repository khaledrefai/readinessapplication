import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IInBodyResultsSheet, InBodyResultsSheet } from 'app/shared/model/in-body-results-sheet.model';
import { InBodyResultsSheetService } from './in-body-results-sheet.service';

@Component({
  selector: 'jhi-in-body-results-sheet-update',
  templateUrl: './in-body-results-sheet-update.component.html',
})
export class InBodyResultsSheetUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    userId: [],
    datetimes: [],
    orderDate: [],
    inbodyImage: [],
  });

  constructor(
    protected inBodyResultsSheetService: InBodyResultsSheetService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ inBodyResultsSheet }) => {
      if (!inBodyResultsSheet.id) {
        const today = moment().startOf('day');
        inBodyResultsSheet.datetimes = today;
        inBodyResultsSheet.orderDate = today;
      }

      this.updateForm(inBodyResultsSheet);
    });
  }

  updateForm(inBodyResultsSheet: IInBodyResultsSheet): void {
    this.editForm.patchValue({
      id: inBodyResultsSheet.id,
      userId: inBodyResultsSheet.userId,
      datetimes: inBodyResultsSheet.datetimes ? inBodyResultsSheet.datetimes.format(DATE_TIME_FORMAT) : null,
      orderDate: inBodyResultsSheet.orderDate ? inBodyResultsSheet.orderDate.format(DATE_TIME_FORMAT) : null,
      inbodyImage: inBodyResultsSheet.inbodyImage,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const inBodyResultsSheet = this.createFromForm();
    if (inBodyResultsSheet.id !== undefined) {
      this.subscribeToSaveResponse(this.inBodyResultsSheetService.update(inBodyResultsSheet));
    } else {
      this.subscribeToSaveResponse(this.inBodyResultsSheetService.create(inBodyResultsSheet));
    }
  }

  private createFromForm(): IInBodyResultsSheet {
    return {
      ...new InBodyResultsSheet(),
      id: this.editForm.get(['id'])!.value,
      userId: this.editForm.get(['userId'])!.value,
      datetimes: this.editForm.get(['datetimes'])!.value ? moment(this.editForm.get(['datetimes'])!.value, DATE_TIME_FORMAT) : undefined,
      orderDate: this.editForm.get(['orderDate'])!.value ? moment(this.editForm.get(['orderDate'])!.value, DATE_TIME_FORMAT) : undefined,
      inbodyImage: this.editForm.get(['inbodyImage'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IInBodyResultsSheet>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }
}
