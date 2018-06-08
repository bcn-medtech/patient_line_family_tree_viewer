
export function update_family_from_text_field_editable(edited_name, edited_id, original_id, edited_description, edited_symptoms, edited_diagnosis, edited_genes, edited_mutations, family) {

    var new_data;
    family.name = edited_name;

    if (edited_description !== "Description") family.description = edited_description;
    if (edited_symptoms !== "Symptoms") family.symptoms = edited_symptoms;
    if (edited_diagnosis !== "There are not diagnosis defined yet") family.diagnosis = edited_diagnosis;
    if (edited_genes !== "There are not genes defined yet") family.genes = edited_genes;
    if (edited_mutations !== "There are not mutations defined yet") family.mutations = edited_mutations;

    if (original_id === edited_id) {

        family.id = original_id;
        new_data = family;

    } else if (original_id !== edited_id) {

        family.id = edited_id;
        new_data = { "id_family_to_remove": original_id, "family_to_update": family };
    
    }

    return new_data;

}