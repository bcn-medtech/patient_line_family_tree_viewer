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
    family_get,
    families_get_list,
    family_insert,
    family_update,
    family_remove,
    patient_get,
    patients_get_list,
    patient_insert,
    patient_remove,
    patient_update
} from './../../../database/database';

import { label_patient_relatives } from './pl_page_viewer_action_data_analysis_patient_relations';

import patients from './test_patients.json';

//modules
import { isObjectEmpty, isObjectAnArray } from '../../../modules/rkt_module_object';

//actions
import {
    treeBuilder,
    siblingsBuilder
} from './pl_page_viewer_actions_d3_tree_parser';

import {
    get_patients_processed, get_family_processed
} from './pl_page_viewer_actions_data_analysis';

import { findWhere, omit } from 'underscore';


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


                var patients = get_patients_processed(result.patients);
                
                get_family(family_id, function (family) {
                    
                    if (isObjectAnArray(family)) {

                        if (family.length > 0) {

                            var data = {};
                            //data["family"] = family[0];
                            data["family"] = get_family_processed(patients, family[0]);


                            if (!isObjectEmpty(patient_id)) {

                                var patient = findWhere(patients, { id: patient_id });

                                if (!isObjectEmpty(patient)) {

                                    data["patient"] = patient;



                                    if ("father" in patient) {

                                        var father = false;

                                        if (!isObjectEmpty(patient.father)) {

                                            father = findWhere(patients, { id: patient.father });
                                        }

                                        data["father"] = father;

                                    }

                                    if ("mother" in patient) {

                                        var mother = false;

                                        if (!isObjectEmpty(patient.mother)) {

                                            mother = findWhere(patients, { id: patient.mother });

                                        }

                                        data["mother"] = mother;
                                    }

                                    if ("children" in patient) {

                                        var children = [];

                                        if (!isObjectEmpty(patient.children)) {

                                            for (var i = 0; i < patient.children.length; i++) {

                                                var child = findWhere(patients, { id: patient.children[i] });

                                                if (!isObjectEmpty(child)) {
                                                    children.push(child);
                                                }

                                            }

                                            data["children"] = children;

                                        }
                                    }
                                    
                                    var array_patients_family = get_all_patients_from_family(family_id, result.patients);
                                    label_patient_relatives(patient, array_patients_family);
                                    //create_virtual_patient(data);
                                    data["root"] = treeBuilder(array_patients_family);
                                    data["relatives"] = array_patients_family;

                                    //console.log(data["root"]);
                                    data["siblings"] = siblingsBuilder(array_patients_family);

                                    callback(data);

                                } else {
                                    console.log("error");
                                }

                            } else {

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
    }
}

export function perform_database_action(data, callback) {
    
    if (!isObjectEmpty(data)) {

        if ("action" in data) {

            if (data.action === "edit_patient") {

                if ("data" in data) {

                    //var patient = data.data;

                    // if (!patient.id_old) {

                    //     patient_update(patient, function (result) {

                    //         if (result) {

                    //             callback(true);
                    //         }

                    //     });

                    // } else {

                    //     var id_patient_to_remove = patient.id_old;
                    //     var patient_to_insert = omit(patient, "id_old");

                    //     patient_remove(id_patient_to_remove, function (result) {

                    //         if (result) {

                    //             patient_insert(patient_to_insert, function (result) {

                    //                 if (result) {

                    //                     callback(true);

                    //                 }

                    //             })

                    //         }
                    //     });

                    // }

                    if ("id_patient_to_remove" && "patient_to_update" && "relatives_to_update" in data.data) {

                        var id_patient_to_remove = data.data.id_patient_to_remove;
                        var patient_to_insert = data.data.patient_to_update;
                        var relatives_to_update = data.data.relatives_to_update;

                        patient_remove(id_patient_to_remove, function (result) {

                            if (result) {

                                patient_insert(patient_to_insert, function (result) {

                                    if (result) {

                                        patients_update(relatives_to_update, function(result) {

                                            if (result) {

                                                callback(true);

                                            }

                                        });
                                        

                                    }

                                })

                            }
                        });

                    } else {

                        var patient = data.data;

                        patient_update(patient, function (result) {

                            if (result) {
                                
                                callback(true);
                            }

                        });

                    }

                }

            } else if (data.action === "remove_patient") {

                if ("data" in data) {

                    if ("to_remove" in data.data) {

                        var id_patient_to_remove = data.data.to_remove;

                        patient_remove(id_patient_to_remove, function (result) {

                            if (result) {

                                if ("to_update" in data.data) {

                                    var patients_to_update = data.data.to_update;
                                    patients_update(patients_to_update, function (result) {

                                        if (result) {

                                            callback(true);

                                        } else {

                                            console.log("error updating patients");

                                        }

                                    });

                                }

                            } else {

                                console.log("error deleting the patient");
                            }

                        });

                    }

                }

            } else if (data.action === "add_child_existing_family") {
                
                if ("data" in data) {

                    if ("id_father" && "id_mother" && "new_child" in data.data) {

                        var id_father = data.data.id_father;
                        var id_mother = data.data.id_mother;
                        var new_child = data.data.new_child;

                        // we update the "children" info of the parents
                        patient_get(id_father, function (father_array) {

                            if (!isObjectEmpty(father_array)) {

                                var father = father_array[0];

                                if (father.children !== undefined) father.children.push(new_child.id);
                                else father.children = [new_child.id];

                                patient_get(id_mother, function (mother_array) {

                                    if (!isObjectEmpty(mother_array)) {

                                        var mother = mother_array[0];

                                        if (mother.children !== undefined) mother.children.push(new_child.id);
                                        else mother.children = [new_child.id];

                                        // we update the parents in the database
                                        patients_update([father, mother], function (result) {

                                            if (result) {

                                                // and we insert the new child in the database
                                                patient_insert(new_child, function (result) {

                                                    if (result) {

                                                        callback(true);

                                                    } else console.log("error inserting the new child");

                                                })

                                            } else console.log("error updating the parents");

                                        });

                                    } else console.log("error retrieving the information of the mother");

                                });

                            } else console.log("error retrieving the information of the father");
                        })

                    }

                }

            } else if (data.action === "add_child_new_family") {

                if ("data" in data) {
                    
                    if ("id_known_parent" && "new_child" && "new_parent" in data.data) {

                        var id_known_parent = data.data.id_known_parent;
                        var new_child = data.data.new_child;
                        var new_parent = data.data.new_parent;

                        // we update the "married_with" and "children" info of the known parent
                        patient_get(id_known_parent, function (parent_array) {

                            if (!isObjectEmpty(parent_array)) {

                                var parent = parent_array[0];

                                parent.married_with = new_parent.id;
                                if (parent.children !== undefined) parent.children.push(new_child.id);
                                else parent.children = [new_child.id];

                                // we update this parent in the database
                                patient_update(parent, function (result) {

                                    if (result) {

                                        // and we insert the new child and the new parent in the database
                                        patients_insert([new_parent, new_child], function (result) {

                                            if (result) {

                                                callback(true);

                                            } else console.log("error inserting the new child and the new parent");

                                        })

                                    } else console.log("error updating the parent");

                                });

                            } else console.log("error retrieving the information of the parent");

                        });
                    }

                }

            } else if (data.action === "edit_family") {

                if ("data" in data) {

                    var family = data.data;
                    
                    if (!family.id_old) {

                        family_update(family, function (result) {

                            if (result) {

                                callback(true);
                            }

                        });

                    } else {

                        var id_family_to_remove = family.id_old;
                        var family_to_insert = omit(family, "id_old");
                        
                        family_remove(id_family_to_remove, function (result) {

                            if (result) {

                                family_insert(family_to_insert, function (result) {

                                    if (result) {
                                        
                                        callback(true);

                                    }

                                })

                            }
                        });

                    }

                }

            }

        }

    }
}

function patients_update(patients, callback) {
    
    var updated_patients_counter = 0;

    for (var i = 0; i < patients.length; i++) {

        var patient = patients[i];

        patient_update(patient, function (result) {

            if (result) {

                updated_patients_counter++;

                if (updated_patients_counter === patients.length) {

                    callback(true);

                }

            }

        });
    }

}

function patients_insert(patients, callback) {

    var inserted_patients_counter = 0;

    for (var i = 0; i < patients.length; i++) {

        var patient = patients[i];

        patient_insert(patient, function (result) {

            if (result) {

                inserted_patients_counter++;

                if (inserted_patients_counter === patients.length) {

                    callback(true);

                }

            }

        });
    }

}

