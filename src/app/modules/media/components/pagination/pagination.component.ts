import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnChanges {

  @Input() public current!: number;
  @Input() public total!: number;

  public pageControl: FormControl = new FormControl(this.current);
  public pages: number[] = [];

  constructor(
    private _router: Router,
  ) { }

  public ngOnChanges(): void {
    this.pages = this.getPages(this.current, this.total)
  }

  public onGoTo(page: number): void {
    this.moveToPage(page);
  }

  public onNext(): void {
    this.moveToPage(this.current + 1);
  }

  public onPrevious(): void {
    this.moveToPage(this.current - 1);
  }

  public changePage(): void {
    this.moveToPage(this.pageControl.value);
  }

  private getPages(current: number, total: number): number[] {
    if (total <= 7) {
      return [...Array(total).keys()].map(x => ++x)
    }

    if (current >= 5) {
      if (current >= total - 4) {
        return [1, -1, total - 4, total - 3, total - 2, total - 1, total]
      } else {
        return [1, -1, current - 1, current, current + 1, -1, total]
      }
    }

    return [1, 2, 3, 4, 5, -1, total]
  }

  private moveToPage(page: number): void {
    console.log(page);
    this._router.navigate(['/media'], {
      queryParams: {
        page,
      }, queryParamsHandling: 'merge'
    });
  }

}
