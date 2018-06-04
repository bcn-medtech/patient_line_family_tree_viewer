import { isObjectEmpty } from "./../../../../../modules/rkt_module_object";
import {
    findWhere,
    flatten,
    findIndex
} from "underscore";

import {
    order_patients_by_couple
} from './pl_page_viewer_actions_d3_tree_organizer';

import {
    get_all_couples_from_array
} from './pl_page_viewer_actions_d3_tree_organize_by_siblings';

function get_children(patient_children, full_database) {

    var couples = [];

    for (var i = 0; i < patient_children.length; i++) {

        var element = patient_children[i];

        if (!isObjectEmpty(element.children)) {

            for (var j = 0; j < element.children.length; j++) {

                var child = findWhere(full_database, { id: element.children[j] });

                var is_couple_duplicated = false;

                for (var m = 0; m < couples.length; m++) {

                    if (couples[m][0] === child.mother && couples[m][1] === child.father) {
                        is_couple_duplicated = true;
                    }
                }

                if (is_couple_duplicated === false) {

                    var couple = [];
                    couple.push(child.mother);
                    couple.push(child.father);
                    couples.push(couple);
                }
            }

        } else {

            var couple = [];
            couple.push(element.id);
            couple.push("");
            couples.push(couple);
        }
    }

    return couples;

}

function getRootCouple(database) {

    var rootCouples = [];
    var couples = get_all_couples_from_array(database);

    for (var i = 0; i < couples.length; i++) {

        var member_1 = findWhere(database, { id: couples[i].source.id });
        var member_2 = findWhere(database, { id: couples[i].target.id });

        if (!isObjectEmpty(member_1) && !isObjectEmpty(member_2)) {

            if (isObjectEmpty(member_1.father) && isObjectEmpty(member_1.mother) && isObjectEmpty(member_2.father) && isObjectEmpty(member_2.mother)) {

                var couple = [];
                couple.push(member_1.id);
                couple.push(member_2.id);
                rootCouples.push(couple);

                //member_1["is_root"]=true;
                //member_2["is_root"]=true;
            }

        }
    }

    return rootCouples;

}

export function exploreChildrenTree(couplesArray, dataJson) {

    var children;
    var childrenArray = getChildren(couplesArray, dataJson);
    

    if (childrenArray.length === 0) {

        if (isCouple(couplesArray)) {

            children = addCouple(couplesArray, dataJson, "-2");

        } else {

            children = addChildren(couplesArray, dataJson);
            
        }

    } else {

        var couple = addCouple(couplesArray, dataJson, "-2");

        var couple_temp_array = get_children(childrenArray, dataJson);

        for (var i in couple_temp_array) {

            children = exploreChildrenTree(couple_temp_array[i], dataJson);
            
            if (children.length === 3) {

                for (var j in children) {
                    var coupleMember = children[j];
                    couple[1].children.push(coupleMember);
                }

            } else {

                couple[1].children.push(children);
            }
        }

        if (couple[1].children.length > 1) {

            //Order data by patients couple
            var patients_ordered_by_couple = order_patients_by_couple(couple[1].children);

            //Push patients that are not present in patients_ordered_by_couple
            for(i=0;i<couple[1].children.length;i++){

                var patient_selected = couple[1].children[i];
                
                if(findIndex(patients_ordered_by_couple,{id:patient_selected.id})===-1){
                    patients_ordered_by_couple.push(patient_selected);
                }

            }

            couple[1].children = patients_ordered_by_couple;
         
        }

               
        children = couple;

        //console.log(children);
    }

   

    //console.log(children);

    return children;
}

export function treeBuilder(dataJson) {

    var familyTree = {};
    var children = [];
    var couplesArray = getRootCouple(dataJson);

    if (couplesArray.length !== 0) {

        for (var i = 0; i < couplesArray.length; i++) {

            var root_couple = couplesArray[i];

            children.push(exploreChildrenTree(root_couple, dataJson));

        }


    } else {

        children.push(dataJson[0]);

    }

    children = flatten(children);
    children = order_patients_by_couple(children);
    familyTree = addVoidNode("1");
    familyTree.children = children;
    return familyTree;
}

