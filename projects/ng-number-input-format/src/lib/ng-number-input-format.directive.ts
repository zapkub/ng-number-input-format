import { AfterContentInit, Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import * as Autonumeric from 'autonumeric';
@Directive({
  selector: 'input[ngNumberInputFormatDirective]'
})
export class NgNumberInputFormatDirective implements AfterContentInit {

  @Input()
  public set value(v) {
    this.numval = v;
    if (this.isFocus) {
      const currentRawValueToFloat = this.parseFloat(this.rawValue);
      if (v !== currentRawValueToFloat) {
        this.elementRef.nativeElement.value = this.numval + '';
      }
    } else {
      this.elementRef.nativeElement.value = Autonumeric.format.bind(Autonumeric)(this.value, {});
    }
  }


  public get value() {
    return this.numval;
  }

  constructor(
    protected elementRef: ElementRef<HTMLInputElement>,
  ) { }
  private get selectionStart() {
    return this.elementRef.nativeElement.selectionStart;
  }
  private get selectionEnd() {
    return this.elementRef.nativeElement.selectionEnd;
  }

  private get rawValue(): string {
    return this.elementRef.nativeElement.value || '';
  }

  private get isIntegerIsLimit() {
    const s = this.rawValue.split('.');
    return s[0].length === 13;
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


  private numval = 0;

  @Output()
  public readonly valueChange = new EventEmitter<number>();
  private isFocus = false;

  public ngAfterContentInit() {
    /**
     * force format input value after
     * directive is mounted
     * at the first time in angular life cycle
     * this will allowed our directive can be work with
     * another directive eg. matInput
     */
    this.elementRef.nativeElement.value = Autonumeric.format.bind(Autonumeric)(this.value, {});
  }

  /**
   * format value in inputelement
   * with autonumeric
   */
  public forceFormat() {
    this.elementRef.nativeElement.value = Autonumeric.format.bind(Autonumeric)(this.value, {});
  }

  private parseFloat(value: string) {
    return parseFloat(value.replace(/,/g, ''));
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

  private isNumberInput(evt: KeyboardEvent) {
    return evt.key.length === 1 && /[0-9\.-]/.test(evt.key);
  }

  private handleLimitNumberInput() {
    const integer = this.value.toString().split('.')[0];
    const decimal = this.value.toString().split('.')[1];

    this.value = this.parseFloat(integer.substring(0, 13) + '.' + decimal);
  }

  @HostListener('keydown', ['$event'])
  public handleHostListenerKeydown(evt: KeyboardEvent) {
    if (this.isNumberInput(evt)) {

      if (!this.isDecimalPosition(evt) && this.isIntegerIsLimit && evt.key !== '.' && this.selectionStart === this.selectionEnd) {
        /**
         * block input if amount length is max but if
         * cursor of user select more than 1 characters we will allow
         * user to be able to replace value
         */
        evt.preventDefault();
        return false;
      }

      if (this.isDecimalExists && evt.key === '.') {
        evt.preventDefault();
        return false;
      }

      if (this.isDecimalPosition(evt) && this.isDecimalIsLimit && this.selectionEnd === this.rawValue.length) {
        evt.preventDefault();
        return false;
      }

      /**
       * replace number after decimal point if
       * current value have 2 percision point
       * and user try to input number before these 2 numbers (after decimal point)
       */
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
    if (this.rawValue.length === 0) {
      return;
    }

    // if number start '.' or '.0' will not parseFloat
    if (/.*\.$/.test(this.rawValue) || /.*(\.0)$/.test(this.rawValue)) {

    } else {
      let val = this.parseFloat(this.rawValue);
      if (isNaN(val)) {
        val = 0;
      }

      this.valueChange.emit(val);
      this.value = val;
    }

  }

  @HostListener('keyup', ['$event'])
  public handleHostListenerKeyup(evt: KeyboardEvent) {
    if (this.isNumberInput(evt)) {
    }
  }

  @HostListener('blur')
  public handleHostListenerBlur() {
    if (this.elementRef.nativeElement.value.length === 0) {
      /**
       * for empty input value we will
       * treat it as empty value ( zero )
       * but only when user lost focus from input box only
       */
      this.valueChange.emit(0);
      this.value = 0;
      this.elementRef.nativeElement.value = '0';
    }
    this.handleLimitNumberInput();
    this.elementRef.nativeElement.value = Autonumeric.format.bind(Autonumeric)(this.value, {});
    this.isFocus = false;

  }

  @HostListener('focus')
  public handleHostListenerFocus() {
    this.isFocus = true;
    let val = this.parseFloat(this.rawValue);
    if (isNaN(val)) {
      val = 0;
    }
    this.elementRef.nativeElement.value = val + '';
    this.elementRef.nativeElement.select();
  }
}
