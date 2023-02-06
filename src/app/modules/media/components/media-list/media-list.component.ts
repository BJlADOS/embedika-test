import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QueryRef } from 'apollo-angular';
import { Format, IMediaCard } from 'src/app/interfaces/media';
import { defaultFilter, IFilter, IPageInfo } from 'src/app/interfaces/filters';
import { MediaService } from 'src/app/services/media/media.service';
import { DestroyService } from 'src/app/services/destroy/destroy.service';

@Component({
  selector: 'app-media-list',
  templateUrl: './media-list.component.html',
  styleUrls: ['./media-list.component.scss']
})
export class MediaListComponent implements OnInit {

  public pageNumber: number = 1;
  public filters: IFilter = {...defaultFilter}
  public mediaQuery!: QueryRef<any, any>;
  public mediaPages: Array<IMediaCard[]> = [];
  public pageInfo!: IPageInfo;

  private _perPage = 20;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _media: MediaService,
    private _destroy$: DestroyService,
    private _router: Router,
  ) { }

  public ngOnInit(): void {
    this._activatedRoute.queryParams.subscribe(params => {
      //check if filters changed
      if (this.checkFiltersChange(params as IFilter)) {
        this.clearCharacters();
      }
      //get filters from params
      this._media.updateFilters(this.filters, params);

      //get page number from params
      this.pageNumber = +params['page'] || 1;
      console.log(this.pageNumber);
      //get characters else redirect to first page and set default filters
      if (this.checkReqiredFilters(params)) {
        this.getCharacters();
      } else {
        this._router.navigate(['/media'], { queryParams: { page: 1, ...this.filters } });
      }
    });
  }

  public getCharacters(): void {
    if (!this.mediaQuery) {
      //creating query if it doesn't exist, for no extra requests
      this.mediaQuery = this._media.getMediaWatchQuery(this.pageNumber, this._perPage, this.filters);
      this.mediaQuery.valueChanges.subscribe({ next :data => {
        this.mediaPages[this.pageNumber - 1] = data.data.Page.media;
        this.pageInfo = data.data.Page.pageInfo;
      }, error: err => console.log(err) });

      return;
    } else if (this.mediaPages[this.pageNumber - 1]) {
      //if page already loaded, just return and update page
      this.pageInfo.currentPage = this.pageNumber;
      return;
    }
    //refetching query if page not loaded
    this._media.refetchMediaQuery(this.mediaQuery, this.pageNumber, this._perPage, this.filters);
  }

  private clearCharacters(): void {
    this.mediaPages = [];
  }

  private checkFiltersChange(params: any): boolean {
    //check if filters changed
    return this.filters.search !== (params.search?? null) || this.compareArrays(this.filters.statusIn, params.statusIn?? null) || this.filters.format !== (params.format?? null);
  }

  private compareArrays(arr1: any[] | null, arr2: any[] | undefined): boolean {
    if (Array.isArray(arr1) && Array.isArray(arr2)) {
      return arr1.join() !== arr2.join();
    } else {
      return arr1 !== arr2;
    }
  }

  private checkReqiredFilters(params: any): boolean {
    //check if reqired filters are set
    return params['page'] && Object.keys(Format).includes(params['format']);
  }

}
