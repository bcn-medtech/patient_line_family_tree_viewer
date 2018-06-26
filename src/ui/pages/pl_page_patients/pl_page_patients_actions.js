/*
# Patient line family tree viewer is (c) BCNMedTech, UNIVERSITAT POMPEU FABRA
#
# Patient line family tree viewer is free software: you can redistribute it and/or modify
# it under the terms of the GNU Affero General Public License as
# published by the Free Software Foundation, either version 3 of the
# License, or (at your option) any later version.
#
# Patient line family tree viewer is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU Affero General Public License for more details.
#
# You should have received a copy of the GNU Affero General Public License
# along with this program.  If not, see <http://www.gnu.org/licenses/>.
#
# Authors:
# Carlos Yagüe Méndez
# Paula Bassagañas
# Paula Bassagañas
# Contributors: 
# Begoña Benito
# Bart Bijnens
# Oscar Camara
*/

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
import { format_date } from '../../../modules/rkt_module_date';
import { readSpreadsheetFromDrive, writeAndExportXlsxWorkbookToDrive } from '../../../modules/rkt_module_google_sheet_api';
import { isObjectAnArray, isObjectEmpty } from '../../../modules/rkt_module_object';
import { create_random_string } from './../../../modules/rkt_module_string';

import { map, omit, pick, keys, values } from "underscore";

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

function import_patients_in_database(workbook_json_map, callback) {

    var counter = 0;

    if ("patients" in workbook_json_map) {

        for (var i = 0; i < workbook_json_map["patients"].length; i++) {

            patient_insert(workbook_json_map["patients"][i], function (result) {
                counter++;

                if (counter === workbook_json_map["patients"].length) {

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

            var workbook_csv_map = convertWorkbookToCSVMap(result);
            var workbook_json_map = convertCSVMapInJSONMap(workbook_csv_map);
            var workbook_json_map_with_patients = manipulate_family_data_to_righ_format(workbook_json_map);
            var workbook_json_map_with_patients_with_children = set_patients_children(workbook_json_map_with_patients);

            import_families_in_database(workbook_json_map_with_patients_with_children, function (result) {

                import_patients_in_database(workbook_json_map_with_patients_with_children, function (result) {

                    callback(true);

                });
            });

        } else {
            callback(false);
        }

    });

}

export function export_data(callback) {

    get_data_from_database(function (data) {

        var data_to_export = { "Family": [], "general": [], "clinical values": [] };

        data_to_export["Family"] = map(data["families"], function (family) {

            if ("diagnosis" in family && isObjectAnArray(family["diagnosis"])) {
                family["diagnosis"] = family["diagnosis"].join();
            }

            if ("mutations" in family && isObjectAnArray(family["mutations"])) {
                family["mutations"] = family["mutations"].join();
            }

            return omit(family, "num_family_members");
        });

        map(data["patients"], function (patient) {

            if ("dob" in patient) patient["dob"] = format_date(patient["dob"]);

            data_to_export["general"].push(pick(patient, "id", "name", "gender", "father", "mother", "family_id", "center"));
            data_to_export["clinical values"].push(pick(patient, "id", "nhc", "dob", "mutations", "symptoms", "phenotype", "genotype", "diagnosis_status", "diagnosis", "probando", "comments"));

        });
        
        writeAndExportXlsxWoorkbook(data_to_export, { "name": "pl_viewer_family_tree_database" });
        
        // GOOGLE SHEETS API

        // the user must have log in in their Google Account
        var isUserSignedIn = window.gapi.auth2.getAuthInstance().isSignedIn.get();

        if (!isUserSignedIn) {

            alert("Sign in your Google Account to export the data to your Drive");

        } else {

            // EXPORT DATABASE TO GOOGLE SPREADSHEET
            var today = new Date();
            var title = "PL Viewer Family Tree DB - " + today.toDateString();
            writeAndExportXlsxWorkbookToDrive(data_to_export, title);

            // IMPORT GOOGLE SPREADSHEET INTO DATABASE
            // clear_database(function (result) {

            //     if (result) {

            //         var id_spreadsheet = "1KU3TmH8Be9ePlOsQBwqloQy4YGF28p7cgKHWNhWCy4Y";
                    
            //         readSpreadsheetFromDrive(id_spreadsheet, function (exported_data) {

            //             var workbook_json_map = [];
            //             var names_sheets = keys(exported_data);

            //             for (var i = 0; i < names_sheets.length; i++) {

            //                 var name = names_sheets[i];
            //                 workbook_json_map[name.toLowerCase()] = exported_data[name];

            //             }

            //             console.log(workbook_json_map);
                        
            //             // var workbook_json_map_with_patients = manipulate_family_data_to_righ_format(workbook_json_map);
            //             // var workbook_json_map_with_patients_with_children = set_patients_children(workbook_json_map_with_patients);

            //             // import_families_in_database(workbook_json_map_with_patients_with_children, function (result) {

            //             //     import_patients_in_database(workbook_json_map_with_patients_with_children, function (result) {

            //                      callback(true);

            //             //     });
            //             // });

            //         });
            //     }
            // });
        }

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

                export_data(function (result) {
                    //console.log(result);
                });

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

    // and the third patient is the family's child
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