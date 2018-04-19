//test database

import {
    patient_get,
    patient_insert,
    patient_remove,
    patient_update,
    patients_get_list,
    family_get,
    family_insert,
    families_get_list,
    family_remove,
    family_update
} from './database';

export function test_patient(){

    patient_get("upf_00201", function (result) {
        console.log("Get patient");
        console.log(result);
        patients_get_list(function (result) {
            console.log("Get list of patients");
            console.log(result);
            patient_remove("upf_00201", function (result) {
                console.log("Remove patient")
                console.log(result);
                patients_get_list(function (result) {
                    console.log(result);

                    var patient = {
                        "center": "UPF",
                        "children": ["upf_00206"],
                        "diagnostic": "yabarullelle",
                        "diagnostic_status": "yabarullelleeeeee",
                        "dob": "",
                        "family_id": "upf_f_2",
                        "father": "upf_00203",
                        "gender": "male",
                        "id": "upf_00207",
                        "married_with": "",
                        "mother": "upf_00206",
                        "mutations": "",
                        "name": "John Doe",
                        "nhc": "",
                        "probando": "",
                        "status": "",
                        symptoms: ""
                    }

                    patient_update(patient, function (result) {

                        console.log("Update patient");

                        patients_get_list(function (result) {

                            console.log(result);

                        });

                    });

                });
            });

        });
    });
}

export function test_family(){
    
    family_get("upf_f_1", function (result) {

        console.log("Get family");
        console.log(result);

        families_get_list(function (result) {
            console.log("Get familiy list")
            console.log(result);

            family_remove("upf_f_1", function (result) {

                console.log("Remove member of a family");
                console.log(result);

                families_get_list(function (result) {

                    console.log(result);

                    var family = {
                        "id": "upf_f_2",
                        "name": "UPF family cool",
                        description: "Familia con caso único de manifestación fenotípica."
                    }

                    family_update(family, function (result) {

                        console.log("Update family");

                        families_get_list(function (result) {
                            
                            console.log(result);

                        });

                    });

                });

            });
        });
    });
}
