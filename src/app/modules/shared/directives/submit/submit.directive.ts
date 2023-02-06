import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appSubmit]'
})
export class SubmitDirective {

  @Output() public submit: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }


  @HostListener('keydown', ['$event'])
  public onKeydown(event: KeyboardEvent): void {
    if (+(event.target as HTMLInputElement).value <= 0) {
      return;
    }
    if (event.key === 'Enter') {
      this.submit.emit();
    }
  }

}
