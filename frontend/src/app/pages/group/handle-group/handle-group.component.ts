import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';
import { GroupService } from 'src/app/services/group.service';
import { IManagementListOptions } from 'src/app/shared/components/management-list/management-list.component';
import { PERMISSIONS } from 'src/app/shared/permissions.const';
import { IHandleUserDataDTO } from '../../user/handle-user/handle-user.component';

export interface IHandleGroupDataDTO {
  id?: string;
}

@Component({
  selector: 'app-handle-group',
  template: `
    <h1 mat-dialog-title>{{ data.id ? 'Alterar' : 'Cadastrar' }} usuário</h1>
    <div mat-dialog-content>
      <mat-form-field class="w-100" appearance="outline">
        <mat-label>Descrição</mat-label>
        <input matInput type="text" [formControl]="description" />
      </mat-form-field>
      <app-management-list
        title="Permissões"
        [options]="options"
        [list]="rules"
        [showOptionAll]="true"
        (changeList)="changeRules($event)"
      ></app-management-list>
    </div>
    <div mat-dialog-actions align="end">
      <ng-container *ngIf="!loading; else Loading">
        <button mat-button mat-dialog-close>Cancelar</button>
        <button mat-button (click)="confirm()" [disabled]="description.invalid">
          {{ data.id ? 'Salvar' : 'Cadastrar' }}
        </button>
      </ng-container>
      <ng-template #Loading>
        <div class="w-100 d-flex justify-content-center">
          <mat-spinner diameter="50"></mat-spinner>
        </div>
      </ng-template>
    </div>
  `,
  styles: [],
})
export class HandleGroupComponent implements OnInit {
  description: FormControl = new FormControl('', Validators.required);
  rules: IManagementListOptions[] = [];
  options: IManagementListOptions[] = PERMISSIONS.map((item) => ({
    label: item,
    value: item,
  }));
  private _loading = false;

  set loading(state: boolean) {
    if (state) {
      this._loading = true;
      this.description.disable();
    } else {
      this._loading = false;
      this.description.enable();
    }
  }

  get loading() {
    return this._loading;
  }

  get data() {
    return this._data ?? {};
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) private _data: IHandleUserDataDTO,
    public dialogRef: MatDialogRef<HandleGroupComponent>,
    private readonly groupService: GroupService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  async loadData() {
    if (this.data.id) {
      try {
        this.loading = true;
        const data: any = await firstValueFrom(
          this.groupService.get(this.data.id)
        );
        this.description.setValue(data.description);
        this.rules = data.rules.map((item: any) => ({
          label: item,
          value: item,
        }));
      } catch (e: any) {
        console.error(e);
      }

      this.loading = false;
    }
  }

  async confirm() {
    if (this.description.valid) {
      this.loading = true;

      try {
        const body = {
          description: this.description.value,
          rules: this.rules.map((item: any) => item.value),
        };

        if (!this.data.id) {
          await firstValueFrom(this.groupService.create(body));
        } else {
          await firstValueFrom(this.groupService.update(this.data.id, body));
        }
        this.dialogRef.close(true);
      } catch (e: any) {
        console.error(e);
      }

      this.loading = false;
    }
  }

  getControl(key: string): FormControl {
    return (this.description.get(key) ?? new FormControl()) as FormControl;
  }

  changeRules(event: IManagementListOptions[]) {
    this.rules = event;
  }
}
