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
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ReactiveFormsModule } from '@angular/forms';
import { ManagementListModule } from 'src/app/shared/components/management-list/management-list.module';

@NgModule({
  declarations: [GroupComponent, HandleGroupComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    GroupRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    ConfirmModule,
    NgxPermissionsModule.forChild(),
    MatDialogModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    ManagementListModule
  ],
})
export class GroupModule {}
