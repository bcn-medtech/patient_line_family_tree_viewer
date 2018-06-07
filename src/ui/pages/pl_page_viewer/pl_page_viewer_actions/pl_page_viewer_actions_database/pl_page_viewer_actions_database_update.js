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

import {
    family_insert,
    family_update,
    family_remove,
    patient_get,
    patients_get_list,
    patient_insert,
    patient_remove,
    patient_update
} from './../../../../../database/database';

import{
    get_all_patients_from_family,
} from './pl_page_viewer_actions_database_get';

import {
    isObjectEmpty
} from './../../../../../modules/rkt_module_object';

import {map,pluck,keys} from 'underscore';

import { writeAndExportXlsxWoorkbook} from './../../../../../modules/rkt_pl_module_file_formats_xlsx';

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

export function add_child_new_family(data,callback){

    if ("data" in data) {

        if ("id_known_parent" && "new_child" && "new_parent" in data.data) {

            var id_known_parent = data.data.id_known_parent;
            var new_child = data.data.new_child;
            var new_parent = data.data.new_parent;

            // we update the "children" info of the known parent
            patient_get(id_known_parent, function (parent_array) {

                if (!isObjectEmpty(parent_array)) {

                    var parent = parent_array[0];

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
}

export function edit_family(data,callback){

    if ("data" in data) {

        if ("id_family_to_remove" && "family_to_update" in data.data) {

            // case in which the family's id has been edited
            var id_family_to_remove = data.data.id_family_to_remove;
            var family_to_insert = data.data.family_to_update;

            patients_get_list(function (patients) {

                if (patients) {

                    var family_members = get_all_patients_from_family(id_family_to_remove, patients);

                    if (!isObjectEmpty(family_members)) {

                        // the patients of this family have to be updated with the new id of the family:
                        map(family_members, function (family_member) {
                            family_member.family_id = family_to_insert.id;
                            return family_member;
                        });

                        patients_update(family_members, function (result) {

                            if (result) {

                                // then, the family can be updated
                                family_remove(id_family_to_remove, function (result) {

                                    if (result) {

                                        family_insert(family_to_insert, function (result) {

                                            if (result) {

                                                callback(true);

                                            } else console.log("error updating the family");

                                        })

                                    } else console.log("error remove the family");

                                });

                            } else console.log("error obtaining the family members");
                        });

                    } else {

                        // if the family has not patients, the family is directly updated
                        family_remove(id_family_to_remove, function (result) {

                            if (result) {

                                family_insert(family_to_insert, function (result) {

                                    if (result) {

                                        callback(true);

                                    } else console.log("error updating the family");

                                });

                            } else console.log("error removing the family");

                        });

                    }

                } else console.log("error obtaining the patients");

            });

        } else {

            var family = data.data;

            family_update(family, function (result) {

                if (result) {

                    callback(true);

                } else console.log("error updating the family");

            });

        }
    }
}

export function remove_family(data,callback){

    if ("data" in data) {

        var id_family_to_remove = data.data;

        patients_get_list(function (patients) {

            if (patients) {

                var family_members = get_all_patients_from_family(id_family_to_remove, patients);

                if (!isObjectEmpty(family_members)) {

                    // first, the patients of this family are removed
                    var ids_family_members = pluck(family_members, "id");

                    patients_remove(ids_family_members, function (result) {

                        if (result) {

                            // then, the family is removed
                            family_remove(id_family_to_remove, function (result) {

                                if (result) {

                                    callback(true);

                                } else console.log("error removing the family");

                            });

                        } else console.log("error removing the family members");

                    });

                } else {

                    // if the family has not patients, the family is directly removed
                    family_remove(id_family_to_remove, function (result) {

                        if (result) {

                            callback(true);

                        } else console.log("error removing the family");

                    });

                }

            } else console.log("error obtaining the patients");

        });
    }
}

export function export_patient(data){

    if ("data" in data) {

        // if ("patient" && "family_tree" in data.data) {

        //     var patient = data.data["patient"];
        //     //var family_tree = data.data["family_tree"];

        //     var id_patient = keys(data.data.patient)[0];
        //     writeAndExportXlsxWoorkbook(patient, { "name": id_patient }); // for the moment, only a xlsx of the patient is exported
        //     // var id_family = patient[id_patient][0].family_id;

        //     // load_zip_with_patient_and_family_tree(id_patient, id_family, patient, family_tree);

        // }
        if ("patient" in data.data) {

            var patient = data.data["patient"];

            var id_patient = keys(data.data.patient)[0];
            writeAndExportXlsxWoorkbook(patient, { "name": id_patient }); // for the moment, only a xlsx of the patient is exported
            
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

