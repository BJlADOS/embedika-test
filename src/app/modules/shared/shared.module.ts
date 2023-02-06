import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { SelectWithRadioMultipleSearchComponent } from './components/select-with-radio-multiple-search/select-with-radio-multiple-search.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SelectWithRadioComponent } from './components/select-with-radio/select-with-radio.component';



@NgModule({
  declarations: [
    SelectWithRadioMultipleSearchComponent,
    SelectWithRadioComponent,
  ],
  imports: [
    CommonModule,
    ScrollingModule,
    ReactiveFormsModule,
  ],
  exports: [
    SelectWithRadioMultipleSearchComponent,
    SelectWithRadioComponent,
  ]
})
export class SharedModule { }
