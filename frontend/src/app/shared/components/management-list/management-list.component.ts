import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

export interface IManagementListOptions {
  label: string;
  value: string;
}

@Component({
  selector: 'app-management-list',
  template: `
    <mat-card class="p-2">
      <mat-card-title class="pb-2" *ngIf="title">{{ title }}</mat-card-title>
      <mat-form-field class="w-100" appearance="outline">
        <mat-label>Adicionar</mat-label>
        <mat-select [formControl]="addOption">
          <mat-option>Selecione</mat-option>
          <mat-option value="all" *ngIf="renderOptionAll">
            Adicionar tudo
          </mat-option>
          <ng-container *ngFor="let item of optionsToRender">
            <mat-option [value]="item.value">{{ item.label }}</mat-option>
          </ng-container>
        </mat-select>
      </mat-form-field>
      <ng-container *ngFor="let item of optionsSelected">
        <div class="d-flex justify-content-between align-items-center">
          {{ item.label }}
          <button mat-icon-button (click)="rmOption(item.value)">
            <mat-icon>delete</mat-icon>
          </button>
        </div>
      </ng-container>
    </mat-card>
  `,
})
export class ManagementListComponent implements OnInit, OnDestroy {
  addOption: FormControl = new FormControl();
  private subscription!: Subscription;
  private _optionsToRender: IManagementListOptions[] = [];
  private _optionsSelected: IManagementListOptions[] = [];
  private _options: IManagementListOptions[] = [];
  private _list: IManagementListOptions[] = [];

  @Input() title?: string;
  @Input() set list(value: IManagementListOptions[]) {
    this._list = value;
    this.optionsSelected = value;
    this.updateOptions();
  }
  get list() {
    return this._list;
  }
  @Input() set options(value: IManagementListOptions[]) {
    this.optionsToRender = value;
    this._options = value;
  }
  get options() {
    return this._options;
  }
  @Input() showOptionAll: boolean = true;

  @Output() changeList: EventEmitter<IManagementListOptions[]> =
    new EventEmitter();
  @Output() addOptionEvent: EventEmitter<string> = new EventEmitter();
  @Output() rmOptionEvent: EventEmitter<string> = new EventEmitter();

  get renderOptionAll() {
    return this.showOptionAll && this.optionsToRender.length;
  }

  get optionsToRender() {
    return this._optionsToRender;
  }

  set optionsToRender(options: IManagementListOptions[]) {
    this._optionsToRender = options;
  }

  get optionsSelected() {
    return this._optionsSelected;
  }

  set optionsSelected(options: IManagementListOptions[]) {
    this._optionsSelected = options;
  }

  ngOnInit(): void {
    this.subscription = this.addOption.valueChanges.subscribe((option) => {
      if (option === 'all') {
        this.optionsSelected = this.options;
        this.optionsToRender = [];
      } else {
        const indexOfOption = this.options.findIndex(
          (obj) => obj.value === option
        );
        this.selectOption(this.options[indexOfOption]);
      }
      this.addOption.setValue('', { emitEvent: false });
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  selectOption(option: IManagementListOptions) {
    const optionsSelected = this.optionsSelected;
    optionsSelected.push(option);
    this.optionsSelected = optionsSelected;
    this.changeList.emit(optionsSelected);
    this.addOptionEvent.emit(option.value);
    this.updateOptions();
  }

  rmOption(option: string) {
    this.optionsSelected = this.optionsSelected.filter(
      (obj) => obj.value !== option
    );
    this.changeList.emit(this.optionsSelected);
    this.rmOptionEvent.emit(option);
    this.updateOptions();
  }

  updateOptions() {
    this.optionsToRender = this.options.filter((option) => {
      const indexOfOption = this.optionsSelected.findIndex(
        (obj) => obj.value === option.value
      );
      return indexOfOption === -1;
    });
  }
}
