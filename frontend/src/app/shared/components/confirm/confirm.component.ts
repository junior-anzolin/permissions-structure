import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface IConfirmDataDTO {
  title: string;
  text: string;
}

@Component({
  selector: 'app-confirm',
  template: `
    <h1 mat-dialog-title>{{ data.title }}</h1>
    <div mat-dialog-content>
      {{ data.text }}
    </div>
    <div mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Não</button
      ><button mat-button (click)="confirm()">Sim</button>
    </div>
  `,
})
export class ConfirmComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IConfirmDataDTO,
    public dialogRef: MatDialogRef<ConfirmComponent>
  ) {}

  confirm() {
    this.dialogRef.close(true);
  }
}
