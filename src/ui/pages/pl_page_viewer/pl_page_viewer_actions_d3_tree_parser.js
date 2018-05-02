export function exploreChildrenTree(couplesArray, dataJson) {
    
    var children;
    var childrenArray = getChildren(couplesArray, dataJson);
    if (childrenArray.length == 0) {
        if (isCouple(couplesArray)) {
            children = addCouple(couplesArray, dataJson, "-2");
        } else {
            children = addChildren(couplesArray, dataJson);
        }
    } else {
        var couple = addCouple(couplesArray, dataJson, "-2");
        couplesArray = getCouplesArray(childrenArray, dataJson);
        for (var i in couplesArray) {
            children = exploreChildrenTree(couplesArray[i], dataJson);
            if (children.length == 3) {
                for (var j in children) {
                    var coupleMember = children[j];
                    couple[1].children.push(coupleMember);
                }
            } else {
                couple[1].children.push(children);
            }
        }
        children = couple;
    }

    return children;
}


export function bloodRelatedCounter(couplesArray, dataJson, id) {
    
    var children;
    var childrenArray = getChildren(couplesArray, dataJson);
    if (childrenArray.length == 0) {
        children = addChildren(couplesArray, dataJson);
    } else {
        var couple = addCouple(couplesArray, dataJson, "-2");
        couplesArray = getCouplesArray(childrenArray, dataJson);
        for (var i in couplesArray) {
            children = exploreChildrenTree(couplesArray[i], dataJson);
            if (children.length == 3) {
                for (var j in children) {
                    var coupleMember = children[j];
                    couple[1].children.push(coupleMember);
                }
            } else {
                couple[1].children.push(children);
            }
        }
        children = couple;
    }
    return children;
}

export function exploreSiblingsTree(couplesArray, dataJson) {
    
    var children;
    var sibling = [];
    var childrenArray = getChildren(couplesArray, dataJson);
    couplesArray = getCouplesArray(childrenArray, dataJson);
    //console.log("couplesArray: ", couplesArray);
    for (var i in couplesArray) {
        children = exploreSiblingsTree(couplesArray[i], dataJson);
        //console.log("For couplesArray: ", children);
        if (isCouple(couplesArray[i])) {
            children = addSiblingObject(couplesArray[i]);
            //console.log("If isCouple: ", children);
            sibling = sibling.concat(children);
            //console.log("If isCouple, sibling: ", sibling);

        }
        children = sibling;
    }
    return children;
}

export function treeBuilder(dataJson) {
    
    var familyTree = {};
    var couplesArray = getRootCouple(dataJson);
    var children = exploreChildrenTree(couplesArray, dataJson);
    familyTree = addVoidNode("1");
    familyTree.children = children;
    //var counter = bloodRelatedCounter(couplesArray, dataJson, "00103");
    return familyTree;
}

export function siblingsBuilder(dataJson) {
    
    var couplesArray = getRootCouple(dataJson);
    var siblingsTree = [];
    siblingsTree.push(addSiblingObject(couplesArray));
    var siblings = exploreSiblingsTree(couplesArray, dataJson);
    if (typeof siblings != 'undefined') {
        for (var i in siblings) {
            siblingsTree = siblingsTree.concat(siblings[i]);
            //console.log("siblingsTree: ", siblingsTree);
        }
    }
    //console.log("siblingsTree: ", siblingsTree);
    return siblingsTree;
}

export function addChildrenToTree(children, dataJson, familyTree) {
    
    var children;
    var id = "2" // TO DO: change this ID.
    if (isCouple(children)) {
        children = addCouple(children, dataJson, id);
    } else {
        children = addChildren(children, dataJson)
    }
}

function addRootToTree(couplesArray, id, dataJson) {
    
    var familyItem = {};
    familyItem["name"] = "";
    familyItem["id"] = id;
    familyItem["hidden"] = true;
    familyItem["children"] = addCouple(couplesArray[0], dataJson, id);
    return familyItem;
}

function isCouple(couplesArray_loop) {
    
    var ret = false;
    if (couplesArray_loop[0] != "" && couplesArray_loop[1] != "") {
        ret = true;
    }
    return ret;
}

function addCouple(couplesArray, dataJson, voidNodeId) {
    
    var couple = [];
    var voidNode;
    var coupleMember;
    for (var i in dataJson) {
        if (dataJson[i].id == couplesArray[0] || dataJson[i].id == couplesArray[1]) {
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
    if (coupleMember.father != "" || coupleMember.mother != "") {
        ret = true;
    }
    return ret;
}

function addChildren(couplesArray, dataJson) {
    
    var children;
    for (var i in dataJson) {
        if (dataJson[i].id == couplesArray[0] || dataJson[i].id == couplesArray[1]) {
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

function getRootCouple(dataJson) {
    
    var rootArray = [];
    for (var i in dataJson) {
        var coupleMember1 = dataJson[i].id;
        var coupleMember2 = getSpouse(coupleMember1, dataJson);
        var couple = [coupleMember1, coupleMember2];
        if (coupleIsRoot(couple, dataJson)) {
            rootArray = couple;
        }
    }
    return rootArray;
}


function coupleIsRoot(couple, dataJson) {
    
    var ret = false;
    var count = 0;
    for (var i in dataJson) {
        ret = false;
        if (dataJson[i].id == couple[0] || dataJson[i].id == couple[1]) {
            if (dataJson[i].father == "" && dataJson[i].mother == "") {
                count++;
            }
        }
        if (count == 2) {
            ret = true;
        }
    }
    return ret;
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
    for (var i in dataJson) {
        for (var j in childrenArray) {
            if (dataJson[i].married_with == childrenArray[j].id) {
                childrenArray.push(dataJson[i]);
            }
        }
    }
    return childrenArray;
}

function areParents(childCandidate, parentsArray) {
    
    var ret = false;
    if ((childCandidate.father == parentsArray[0] || childCandidate.mother == parentsArray[0]) && (childCandidate.father == parentsArray[1] || childCandidate.mother == parentsArray[1])) {
        ret = true;
    }
    return ret;
}

function notListed(childrenId, childrenArray) {
    
    var ret = true
    for (var i in childrenArray) {
        if (childrenId == childrenArray[i].id) {
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
        if (dataJson[i].married_with == coupleMember1) {
            coupleMember2 = dataJson[i].id;
        }
    }
    return coupleMember2;
}

function coupleNotListed(couple, couplesArray) {
    
    var ret = true;
    for (var i in couplesArray) {
        if (couplesArray[i][0] == couple[0] || couplesArray[i][0] == couple[1]) {
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
