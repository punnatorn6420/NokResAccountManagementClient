import { Directive, HostListener, ElementRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Directive({
  selector: '[uppercaseEngOnly]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: UppercaseEngOnlyDirective,
      multi: true,
    },
  ],
  standalone: false,
})
export class UppercaseEngOnlyDirective implements ControlValueAccessor {
  private onChange!: (value: string) => void;
  private onTouched!: () => void;

  constructor(private el: ElementRef<HTMLInputElement>) {}

  @HostListener('input', ['$event']) onInput(event: Event) {
    let val = (event.target as HTMLInputElement).value;
    val = val.replace(/[^a-zA-Z]/g, '');
    val = val.toUpperCase();

    this.el.nativeElement.value = val;

    if (this.onChange) this.onChange(val);
    if (this.onTouched) this.onTouched();
  }

  writeValue(value: string | null): void {
    this.el.nativeElement.value = (value ?? '').toUpperCase();
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.el.nativeElement.disabled = isDisabled;
  }
}
