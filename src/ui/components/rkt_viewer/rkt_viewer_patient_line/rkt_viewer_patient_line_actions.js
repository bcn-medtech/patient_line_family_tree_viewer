import { isObjectEmpty } from './../../../../modules/rkt_module_object';
import _  from 'underscore';
var FileSaver = require('file-saver');

function clean_resources(resources){

    var resources_cleaned = _.reject(resources,function(resource){
        return resource.name == "";

    });

    return resources_cleaned;
}

export function load_component(url, patient_id, modality_id, followup_id, user_token , callback) {

    if (!isObjectEmpty(url) && !isObjectEmpty(patient_id) && !isObjectEmpty(modality_id) && !isObjectEmpty(followup_id)) {

        var task = {};

        task["name"] = "download_data_from_route_params";
        task["url"] = url;
        task["patient_id"] = patient_id;
        task["modality_id"] = modality_id;
        task["followup_id"] = followup_id;

        var data = "patient_id=" + task.patient_id + "&modality_id=" + task.modality_id + "&followup_id=" + task.followup_id;

        var xhr = new XMLHttpRequest();

        xhr.addEventListener("readystatechange", function () {

            if (this.readyState === 4) {

                var resources = JSON.parse(this.responseText);
                resources=clean_resources(resources);

                var videos = 0;
                var images = resources.length;

                for(var i=0;i<resources.length;i++){

                    var resource = resources[i];

                    if("gif" in resource){

                        if(!isObjectEmpty(resource.gif)){
                            videos++;
                        }
                    }
                }

                task["resources"] = resources;
                task["videos"] = videos;
                task["images"] = images - videos;

                callback(task);
            } else {
                callback(false);
            }
        });

        xhr.open("POST", task.url + "/patient/modality/followup/resources");
        xhr.setRequestHeader("patient_id", "030238");
        xhr.setRequestHeader("authorization", "Bearer " + user_token);
        xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
        xhr.setRequestHeader("cache-control", "no-cache");
        xhr.setRequestHeader("postman-token", "b46bd042-0071-fdcc-9c6c-2166a8356e4a");

        xhr.send(data);
    }
}

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

function download_resource_frame(url, name, frame_id, name_task,user_token, callback) {

    var myHeaders = new Headers();
    myHeaders.append("authorization", "Bearer " + user_token);

    var options = {
        method: 'GET',
        mode: 'cors',
        cache: 'default',
        headers:myHeaders
    };

    fetch(url, options)
        .then(readResponseAsBlob)
        .then(createLocalURL)
        .then(function (resource) {

            var task = {};
            task["name"] = name_task;
            task["name_resource"] = name;
            task["url"] = resource.url;
            task["blob"] = resource.blob;
            task["frame"] = frame_id;
            return task;
        })
        .then(function (task) {
            callback(task);
        })
}

export function download_resource_video(resources, name, url_api ,user_token, callback) {

    var video = [];

    for (var i = 0; i < resources.length; i++) {

        var resource = resources[i];

        var url = url_api+resource;

        download_resource_frame(url, name, i, "image_video",user_token, function (result) {

            var local_time_serie_frame = {};
            local_time_serie_frame["frame"] = result.frame;
            local_time_serie_frame["url"] = result.url;
            local_time_serie_frame["blob"] = result.blob;

            video.push(local_time_serie_frame);

            if(video.length === resources.length){
                
                var output = {}
                output["name"]= name;
                output["video"]= video;
                
                callback(output)
            }

        });
    }
}


