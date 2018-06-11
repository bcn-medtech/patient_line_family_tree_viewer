import { isObjectAnArray } from "./../../../../modules/rkt_module_object";

export function update_family_from_text_field_editable(edited_inputs, original_id, family) {

    family.name = edited_inputs["name"];
    family.diagnosis = edited_inputs["diagnosis"];
    family.mutations = edited_inputs["mutations"];

    if (edited_inputs["description"] !== "There is not any descrition defined yet") family.description = edited_inputs["description"];
    if (edited_inputs["symptoms"] !== "There are not any symptoms defined yet") family.symptoms = edited_inputs["symptoms"];

    var new_data;
    if (original_id === edited_inputs["id"]) {

        family.id = original_id;
        new_data = family;

    } else if (original_id !== edited_inputs["id"]) {

        family.id = edited_inputs["id"];
        new_data = { "id_family_to_remove": original_id, "family_to_update": family };
    
    }

    return new_data;

}