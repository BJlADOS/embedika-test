import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { SelectWithRadioMultipleSearchComponent } from './components/select-with-radio-multiple-search/select-with-radio-multiple-search.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SelectWithRadioComponent } from './components/select-with-radio/select-with-radio.component';
import { SubmitDirective } from './directives/submit/submit.directive';



@NgModule({
  declarations: [
    SelectWithRadioMultipleSearchComponent,
    SelectWithRadioComponent,
    SubmitDirective,
  ],
  imports: [
    CommonModule,
    ScrollingModule,
    ReactiveFormsModule,
  ],
  exports: [
    SelectWithRadioMultipleSearchComponent,
    SelectWithRadioComponent,
    SubmitDirective,
  ]
})
export class SharedModule { }
