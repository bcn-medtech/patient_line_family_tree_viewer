/*
# Patient line family tree viewer is (c) BCNMedTech, UNIVERSITAT POMPEU FABRA
#
# Patient line family tree viewer is free software: you can redistribute it and/or modify
# it under the terms of the GNU Affero General Public License as
# published by the Free Software Foundation, either version 3 of the
# License, or (at your option) any later version.
#
# Patient line family tree viewer is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU Affero General Public License for more details.
#
# You should have received a copy of the GNU Affero General Public License
# along with this program.  If not, see <http://www.gnu.org/licenses/>.
#
# Authors:
# Carlos Yagüe Méndez
# Paula Bassagañas
# Paula Bassagañas
# Contributors: 
# Begoña Benito
# Bart Bijnens
# Oscar Camara
*/

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