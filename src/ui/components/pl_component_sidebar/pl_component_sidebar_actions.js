import {
    keys 
} from 'underscore';

export function create_table(patient){
    console.log(patient);

    var data_keys = keys(patient);
    var table = [];

    for(var i=0;i<data_keys.length;i++){

        var row = {};
        row["key"] = data_keys[i];
        row["value"] = patient[data_keys[i]];
        table.push(row);

    }

    return table;

}