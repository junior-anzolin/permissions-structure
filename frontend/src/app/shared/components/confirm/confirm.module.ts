import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmComponent } from './confirm.component';
import { ConfirmService } from './confirm.service';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [ConfirmComponent],
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  providers: [ConfirmService],
})
export class ConfirmModule {}
