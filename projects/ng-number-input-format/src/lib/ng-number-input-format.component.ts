import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'ng-number-input-format',
  template: `<input [disabled]="disabled" [readOnly]="readonly" [ngModel]="value" (ngModelChange)="valueChange.emit($event)" ngNumberInputFormatDirective />`,
  styles: [
  ]
})
export class NgNumberInputFormatComponent implements OnInit {

  @Input()
  public readonly = false;

  @Input()
  public value = 0;

  @Input()
  public disabled = false;

  @Output()
  public readonly valueChange = new EventEmitter<number>();

  constructor() { }

  public ngOnInit(): void {
  }

}
