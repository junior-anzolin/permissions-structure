import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';
import { ConfirmComponent, IConfirmDataDTO } from './confirm.component';

@Injectable()
export class ConfirmService {
  constructor(private readonly dialog: MatDialog) {}

  async open(data: IConfirmDataDTO) {
    const ref = this.dialog.open(ConfirmComponent, { data });
    return (await firstValueFrom(ref.beforeClosed())) || false;
  }
}
