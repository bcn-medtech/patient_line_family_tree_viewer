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

import { isObjectEmpty } from './../../../../modules/rkt_module_object';

export function format_family_statistics(initial_family_statistics, family_num_members, desired_length) {

    var family_statistics = [];
    var group = [];

    if (!isObjectEmpty(family_num_members)) {
        
        group.push({ "type": "family members", "text": family_num_members });
    }
    
    if (initial_family_statistics.length > desired_length) {

        for (var i = 0; i < initial_family_statistics.length; i++) {

            var stats = initial_family_statistics[i];

            if (group.length < desired_length) {

                group.push({ "type": stats["type"], "text": stats["text"] });

                if (group.length === desired_length) {

                    family_statistics.push(group);
                    group = [];
    
                } else if (i === initial_family_statistics.length - 1) {

                    family_statistics.push(group);
                    group = [];

                }

            }
        }

    } else {

        family_statistics.push(initial_family_statistics);

    }

    return family_statistics;

}