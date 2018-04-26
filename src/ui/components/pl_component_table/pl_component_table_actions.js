import {isObjectEmpty,isObjectAnArray} from './../../../modules/rkt_module_object';
import {keys,union} from 'underscore';

function get_keys_from_data(data){

    var data_keys = [];

    if(!isObjectEmpty(data)){

        if(isObjectAnArray(data)){

            for(var i=0;i<data.length;i++){

                var item = data[i];
                var item_keys = keys(item);

                data_keys=union(data_keys,item_keys);
            }
        }

        
    }

    return data_keys;

}


export function process_data_to_show_in_table(data){

    var new_data = [];
    var keys_from_data = get_keys_from_data(data);

    for(var i=0;i<data.length;i++){

        var data_item = data[i];
        var new_data_item = {};

        for(var j=0;j<keys_from_data.length;j++){

            var key = keys_from_data[j];

            if(key in data_item){

                new_data_item[key]=data_item[key];

            }else{  

                new_data_item[key] = "";
            }

        }

        new_data.push(new_data_item);
    }

    return new_data;
}