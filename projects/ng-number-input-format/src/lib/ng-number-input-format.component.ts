import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgNumberInputFormatDirective } from './ng-number-input-format.directive';
@Component({
  selector: 'ng-number-input-format',
  template: `<input ngNumberInputFormatDirective [value]="value" (valueChange)="valueChange.emit($event)" [disabled]="disabled" [readOnly]="readonly" />`,
  styles: [
  ]
})
export class NgNumberInputFormatComponent implements OnInit {

  public get typeof() {
    return typeof this.value;
  }

  @ViewChild(NgNumberInputFormatDirective)
  public readonly numberInputDirective: NgNumberInputFormatDirective;

  constructor() { }

  @Input()
  public readonly = false;

  @Input()
  public value = 0;

  @Input()
  public disabled = false;

  @Output()
  public readonly valueChange = new EventEmitter<number>();


  public ngOnInit(): void {
  }

}
