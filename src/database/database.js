/*
# Patient line family tree viewer is (c) BCNMedTech, UNIVERSITAT POMPEU FABRA
#
# Patient line family tree viewer is free software: you can redistribute it and/or modify
# it under the terms of the GNU Affero General Public License as
# published by the Free Software Foundation, either version 3 of the
# License, or (at your option) any later version.
#
# Patient line family tree viewer is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU Affero General Public License for more details.
#
# You should have received a copy of the GNU Affero General Public License
# along with this program.  If not, see <http://www.gnu.org/licenses/>.
#
# Authors:
# Carlos Yagüe Méndez
# Paula Bassagañas
# Paula Bassagañas
# Contributors: 
# Begoña Benito
# Bart Bijnens
# Oscar Camara
*/

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
