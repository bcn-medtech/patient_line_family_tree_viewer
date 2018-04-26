import {isObjectEmpty,isObjectAnArray} from './../../../../modules/rkt_module_object';
import {keys,union} from 'underscore';

export function get_keys_from_data(data){

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
