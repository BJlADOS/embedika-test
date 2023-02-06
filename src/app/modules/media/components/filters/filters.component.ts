import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, take, takeUntil } from 'rxjs';
import { getFormatOptions, getStatusOptions } from 'src/app/interfaces/media';
import { defaultFilter, IFilter, ISelectOption } from 'src/app/interfaces/filters';
import { DestroyService } from 'src/app/services/destroy/destroy.service';
import { FormGeneratorService } from 'src/app/services/form-generator/form-generator.service';
import { MediaService } from 'src/app/services/media/media.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {

  public filtersForm: FormGroup = this._form.getFiltersForm();
  public statusIn: ISelectOption[] = getStatusOptions();
  public format: ISelectOption[] = getFormatOptions();

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute, 
    private _form : FormGeneratorService,
    private _destroy$: DestroyService,
    private _media: MediaService,
  ) { }

  public ngOnInit(): void {
    this._activatedRoute.queryParams.pipe(take(1), takeUntil(this._destroy$)).subscribe(params => {
      const filters: IFilter = { ...defaultFilter };
      //get filters from params
      this._media.updateFilters(filters, params);

      this.filtersForm = this._form.getFiltersForm(filters);
      this.filtersForm.valueChanges.pipe(takeUntil(this._destroy$), debounceTime(500)).subscribe(filters => {
        filters.search = filters.search? filters.search.trim() : null;
        this._router.navigate(['/media'], { queryParams: { page: 1, ...filters }, queryParamsHandling: 'merge' });
      });
    });
  }
  
}
