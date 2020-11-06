import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgNumberInputFormatComponent } from './ng-number-input-format.component';
import { NgNumberInputFormatDirective } from './ng-number-input-format.directive';
import { NumberFormat } from './number-format.pipe';



@NgModule({
  declarations: [
    NgNumberInputFormatDirective,
    NgNumberInputFormatComponent,
    NumberFormat,
  ],
  providers: [
    NumberFormat,
  ],
  imports: [
    FormsModule,
  ],
  exports: [
    NgNumberInputFormatComponent,
    NgNumberInputFormatDirective,
    NumberFormat,
  ]
})
export class NgNumberInputFormatModule { }
