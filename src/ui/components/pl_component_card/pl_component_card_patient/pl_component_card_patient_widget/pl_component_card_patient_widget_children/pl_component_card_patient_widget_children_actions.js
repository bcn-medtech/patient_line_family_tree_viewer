import { initialize_patient } from './../../../../../../modules/rkt_module_database';
import { format_date } from './../../../../../../modules/rkt_module_date';
import { create_random_string } from './../../../../../../modules/rkt_module_string';
import { isObjectAnArray } from './../../../../../../modules/rkt_module_object';
import { findIndex, findWhere, sortBy } from 'underscore';


export function create_child_existing_family(patient, id_father, id_mother) {

    var length_random_string = 9;

    var new_child = initialize_patient();
    new_child.id = "id_"+create_random_string(length_random_string);
    new_child.name = "name_"+create_random_string(length_random_string);
    new_child.family_id = patient.family_id;
    new_child.father = id_father;
    new_child.mother = id_mother;
    
    return { "id_father": id_father, "id_mother": id_mother, "new_child": new_child };
    
}

export function create_new_family(patient) {

    var length_random_string = 9;

    // new family = new_child + new_parent (father || mother)
    var new_child = initialize_patient();
    var new_parent = initialize_patient();

    // new_child
    new_child.id = "id_"+create_random_string(length_random_string);
    new_child.name = "name_"+create_random_string(length_random_string);
    new_child.family_id = patient.family_id;

    // new_parent
    new_parent.id = "id_"+create_random_string(length_random_string);
    new_parent.name = "name_"+create_random_string(length_random_string);
    new_parent.family_id = patient.family_id;
    new_parent.children = [new_child.id];

    if (patient.gender === "male") {

        new_child.father = patient.id;
        new_child.mother = new_parent.id;

        new_parent.gender = "female";
        

    } else if (patient.gender === "female") {

        new_child.father = new_parent.id;
        new_child.mother = patient.id;

        new_parent.gender = "male";

    }

    return { "id_known_parent": patient.id, "new_child": new_child, "new_parent": new_parent };


}

export function process_children_by_parents(children) {

    var children_by_parents = [];

    // initialization of "children_by_parents"
    children_by_parents.push({ "id_father": children[0].father, "id_mother": children[0].mother, "children": [children[0]] });

    // building of "children_by_parents" with the other children
    for (var i = 1; i < children.length; i++) {

        var child = children[i];
        var child_mother = child.mother;
        var child_father = child.father;

        if ((child_mother) && (child_father)) {

            var list_of_interest = findWhere(children_by_parents, { "id_father": child_father, "id_mother": child_mother });

            if (list_of_interest !== undefined) {

                // we add "child" to this existing list
                var index_list_of_interest = findIndex(children_by_parents, list_of_interest);
                children_by_parents[index_list_of_interest]["children"].push(child);

            } else {

                // initialization of a new list
                children_by_parents.push({ "id_father": child_father, "id_mother": child_mother, "children": [child] });

            }

        }

    }

    return children_by_parents;

}

export function sort_children_by_dob(children) {

    if (isObjectAnArray(children)) {

        var sorted_children = children.slice();

        for (var i = 0; i < sorted_children.length; i++) {
            sorted_children[i].dob = format_date(sorted_children[i].dob);
        }

        sorted_children = sortBy(sorted_children, "dob");

        return sorted_children;


    } else return children;

}