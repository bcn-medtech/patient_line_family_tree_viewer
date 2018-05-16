import { isObjectAnArray } from './../../../../../../modules/rkt_module_object';
import { findIndex, findWhere, map, sortBy } from 'underscore';


export function create_child_existing_family(patient, id_father, id_mother) {

    var length_random_string = 9;

    var new_child = initialize_patient();
    new_child.id = "id_"+create_random_string(length_random_string);
    new_child.name = "name_"+create_random_string(length_random_string);
    new_child.family_id = patient.family_id;
    new_child.father = id_father;
    new_child.mother = id_mother;

    if (patient.children !== undefined) patient.children.push(new_child.id);
    else patient.children = [new_child.id];

    return { "to_insert": [new_child], "to_update": [patient] };
    
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
    new_parent.married_with = patient.id; // it is the only way to define a partner relationship with "patient"
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

    if (patient.children !== undefined) patient.children.push(new_child.id);
    else patient.children = [new_child.id];

    return { "to_insert": [new_child, new_parent], "to_update": [patient] }

}

function create_random_string(string_length) {

    // based on https://www.mediacollege.com/internet/javascript/number/random.html
    var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
    var string_length = string_length;
    var randomstring = "";

    for (var i = 0; i < string_length; i++) {
        var rnum = Math.floor(Math.random() * chars.length);
        randomstring += chars.substring(rnum, rnum + 1);
    }

    return randomstring;
}

function initialize_patient(patient, father, mother, children, relatives) {

    var patient = {};

    patient.id = "";
    patient.name = "";
    patient.gender = "";
    patient.father = "";
    patient.mother = "";
    patient.married_with = "";
    patient.family_id = "";
    patient.center = "";
    patient.nhc = "";
    patient.dob = "";
    patient.mutations = "";
    patient.symptoms = "";
    patient.status = "nuevo-miembro-familia";
    patient.diagnostic = "";
    patient.diagnostic_status = "";
    patient.probando = "";
    patient.children = undefined;
    patient.num_relatives = undefined;

    return patient;

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

        } // else {} // TODO?

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

export function calculate_age(dob) {
    // Input: 'dob' ('date of birth') --> yyyy-dd-mm ('ISO Date')

    var today = new Date();
    var birthDate = new Date(format_date(dob));

    var age = today.getFullYear() - birthDate.getFullYear();
    var month_difference = today.getMonth() - birthDate.getMonth();

    if (month_difference < 0 || (month_difference === 0 && today.getDate() < birthDate.getDate())) {
        age = age - 1;
    }

    return age;
}

function format_date(stringDate, desiredDateFormat) {
    // Input: stringDate (dd/mm/yy)
    var date = new Date(stringDate);


    if (date !== undefined) {

        var today = new Date;
        var formatted_date, y, m, d;

        y = date.getFullYear(); // to avoid the 'year 2000 problem', 'y' has always 4 numbers
        if (y > today.getFullYear()) y = y - 100;

        m = date.getMonth() + 1; // 1-12
        d = date.getDate(); // 1-31

        switch (desiredDateFormat) {

            case 'yyyy-mm-dd':
            case 'ISO':
            case undefined:
                formatted_date = y + "-" + m + "-" + d;
                break;

            case 'mm/dd/yyyy':
            case 'Short':
                formatted_date = m + "/" + d + "/" + y;
                break;

            case 'dd/mm/yyyy':
                formatted_date = d + "/" + m + "/" + y;
                break;

            default:
                alert("unidentified date format");
                formatted_date = date;
                break;

        }

        return formatted_date;

    }

}