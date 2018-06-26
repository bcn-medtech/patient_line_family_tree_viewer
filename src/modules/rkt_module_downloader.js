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

var FileSaver = require('file-saver');

function createLocalURL(imgBlob) {

    var url = URL.createObjectURL(imgBlob);

    var resource = {};
    resource["blob"] = imgBlob;
    resource["url"] = url;

    return resource;
}

function readResponseAsBlob(response) {

    if (!response.ok) {
        throw Error(response.statusText);
    }

    return response.blob();
}

function readResponseAsJSON(response) {

    if (!response.ok) {
        throw Error(response.statusText);
    }

    return response.json();

}

function createTask(blob, name_task, name_resource) {

    var task = {};
    task["name"] = name_task;
    task["name_resource"] = name_resource;
    task["resource"] = blob;
    return task;
}

export function download_resource(url, name, name_task, user_token, callback) {

    var myHeaders = new Headers();
    myHeaders.append("authorization", "Bearer " + user_token);

    var options = {
        method: 'GET',
        mode: 'cors',
        cache: 'default',
        headers: myHeaders,
    };

    fetch(url, options)
        .then(readResponseAsBlob)
        .then(createLocalURL)
        .then(function (resource) {

            var task = createTask(resource.url, name_task, name);
            task["resource_blob"] = resource.blob;
            return task;
        })
        .then(function (task) {
            callback(task);
        })
}

export function download_resource_as_a_json(url, name, name_task, user_token, callback) {

    var myHeaders = new Headers();
    myHeaders.append("authorization", "Bearer " + user_token);

    var options = {
        method: 'GET',
        mode: 'cors',
        cache: 'default',
        headers: myHeaders,
    };

    fetch(url, options)
        .then(readResponseAsJSON)
        .then(function (json) {
            return createTask(json, name_task, name);
        })
        .then(function (task) {
            callback(task);
        })
}

export function download_resource_and_export(url, name, user_token) {

    var myHeaders = new Headers();
    myHeaders.append("authorization", "Bearer " + user_token);

    var options = {
        method: 'GET',
        mode: 'cors',
        cache: 'default',
        headers: myHeaders,
    };

    fetch(url, options)
        .then(readResponseAsBlob)
        .then(function (blob) {
            FileSaver.saveAs(blob, name);
        });
}