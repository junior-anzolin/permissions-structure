import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { AuthenticatedGuard } from './shared/authenticated.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthenticatedGuard],
    children: [
      {
        path: 'user',
        data: {
          permissions: {
            only: 'user:list',
            redirectTo: '/select-user',
          },
        },
        canActivate: [NgxPermissionsGuard],
        loadChildren: () =>
          import('./pages/user/user.module').then((m) => m.UserModule),
      },
      {
        path: 'group',
        data: {
          permissions: {
            only: 'group:list',
            redirectTo: '/select-user',
          },
        },
        canActivate: [NgxPermissionsGuard],
        loadChildren: () =>
          import('./pages/group/group.module').then((m) => m.GroupModule),
      },
      {
        path: 'select-user',
        data: {
          permissions: {
            except: 'user:list',
            redirectTo: '/user',
          },
        },
        canActivate: [NgxPermissionsGuard],
        loadChildren: () =>
          import('./pages/user/user.module').then((m) => m.UserModule),
      },
      {
        path: '**',
        redirectTo: 'select-user',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
