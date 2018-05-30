import Dexie from 'dexie';
import { isObjectEmpty } from '../modules/rkt_module_object';

var db = new Dexie("database");

db.version(1).stores({
    families: "++id",
    patients: "++id"
})

export function family_get(id, callback) {

    db.families
        .where("id").equalsIgnoreCase(id)
        .toArray(function (families) {
            callback(families);
        });

}

export function families_get_list(callback) {

    db.families
        .toArray(function (families) {
            callback(families);
        });

}

export function family_insert(family, callback) {
    
    db.families
        .where("id").equalsIgnoreCase(family.id)
        .toArray(function (families) {

            if (isObjectEmpty(families)) {
                db.families.add(family);
                callback(family);
            } else {
                callback(false);
            }



        });

}

export function family_update(family,callback) {

    db.families
        .where("id").equalsIgnoreCase(family.id)
        .delete()
        .then(function (deleteCount) {

            if(deleteCount===1){

                family_insert(family,function(result){

                    callback(result);

                });

            }else{

                callback(false);
            }
        });
}

export function family_remove(id, callback) {

    db.families
        .where("id").equalsIgnoreCase(id)
        .delete()
        .then(function (deleteCount) {
            
            callback(true);
        })
}

export function patient_get(id, callback) {

    db.patients
        .where("id").equalsIgnoreCase(id)
        .toArray(function (patients) {
            callback(patients);
        });

}

export function patients_get_list(callback) {

    db.patients
        .toArray(function (patients) {
            callback(patients);
        });
}

export function patient_insert(patient, callback) {

    db.patients
        .where("id").equalsIgnoreCase(patient.id)
        .toArray(function (patients) {
            if (isObjectEmpty(patients)) {
                db.patients.add(patient);
                callback(patient);
            } else {
                callback(false);
            }

        });

}

export function patient_update(patient,callback) {

    db.patients
    .where("id").equalsIgnoreCase(patient.id)
    .delete()
    .then(function (deleteCount) {

        if(deleteCount===1){

            patient_insert(patient,function(result){

                callback(result);

            });

        }else{

            callback(false);
        }
    });
}

export function patient_remove(id, callback) {

    db.patients
        .where("id").equalsIgnoreCase(id)
        .delete()
        .then(function (deleteCount) {
            callback(true);
        })
}

export function clear_database(callback) {

    db.patients
        .clear()
        .then(function (deleteCount) {
            db.families
                .clear()
                .then(function (deleteCount) {
                    callback(true);
                })
        })
}
