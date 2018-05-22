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

import {isObjectEmpty} from './../../../modules/rkt_module_object';

function get_number_of_family_members(family,patients){
    
    var num_family_members = 0;

    if("id" in family){

        if(!isObjectEmpty(family.id)){
            
            for(var i=0;i<patients.length;i++){

                var patient_to_compare = patients[i];

                if("family_id" in patient_to_compare){

                    if(!isObjectEmpty(patient_to_compare.family_id)){

                        if(family.id === patient_to_compare.family_id){

                            num_family_members++;

                        }
                    }
                }
            }
        }
    }

    return num_family_members;

}

function get_number_of_relatives(patient,patients){

    var num_relatives = 0;

    if("family_id" in patient){

        if(!isObjectEmpty(patient.family_id)){
            
            for(var i=0;i<patients.length;i++){

                var patient_to_compare = patients[i];

                if("family_id" in patient_to_compare){

                    if(!isObjectEmpty(patient_to_compare.family_id)){

                        if(patient.family_id === patient_to_compare.family_id){

                            num_relatives++;

                        }
                    }
                }
            }
        }
    }

    return num_relatives;
}

export function get_patients_processed(patients){
    
    for(var i=0;i<patients.length;i++){

        var patient = patients[i];
        patient["num_relatives"] = get_number_of_relatives(patient,patients);
    }

    return patients;
}

export function get_family_processed(patients, family){
    
    family["num_family_members"] = get_number_of_family_members(family,patients);

    return family;
}
