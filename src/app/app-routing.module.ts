import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Notfound } from './pages/notfound/notfound';
import { AppLayout } from './shared/layout/components/app.layout';

export const routes: Routes = [
  { path: 'notfound', component: Notfound },
  { path: 'agents', redirectTo: '/admin/agents', pathMatch: 'full' },
  {
    path: 'agents/create',
    redirectTo: '/admin/agents/create',
    pathMatch: 'full',
  },
  {
    path: 'agents/:id',
    redirectTo: '/admin/agents/:id',
    pathMatch: 'full',
  },
  {
    path: 'agents/:id/edit',
    redirectTo: '/admin/agents/:id/edit',
    pathMatch: 'full',
  },
  { path: '', redirectTo: '/admin', pathMatch: 'full' },
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
