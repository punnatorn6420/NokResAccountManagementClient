import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Notfound } from './pages/notfound/notfound';
import { AppLayout } from './shared/layout/components/app.layout';

export const routes: Routes = [
  { path: 'notfound', component: Notfound },
  {
    path: '',
    loadChildren: () => import('../app/pages/auth/auth.routes'),
  },
  {
    path: 'admin',
    component: AppLayout,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: '',
        loadChildren: () =>
          import('../app/pages/pages.module').then((m) => m.PagesModule),
      },
    ],
  },

  { path: '**', redirectTo: '/notfound' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
