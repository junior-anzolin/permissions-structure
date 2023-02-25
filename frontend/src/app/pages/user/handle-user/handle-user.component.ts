import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

export interface IHandleUserDataDTO {
  id?: string;
}

@Component({
  selector: 'app-handle-user',
  template: `
    <h1 mat-dialog-title>{{ data.id ? 'Alterar' : 'Cadastrar' }} usuário</h1>
    <div mat-dialog-content>
      <div class="row">
        <div class="col-md">
          <mat-form-field class="w-100" appearance="outline">
            <mat-label>Nome</mat-label>
            <input matInput type="text" [formControl]="getControl('name')" />
          </mat-form-field>
        </div>
        <div class="col-md">
          <mat-form-field class="w-100" appearance="outline">
            <mat-label>Email</mat-label>
            <input matInput type="text" [formControl]="getControl('email')" />
          </mat-form-field>
        </div>
      </div>
    </div>
    <div mat-dialog-actions align="end">
      <ng-container *ngIf="!loading; else Loading">
        <button mat-button mat-dialog-close>Cancelar</button>
        <button mat-button (click)="confirm()" [disabled]="form.invalid">
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
})
export class HandleUserComponent implements OnInit {
  form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });
  private _loading = false;

  set loading(state: boolean) {
    if (state) {
      this._loading = true;
      this.form.disable();
    } else {
      this._loading = false;
      this.form.enable();
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
    public dialogRef: MatDialogRef<HandleUserComponent>,
    private readonly userService: UserService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  async loadData() {
    if (this.data.id) {
      try {
        this.loading = true;
        this.form.patchValue(
          await firstValueFrom(this.userService.get(this.data.id))
        );
      } catch (e: any) {
        console.error(e);
      }

      this.loading = false;
    }
  }

  async confirm() {
    if (this.form.valid) {
      this.loading = true;

      try {
        if (!this.data.id) {
          await firstValueFrom(this.userService.create(this.form.value));
        } else {
          await firstValueFrom(
            this.userService.update(this.data.id, this.form.value)
          );
        }
        this.dialogRef.close(true);
      } catch (e: any) {
        console.error(e);
      }

      this.loading = false;
    }
  }

  getControl(key: string): FormControl {
    return (this.form.get(key) ?? new FormControl()) as FormControl;
  }
}
