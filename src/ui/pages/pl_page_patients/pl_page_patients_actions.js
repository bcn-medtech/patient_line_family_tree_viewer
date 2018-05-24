import {
    readXlsxWorkbook,
    convertWorkbookToCSVMap,
    convertCSVMapInJSONMap,
    writeAndExportXlsxWoorkbook
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
import { isObjectEmpty } from '../../../modules/rkt_module_object';

import config from './../../../config/config.json';

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

export function export_data(){

    get_data_from_database(function(data){
        
        writeAndExportXlsxWoorkbook(data);
        
    })

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

export function perform_database_action(data,browserHistory,callback){

    //console.log(data);

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

            }else if(data.action === "export"){

                export_data();

            }else if(data.action === "explore_patient"){                

                if(!isObjectEmpty(data.data)){
                    
                    var family_id = data.data.family_id;
                    var patient_id = data.data.id;

                    var url_to_navigate = '/viewer?family_id='+family_id+'&patient_id='+patient_id;
                    browserHistory.push(url_to_navigate)
                }

            }else if(data.action === "explore_family"){

                if(!isObjectEmpty(data.data)){

                    var family_id = data.data.id;
                    var patient_id;
                    if (data.data.root_patient !== undefined) patient_id = data.data.root_patient.id;
                    else patient_id = undefined;

                    var url_to_navigate = '/viewer?family_id='+family_id+'&patient_id='+patient_id;
                    browserHistory.push(url_to_navigate)
                }

            }
        }
    }

}

export function import_template_xlsx_workbook() {

    // TODO
    var url_template_xlsx_workbook = config.url_template_xlsx_workbook;


}