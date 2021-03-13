import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IInbodyData, InbodyData } from 'app/shared/model/inbody-data.model';
import { InbodyDataService } from './inbody-data.service';

@Component({
  selector: 'jhi-inbody-data-update',
  templateUrl: './inbody-data-update.component.html',
})
export class InbodyDataUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    userID: [],
    columnName: [],
    columnValue: [],
  });

  constructor(protected inbodyDataService: InbodyDataService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ inbodyData }) => {
      this.updateForm(inbodyData);
    });
  }

  updateForm(inbodyData: IInbodyData): void {
    this.editForm.patchValue({
      id: inbodyData.id,
      userID: inbodyData.userID,
      columnName: inbodyData.columnName,
      columnValue: inbodyData.columnValue,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const inbodyData = this.createFromForm();
    if (inbodyData.id !== undefined) {
      this.subscribeToSaveResponse(this.inbodyDataService.update(inbodyData));
    } else {
      this.subscribeToSaveResponse(this.inbodyDataService.create(inbodyData));
    }
  }

  private createFromForm(): IInbodyData {
    return {
      ...new InbodyData(),
      id: this.editForm.get(['id'])!.value,
      userID: this.editForm.get(['userID'])!.value,
      columnName: this.editForm.get(['columnName'])!.value,
      columnValue: this.editForm.get(['columnValue'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IInbodyData>>): void {
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
