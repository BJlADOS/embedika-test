import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { MediaListComponent } from './components/media-list/media-list.component';
import { MediaCardComponent } from './components/media-card/media-card.component';
import { MediaDetailComponent } from './components/media-detail/media-detail.component';
import { mediaRouting } from './media-routing.module';
import { FiltersComponent } from './components/filters/filters.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PaginationComponent } from './components/pagination/pagination.component';



@NgModule({
  declarations: [
    MediaListComponent,
    MediaCardComponent,
    MediaDetailComponent,
    FiltersComponent,
    PaginationComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    mediaRouting,
    ReactiveFormsModule,
  ]
})
export class MediaModule { }
