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

//var jwtDecode = require('jwt-decode')
import { url_getParameterByName, navigate_to_url } from './rkt_module_url.js'; 
import {isObjectEmpty} from './rkt_module_object';
var jwtDecode = require('jwt-decode')

//User management and token methods
function obtain_user_token_from_url(url) {

    return url_getParameterByName("token", url);

}

export function obtain_user_token_from_local_storage() {

    return window.localStorage.getItem("acces_token");

}


function set_user_token_local_storage(token) {

    window.localStorage.setItem("acces_token", token);
}

export function logout(url){

    window.localStorage.removeItem("acces_token");
    navigate_to_url(url);
}

export function obtain_user_token(url) {

    var token_url = obtain_user_token_from_url(url);
    var token_local_storage = obtain_user_token_from_local_storage();
    var token;

    if (isObjectEmpty(token_url)) {

        console.log("Token doesn't exist url");

        if (isObjectEmpty(token_local_storage)) {

            console.log("Token doesn't exist local_storage");
            token = false;

        } else {

            console.log("Token exist local_storage");
            token = obtain_user_token_from_local_storage();
        }

    } else {

        console.log("Token exist url");

        set_user_token_local_storage(token_url);

        token = token_url;

    }

    return token;
}

export function obtain_user_email_from_token(token){

    var token_decoded = jwtDecode(token);
    return token_decoded.email;
}