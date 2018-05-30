import { isObjectEmpty } from "../../../../../modules/rkt_module_object";

import {
    findIndex,
    where
} from "underscore";


function find_patients_duplicated_in_array(patients){

    var patients_duplicated = [];
    var patient;

     //find patients duplicated
     for (var i = 0; i < patients.length; i++) {

        patient = patients[i];

        if (patient.id !== "-2") {

            if (findIndex(patients_duplicated, { id: patient.id }) === -1) {

                if (where(patients, { id: patient.id }).length === 2) {

                    patients_duplicated.push(patient);

                }
            }
        }
    }

    return patients_duplicated;
}

function find_patients_no_duplicated_in_array(patients_duplicated,patients){

    var patients_no_duplicated = [];
    var patient;

     //find patients no duplicated
     for (var i = 0; i < patients.length; i++) {

        patient = patients[i];

        if (patient.id !== "-2") {

            if (findIndex(patients_duplicated, { id: patient.id }) === -1) {

                patients_no_duplicated.push(patient);

            }
        }

    }

    return patients_no_duplicated;
}

function find_patients_relations_in_array(patients){

    var patients_relations = [];
    var relation;

    for (var i = 0; i < patients.length; i++) {

        var element = patients[i];
        var relation = {};

        if (element.id === "-2") {

            relation["element_1"] = patients[i - 1];
            relation["couple"] = element;
            relation["element_2"] = patients[i + 1];

            patients_relations.push(relation);
        }
    }

    return patients_relations;
}

function find_indexes_of_relation_of_given_patient(patient,relations){

    var indexes_relations_array=[];

    for(var i=0;i<relations.length;i++){

        var relation = relations[i];

        if(relation.element_1.id === patient.id || relation.element_2.id === patient.id){

            indexes_relations_array.push(i);

        }
    }

    return indexes_relations_array;
}

function create_array_from_relations(current_patient,current_relation,array_relations,organized_array){

    var future_patient_to_explore;

    if(current_patient.id === current_relation.element_1.id){

        //console.log(organized_array);
        if(findIndex(organized_array, { id: current_relation.element_1.id }) === -1){

            //console.log(current_relation.element_1.id);
            organized_array.push(current_relation.element_1);
        }
        
        organized_array.push(current_relation.couple)
        organized_array.push(current_relation.element_2);

        future_patient_to_explore = current_relation.element_2;

    }else{

        if(findIndex(organized_array, { id: current_relation.element_2.id }) === -1){

            organized_array.push(current_relation.element_2);
        }

        organized_array.push(current_relation.couple)
        organized_array.push(current_relation.element_1);

        future_patient_to_explore = current_relation.element_1;
    }

    if(!isObjectEmpty(future_patient_to_explore)){

        var relation_indexes = find_indexes_of_relation_of_given_patient(future_patient_to_explore,array_relations);
        
        if(relation_indexes.length === 2){

            var relation_1 = array_relations[relation_indexes[0]];
            var relation_2 = array_relations[relation_indexes[1]];
            var relation;

            if(current_relation.element_1.id === relation_1.element_1.id && current_relation.element_2.id === relation_1.element_2.id){
                relation = relation_2;
            }else{
                relation = relation_1;
            }

            create_array_from_relations(future_patient_to_explore,relation,array_relations,organized_array);
        }
    }
}

function create_array_organized_by_couples(patients_no_duplicated,patients_relations){

    var organized_array = [];

    for(var i=0;i<patients_no_duplicated.length;i++){

        var patient_no_duplicated = patients_no_duplicated[i];
        var relation_indexes = find_indexes_of_relation_of_given_patient(patient_no_duplicated,patients_relations);


        if(!isObjectEmpty(relation_indexes)){

            if(findIndex(organized_array, { id: patient_no_duplicated.id }) === -1){
                
                var relation = patients_relations[relation_indexes[0]];
                create_array_from_relations(patient_no_duplicated,relation,patients_relations,organized_array);
            }
            
        }

    }

    return organized_array;

    
}

export function order_patients_by_couple(patients) {

    //Check the patients that are duplicated if they are duplicated we should organnize the couples
    var patients_duplicated = find_patients_duplicated_in_array(patients);
    var patients_no_duplicated = find_patients_no_duplicated_in_array(patients_duplicated,patients);
    var patients_relations = find_patients_relations_in_array(patients);
    var organized_array = create_array_organized_by_couples(patients_no_duplicated,patients_relations);
    return organized_array;
    
}