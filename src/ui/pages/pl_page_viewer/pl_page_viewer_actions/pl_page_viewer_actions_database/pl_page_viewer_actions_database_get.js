//database_methods
import {
    family_get,
    families_get_list,
    patient_get,
    patients_get_list
} from './../../../../../database/database';

import {
    filter,
    flatten,
    difference,
    findWhere,
    pluck,
    countBy,
    keys,
    where
} from 'underscore';

import { isObjectEmpty } from './../../../../../modules/rkt_module_object';

/*

Functions:
1) get_patient_relatives
2) get_patient_parents
3) get_patient_couple_ids
4) get_patient_children
5) get_patient_children_by_id_father_or_mother
6) get_patient_uncles
7) get_patient_grand_children
8) get_patient_brothers
9) get_family_by_id
10) get_patient_by_id
11) get_all_patients_from_family
12) get_all_patients_and_all_families
13) is_patient_father
14) is_patient_mother
15) is_patient_brothers
16) is_patient_grand_parents
17) is_patient_children
18) is_patient_couples
19) is_patient_grand_children
20) is_patient_uncle
21) label_patient_relatives
22) get_all_patients_from_a_family_given_specific_patient
23) get_family_by_patient
24) get_number_of_family_members
25) get_number_of_relatives
26) get_patients_processed
27) get_family_processed
28) order_family_by_ids
29) get_family_statistics
*/

function get_patient_relatives(patient, patients) {

    var patient_relatives = [];
    var patient_parents = get_patient_parents(patient, patients);
    var patient_children = get_patient_children_by_id_father_or_mother(patient.id, patients);
    patient_relatives.push(patient_parents);
    patient_relatives.push(patient_children);
    patient_relatives = flatten(patient_relatives);
    return patient_relatives;
}

