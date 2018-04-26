//database_methods
import {
    family_insert,
    patient_insert,
    patients_get_list,
    families_get_list,
    family_remove,
    patient_remove
} from './../../../database/database';

import patients from './test_patients.json';
//modules
import { isObjectEmpty } from '../../../modules/rkt_module_object';

//actions
import {treeBuilder} from './pl_page_viewer_actions_d3_tree_parser';

export function get_data_from_database(callback){

    var data = {}

    patients_get_list(function(result){

        data["patients"] = result;

        families_get_list(function(result){

            data["families"] = result;

            callback(data);

        });

    });

}

export function get_all_patients_from_family(family_id,patients){

    var array_patients_family = [];

    for(var i=0;i<patients.length;i++){

        var patient = patients[i];

        if("family_id" in patient){

            if(patient.family_id === family_id){

                array_patients_family.push(patient);
            }
        }
    }

    return array_patients_family;
}

//#todo tomorrow :(
export function get_family(family_id){

    if(!isObjectEmpty(family_id)){

        get_data_from_database(function(result){

            if("patients" in result){

                var array_patients_family=get_all_patients_from_family(family_id,result.patients);
                var root_node_tree = treeBuilder(array_patients_family);

                console.log(array_patients_family);
                console.log(root_node_tree);

                
            }

        });

        console.log("********************************************");
        var array_patients_family1=get_all_patients_from_family("2",patients);

        //console.log(patients);
        console.log(array_patients_family1);
        //var root_node_tree = treeBuilder(array_patients_family);
        //console.log(root_node_tree);
    }
}