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

import { isObjectEmpty, isObjectAnArray } from './../../../../../modules/rkt_module_object';
import { pluck } from 'underscore';

//Using global variables
const cornerstoneWebImageLoader = window.cornerstoneWebImageLoader;


function loadImage(blob,frame,callback) {

    var objectURL = URL.createObjectURL(blob);

    var image = new Image();

    image.src = objectURL;

    image.onload = function () {

        var url = frame;

        var imageObject = cornerstoneWebImageLoader.createImage(image, url);

        callback(imageObject);

    };
    image.onerror = function (err) {
        alert("Imposible to load image");
    };

}

export function loadvideo(resources,callback) {

    if (isObjectAnArray(resources)) {

        var images = [];

        for (var i = 0; i < resources.length; i++) {
            
            var blob = resources[i].blob;
            var frame = resources[i].frame;

            loadImage(blob,frame,function(result){
                
                images.push(result);

                if(images.length === resources.length){

                    var num_frames = images.length;
                    var imageIds = pluck(images,'imageId');

                    var stack = {
                        currentImageIndex:0,
                        imageIds:imageIds,
                    }

                    var state = {
                        numFrames:num_frames,
                        stack: stack,
                        images:images
                    }

                    callback(state);

                }

            });
            
        }

    } else {
        alert("problems with inputs");
    }
}