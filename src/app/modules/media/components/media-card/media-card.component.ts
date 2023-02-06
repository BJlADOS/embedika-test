import { Component, Input } from '@angular/core';
import { IMediaCard } from 'src/app/interfaces/media';

@Component({
  selector: 'app-media-card',
  templateUrl: './media-card.component.html',
  styleUrls: ['./media-card.component.scss']
})
export class MediaCardComponent {

  @Input() public media!: IMediaCard;

  public getTitle(): string {
    return this.media.title.english || this.media.title.romaji;
  }

}
