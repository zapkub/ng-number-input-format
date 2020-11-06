import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { moduleMetadata } from '@storybook/angular';
// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Meta, Story } from '@storybook/angular/types-6-0';
import { NgNumberInputFormatComponent, NgNumberInputFormatModule } from 'ng-number-input-format';


export default {
  title: 'Example/NgNumberInputFormat',
  decorators: [
    moduleMetadata({
      declarations: [
      ],
      imports: [
        BrowserAnimationsModule,
        CommonModule, NgNumberInputFormatModule,
        MatInputModule, MatFormFieldModule,
        FormsModule,
      ],
    }),
  ],
} as Meta;

const Template: Story<NgNumberInputFormatComponent> = (args: NgNumberInputFormatComponent) => ({
  props: args,
  template: `
    <ng-number-input-format #input [disabled]="disabled" [(value)]="value" [readonly]="readonly"></ng-number-input-format>
    {{value}}
    {{input.typeof}}

    <button (click)="value = 20123.33">set value to 20123.33</button>
    <button (click)="value=value+301.21">add 301.21</button>

    <ng-number-input-format #dd></ng-number-input-format>
    {{dd.value}}
    {{'12000' | numberFormat}}
  `,
});

export const Empty = Template.bind({}, { value: 0.00 });
export const TwoWayBinding = Template.bind({}, { value: 10.12 });
export const SetValue = Template.bind({});
export const Readonly = Template.bind({}, { readonly: true, value: 10.312, });
export const Disabled = Template.bind({}, { disabled: true });
export const DisabledWithValue = Template.bind({}, { disabled: true, value: 2000.33 });

@Component({
  template: `
  <mat-form-field appearance="fill">
    <input matInput ngNumberInputFormatDirective [(value)]="value" />
  </mat-form-field>
  `,
})
class NestedComponent {
  public data = {
    amount: 2012000
  };
  public get value() {
    return this.data.amount;
  }
  public set value(v) {
    this.data.amount = v;
  }
}
const TemplateWithNestedComponent: Story<NestedComponent> = (() => ({
  props: {},
  component: NestedComponent,
}));
export const withNestedMaterialUI = TemplateWithNestedComponent.bind({}, );
