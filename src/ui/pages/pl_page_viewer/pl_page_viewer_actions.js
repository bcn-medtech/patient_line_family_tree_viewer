/*
# Rocket viewer is (c) BCNMedTech, UNIVERSITAT POMPEU FABRA
#
# Rocket viewer is free software: you can redistribute it and/or modify
# it under the terms of the GNU Affero General Public License as
# published by the Free Software Foundation, either version 3 of the
# License, or (at your option) any later version.
#
# Rocket viewer is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU Affero General Public License for more details.
#
# You should have received a copy of the GNU Affero General Public License
# along with this program.  If not, see <http://www.gnu.org/licenses/>.
#
# Authors:
# Carlos Yagüe Méndez
# María del Pilar García
# Daniele Pezzatini
# Contributors: 
# Sergio Sánchez Martínez
*/

//database_methods
import {
    family_insert,
    patient_insert,
    patient_update,
    patients_get_list,
    families_get_list,
    family_remove,
    patient_remove,
    patient_get,
    family_get
} from './../../../database/database';

import patients from './test_patients.json';

//modules
import { isObjectEmpty, isObjectAnArray } from '../../../modules/rkt_module_object';

//actions
import {
    treeBuilder,
    siblingsBuilder
} from './pl_page_viewer_actions_d3_tree_parser';

import {
    get_patients_processed
} from './pl_page_viewer_actions_data_analysis';

import {findWhere} from 'underscore';


export function get_data_from_database(callback) {

    var data = {}

    patients_get_list(function (result) {

        data["patients"] = result;

        families_get_list(function (result) {

            data["families"] = result;

            callback(data);

        });

    });

}

export function get_all_patients_from_family(family_id, patients) {

    var array_patients_family = [];

    for (var i = 0; i < patients.length; i++) {

        var patient = patients[i];

        if ("family_id" in patient) {

            if (patient.family_id === family_id) {

                array_patients_family.push(patient);
            }
        }
    }

    return array_patients_family;
}

export function get_family(family_id, callback) {

    family_get(family_id, function (result) {
        callback(result);
    });

}

export function get_patient(patient_id, callback) {
    patient_get(patient_id, function (result) {
        callback(result);
    })
}

export function get_data(family_id, patient_id, callback) {

    if (!isObjectEmpty(family_id)) {

        get_data_from_database(function (result) {

            if ("patients" in result) {

                var array_patients_family = get_all_patients_from_family(family_id, result.patients);
                var root = treeBuilder(array_patients_family);
                var siblings = siblingsBuilder(array_patients_family);
                var patients = get_patients_processed(result.patients);
                
                get_family(family_id, function (family) {
                    
                    if (isObjectAnArray(family)) {

                        if (family.length > 0) {

                            var data = {};
                            data["root"] = root;
                            data["siblings"] = siblings;
                            data["family"] = family[0];

                            if (!isObjectEmpty(patient_id)) {
                                
                                var patient = findWhere(patients,{id:patient_id});
                                
                                if(!isObjectEmpty(patient)){
                                    data["patient"]=patient;
                                    callback(data);
                                }else{
                                    console.log("error");
                                }

                            }else{
                                
                                callback(data);
                            }

                        } else {

                            console.log("error");
                        }

                    } else {
                        console.log("error");
                    }

                });



            }

        });

        //console.log("********************************************");
        //var array_patients_family1=get_all_patients_from_family("2",patients);
        //console.log(patients);
        //console.log(array_patients_family1);
        //var root_node_tree = treeBuilder(array_patients_family);
        //console.log(root_node_tree);
    }
}

export function perform_database_action(data,callback){

    if(!isObjectEmpty(data)){

        if("action" in data){

            if(data.action === "edit"){

                if("data" in data){

                    var patient = data.data;

                    patient_update(patient, function (result) {

                        if(result){
                
                            callback(true);
                        }
                
                    });
                }

            }
        }
    }

}