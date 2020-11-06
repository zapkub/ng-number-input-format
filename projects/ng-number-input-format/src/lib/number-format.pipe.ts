import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
    name: 'numberFormat'
})
export class NumberFormat implements PipeTransform {
    public transform(value: any, ...args: any[]) {
        return 'hi';
    }

}
