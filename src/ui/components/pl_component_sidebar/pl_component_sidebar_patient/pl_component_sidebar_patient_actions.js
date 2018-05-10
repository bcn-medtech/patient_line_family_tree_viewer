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
