import {isObjectEmpty} from './../../../../../modules/rkt_module_object';


/*****
 *
 * Get couples relation
 * 
*/

function create_sibling(couplesArray){
    
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


export function get_all_siblings_from_tree(database){

    var siblings_array = [];

    for (var i = 0; i < database.length; i++) {

        var patient = database[i];

        if (!isObjectEmpty(patient.father) && !isObjectEmpty(patient.mother)) {

            var couple = [];
            couple.push(patient.father);
            couple.push(patient.mother);
            
            var siblings_object = create_sibling(couple);
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

