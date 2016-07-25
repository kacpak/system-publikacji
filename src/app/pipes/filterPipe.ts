import {Pipe, PipeTransform} from '@angular/core';
import {stringify} from "@angular/upgrade/src/util";

@Pipe({name: 'filter'})
export class FilterPipe implements PipeTransform {
    transform(array: any[], filter: string): any[] {
        if (!filter)
            return array;

        return array.filter(item => {
            let itemValues: string[] = Object.keys(item).map(key => stringify(item[key]).toLowerCase());
            for (var value of itemValues) {
                if (value.indexOf(filter) != -1) {
                    return true;
                }
            }
            return false;
        });
    }
}