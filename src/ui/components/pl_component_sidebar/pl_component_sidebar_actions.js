import {
    keys,
    pluck,
    findWhere
} from 'underscore';

export function create_table(patient, data_keys_selected) {
    console.log(patient);

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

export function create_list_vertical(patient, data_keys_selected) {
    console.log(patient);

    var data_keys = keys(patient);
    var table = [];

    for (var i = 0; i < data_keys.length; i++) {

        if (data_keys_selected.includes(data_keys[i])) {
            var row = {};
            row["name"] = data_keys[i];
            row["value"] = patient[data_keys[i]];
            table.push(row);
        }

    }

    return table;

}

export function update_patient(patient, updated_table) {

    var data_keys = keys(patient);
    var updated_table_keys = pluck(updated_table, 'name');

    var updated_patient = {};

    for (var i = 0; i < data_keys.length; i++) {

        if (updated_table_keys.includes(data_keys[i])) {

            updated_patient[data_keys[i]] = findWhere(updated_table, { 'name': data_keys[i] }).value;

        } else {

            updated_patient[data_keys[i]] = patient[data_keys[i]];

        }

    }

    return updated_patient;

}