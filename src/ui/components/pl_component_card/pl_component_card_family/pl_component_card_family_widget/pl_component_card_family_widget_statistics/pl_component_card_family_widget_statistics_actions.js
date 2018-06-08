import { format_date } from './../../../../../../modules/rkt_module_date';
import { isObjectAnArray } from './../../../../../../modules/rkt_module_object';
import { sortBy } from 'underscore';

export function sort_statistics(statistics) {

    if (isObjectAnArray(statistics)) {

        var sorted_statistics = statistics.slice();
        sorted_statistics = sortBy(statistics, "counter");

        return sorted_statistics;


    } else return statistics;

}