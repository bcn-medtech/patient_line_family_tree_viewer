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

import {isObjectEmpty} from './../../../../../modules/rkt_module_object';


/*****
 *
 * Get couples relation
 * 
*/

function create_couple(couplesArray){
    
    var siblingsItem = {};
    var sourceItem = {};
    var targetItem = {};
    sourceItem["id"] = couplesArray[0];
    sourceItem["name"] = "A";
    targetItem["id"] = couplesArray[1];
    targetItem["name"] = "B";
    siblingsItem["source"] = sourceItem;
    siblingsItem["target"] = targetItem;
    return siblingsItem;
}


export function get_all_couples_from_array(database){

    var siblings_array = [];

    for (var i = 0; i < database.length; i++) {

        var patient = database[i];

        if (!isObjectEmpty(patient.father) && !isObjectEmpty(patient.mother)) {

            var couple = [];
            couple.push(patient.father);
            couple.push(patient.mother);
            
            var siblings_object = create_couple(couple);
            var is_duplicated_couple = false;

            for (var j = 0; j < siblings_array.length; j++) {

                var temp_couple = siblings_array[j];

                if (temp_couple.source.id === siblings_object.source.id && temp_couple.target.id === siblings_object.target.id) {
                    is_duplicated_couple = true;
                }

            }

            if (!is_duplicated_couple) {
                siblings_array.push(siblings_object);
            }


        }
    }

    return siblings_array;
}

