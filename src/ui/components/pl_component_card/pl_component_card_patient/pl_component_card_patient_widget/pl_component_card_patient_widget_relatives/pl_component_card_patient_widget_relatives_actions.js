import { format_date } from './../../../../../../modules/rkt_module_date';
import { isObjectAnArray } from './../../../../../../modules/rkt_module_object';
import { sortBy } from 'underscore';

export function sort_relatives_by_dob(relatives) {

    if (isObjectAnArray(relatives)) {

        var sorted_relatives = relatives.slice();
        
        for (var i = 0; i < sorted_relatives.length; i++) {
            sorted_relatives[i].dob = format_date(sorted_relatives[i].dob);
        }

        sorted_relatives = sortBy(sorted_relatives, "dob");

        return sorted_relatives;


    } else return relatives;

}