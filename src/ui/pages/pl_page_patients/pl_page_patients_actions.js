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
    families_get_list,
    clear_database
} from './../../../database/database';

import { initialize_family, initialize_patient } from './../../../modules/rkt_module_database';
import { create_random_string } from './../../../modules/rkt_module_string';
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

export function get_data_from_database(callback) {

    var data = {}

    patients_get_list(function (result) {

        data["patients"] = result;

        families_get_list(function (result) {

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

export function export_data() {

    get_data_from_database(function (data) {

        writeAndExportXlsxWoorkbook(data);

    })

}

//This method creates the structure needed to import data in the database
export function create_database_structure_from_form_json(form_json) {

    var database_json = {};

    for (var i = 0; i < form_json.length; i++) {

        var key = form_json[i]["key"];
        var value = form_json[i]["value"];
        database_json[key] = value;

    }

    return database_json;
}

export function perform_database_action(data, browserHistory, callback) {

    if (!isObjectEmpty(data)) {

        if ("action" in data) {

            if (data.action === "add_family") {

                var new_data = create_random_family();

                var family_to_insert = new_data.family_to_insert;
                var patients_to_insert = new_data.patients_to_insert;

                family_insert(family_to_insert, function (result) {

                    if (result) {

                        patients_insert(patients_to_insert, function (result) {

                            if (result) {
                                callback(true);
                            }
                        })


                    }

                });

            } else if (data.action === "export") {

                export_data();

            } else if (data.action === "delete_database") {

                clear_database(function (result) {

                    if (result) {

                        callback(true);

                    }

                });

            } else if (data.action === "explore_patient") {

                var url_to_navigate;
                var family_id, patient_id;

                if (!isObjectEmpty(data.data)) {

                    family_id = data.data.family_id;
                    patient_id = data.data.id;

                    url_to_navigate = '/viewer?family_id=' + family_id + '&patient_id=' + patient_id;
                    browserHistory.push(url_to_navigate)
                }

            } else if (data.action === "explore_family") {

                if (!isObjectEmpty(data.data)) {

                    family_id = data.data.id;
                    if (data.data.root_patient !== undefined) patient_id = data.data.root_patient.id;
                    else patient_id = undefined;

                     url_to_navigate = '/viewer?family_id=' + family_id + '&patient_id=' + patient_id;
                    browserHistory.push(url_to_navigate)
                }

            }
        }
    }

}

function create_random_family() {

    var length_random_string = 9;

    var new_family = initialize_family();
    new_family.id = "id_" + create_random_string(length_random_string);
    new_family.name = "name_" + create_random_string(length_random_string);

    // new family = new father + new mother female + new_child 
    var genders = ["male", "female", ""];
    var ids_patients_to_insert = [];
    var patients_to_insert = [];
    var new_patient;
    for (var i = 0; i < genders.length; i++) {

        new_patient = initialize_patient();
        new_patient.gender = genders[i];

        var new_id = "id_" + create_random_string(length_random_string);
        ids_patients_to_insert.push(new_id);
        new_patient.id = new_id

        new_patient.name = "name_" + create_random_string(length_random_string);
        new_patient.family_id = new_family.id;

        patients_to_insert.push(new_patient); // patients_to_insert = [father, mother, child]

    }

    // and the two first patients are couple
    patients_to_insert[0].married_with = ids_patients_to_insert[1];
    patients_to_insert[1].married_with = ids_patients_to_insert[0];

    // and the third one is the family's child
    // parents
    patients_to_insert[0].children = [ids_patients_to_insert[2]];
    patients_to_insert[1].children = [ids_patients_to_insert[2]];
    // child
    patients_to_insert[2].father = ids_patients_to_insert[0];
    patients_to_insert[2].mother = ids_patients_to_insert[1];

    return { "family_to_insert": new_family, "patients_to_insert": patients_to_insert };

}

function patients_insert(patients, callback) {

    var inserted_patients_counter = 0;

    for (var i = 0; i < patients.length; i++) {

        var patient = patients[i];

        patient_insert(patient, function (result) {

            if (result) {

                inserted_patients_counter++;

                if (inserted_patients_counter === patients.length) {

                    callback(true);

                }

            }

        });
    }

}