import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IMemberData, MemberData } from 'app/shared/model/member-data.model';
import { MemberDataService } from './member-data.service';

@Component({
  selector: 'jhi-member-data-update',
  templateUrl: './member-data-update.component.html',
})
export class MemberDataUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    testDate: [],
    userId: [],
    userName: [],
    userGender: [],
    userBirthday: [],
    userAge: [],
    userHeight: [],
    orderDate: [],
  });

  constructor(protected memberDataService: MemberDataService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ memberData }) => {
      if (!memberData.id) {
        const today = moment().startOf('day');
        memberData.testDate = today;
        memberData.orderDate = today;
      }

      this.updateForm(memberData);
    });
  }

  updateForm(memberData: IMemberData): void {
    this.editForm.patchValue({
      id: memberData.id,
      testDate: memberData.testDate ? memberData.testDate.format(DATE_TIME_FORMAT) : null,
      userId: memberData.userId,
      userName: memberData.userName,
      userGender: memberData.userGender,
      userBirthday: memberData.userBirthday,
      userAge: memberData.userAge,
      userHeight: memberData.userHeight,
      orderDate: memberData.orderDate ? memberData.orderDate.format(DATE_TIME_FORMAT) : null,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const memberData = this.createFromForm();
    if (memberData.id !== undefined) {
      this.subscribeToSaveResponse(this.memberDataService.update(memberData));
    } else {
      this.subscribeToSaveResponse(this.memberDataService.create(memberData));
    }
  }

  private createFromForm(): IMemberData {
    return {
      ...new MemberData(),
      id: this.editForm.get(['id'])!.value,
      testDate: this.editForm.get(['testDate'])!.value ? moment(this.editForm.get(['testDate'])!.value, DATE_TIME_FORMAT) : undefined,
      userId: this.editForm.get(['userId'])!.value,
      userName: this.editForm.get(['userName'])!.value,
      userGender: this.editForm.get(['userGender'])!.value,
      userBirthday: this.editForm.get(['userBirthday'])!.value,
      userAge: this.editForm.get(['userAge'])!.value,
      userHeight: this.editForm.get(['userHeight'])!.value,
      orderDate: this.editForm.get(['orderDate'])!.value ? moment(this.editForm.get(['orderDate'])!.value, DATE_TIME_FORMAT) : undefined,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMemberData>>): void {
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
