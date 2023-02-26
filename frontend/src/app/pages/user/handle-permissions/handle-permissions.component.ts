import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';
import { GroupService } from 'src/app/services/group.service';
import { UserService } from 'src/app/services/user.service';
import { IManagementListOptions } from 'src/app/shared/components/management-list/management-list.component';
import { PERMISSIONS } from 'src/app/shared/permissions.const';
import { IHandleUserDataDTO } from '../handle-user/handle-user.component';

@Component({
  selector: 'app-handle-permissions',
  template: `
    <h1 mat-dialog-title>Alterar acessos do usuário</h1>
    <div mat-dialog-content>
      <div class="row">
        <div class="col-6 px-3">
          <app-management-list
            title="Permissões"
            [options]="optionsPermissions"
            [list]="permissionsSelected"
            [showOptionAll]="false"
            (addOptionEvent)="addOptionPermission($event)"
            (rmOptionEvent)="rmOptionPermission($event)"
          ></app-management-list>
        </div>
        <div class="col-6 px-3">
          <app-management-list
            title="Grupos"
            [options]="optionsGroups"
            [list]="groupsSelected"
            [showOptionAll]="false"
            (addOptionEvent)="addOptionGroup($event)"
            (rmOptionEvent)="rmOptionGroup($event)"
          ></app-management-list>
        </div>
      </div>
    </div>
  `,
})
export class HandlePermissionsComponent implements OnInit {
  optionsPermissions: IManagementListOptions[] = PERMISSIONS.map((item) => ({
    label: item,
    value: item,
  }));
  optionsGroups: IManagementListOptions[] = [];

  permissionsSelected: IManagementListOptions[] = [];
  groupsSelected: IManagementListOptions[] = [];

  loading = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: IHandleUserDataDTO,
    public dialogRef: MatDialogRef<HandlePermissionsComponent>,
    private readonly userService: UserService,
    private readonly groupService: GroupService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  async loadData() {
    try {
      const user: any = await firstValueFrom(
        this.userService.get(this.data.id as string)
      );
      await this.loadPermissionsAndGroups(user.permissions);
    } catch (e: any) {
      console.error(e);
    }
  }

  async loadPermissionsAndGroups(dataPermissions: any) {
    try {
      const groupsRes: any = await firstValueFrom(this.groupService.list());
      this.optionsGroups = groupsRes.map((item: any) => ({
        label: item.description,
        value: item._id,
      }));
      this.groupsSelected = dataPermissions.groups.map((item: any) => ({
        label: item.description,
        value: item._id,
      }));
      this.permissionsSelected = dataPermissions.rules.map((item: any) => ({
        label: item,
        value: item,
      }));
    } catch (e: any) {
      console.error(e);
    }
  }

  addOptionPermission(option: string) {
    this.addOption({
      permission: option,
    });
  }

  rmOptionPermission(option: string) {
    this.rmOption({
      permission: option,
    });
  }

  addOptionGroup(option: string) {
    this.addOption({
      group: option,
    });
  }

  rmOptionGroup(option: string) {
    this.rmOption({
      group: option,
    });
  }

  async addOption(body: any) {
    await firstValueFrom(
      this.userService.addPermissionOrGroup(this.data.id as string, body)
    );
  }

  async rmOption(body: any) {
    await firstValueFrom(
      this.userService.rmPermissionOrGroup(this.data.id as string, body)
    );
  }
}
