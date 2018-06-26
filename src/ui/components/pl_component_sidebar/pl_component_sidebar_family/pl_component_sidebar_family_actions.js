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

import { isObjectAnArray } from "./../../../../modules/rkt_module_object";

export function update_family_from_text_field_editable(edited_inputs, original_id, family) {

    family.name = edited_inputs["name"];
    family.diagnosis = edited_inputs["diagnosis"];
    family.mutations = edited_inputs["mutations"];

    if (edited_inputs["description"] !== "There is not any descrition defined yet") family.description = edited_inputs["description"];
    if (edited_inputs["symptoms"] !== "There are not any symptoms defined yet") family.symptoms = edited_inputs["symptoms"];

    var new_data;
    if (original_id === edited_inputs["id"]) {

        family.id = original_id;
        new_data = family;

    } else if (original_id !== edited_inputs["id"]) {

        family.id = edited_inputs["id"];
        new_data = { "id_family_to_remove": original_id, "family_to_update": family };
    
    }

    return new_data;

}