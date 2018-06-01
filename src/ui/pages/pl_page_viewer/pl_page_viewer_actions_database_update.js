import {
    family_insert,
    family_update,
    family_remove,
    patient_get,
    patients_get_list,
    patient_insert,
    patient_remove,
    patient_update
} from './../../../database/database';

import {
    isObjectEmpty
} from './../../../modules/rkt_module_object';

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

function patients_remove(patients, callback) {

    var removed_patients_counter = 0;

    for (var i = 0; i < patients.length; i++) {

        var patient = patients[i];

        patient_remove(patient, function (result) {

            if (result) {

                removed_patients_counter++;

                if (removed_patients_counter === patients.length) {

                    callback(true);

                }

            }

        });
    }

}

export function edit_patient(data, callback) {
    
    if ("data" in data) {

        if ("id_patient_to_remove" && "patient_to_update" && "relatives_to_update" in data.data) {

            // case in which the patient's id has been edited
            var id_patient_to_remove = data.data.id_patient_to_remove;
            var patient_to_insert = data.data.patient_to_update;
            var relatives_to_update = data.data.relatives_to_update;

            patient_remove(id_patient_to_remove, function (result) {

                if (result) {

                    patient_insert(patient_to_insert, function (result) {

                        if (result) {

                            patients_update(relatives_to_update, function (result) {

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

}

export function remove_patient(data,callback){

    if ("data" in data) {

        if ("to_remove" in data.data) {

            var ids_patients_to_remove = data.data.to_remove;

            patients_remove(ids_patients_to_remove, function (result) {

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

                    } else callback(true)

                } else {

                    console.log("error deleting the patient");
                }

            });

        }

    }
}

export function add_child_existing_family(data,callback){

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
}