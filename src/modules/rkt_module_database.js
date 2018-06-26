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

export function initialize_family() {

    var family = {};

    family.id = "";
    family.name = "";
    family.description = "";
    family.symptoms = "";
    family.diagnosis = [];
    family.mutations = [];
    family.comments = "";
    family.num_family_members = 0;

    return family;

}

export function initialize_patient() {

    var patient = {};

    patient.id = "";
    patient.name = "";
    patient.gender = "";
    patient.father = "";
    patient.mother = "";
    patient.family_id = "";
    patient.center = "";
    patient.nhc = "";
    patient.dob = "";
    patient.mutations = "";
    patient.symptoms = "";
    patient.phenotype = "new-member-family";
    patient.genotype = "";
    patient.diagnosis = "";
    patient.diagnosis_status = "";
    patient.probando = "";
    patient.comments = "";
    patient.children = undefined;
    patient.num_relatives = undefined;

    return patient;

}