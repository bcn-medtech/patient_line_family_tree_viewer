/*
# Rocket viewer is (c) BCNMedTech, UNIVERSITAT POMPEU FABRA
#
# Rocket viewer is free software: you can redistribute it and/or modify
# it under the terms of the GNU Affero General Public License as
# published by the Free Software Foundation, either version 3 of the
# License, or (at your option) any later version.
#
# Rocket viewer is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU Affero General Public License for more details.
#
# You should have received a copy of the GNU Affero General Public License
# along with this program.  If not, see <http://www.gnu.org/licenses/>.
#
# Authors:
# Carlos Yagüe Méndez
# María del Pilar García
# Daniele Pezzatini
# Contributors: 
# Sergio Sánchez Martínez
*/

import React, { Component } from 'react';
//Components

//actions
import { loadJPGPNG } from './rkt_viewer_jpg_png_one_frame_actions';
//objects
import { isObjectEmpty } from '../../../../../modules/rkt_module_object';

//Using global variables
const cornerstone = window.cornerstone;
const cornerstoneTools = window.cornerstoneTools;

export default class RktViewerJPGPNGOneFrame extends Component {

    constructor() {
        super();

        this.state = {};
        this.displayImage = this.displayImage.bind(this);
    }

    componentDidMount() {

        var element = this.imageDiv;
        cornerstone.enable(element);
        var url = this.props.url;
        var blob = this.props.files;
        loadJPGPNG(url, blob, this.displayImage);
    }

    componentWillReceiveProps(nextProps) {

        var element = this.imageDiv;
        cornerstone.enable(element);
        var url = nextProps.url;
        var blob = nextProps.files;
        loadJPGPNG(url, blob, this.displayImage);
    }

    onMouseMove() {

        var element = this.imageDiv;
        var viewport = cornerstone.getViewport(element);

        this.setState({
            window_level:Math.round(viewport.voi.windowWidth) + "/" + Math.round(viewport.voi.windowCenter),
            zoom:viewport.scale.toFixed(2)
        });
        
    }

    displayImage(image) {

        var element = this.imageDiv;
        var viewport = cornerstone.getDefaultViewportForImage(element, image);

        cornerstone.displayImage(element, image, viewport);

        this.setState({
            loaded: true,
            image: image
        })

        if (this.props.add_controls) {
            cornerstoneTools.mouseInput.enable(element);
            cornerstoneTools.mouseWheelInput.enable(element);
            cornerstoneTools.wwwc.activate(element, 1); // ww/wc is the default tool for left mouse button
            cornerstoneTools.zoom.activate(element, 4); // zoom is the default tool for right mouse button
            cornerstoneTools.zoomWheel.activate(element); // zoom is the default tool for middle mouse wheel
        }
    }

    render() {

        var corner_annotation_top_left = "Patient";
        var corner_annotation_top_right = "Hospital";
        var corner_annotation_bottom_left = "";
        var corner_annotation_bottom_right = ""; 

        if(!isObjectEmpty(this.state.window_level)){
            corner_annotation_bottom_left = "WW/WC: "+this.state.window_level;
        }

        if(!isObjectEmpty(this.state.zoom)){
            corner_annotation_bottom_right = "Zoom:"+this.state.zoom;
        }

        return (
            <div className="grid-block rkt-viewer-jpg">
                <div className="dicomImage" ref={(imgDiv) => this.imageDiv = imgDiv}
                    style={{ top: "0px", left: "0px", width: "100%", height: this.props.canvas_height }} onMouseMove={this.onMouseMove.bind(this)}>
                </div>
                <div className="grid-block shrink corner-annotation-top-left">{corner_annotation_top_left}</div>
                <div className="grid-block shrink corner-annotation-top-right">{corner_annotation_top_right}</div>
                <div className="grid-block shrink corner-annotation-bottom-left">{corner_annotation_bottom_left}</div>
                <div className="grid-block shrink corner-annotation-bottom-right">{corner_annotation_bottom_right}</div>
            </div>
        );
    }
}

RktViewerJPGPNGOneFrame.defaultProps = {
    //img_url: "",
    add_controls: true,
    //img_source: "wado"
    url: "",
};