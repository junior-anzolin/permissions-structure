import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';
import { PermissionsService } from 'src/app/services/permissions.service';
import { UserService } from 'src/app/services/user.service';
import { HandlePermissionsComponent } from './handle-permissions/handle-permissions.component';
import { HandleUserComponent } from './handle-user/handle-user.component';
import { ListUserDataSource } from './list-user.data-source';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent {
  dataSource = new ListUserDataSource(this.userService);
  displayedColumns: string[] = ['name', 'email', 'actions'];
  loading = false;

  constructor(
    private readonly userService: UserService,
    private readonly permissionService: PermissionsService,
    private readonly dialog: MatDialog
  ) {}

  async create() {
    const ref = this.dialog.open(HandleUserComponent, { autoFocus: false });
    if (await firstValueFrom(ref.beforeClosed())) {
      this.dataSource.refresh();
    }
  }

  async edit(id: string) {
    const ref = this.dialog.open(HandleUserComponent, {
      data: { id },
      autoFocus: false,
    });
    if (await firstValueFrom(ref.beforeClosed())) {
      this.dataSource.refresh();
    }
  }

  selectUserPermissions(id: string) {
    this.permissionService.loadPermission(id);
  }

  managerPermissions(id: string) {
    this.dialog.open(HandlePermissionsComponent, {
      data: { id },
      autoFocus: false,
    });
  }
}
