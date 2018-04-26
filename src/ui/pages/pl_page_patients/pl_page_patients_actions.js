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
    families_get_list,
    family_remove,
    patient_remove
} from './../../../database/database';
import { isObjectEmpty } from '../../../modules/rkt_module_object';


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
                    
                    callback(true);

                });
            });

        } else {
            callback(false);
        }

    });

}

//This method creates the structure needed to import data in the databa
export function create_database_structure_from_form_json(form_json){

    var database_json={};

    for(var i = 0;i<form_json.length;i++){

        var key = form_json[i]["key"];
        var value = form_json[i]["value"];
        database_json[key]=value;

    }

    return database_json;
}

export function perform_database_action(data,callback){

    console.log(data);

    if(!isObjectEmpty(data)){

        if("action" in data){

            if(data.action === "add_patient"){

                if("data" in data){

                    var form = data.data;

                    if("form" in form){

                        var patient = create_database_structure_from_form_json(form.form);

                        patient_insert(patient, function (result) {

                            if(result){

                                callback(true);
                            }

                        });
                    }
                }


            }else if(data.action === "add_family"){

                if("data" in data){

                    var form = data.data;

                    if("form" in form){

                        var family = create_database_structure_from_form_json(form.form);

                        family_insert(family, function (result) {

                            if(result){

                                callback(true);
                            }

                        });
                    }
                }

            }else if (data.action === "remove_patient"){

                console.log("remove_patient");

                if("data" in data){

                    if("id" in data.data){

                        patient_remove(data.data.id,function(result){

                            callback(true);
                        })
                    }
                }



            }else if (data.action === "remove_family"){


                if("data" in data){

                    if("id" in data.data){

                        family_remove(data.data.id,function(result){

                            callback(true);
                        })
                    }
                }

            }
        }
    }

}