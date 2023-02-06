import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'media', pathMatch: 'full' },
  { path: 'media', loadChildren: () => import('./modules/media/media.module').then(m => m.MediaModule) }
];

export const appRouting: ModuleWithProviders<RouterModule> = RouterModule.forRoot(routes);
