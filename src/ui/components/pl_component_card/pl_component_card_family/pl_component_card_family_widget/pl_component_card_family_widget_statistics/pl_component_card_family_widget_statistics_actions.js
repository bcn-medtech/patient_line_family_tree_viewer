import { isObjectAnArray } from './../../../../../../modules/rkt_module_object';
import { sortBy } from 'underscore';

export function sort_statistics(statistics) {

    if (isObjectAnArray(statistics)) {

        var sorted_statistics = statistics.slice();
        sorted_statistics = sortBy(statistics, "counter").reverse(); // 'reverse()' is done because '.sortBy' sorts in ascending order

        return sorted_statistics;


    } else return statistics;

}

export function format_phenotype(phenotype) {

    var formatted_phenotypes = {
        
        "death-from-other-causes": "Death from other causes",
        "sudden-cardiac-death": "Sudden cardiac death",
        "ressucitated-scd-or-vf": "Ressucitated SCD or VF",
        "phenotypic-manifestation": "Phenotypic manifestation",
        "no-phenotypic-manifestation": "No phenotypic manifestation"
        
    }

    return formatted_phenotypes[phenotype];

}