import {
    keys,
} from 'underscore';

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
