import { isObjectEmpty } from './../../../../modules/rkt_module_object';
import _  from 'underscore';

export function obtainListVerticalInfoFromQuery(query_input, list_vertical_info_items) {

    var new_list_vertical_info = [];

    if (/[#]+/.test(query_input) === true) { // special queries with our METALANGUAGE

        var elements_query = query_input.match(/#[A-Za-z0-9_]+/g); // e.g. ["#name", "#gender", "#age"]

        if (elements_query !== null) {
            var queries_results = _.map(elements_query, function (query) {

                // e.g.: query = "#name"
                var query_components = query.split(/[^A-Za-z0-9_]/); // ["", "name"]
                var query_key = query_components[1]; // "name"
                
                var array_objects_of_interest = processQuery(query_key, list_vertical_info_items); // array_of_objects
                return array_objects_of_interest;
                
            }); // --> queries_results: [ [{}, ...], [{}, ...], ... ] (array of arrays of objects)

            if (!isObjectEmpty(queries_results)) {
                new_list_vertical_info = _.union(...queries_results); // --> new_list_vertical_info: union of the elements of "queries_results"
                // --> e.g. from query "#name #gender #age" -->
                // ------> [{"name":"name", "value":"John Doe"}, {"name":"gender", "value":"male"}, {"name":"age", "value":35}]

            }
        }

    }

    return new_list_vertical_info;

}

function processQuery(id_of_interest, array_of_objects) {
    /* Inputs:
        array_of_objects = [{"name":string, "value":string/number}, ..., {}] --> pl_components_list_vertical_info.md
        id_of_interest = string, id to look for in "array_of_objects"
    */
    /* Output: array_objects_of_interest = [{"name":id_of_interest, "value":string/number}, ...]
        These objects of interest have ids that contain partially or totally the id_of_interest;
        e.g. id_of_interest = "ecg" => 
            => array_objects_of_interest = [{"name":"ecg", "value":string/number}, {"name":"ecg_qrs_morph", "value":string/number}, ...]
    */

    var id_of_interest_lower_case = id_of_interest.toLowerCase();
    var array_objects_of_interest = [];

    array_objects_of_interest = _.filter(array_of_objects, function (object) {

        var id_object_lower_case = object["name"].toLowerCase();
        return id_object_lower_case.indexOf(id_of_interest_lower_case) === 0;
        // indexOf === 0 means that "query_value" not only exists in the name, but it also appears at the name's beginning
    
    }); // --> array_objects_of_interest = [{"name":string, "value":string/number}, ..., {}]
    
    return array_objects_of_interest;

}