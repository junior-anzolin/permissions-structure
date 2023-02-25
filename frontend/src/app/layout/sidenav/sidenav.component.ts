import { Component } from '@angular/core';
import { NgxPermissionsService } from 'ngx-permissions';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent {
  constructor(private readonly ngxPermissionsService: NgxPermissionsService) {}

  removePermissions() {
    this.ngxPermissionsService.flushPermissions();
  }
}
