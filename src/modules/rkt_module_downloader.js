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