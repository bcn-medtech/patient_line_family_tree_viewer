import { isObjectEmpty } from './../../../../modules/rkt_module_object';
import { keys, map } from 'underscore';

export function create_table(patient, data_keys_selected) {

    var data_keys = keys(patient);
    var table = [];

    for (var i = 0; i < data_keys.length; i++) {

        if (data_keys_selected.includes(data_keys[i])) {
            var row = {};
            
            row["key"] = data_keys[i];
            row["value"] = patient[data_keys[i]];
            table.push(row);
        }

    }

    return table;

}

export function update_patient_from_table(patient, edited_table) {

    var patient_keys = keys(patient);
    var edited_table_keys = keys(edited_table);

    var updated_patient = {};

    for (var i = 0; i < patient_keys.length; i++) {

        var patient_key = patient_keys[i];

        if (edited_table_keys.includes(patient_key)) {

            updated_patient[patient_key] = edited_table[patient_key].state.input;

        } else {

            updated_patient[patient_key] = patient[patient_key];

        }

    }

    return updated_patient;

}

export function update_patient_from_text_field_editable(edited_inputs, original_id, patient, children, father, mother){
    
    var new_data;
    
    patient.name = edited_inputs["name"];
    if (edited_inputs["comments"] !== "There are not comments defined yet") patient.comments = edited_inputs["comments"];


    if (original_id === edited_inputs["id"]) {

        patient.id = original_id;
        new_data = patient;

    } else if (original_id !== edited_inputs["id"]) {

        patient.id = edited_inputs["id"];
        new_data = { "patient_to_update": patient };

        // if we change the patient's id, we have to take into account their parents, children and couple info:
        var relatives_to_update = [];
        
        // parents
        if (!isObjectEmpty(father)) {

            var father_children = map(father.children, function(child_id){
               
                if (child_id === original_id) return edited_inputs["id"];
                else return child_id;
                
            });

            
            father.children = father_children;
            relatives_to_update.push(father);

        }

        if (!isObjectEmpty(mother)) {

            var mother_children = map(mother.children, function(child_id){
               
                if (child_id === original_id) return edited_inputs["id"];
                else return child_id;
                
            });
            
            mother.children = mother_children;
            relatives_to_update.push(mother);

        }
        
        // children
        if (!isObjectEmpty(children)) {

            var updated_children = update_children_of_patient(original_id, edited_inputs["id"], children);
            
            map(updated_children, function (child) {
                relatives_to_update.push(child);
            });

        }

        new_data = { "id_patient_to_remove": original_id, "patient_to_update": patient, "relatives_to_update": relatives_to_update };

    }

    return new_data;
    
}

export function update_children_of_patient(old_id_parent, new_id_parent, children) {

    for (var i = 0; i < children.length; i++) {

        var child = children[i];

        if (child.father === old_id_parent) child.father = new_id_parent;
        else if (child.mother === old_id_parent) child.mother = new_id_parent;

    }

    return children;

}
