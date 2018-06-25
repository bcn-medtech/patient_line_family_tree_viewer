import {
    findWhere,
    extend,
    map
} from 'underscore';

// modules
import { format_date } from '../modules/rkt_module_date';
import { isObjectEmpty } from '../modules/rkt_module_object';

export function manipulate_family_data_to_righ_format(worbook_json_map) {

    var patient_data_tabs = [];

    //Get tabs with clinical data
    for (var key in worbook_json_map) {

        if ((key.toLowerCase() !== "family") && (key.toLowerCase() !== "lists predefined values")) {

            patient_data_tabs.push(key);

        }

    }
    
    //Merge clinical data in one json object
    if (patient_data_tabs.length > 1) {

        worbook_json_map["patients"] = JSON.parse(JSON.stringify(worbook_json_map[patient_data_tabs[0]]));
        var patient_data_first_tab = worbook_json_map["patients"];

        for (var j = 0; j < patient_data_first_tab.length; j++) {

            var patient = patient_data_first_tab[j];
            
            for (var i = 1; i < patient_data_tabs.length; i++) {
                
                var data_to_add_to_patient = findWhere(worbook_json_map[patient_data_tabs[i]], { id: patient.id });
                
                if ("dob" in data_to_add_to_patient) {
                    data_to_add_to_patient["dob"] = format_date(data_to_add_to_patient["dob"]);
                }

                if (data_to_add_to_patient) {

                    extend(patient, data_to_add_to_patient);

                }
            }
        }
    }

    //Format the family data
    var families = worbook_json_map["family"];

    for (var j = 0; j < families.length; j++) {

        // diagnosis
        var family_diagnosis = families[j]["diagnosis"];
        if (!isObjectEmpty(family_diagnosis)) {

            var formatted_diagnosis = family_diagnosis.split(",").slice(0, 2);
            worbook_json_map["family"][j]["diagnosis"] = map(formatted_diagnosis, function (diagnosis) {
                return diagnosis.trim();
            });

        } else {

            worbook_json_map["family"][j]["diagnosis"] = [];

        }

        // mutations
        var family_mutations = families[j]["mutations"];
        if (!isObjectEmpty(family_mutations)) {

            var formatted_mutations = family_mutations.split(",").slice(0, 2);
            worbook_json_map["family"][j]["mutations"] = map(formatted_mutations, function(mutation){
                return mutation.trim();
            });
            
        } else {

            worbook_json_map["family"][j]["mutations"] = [];

        }

    }

    return worbook_json_map;
}

export function set_patients_children(worbook_json_map) {

    if ("patients" in worbook_json_map) {

        for (var i = 0; i < worbook_json_map["patients"].length; i++) {

            var patient = worbook_json_map["patients"][i];
            var patient_father = findWhere(worbook_json_map["patients"], { "id": patient.father });
            var patient_mother = findWhere(worbook_json_map["patients"], { "id": patient.mother });

            if (!isObjectEmpty(patient_father)) {

                if (!("children" in patient_father)) {

                    patient_father["children"] = [];
                    patient_father["children"].push(patient.id);

                } else {

                    patient_father["children"].push(patient.id);

                }

            }

            if (!isObjectEmpty(patient_mother)) {

                if (!("children" in patient_mother)) {

                    patient_mother["children"] = [];
                    patient_mother["children"].push(patient.id);

                } else {

                    patient_mother["children"].push(patient.id);
                }
            }
        }
    }

    return worbook_json_map;
}

