/*import _ from 'underscore';

//import modules
import {
    isVariableNumeric
} from './../../../modules/rkt_module_variable';

import { url_getParameterByName } from './../../../modules/rkt_module_url';
import { isObjectEmpty } from './../../../modules/rkt_module_object';
var jwtDecode = require('jwt-decode')

export function navigate_to_url(url){
    window.location.href = url;
}
//User management and token methods
function obtain_user_token_from_url(url) {

    return url_getParameterByName("token", url);

}

function obtain_user_token_from_local_storage() {

    return window.localStorage.getItem("acces_token");

}


function set_user_token_local_storage(token) {

    window.localStorage.setItem("acces_token", token);
}

export function logout(){

    window.localStorage.removeItem("acces_token");
}

export function devLogin(url,user_email,callback){

    var login_url = url+"?user="+user_email;

    var options = {
        method: 'GET',
        mode: 'cors',
    };

    fetch(login_url, options)
    .then(response => response.json())
    .then(function (json) {

        console.log(json);
        if("token" in json){
            console.log(json.token);
            set_user_token_local_storage(json.token);
            callback(json.token);
        }else{
            console.log("error");
            callback(false);
        }
    })

}

export function obtain_user_token(url) {

    var token_url = obtain_user_token_from_url(url);
    var token_local_storage = obtain_user_token_from_local_storage();
    var token;

    if (isObjectEmpty(token_url)) {

        console.log("Token doesn't exist url");

        if (isObjectEmpty(token_local_storage)) {

            console.log("Token doesn't exist local_storage");
            token = false;

        } else {

            console.log("Token exist local_storage");
            token = obtain_user_token_from_local_storage();
        }

    } else {

        console.log("Token exist url");

        set_user_token_local_storage(token_url);

        token = token_url;

    }

    return token;
}

export function obtain_user_email_from_token(token){

    var token_decoded = jwtDecode(token);
    return token_decoded.email;
}

//API Calls

export function dowload_studies_from_api(url,token, callback) {

    var myHeaders = new Headers();


    myHeaders.append("authorization", "Bearer " + token);

    var options = {
        method: 'GET',
        headers:myHeaders,
        mode: 'cors',
    };

    fetch(url, options)
        .then(response => response.json())
        .then(function (json) {
            callback(json);
        })
        .catch((err)=>{
            callback({"error":true});
        })
}

// ----> QUERY RELATED functions
export function obtainStudiesFromQuery(query_input, studies) {

    
        //Input:
        //    query_input: string (either FREE TEXT [e.g. "J"] or special queries with our METALANGUAGE (with "#" and ":",">","<","≥","≤")
        //    patients: database of the patients; projects: database of the projects
        //Output: query_result: ["id_patient_1", ..., "id_patient_n"] --> array with ids of the patients that match the query
    

    var query_result;
    var query_key, query_value;

    if (/[#:><≥≤]+/.test(query_input) === false) { // FREE TEXT (1st possible type of query)

        query_result = _.filter(studies, function (study) {
            return study["patient"].indexOf(query_input) === 0;
        });

    } else { // special queries with our METALANGUAGE (2nd possible type of query)

        var elements_query = query_input.match(/\B#[A-Za-z0-9]+[:><≥≤][A-Za-z0-9\s]+/g); // e.g. ["#project:HCB", "#gender:male"]

        if (elements_query !== null) {

            var queries_results = _.map(elements_query, function (query) {

                // e.g.: query = "#project:HCB"
                var query_components = query.split(/[^A-Za-z0-9]/); // ["", "project", "HCB"], i.e., ["", query_key, query_value]
                query_key = query_components[1];
                query_value = query_components[2];

                query_result = _.filter(studies, function (study) {

                    var studies_item = study[query_key];

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

    return query_result;
}*/

import {
    readXlsxWorkbook,
    convertWorkbookToCSVMap,
    convertCSVMapInJSONMap
} from './../../../modules/rkt_pl_module_file_formats_xlsx';

import {
    manipulate_family_data_to_righ_format,
    set_patients_children
} from './../../../libs/pl_family_tree_data_manager';

import {
    family_insert,
    patient_insert,
    patients_get_list,
    families_get_list
} from './../../../database/database';


function import_families_in_database(worbook_json_map, callback) {

    var counter = 0;

    if ("family" in worbook_json_map) {

        for (var i = 0; i < worbook_json_map["family"].length; i++) {

            family_insert(worbook_json_map["family"][i], function (result) {

                counter++;

                if (counter === worbook_json_map["family"].length) {

                    callback(true);
                }

            });

        }

    }
}

function import_patients_in_database(worbook_json_map, callback) {

    var counter = 0;

    if ("patients" in worbook_json_map) {

        for (var i = 0; i < worbook_json_map["patients"].length; i++) {

            patient_insert(worbook_json_map["patients"][i], function (result) {
                counter++;

                if (counter === worbook_json_map["patients"].length) {

                    callback(true);
                }
            });

        }

    }
}

export function get_data_from_database(callback){

    var data = {}

    patients_get_list(function(result){

        data["patients"] = result;

        families_get_list(function(result){

            data["families"] = result;

            callback(data);

        });

    });

}

export function import_data_to_app(file, callback) {

    readXlsxWorkbook(file, function (result) {

        if (result) {

            var worbook_csv_map = convertWorkbookToCSVMap(result);
            var worbook_json_map = convertCSVMapInJSONMap(worbook_csv_map);
            var worbook_json_map_with_patients = manipulate_family_data_to_righ_format(worbook_json_map);
            var worbook_json_map_with_patients_with_children = set_patients_children(worbook_json_map_with_patients);

            import_families_in_database(worbook_json_map_with_patients_with_children, function (result) {

                import_patients_in_database(worbook_json_map_with_patients_with_children, function (result) {

                    /*get_data_from_database(function(data){

                        callback(data);

                    });*/
                    
                    callback(true);

                });
            });

        } else {
            callback(false);
        }

    });

}