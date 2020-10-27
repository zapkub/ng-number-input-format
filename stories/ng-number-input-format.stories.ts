import { CommonModule } from '@angular/common';
import { moduleMetadata } from '@storybook/angular';
// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Meta, Story } from '@storybook/angular/types-6-0';
import { NgNumberInputFormatComponent, NgNumberInputFormatModule } from 'projects/ng-number-input-format/src/public-api';


export default {
  title: 'Example/NgNumberInputFormat',
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [CommonModule, NgNumberInputFormatModule],
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
  `,
});

export const Empty = Template.bind({ }, { value: 0.00 });
export const TwoWayBinding = Template.bind({}, { value: 10.12 });
export const SetValue = Template.bind({});
export const Readonly = Template.bind({}, {readonly: true, value: 10.312, });
export const Disabled = Template.bind({}, { disabled: true });
export const DisabledWithValue = Template.bind({}, { disabled: true, value: 2000.33 });

