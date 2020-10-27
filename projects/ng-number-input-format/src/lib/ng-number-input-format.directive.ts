import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import * as Autonumeric from 'autonumeric';
@Directive({
  selector: 'input[ngNumberInputFormatDirective]'
})
export class NgNumberInputFormatDirective {

  @Input()
  public value = 0;

  @Output()
  public readonly valueChange = new EventEmitter<number>();

  constructor(
    protected elementRef: ElementRef<HTMLInputElement>,
  ) {
  }

  private parseFloat(value: string) {
    return parseFloat(value.replace(/,/g, ''));
  }
  private get selectionStart() {
    return this.elementRef.nativeElement.selectionStart;
  }
  private get selectionEnd() {
    return this.elementRef.nativeElement.selectionEnd;
  }

  private get rawValue(): string {
    return this.elementRef.nativeElement.value || '';
  }
  private isDecimalPosition(evt: KeyboardEvent) {
    const pos = this.selectionStart;
    const poe = this.selectionEnd;
    const dotPos = this.rawValue.split('').findIndex(v => v === '.');
    if (dotPos < 0) {
      return false;
    }
    return pos > dotPos && poe > dotPos;
  }

  private get isDecimalIsLimit() {
    const s = this.rawValue.split('.');
    if (s.length < 2) {
      return false;
    }
    return s[1].length === 2;
  }

  private get isDecimalExists() {
    return this.rawValue.split('.').length > 1;
  }

  private isNumberInput(evt: KeyboardEvent) {
    return evt.key.length === 1 && /[0-9\.-]/.test(evt.key);
  }

  @HostListener('keydown', ['$event'])
  public handleHostListenerKeydown(evt: KeyboardEvent) {
    if (this.isNumberInput(evt)) {

      if (this.isDecimalExists && evt.key === '.') {
        evt.preventDefault();
        return false;
      }

      if (this.isDecimalPosition(evt) && this.isDecimalIsLimit && this.selectionEnd === this.rawValue.length) {
        evt.preventDefault();
        return false;
      }
      if (this.isDecimalPosition(evt) && this.isDecimalIsLimit) {
        const start = this.selectionStart;
        const end = this.selectionEnd;
        const x = this.rawValue.substring(0, this.selectionEnd);
        const xx = this.rawValue.substring(this.selectionEnd + 1, this.rawValue.length);
        const nextval = x + xx;
        this.elementRef.nativeElement.value = nextval;
        this.elementRef.nativeElement.selectionStart = start;
        this.elementRef.nativeElement.selectionEnd = end;
      }
    } else {
      if (evt.key.length === 1 && !evt.altKey && !evt.ctrlKey && !evt.metaKey) {
        evt.preventDefault();
        return false;
      }
    }
  }

  @HostListener('input', ['$event'])
  public handleHostListenerInput(evt: InputEvent) {


    const val = this.parseFloat(this.elementRef.nativeElement.value);
    this.valueChange.emit(val);
    this.value = val;

  }

  @HostListener('keyup', ['$event'])
  public handleHostListenerKeyup(evt: KeyboardEvent) {
    if (this.isNumberInput(evt)) {
    }
  }

  @HostListener('blur')
  public handleHostListenerBlur() {
    this.elementRef.nativeElement.value = Autonumeric.format(this.value, {});
  }

  @HostListener('focus')
  public handleHostListenerFocus() {
    let val = this.parseFloat(this.rawValue);
    if (isNaN(val)) {
      val = 0;
    }
    this.elementRef.nativeElement.value = val + '';
    this.elementRef.nativeElement.select();
  }
}
