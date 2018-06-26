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

import { format_date } from './../../../../../../modules/rkt_module_date';
import { isObjectAnArray } from './../../../../../../modules/rkt_module_object';
import { sortBy } from 'underscore';

export function sort_relatives_by_dob(relatives) {

    if (isObjectAnArray(relatives)) {

        var sorted_relatives = relatives.slice();
        
        for (var i = 0; i < sorted_relatives.length; i++) {
            sorted_relatives[i].dob = format_date(sorted_relatives[i].dob);
        }

        sorted_relatives = sortBy(sorted_relatives, "dob");

        return sorted_relatives;


    } else return relatives;

}