export function siblingsBuilder(family_patients) {

    var couples = [];

    for (var i = 0; i < family_patients.length; i++) {

        var patient = family_patients[i];

        if (!isObjectEmpty(patient.father) && !isObjectEmpty(patient.mother)) {

            var couple = [];
            couple.push(patient.father);
            couple.push(patient.mother);
            var siblings_object = addSiblingObject(couple);
            var is_duplicated_couple = false;

            for (var j = 0; j < couples.length; j++) {

                var temp_couple = couples[j];

                if (temp_couple.source.id === siblings_object.source.id && temp_couple.target.id === siblings_object.target.id) {
                    is_duplicated_couple = true;
                }

            }

            if (!is_duplicated_couple) {
                couples.push(siblings_object);
            }


        }
    }

    return couples;
}

function isCouple(couplesArray_loop) {

    var ret = false;
    if (couplesArray_loop[0] !== "" && couplesArray_loop[1] !== "") {
        ret = true;
    }
    return ret;
}

function addCouple(couplesArray, dataJson, voidNodeId) {

    var couple = [];
    var voidNode;
    var coupleMember;
    for (var i in dataJson) {
        if (dataJson[i].id === couplesArray[0] || dataJson[i].id === couplesArray[1]) {
            coupleMember = dataJson[i];
            if (coupleMemberIsChild(coupleMember)) {
                coupleMember["no_parent"] = false;
                couple.splice(2, 0, coupleMember);
            } else {
                coupleMember["no_parent"] = true;
                couple.splice(0, 0, coupleMember);
            }
        }
    }
    voidNode = addChildVoidNode(voidNodeId);
    couple.splice(1, 0, voidNode);
    return couple;
}

function coupleMemberIsChild(coupleMember) {

    var ret = false;
    if (coupleMember.father !== "" || coupleMember.mother !== "") {
        ret = true;
    }
    return ret;
}

function addChildren(couplesArray, dataJson) {

    var children;
    for (var i in dataJson) {
        if (dataJson[i].id === couplesArray[0] || dataJson[i].id === couplesArray[1]) {
            children = dataJson[i];
        }
    }
    return children;
}

// Create a void node for children:
function addChildVoidNode(id) {

    var familyItem = {};
    familyItem["name"] = "";
    familyItem["id"] = id;
    familyItem["hidden"] = true;
    familyItem["children"] = [];
    familyItem["no_parent"] = true;
    return familyItem;
}




function getChildren(parentsArray, dataJson) {

    var childrenArray = [];
    for (var i in dataJson) {
        for (var j in parentsArray) {
            if (areParents(dataJson[i], parentsArray) && notListed(dataJson[i].id, childrenArray)) {
                childrenArray.push(dataJson[i]);
            }
        }
    }
    for (i in dataJson) {
        for (j in childrenArray) {
            if (dataJson[i].married_with === childrenArray[j].id) {
                childrenArray.push(dataJson[i]);
            }
        }
    }
    return childrenArray;
}

function areParents(childCandidate, parentsArray) {

    var ret = false;
    if ((childCandidate.father === parentsArray[0] || childCandidate.mother === parentsArray[0]) && (childCandidate.father === parentsArray[1] || childCandidate.mother === parentsArray[1])) {
        ret = true;
    }
    return ret;
}

function notListed(childrenId, childrenArray) {

    var ret = true
    for (var i in childrenArray) {
        if (childrenId === childrenArray[i].id) {
            ret = false;
        }
    }
    return ret;
}

function getCouplesArray(childrenArray, dataJson) {

    var couplesArray = [];
    for (var j in childrenArray) {
        var coupleMember1 = childrenArray[j].id;
        var coupleMember2 = getSpouse(coupleMember1, dataJson);
        var couple = [coupleMember1, coupleMember2];
        if (coupleNotListed(couple, couplesArray)) {
            couplesArray.push(couple);
        }
    }
    return couplesArray;
}

function getSpouse(coupleMember1, dataJson) {

    var coupleMember2 = "";
    for (var i in dataJson) {
        if (dataJson[i].married_with === coupleMember1) {
            coupleMember2 = dataJson[i].id;
        }
    }
    return coupleMember2;
}

function coupleNotListed(couple, couplesArray) {

    var ret = true;
    for (var i in couplesArray) {
        if (couplesArray[i][0] === couple[0] || couplesArray[i][0] === couple[1]) {
            ret = false;
        }
    }
    return ret;
}

// Add data to siblings:
function addSiblingObject(couplesArray) {

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

// Create a void node:
function addVoidNode(id) {

    var familyItem = {};
    familyItem["name"] = "";
    familyItem["id"] = id;
    familyItem["hidden"] = true;
    familyItem["children"] = [];
    return familyItem;

}
