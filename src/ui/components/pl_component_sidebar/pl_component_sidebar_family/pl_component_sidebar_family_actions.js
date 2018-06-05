
export function update_family_from_text_field_editable(edited_name, edited_id, original_id, edited_description, edited_symptoms, edited_diagnostic, family) {

    var new_data;
    family.name = edited_name;

    if (edited_description !== "Description") family.description = edited_description;
    if (edited_symptoms !== "Symptoms") family.symptoms = edited_symptoms;
    if (edited_diagnostic !== "Diagnostic") family.diagnostic = edited_diagnostic;

    if (original_id === edited_id) {

        family.id = original_id;
        new_data = family;

    } else if (original_id !== edited_id) {

        family.id = edited_id;
        new_data = { "id_family_to_remove": original_id, "family_to_update": family };
    
    }

    return new_data;

}