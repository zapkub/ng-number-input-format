import { Directive, ElementRef, HostListener } from '@angular/core';
import { NgModel } from '@angular/forms';
import * as AutoNumeric from 'autonumeric';

@Directive({
  selector: 'input[ngNumberInputFormatDirective]'
})
export class NgNumberInputFormatDirective {

  constructor(
    protected elementRef: ElementRef<HTMLInputElement>,
    protected ngmodel: NgModel,
  ) {

    this.instance = new AutoNumeric(this.elementRef.nativeElement, '0.00', {
      emptyInputBehavior: 'null',
    });
    this.ngmodel.valueChanges
      .subscribe(this.handleNgModelUpdate.bind(this));
  }

  private instance: AutoNumeric;

  private isKeyEvent = false;

  private handleNgModelUpdate(value) {
    if (!this.isKeyEvent) {
      this.instance.set(value);
    }
    this.isKeyEvent = false;
  }
  @HostListener('keydown', ['$event'])
  public handleHostListenerKeydown(evt: KeyboardEvent) {
    this.isKeyEvent = true;
  }

  @HostListener('input', ['$event'])
  public handleHostListenerInput(evt: InputEvent) {
    const val = this.elementRef.nativeElement.value;
    this.ngmodel.control.patchValue(this.instance.getNumber(), {emitEvent: false});
    this.elementRef.nativeElement.value = val;
  }
}
