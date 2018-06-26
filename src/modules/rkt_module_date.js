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

import { isObjectEmpty } from "./rkt_module_object";

export function calculate_age(dob) {
    // Input: 'dob' ('date of birth') --> yyyy-dd-mm ('ISO Date')

    var today = new Date();
    var birthDate = new Date(format_date(dob));

    var age = today.getFullYear() - birthDate.getFullYear();
    var month_difference = today.getMonth() - birthDate.getMonth();

    if (month_difference < 0 || (month_difference === 0 && today.getDate() < birthDate.getDate())) {
        age = age - 1;
    }

    return age;
}

export function format_date(stringDate, desiredDateFormat) {
    // Input: stringDate (dd/mm/yy)

    if (!isObjectEmpty(stringDate)) {
        var date = new Date(stringDate);

        var today = new Date();
        var formatted_date, y, m, d;

        y = date.getFullYear(); // to avoid the 'year 2000 problem', 'y' has always 4 numbers
        if (y > today.getFullYear()) y = y - 100;

        m = date.getMonth() + 1; // 1-12
        d = date.getDate(); // 1-31

        switch (desiredDateFormat) {

            case 'yyyy-mm-dd':
            case 'ISO':
            case undefined:
                formatted_date = y + "-" + m + "-" + d;
                break;

            case 'mm/dd/yyyy':
            case 'Short':
                formatted_date = m + "/" + d + "/" + y;
                break;

            case 'dd/mm/yyyy':
                formatted_date = d + "/" + m + "/" + y;
                break;

            default:
                alert("unidentified date format");
                formatted_date = date;
                break;

        }
        
        return formatted_date;

    } else {
        
        return "";

    }

}