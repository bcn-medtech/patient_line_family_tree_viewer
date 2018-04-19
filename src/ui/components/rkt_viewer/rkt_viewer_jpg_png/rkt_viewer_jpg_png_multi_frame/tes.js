var element = document.getElementById('dicomImage');

    /*function onImageRendered(e) {
        var eventData = e.detail;
        var viewport = eventData.viewport;
        document.getElementById('mrbottomleft').textContent = "WW/WC: " + Math.round(viewport.voi.windowWidth) + "/" + Math.round(viewport.voi.windowCenter);
        document.getElementById('zoomText').textContent = "Zoom: " + viewport.scale.toFixed(2);
    };*/

    //element.addEventListener('cornerstoneimagerendered', onImageRendered);

    function onNewImage(e) {
        var eventData = e.detail;
        var newImageIdIndex = stack.currentImageIdIndex;

        // Update the slider value
        var slider = document.getElementById('slice-range');
        slider.value = newImageIdIndex;

        // Populate the current slice span
        var currentValueSpan = document.getElementById("sliceText");
        currentValueSpan.textContent = "Image " + (newImageIdIndex + 1) + "/" + imageIds.length;

        // if we are currently playing a clip then update the FPS
        var playClipToolData = cornerstoneTools.getToolState(element, 'playClip');
        if (playClipToolData !== undefined && Object.keys(playClipToolData.data).length !== 0) {
            document.getElementById('frameRate').textContent = "FPS: " + Math.round(eventData.frameRate);
        } else {
            if (document.getElementById('frameRate').textContent.length > 0) {
                document.getElementById('frameRate').textContent = "";
            }
        }
    }
    element.addEventListener('cornerstonenewimage', onNewImage);

    var loopCheckbox = document.getElementById('loop');
    loopCheckbox.addEventListener('change', function() {
        var playClipToolData = cornerstoneTools.getToolState(element, 'playClip');

        if (!playClipToolData.data.length) {
            playClipToolData.data.push({
              intervalId: undefined,
              framesPerSecond: 30,
              lastFrameTimeStamp: undefined,
              frameRate: 0,
              frameTimeVector: undefined,
              ignoreFrameTimeVector: false,
              usingFrameTimeVector: false,
              speed: 1,
              reverse: false,
              loop: loopCheckbox.checked
            })
        } else {
          playClipToolData.data[0].loop = loopCheckbox.checked;
        }
    });

    var imageIds = [
        'example://1',
        'example://2',
        'example://3'
    ];

    var stack = {
        currentImageIdIndex : 0,
        imageIds: imageIds
    };

    // Initialize range input
    var range, max, slice, currentValueSpan;
    range = document.getElementById('slice-range');

    // Set minimum and maximum value
    range.min = 0;
    range.step = 1;
    range.max = imageIds.length - 1;

    // Set current value
    range.value = stack.currentImageIdIndex;

    function selectImage(event){
        var targetElement = document.getElementById("dicomImage");

        // Get the range input value
        var newImageIdIndex = parseInt(event.currentTarget.value, 10);

        // Get the stack data
        var stackToolDataSource = cornerstoneTools.getToolState(targetElement, 'stack');
        if (stackToolDataSource === undefined) {
            return;
        }
        var stackData = stackToolDataSource.data[0];

        // Switch images, if necessary
        if(newImageIdIndex !== stackData.currentImageIdIndex && stackData.imageIds[newImageIdIndex] !== undefined) {
            cornerstone.loadAndCacheImage(stackData.imageIds[newImageIdIndex]).then(function(image) {
                var viewport = cornerstone.getViewport(targetElement);
                stackData.currentImageIdIndex = newImageIdIndex;
                cornerstone.displayImage(targetElement, image, viewport);
            });
        }
    }

    // Bind the range slider events
    document.getElementById('slice-range').addEventListener("input", selectImage);

    // Enable the dicomImage element and the mouse inputs
    cornerstone.enable(element);
    cornerstoneTools.mouseInput.enable(element);
    cornerstoneTools.mouseWheelInput.enable(element);
    cornerstone.loadImage(imageIds[0]).then(function(image) {
        // Display the image
        cornerstone.displayImage(element, image);

        // Set the stack as tool state
        cornerstoneTools.addStackStateManager(element, ['stack', 'playClip']);
        cornerstoneTools.addToolState(element, 'stack', stack);

        // Enable all tools we want to use with this element
        cornerstoneTools.stackScroll.activate(element, 1);
        cornerstoneTools.stackScrollWheel.activate(element);

        cornerstoneTools.scrollIndicator.enable(element);

        function activate(id) {
            document.querySelectorAll('a').forEach(function(elem) { elem.classList.remove('active'); });
            document.getElementById(id).classList.add('active');
        }

        document.getElementById('playClip').addEventListener('click', function() {
            activate("playClip");
            cornerstoneTools.playClip(element, 31);
            return false;
        });
        document.getElementById('stopClip').addEventListener('click', function() {
            activate("stopClip");
            cornerstoneTools.stopClip(element);
            document.getElementById('frameRate').textContent = "";
            return false;
        });

    });