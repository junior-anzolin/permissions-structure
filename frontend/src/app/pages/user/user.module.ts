import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { NgxPermissionsModule } from 'ngx-permissions';
import { HandleUserComponent } from './handle-user/handle-user.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HandlePermissionsComponent } from './handle-permissions/handle-permissions.component';
import { ManagementListModule } from 'src/app/shared/components/management-list/management-list.module';

@NgModule({
  declarations: [
    UserComponent,
    HandleUserComponent,
    HandlePermissionsComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UserRoutingModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    NgxPermissionsModule.forChild(),
    MatDialogModule,
    MatInputModule,
    MatProgressSpinnerModule,
    ManagementListModule,
  ],
})
export class UserModule {}
