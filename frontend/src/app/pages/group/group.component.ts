import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxPermissionsService } from 'ngx-permissions';
import { firstValueFrom } from 'rxjs';
import { GroupService } from 'src/app/services/group.service';
import { ConfirmService } from 'src/app/shared/components/confirm/confirm.service';
import { HandleGroupComponent } from './handle-group/handle-group.component';
import { ListgroupDataSource } from './list-group.data-source';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss'],
})
export class GroupComponent {
  dataSource = new ListgroupDataSource(this.groupService);
  displayedColumns: string[] = ['description', 'qRules'];
  loading = false;

  constructor(
    private readonly groupService: GroupService,
    private readonly confirmService: ConfirmService,
    private readonly ngxPermissionsService: NgxPermissionsService,
    private readonly dialog: MatDialog
  ) {
    this.checkPermissions();
  }

  async checkPermissions() {
    if (
      (await this.ngxPermissionsService.hasPermission('group:update')) ||
      (await this.ngxPermissionsService.hasPermission('group:delete'))
    ) {
      this.displayedColumns.push('actions');
    }
  }

  async create() {
    const ref = this.dialog.open(HandleGroupComponent, { autoFocus: false });
    if (await firstValueFrom(ref.beforeClosed())) {
      this.dataSource.refresh();
    }
  }

  async edit(id: string) {
    const ref = this.dialog.open(HandleGroupComponent, {
      data: { id },
      autoFocus: false,
    });
    if (await firstValueFrom(ref.beforeClosed())) {
      this.dataSource.refresh();
    }
  }

  async delete(id: string) {
    if (
      await this.confirmService.open({
        title: 'Excluir grupo',
        text: 'Tem certeza que deseja excluir o grupo?',
      })
    ) {
      try {
        this.loading = true;
        await firstValueFrom(this.groupService.delete(id));
        this.loading = false;
        this.dataSource.refresh();
      } catch (e: any) {
        console.error(e);
      }
    }
  }
}
