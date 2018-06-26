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

import { isObjectAnArray } from './../../../../../../modules/rkt_module_object';
import { sortBy } from 'underscore';

export function sort_statistics(statistics) {

    if (isObjectAnArray(statistics)) {

        var sorted_statistics = statistics.slice();
        sorted_statistics = sortBy(statistics, "counter").reverse(); // 'reverse()' is done because '.sortBy' sorts in ascending order

        return sorted_statistics;


    } else return statistics;

}

export function format_phenotype(phenotype) {

    var formatted_phenotypes = {
        
        "death-from-other-causes": "Death from other causes",
        "sudden-cardiac-death": "Sudden cardiac death",
        "ressucitated-scd-or-vf": "Ressucitated SCD or VF",
        "phenotypic-manifestation": "Phenotypic manifestation",
        "no-phenotypic-manifestation": "No phenotypic manifestation"
        
    }

    return formatted_phenotypes[phenotype];

}