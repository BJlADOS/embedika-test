import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MediaService } from 'src/app/services/media/media.service';
import { IMediaDetail } from 'src/app/interfaces/media';
import { DestroyService } from 'src/app/services/destroy/destroy.service';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-media-detail',
  templateUrl: './media-detail.component.html',
  styleUrls: ['./media-detail.component.scss']
})
export class MediaDetailComponent implements OnInit {

  public media!: IMediaDetail;

  constructor(
    private _location: Location,
    private _activatedRoute: ActivatedRoute,
    private _media: MediaService,
    private _router: Router,
    private _destroy$: DestroyService,
  ) { }

  public ngOnInit(): void {
    this._activatedRoute.params.pipe(takeUntil(this._destroy$)).subscribe(params => {
      const id = params['id'];
      this.getMedia(id);
    });
  }

  public navigateBack(): void {
    if ((this._location.getState() as { navigationId: number }).navigationId === 1) {
      this._router.navigate(['/media']);
    } else {
      this._location.back();
    }
  }

  public getTitle(): string {
    return this.media.title.english || this.media.title.romaji;
  }

  private getMedia(id: string): void {
    this._media.getMediaById(id).pipe(takeUntil(this._destroy$)).subscribe(media => {
      this.media = media.data.Media;
    });
  }

}
