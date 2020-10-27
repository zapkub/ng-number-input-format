import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgNumberInputFormatComponent } from './ng-number-input-format.component';
import { NgNumberInputFormatDirective } from './ng-number-input-format.directive';



@NgModule({
  declarations: [
    NgNumberInputFormatDirective,
    NgNumberInputFormatComponent,
  ],
  imports: [
    FormsModule,
  ],
  exports: [
    NgNumberInputFormatComponent,
    NgNumberInputFormatDirective,
  ]
})
export class NgNumberInputFormatModule { }
