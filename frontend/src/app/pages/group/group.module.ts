import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupRoutingModule } from './group-routing.module';
import { GroupComponent } from './group.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { ConfirmModule } from 'src/app/shared/components/confirm/confirm.module';
import { NgxPermissionsModule } from 'ngx-permissions';
import { HandleGroupComponent } from './handle-group/handle-group.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [GroupComponent, HandleGroupComponent],
  imports: [
    CommonModule,
    GroupRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    ConfirmModule,
    NgxPermissionsModule.forChild(),
    MatDialogModule,
  ],
})
export class GroupModule {}
