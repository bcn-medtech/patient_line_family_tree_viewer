import { isObjectEmpty } from './../../../modules/rkt_module_object';
import { 
    filter,
    flatten,
    difference
 } from 'underscore';


function get_patient_relatives(patient,patients){

    var patient_relatives = [];
    var patient_parents = get_patient_parents(patient, patients);
    var patient_children = get_patient_children_by_id_father_or_mother(patient.id,patients);
    patient_relatives.push(patient_parents);
    patient_relatives.push(patient_children);
    patient_relatives = flatten(patient_relatives);
    return patient_relatives;
}

function get_patient_parents(patient, relatives) {

    var patient_parents = [];

    if (!isObjectEmpty(patient) && !isObjectEmpty(relatives)) {

        if (!isObjectEmpty(patient.father) && !(isObjectEmpty(patient.mother))) {

            for (var i = 0; i < relatives.length; i++) {

                var current_relative = relatives[i];

                if (patient.father === current_relative.id) {

                    patient_parents.push(current_relative);

                } else if (patient.mother === current_relative.id) {

                    patient_parents.push(current_relative);
                }
            }
        }
    }

    return patient_parents;

}



function get_patient_couple_ids(patient, relatives) {

    var patient_couples_ids = [];

    for (var i = 0; i < relatives.length; i++) {

        var current_relative = relatives[i];

        if (current_relative.father === patient.id) {

            if (!isObjectEmpty(current_relative.mother)) {

                patient_couples_ids.push(current_relative.mother);

            }

        } else if (current_relative.mother === patient.id) {

            if (!isObjectEmpty(current_relative.father)) {

                patient_couples_ids.push(current_relative.father);
                
            }

        }

    }

    return patient_couples_ids;
}

function get_patient_children(father_id, mother_id, relatives) {

    var children = [];

    if (!isObjectEmpty(father_id) && !isObjectEmpty(mother_id)) {

        for (var i = 0; i < relatives.length; i++) {

            var current_relative = relatives[i];

            if (current_relative.father === father_id && current_relative.mother === mother_id) {

                children.push(current_relative);
            }
        }

    }

    return children;
}

function get_patient_children_by_id_father_or_mother(father_mother_id,relatives){

    var children = [];

    if (!isObjectEmpty(father_mother_id) && !isObjectEmpty(relatives)) {

        for (var i = 0; i < relatives.length; i++) {

            var current_relative = relatives[i];

            if (current_relative.father === father_mother_id || current_relative.mother === father_mother_id) {

                children.push(current_relative);
            }
        }

    }

    return children;
}

function get_patient_uncles(patient,relatives){

    var patient_uncles = [];
    var parents = get_patient_parents(patient,relatives);

    if(!isObjectEmpty(parents)){

        for(var i=0;i<parents.length;i++){

            var parent = parents[i];
            var parent_brothers = get_patient_brothers(parent,relatives);
            
            if(!isObjectEmpty(parent_brothers)){

                patient_uncles.push(parent_brothers);

            }

        }

    }

    patient_uncles = flatten(patient_uncles);

    return patient_uncles;

}

function get_patient_grand_children(patient,relatives){

    var patient_grand_children=[];
    var children = get_patient_children_by_id_father_or_mother(patient.id,relatives);

    if(!isObjectEmpty(children)){

        for(var i=0;i<children.length;i++){

            var current_child = children[i];
            var current_child_children = get_patient_children_by_id_father_or_mother(current_child.id,relatives);

            if(!isObjectEmpty(current_child_children)){
                patient_grand_children.push(current_child_children);
                
            }
        }
    }

    patient_grand_children=flatten(patient_grand_children);
    return patient_grand_children;
}

function get_patient_brothers(patient, relatives) {

    var patient_brothers = [];

    if (!isObjectEmpty(patient) && !isObjectEmpty(relatives)) {

        var parents_patient_children = get_patient_children(patient.father, patient.mother, relatives);

        if (parents_patient_children.length !== 0) {

            patient_brothers = filter(parents_patient_children, function (item) {

                if (item.id !== patient.id) {
                    return true;
                }

            });

        }

    }

    return patient_brothers;
}


export function is_patient_father(patient, current_relative) {

    if (patient.father === current_relative.id) {
        return true;
    } else {
        return false;
    }
}

export function is_patient_mother(patient, current_relative) {

    if (patient.mother === current_relative.id) {
        return true;
    } else {
        return false;
    }
}

export function is_patient_brothers(patient, current_relative, relatives) {

    var is_patient_brother = false;
    var patient_brothers = get_patient_brothers(patient, relatives);

    if (!isObjectEmpty(patient_brothers)) {

        for (var i = 0; i < patient_brothers.length; i++) {

            var patient_brother = patient_brothers[i];

            if (patient_brother.id === current_relative.id) {


                is_patient_brother = true;
            }
        }

    }

    return is_patient_brother;
}

