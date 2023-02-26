import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { firstValueFrom, Subscription } from 'rxjs';
import { GroupService } from 'src/app/services/group.service';
import { PERMISSIONS } from 'src/app/shared/permissions.const';
import {
  HandleUserComponent,
  IHandleUserDataDTO,
} from '../../user/handle-user/handle-user.component';

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
      <mat-form-field class="w-100" appearance="outline">
        <mat-label>Adicionar regra</mat-label>
        <mat-select [formControl]="addRule">
          <mat-option>Selecione</mat-option>
          <mat-option value="all" *ngIf="options.length">Todas</mat-option>
          <ng-container *ngFor="let item of options">
            <mat-option [value]="item">{{ item }}</mat-option>
          </ng-container>
        </mat-select>
      </mat-form-field>
      <ng-container *ngFor="let item of rules">
        <div class="row">
          <div class="col">
            {{ item }}
          </div>
          <div class="col-auto">
            <button mat-icon-button (click)="rmPermission(item)">
              <mat-icon>delete</mat-icon>
            </button>
          </div>
        </div>
      </ng-container>
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
export class HandleGroupComponent implements OnInit, OnDestroy {
  description: FormControl = new FormControl('', Validators.required);
  addRule: FormControl = new FormControl();
  rules: string[] = [];
  options: string[] = PERMISSIONS;
  private _loading = false;
  private subscription!: Subscription;

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
    public dialogRef: MatDialogRef<HandleUserComponent>,
    private readonly groupService: GroupService
  ) {}

  ngOnInit(): void {
    this.loadData();
    this.subscription = this.addRule.valueChanges.subscribe((value) => {
      if (value === 'all') {
        this.rules = PERMISSIONS;
      } else {
        this.rules.push(value);
      }
      this.updateOptions();
      this.addRule.setValue('', { emitEvent: false });
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  rmPermission(item: string) {
    this.rules = this.rules.filter((rule) => rule !== item);
    this.updateOptions();
  }

  updateOptions() {
    this.options = PERMISSIONS.filter((option) => !this.rules.includes(option));
  }

  async loadData() {
    if (this.data.id) {
      try {
        this.loading = true;
        const data: any = await firstValueFrom(
          this.groupService.get(this.data.id)
        );
        this.description.setValue(data.description);
        this.rules = data.rules;
        this.updateOptions();
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
          rules: this.rules,
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
}
