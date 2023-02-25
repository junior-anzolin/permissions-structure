import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxPermissionsService } from 'ngx-permissions';
import { firstValueFrom } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class PermissionsService {
  constructor(
    private readonly userService: UserService,
    private readonly ngxPermissionService: NgxPermissionsService
  ) {}

  async loadPermission(userId?: string) {
    if (!userId) return;
    try {
      const user: any = await firstValueFrom(this.userService.get(userId));
      if (!user) return;

      const permissions = [];

      permissions.push(...user?.permissions?.rules);

      if (user?.permissions?.groups)
        user.permissions.groups.map((group: any) =>
          permissions.push(...group?.rules)
        );

      this.ngxPermissionService.loadPermissions(permissions);
    } catch (e) {
      console.error(e);
    }
  }
}
