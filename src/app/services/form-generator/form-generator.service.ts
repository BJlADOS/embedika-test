import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { IFilter } from 'src/app/interfaces/filters';

@Injectable({
  providedIn: 'root'
})
export class FormGeneratorService {

  private _fb: FormBuilder = new FormBuilder();

  constructor() { }

  public getFiltersForm(filters?: IFilter): FormGroup {
    return this._fb.group({
      search: new FormControl(filters?.search?? null),
      statusIn: new FormControl(filters?.statusIn?? null),
      format: new FormControl(filters?.format?? null),
    });
  }

  public getPageForm(page: number): FormGroup {
    return this._fb.group({
      page: new FormControl(page),
    });
  }

}
