import {isObjectEmpty} from './../../../modules/rkt_module_object';

function get_number_of_family_members(family,patients){
    
    var num_family_members = 0;

    if("id" in family){

        if(!isObjectEmpty(family.id)){
            
            for(var i=0;i<patients.length;i++){

                var patient_to_compare = patients[i];

                if("family_id" in patient_to_compare){

                    if(!isObjectEmpty(patient_to_compare.family_id)){

                        if(family.id === patient_to_compare.family_id){

                            num_family_members++;

                        }
                    }
                }
            }
        }
    }

    return num_family_members;

}

function get_number_of_relatives(patient,patients){

    var num_relatives = 0;

    if("family_id" in patient){

        if(!isObjectEmpty(patient.family_id)){
            
            for(var i=0;i<patients.length;i++){

                var patient_to_compare = patients[i];

                if("family_id" in patient_to_compare){

                    if(!isObjectEmpty(patient_to_compare.family_id)){

                        if(patient.family_id === patient_to_compare.family_id){

                            num_relatives++;

                        }
                    }
                }
            }
        }
    }

    return num_relatives;
}


export function get_patients(patients){
    
    for(var i=0;i<patients.length;i++){

        var patient = patients[i];
        patient["num_relatives"] = get_number_of_relatives(patient,patients);
    }

    return patients;
}

export function get_families(patients,families){

    for(var i=0;i<families.length;i++){

        var family = families[i];
        family["num_family_members"] = get_number_of_family_members(family,patients);
    }

    return families;

}