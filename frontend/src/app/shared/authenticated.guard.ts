import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { PermissionsService } from '../services/permissions.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticatedGuard implements CanActivate {
  constructor(private readonly permissionsService: PermissionsService) {}

  async canActivate(): Promise<boolean> {
    //await this.permissionsService.loadPermission('63ea4f0df87a70fdcc87e5f7');

    return true;
  }
}