export function is_patient_grand_parents(patient, current_relative, relatives) {

    var is_patient_grand_parent = false;

    var patient_parents = get_patient_parents(patient, relatives);

    if (!isObjectEmpty(patient_parents)) {

        for (var i = 0; i < patient_parents.length; i++) {

            var patient_parent = patient_parents[i];
            var patient_parent_parents = get_patient_parents(patient_parent, relatives);

            if (!isObjectEmpty(patient_parent_parents)) {

                for (var j = 0; j < patient_parent_parents.length; j++) {

                    var patient_parent_parent = patient_parent_parents[j];

                    if (current_relative.id === patient_parent_parent.id) {

                        is_patient_grand_parent = true;
                    }
                }
            }

        }
    }

    return is_patient_grand_parent;

}

export function is_patient_children(patient, current_relative) {

    var is_patient_child = false;

    if (current_relative.father === patient.id || current_relative.mother === patient.id) {

        is_patient_child = true;
    }

    return is_patient_child;
}

export function is_patient_couples(patient, current_relative, relatives) {

    var is_patient_couple = false;

    var patient_couples_ids = get_patient_couple_ids(patient,relatives);

    if(!isObjectEmpty(patient_couples_ids)){

        for(var i=0;i<patient_couples_ids.length;i++){

            var patient_couple_id = patient_couples_ids[i];

            if(patient_couple_id === current_relative.id){
                
                is_patient_couple=true;

            }
        }
    }

    return is_patient_couple;

}

export function is_patient_grand_children(patient,current_relative,relatives){

    var is_patient_grand_child = false;

    var patient_grand_children = get_patient_grand_children(patient,relatives);

    for(var i=0;i<patient_grand_children.length;i++){

        var patient_grand_child = patient_grand_children[i];

        if(current_relative.id === patient_grand_child.id){

            is_patient_grand_child = true;
        }
    }

    return is_patient_grand_child;

}

export function is_patient_uncle(patient,current_relative,relatives){

    var is_patient_uncle = false;

    var patient_uncles = get_patient_uncles(patient,relatives);

    for(var i=0;i<patient_uncles.length;i++){

        var patient_uncle = patient_uncles[i];

        if(patient_uncle.id === current_relative.id ){
            
            is_patient_uncle= true;

        }
    }

    return is_patient_uncle;
}

export function label_patient_relatives(patient, relatives) {

    for (var i = 0; i < relatives.length; i++) {

        var current_relative = relatives[i];

        if(patient.id === current_relative.id){

            current_relative["relation"] = "current patient";

        }else if (is_patient_father(patient, current_relative)) {

            current_relative["relation"] = "father";

        } else if (is_patient_mother(patient, current_relative)) {

            current_relative["relation"] = "mother";

        } else if (is_patient_brothers(patient, current_relative, relatives)) {

            current_relative["relation"] = "sibling";

        } else if (is_patient_grand_parents(patient, current_relative, relatives)) {

            current_relative["relation"] = "grand parent";

        } else if (is_patient_children(patient, current_relative, relatives)) {

            current_relative["relation"] = "child";

        } else if (is_patient_couples(patient, current_relative, relatives)) {

            current_relative["relation"] = "couple";

        } else if(is_patient_grand_children(patient,current_relative,relatives)){

            current_relative["relation"] = "grand child";
        
        } else if(is_patient_uncle(patient,current_relative,relatives)){

            current_relative["relation"] = "uncle";

        }else {

            current_relative["relation"] = "other";
        }
    }
}

function get_all_patients_from_a_family_given_specific_patient(patient,patients,array_patients_to_explore,family){

    if(isObjectEmpty(family) && isObjectEmpty(array_patients_to_explore)){

        family.push(patient);
        array_patients_to_explore = get_patient_relatives(patient,patients);

        get_all_patients_from_a_family_given_specific_patient(array_patients_to_explore[0],patients,array_patients_to_explore,family);
        
    }else{

        if(!isObjectEmpty(array_patients_to_explore)){
            
            family.push(patient);
            array_patients_to_explore.push(get_patient_relatives(patient,patients));
            array_patients_to_explore = flatten(array_patients_to_explore);
            array_patients_to_explore = difference(array_patients_to_explore,family);
            get_all_patients_from_a_family_given_specific_patient(array_patients_to_explore[0],patients,array_patients_to_explore,family);

        }
    }
}

export function get_family_by_patient(patient,database){

    var array_patients_to_explore = [];
    var array_family = [];
    get_all_patients_from_a_family_given_specific_patient(patient,database,array_patients_to_explore,array_family);
    return array_family;
}
