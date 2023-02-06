import { Component, ElementRef, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { ISelectOption } from 'src/app/interfaces/filters';

export const CUSTOM_SELECT_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SelectWithRadioComponent),
  multi: true
};

@Component({
  selector: 'app-select-with-radio',
  templateUrl: './select-with-radio.component.html',
  styleUrls: ['./select-with-radio.component.scss'],
  providers: [CUSTOM_SELECT_VALUE_ACCESSOR]
})
export class SelectWithRadioComponent implements ControlValueAccessor {

  @Input() options: any[] = [];
  @Input() title: string = 'Select';
  @Input() required: boolean = false;

  public currentValue: any;
  public dropdownOpen: boolean = false;
  public disabled: boolean = false;
  public onChange: any;

  public edited: boolean = false;

  constructor(
    private elem: ElementRef
  ) { }

  public writeValue(obj: any): void {
    // Если у объекта есть свойство id, то берём сам объект, иначе ищем объект с таким id
    this.currentValue = obj?.value ? obj : this.options.find((option) => option.value === obj);
    this.closeDropdown();
  }
  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  public registerOnTouched(fn: any): void {
    this.closeDropdown();
  }
  public setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  public get dropdownElement(): Element { return this.elem.nativeElement.querySelector('.dropdown-list') }

  public closeDropdown(): void {
    this.dropdownElement.setAttribute('aria-expanded', "false");
    this.dropdownOpen = false;
  }

  public selectByIndex(i: number): void {
    let value = this.options[i];
    this.select(value);
  }

  public select(value: ISelectOption): void {
    this.currentValue = value;
    this.edited = true;
    this.closeDropdown();
    this.onChange(value.value);
  }

}