export function get_patient_parents(patient, relatives) {

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



export function get_patient_couple_ids(patient, relatives) {

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

export function get_patient_children(father_id, mother_id, relatives) {

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

export function get_patient_children_by_id_father_or_mother(father_mother_id, relatives) {

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

export function get_patient_uncles(patient, relatives) {

    var patient_uncles = [];
    var parents = get_patient_parents(patient, relatives);

    if (!isObjectEmpty(parents)) {

        for (var i = 0; i < parents.length; i++) {

            var parent = parents[i];
            var parent_brothers = get_patient_brothers(parent, relatives);

            if (!isObjectEmpty(parent_brothers)) {

                patient_uncles.push(parent_brothers);

            }

        }

    }

    patient_uncles = flatten(patient_uncles);

    return patient_uncles;

}

export function get_patient_grand_children(patient, relatives) {

    var patient_grand_children = [];
    var children = get_patient_children_by_id_father_or_mother(patient.id, relatives);

    if (!isObjectEmpty(children)) {

        for (var i = 0; i < children.length; i++) {

            var current_child = children[i];
            var current_child_children = get_patient_children_by_id_father_or_mother(current_child.id, relatives);

            if (!isObjectEmpty(current_child_children)) {
                patient_grand_children.push(current_child_children);

            }
        }
    }

    patient_grand_children = flatten(patient_grand_children);
    return patient_grand_children;
}

export function get_patient_brothers(patient, relatives) {

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

export function get_family_by_id(family_id, callback) {

    family_get(family_id, function (result) {
        callback(result);
    });

}

export function get_patient_by_id(patient_id, callback) {
    patient_get(patient_id, function (result) {
        callback(result);
    })
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

export function get_all_patients_and_all_families(callback) {

    var data = {}

    patients_get_list(function (result) {

        if (!isObjectEmpty(result)) {
            data["patients"] = result;
        }
        families_get_list(function (result) {

            if (!isObjectEmpty(result)) {
                data["families"] = result;
            }
            if (isObjectEmpty(data)) callback(false)
            else callback(data);

        });

    });
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

    var patient_couples_ids = get_patient_couple_ids(patient, relatives);

    if (!isObjectEmpty(patient_couples_ids)) {

        for (var i = 0; i < patient_couples_ids.length; i++) {

            var patient_couple_id = patient_couples_ids[i];

            if (patient_couple_id === current_relative.id) {

                is_patient_couple = true;

            }
        }
    }

    return is_patient_couple;

}

export function is_patient_grand_children(patient, current_relative, relatives) {

    var is_patient_grand_child = false;

    var patient_grand_children = get_patient_grand_children(patient, relatives);

    for (var i = 0; i < patient_grand_children.length; i++) {

        var patient_grand_child = patient_grand_children[i];

        if (current_relative.id === patient_grand_child.id) {

            is_patient_grand_child = true;
        }
    }

    return is_patient_grand_child;

}

export function is_patient_uncle(patient, current_relative, relatives) {

    var is_patient_uncle = false;

    var patient_uncles = get_patient_uncles(patient, relatives);

    for (var i = 0; i < patient_uncles.length; i++) {

        var patient_uncle = patient_uncles[i];

        if (patient_uncle.id === current_relative.id) {

            is_patient_uncle = true;

        }
    }

    return is_patient_uncle;
}

export function label_patient_relatives(patient, relatives) {

    for (var i = 0; i < relatives.length; i++) {

        var current_relative = relatives[i];

        if (patient.id === current_relative.id) {

            current_relative["relation"] = "current patient";

        } else if (is_patient_father(patient, current_relative)) {

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

        } else if (is_patient_grand_children(patient, current_relative, relatives)) {

            current_relative["relation"] = "grand child";

        } else if (is_patient_uncle(patient, current_relative, relatives)) {

            current_relative["relation"] = "uncle";

        } else {

            current_relative["relation"] = "other";
        }
    }
}

function get_all_patients_from_a_family_given_specific_patient(patient, patients, array_patients_to_explore, family) {

    if (isObjectEmpty(family) && isObjectEmpty(array_patients_to_explore)) {

        family.push(patient);
        array_patients_to_explore = get_patient_relatives(patient, patients);

        get_all_patients_from_a_family_given_specific_patient(array_patients_to_explore[0], patients, array_patients_to_explore, family);

    } else {

        if (!isObjectEmpty(array_patients_to_explore)) {

            family.push(patient);
            array_patients_to_explore.push(get_patient_relatives(patient, patients));
            array_patients_to_explore = flatten(array_patients_to_explore);
            array_patients_to_explore = difference(array_patients_to_explore, family);
            get_all_patients_from_a_family_given_specific_patient(array_patients_to_explore[0], patients, array_patients_to_explore, family);

        }
    }
}

export function get_family_by_patient(patient, database) {

    var array_patients_to_explore = [];
    var array_family = [];
    get_all_patients_from_a_family_given_specific_patient(patient, database, array_patients_to_explore, array_family);
    return array_family;
}

function get_number_of_family_members(family, patients) {

    var num_family_members = 0;

    if ("id" in family) {

        if (!isObjectEmpty(family.id)) {

            for (var i = 0; i < patients.length; i++) {

                var patient_to_compare = patients[i];

                if ("family_id" in patient_to_compare) {

                    if (!isObjectEmpty(patient_to_compare.family_id)) {

                        if (family.id === patient_to_compare.family_id) {

                            num_family_members++;

                        }
                    }
                }
            }
        }
    }

    return num_family_members;

}

function get_number_of_relatives(patient, patients) {

    var num_relatives = 0;

    if ("family_id" in patient) {

        if (!isObjectEmpty(patient.family_id)) {

            for (var i = 0; i < patients.length; i++) {

                var patient_to_compare = patients[i];

                if ("family_id" in patient_to_compare) {

                    if (!isObjectEmpty(patient_to_compare.family_id)) {

                        if (patient.family_id === patient_to_compare.family_id) {

                            num_relatives++;

                        }
                    }
                }
            }
        }
    }

    return num_relatives;
}

export function get_patients_processed(patients) {

    for (var i = 0; i < patients.length; i++) {

        var patient = patients[i];
        patient["num_relatives"] = get_number_of_relatives(patient, patients);
    }

    return patients;
}

export function get_family_processed(patients, family) {

    family["num_family_members"] = get_number_of_family_members(family, patients);

    return family;
}

export function order_family_by_ids(family, ids) {

    var array = [];

    for (var i = 0; i < ids.length; i++) {

        var patient = findWhere(family, { id: ids[i] });
        array.push(patient);
    }

    return array;
}

export function get_family_statistics(family_members) {

    var family_statistics = [];

    family_members = filter(family_members, function(patient){
        return patient.phenotype !== "new-member-family";
    });
    
    var family_statistics_counter = countBy(family_members, function (patient) {
        return patient.phenotype;
    });

    var family_statistics = [];
    var family_statistics_counter_keys = keys(family_statistics_counter);

    for (var i = 0; i < family_statistics_counter_keys.length; i++) {

        var current_phenotype = family_statistics_counter_keys[i];
        var relatives_with_current_phenotype = where(family_members, { phenotype: current_phenotype });
        
        family_statistics.push({
            "phenotype": current_phenotype,
            "counter": family_statistics_counter[current_phenotype],
            "relatives": relatives_with_current_phenotype,
            "counter_males": where(relatives_with_current_phenotype, { gender: "male" }).length,
            "counter_females": where(relatives_with_current_phenotype, { gender: "female" }).length
        });
    }

    return family_statistics;

}

export function is_this_child_unique(id_child,id_parent_1,id_parent_2,callback){

    var data={}
    data["child_unique"]=false;
    data["child_unique_one_father"]=false;

    get_all_patients_and_all_families(function(result){

        if(!isObjectEmpty(result)){

            var patients = result.patients;

            var children_parent_1 = get_patient_children_by_id_father_or_mother(id_parent_1,patients);
            var children_parent_2 = get_patient_children_by_id_father_or_mother(id_parent_2,patients);

            if(children_parent_1.length === 1 && children_parent_2.length === 1){

                data["child_unique"]=children_parent_1[0].family_id;

            }else if(children_parent_1.length === 1 || children_parent_2.length === 1){

                if(children_parent_1.length === 1 ){

                    data["child_unique_one_father"]=id_parent_1;

                }else if(children_parent_2.length === 1){
                    
                    data["child_unique_one_father"]=id_parent_2;

                }
            }
        }

        callback(data);
    })


}


