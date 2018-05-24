export function svg_to_png(svg, width, height, callback) {

    var canvas = document.createElement("CANVAS");
    var ctx = canvas.getContext("2d");

    var img = new Image();
    img.onload = function() {
        ctx.drawImage(img, 0, 0, width, height);
    }
    
    img.src = svg;
    
    var dataURL = canvas.toDataURL();
    var imgData = dataURL.replace("data:image/png;base64", "");

    // canvas.toBlob(function (png_blob) {
    //     callback(png_blob);
    // });

    callback(imgData);
}