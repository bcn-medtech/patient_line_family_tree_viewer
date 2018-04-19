import {download_resource} from './../../../../../../modules/rkt_module_downloader'

export function makeImageNode(imgBlob) {

    var myImage = document.createElement('img');
    var url = URL.createObjectURL(imgBlob);
    myImage.src = url;

    return url;
}


export function downloadImage(route_api,name,url_api,token,callback){

    var url = url_api+route_api;

    download_resource(url,name,"image",token,function(result){
        callback(result);
    });
}

export function downloadGif(route_api,name,url_api,token,callback){

    var url = url_api+ route_api;
    
    download_resource(url,name,"image_gif",token,function(result){
        callback(result);
    });
}