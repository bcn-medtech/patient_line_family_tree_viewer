import {
    map,
    pick,
    filter
} from 'underscore';

export function clean_data_table(data,columns_to_show){

    //var array_keys = ["id","name","gender","father","mother","married_with","family_id","center"];

    console.log(data);
    console.log(columns_to_show);
    
    var new_array = [];
    for(var i=0;i<columns_to_show.length;i++){
        new_array = map(data, function(o) { return pick(o,columns_to_show); });
    }

    return new_array;
}

export function obtain_data_from_query(data,query_input){

    /*var query_result;
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
                query_value = query_components[2];

                query_result = filter(data, function (study) {

                    /*var studies_item = study[query_key];

                    if (isVariableNumeric(studies_item)) {
                        studies_item = String(studies_item);
                    }

                    return studies_item.indexOf(query_value) === 0;

                });

                return query_result;

            }); // --> queries_results: array of arrays

            query_result = _.intersection(...queries_results); // --> query_result: intersection of the arrays of "queries_results"
        }
    }

    return query_result;*/
}