import {
    map,
    pick,
    filter,
    intersection,
    findWhere,
    keys
} from 'underscore';

//actions
import {
    treeBuilder
} from './../../pages/pl_page_viewer/pl_page_viewer_actions/pl_page_viewer_actions_d3_tree_model/pl_page_viewer_actions_d3_tree_creator.js';

import {
    isVariableNumeric
} from './../../../modules/rkt_module_variable';
import { isObjectEmpty } from '../../../modules/rkt_module_object';

export function clean_data_table(data, columns_to_show) {

    var new_array = [];
    for (var i = 0; i < columns_to_show.length; i++) {
        new_array = map(data, function (o) { return pick(o, columns_to_show); });
    }

    return new_array;
}

export function query_data(data, query_input) {

    var query_result;
    var query_key, query_value;

    if (/[#:><≥≤]+/.test(query_input) === false) { // FREE TEXT (1st possible type of query)

        query_result = filter(data, function (item) {
            return item["id"].indexOf(query_input) === 0;
        });

    } else { // special queries with our METALANGUAGE (2nd possible type of query)

        var elements_query = query_input.match(/\B#[A-Za-z0-9]+[:><≥≤][A-Za-z0-9\s]+/g); // e.g. ["#project:HCB", "#gender:male"]

        if (elements_query !== null) {

            var queries_results = map(elements_query, function (query) {

                // e.g.: query = "#project:HCB"

                var query_components = query.split(/[^A-Za-z0-9]/); // ["", "project", "HCB"], i.e., ["", query_key, query_value]
                query_key = query_components[1];
                var query_key_with_symbols = "#" + query_key + ":";
                query_value = query.replace(query_key_with_symbols, "");

                query_result = filter(data, function (items) {

                    var item = items[query_key];

                    if (isVariableNumeric(item)) {
                        item = String(item);
                    }


                    return item.indexOf(query_value) === 0;

                });

                return query_result;

            }); // --> queries_results: array of arrays

            query_result = intersection(...queries_results); // --> query_result: intersection of the arrays of "queries_results"    

        }
    }


    if (!isObjectEmpty(query_result)) {

        query_result = query_result.map(a => a.id);

    }


    return query_result;
}

export function filter_data_by_ids(data, ids) {

    var data_filtered = data;

    if (!isObjectEmpty(ids)) {

        data_filtered = map(ids, function (id) {

            var item = findWhere(data, { "id": id });

            return item;
        });
    }

    return data_filtered;

}

export function create_search_bar_place_holder_from_data(data) {

    var text;

    if (!isObjectEmpty(data)) {

        var data_key;
        var data_keys = keys(data[0]);

        if (data_keys.length > 1) {
            data_key = data_keys[1];
        } else {
            data_key = data_keys[0];
        }

        text = "filter data just typing ... Ex1:'" + data[0].id + "' Ex2:'#" + data_key + ":" + data[0][data_key];

    } else {
        text = "No data to query :(, import or add data";
    }

    return text;
}

export function get_root_patient_of_family(family_id, patients) {

    var patients_family = get_all_patients_from_family(family_id, patients);
    var root = treeBuilder(patients_family);
    var root_patient = root.children[2];
    
    return root_patient;

}

export function get_all_patients_from_family(family_id, patients) {

    var array_patients_family = [];

    for (var i = 0; i < patients.length; i++) {

        var patient = patients[i];

        if ("family_id" in patient) {

            if (patient.family_id === family_id) {

                array_patients_family.push(patient);
            }
        }
    }

    return array_patients_family;
}

