import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MediaDetailComponent } from './components/media-detail/media-detail.component';
import { MediaListComponent } from './components/media-list/media-list.component';

const routes: Routes = [
  { path: '', component: MediaListComponent },
  { path: ':id', component: MediaDetailComponent },
];

export const mediaRouting: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
