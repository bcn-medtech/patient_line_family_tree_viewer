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

import React, { Component } from 'react';
import RktViewerPatientLineToolboxThumbnail from './../rkt_viewer_patient_line_toolbox_thumbnail/rkt_viewer_patient_line_toolbox_thumbnail';

//import modules
import {isObjectEmpty} from './../../../../../../modules/rkt_module_object.js';

export default class RktViewerPatientLineToolboxGallery extends Component {

    constructor(props) {

        super(props);

        this.state = {}

    }

    display_element(element){
        
        if("display_element" in this.props){
            
            this.props.display_element(element);
        }
    }

    on_perform_action(resource){

        this.props.on_perform_action(resource);

    }

    render_thumbnails() {

        var resources = [];
        var controls = {};
        var url_api = this.props.url_api;

        if(!isObjectEmpty(this.props.resources)){

            resources = this.props.resources;
        }

        if(!isObjectEmpty(this.props.controls)){
            
            controls = this.props.controls;

        }

        return (

            <div className="grid-block small-up-2">
                {resources.map((resource) => {
                    return (<RktViewerPatientLineToolboxThumbnail resource={resource} url_api={url_api} controls={controls} display_element={this.display_element.bind(this)} on_perform_action={this.on_perform_action.bind(this)}/>);
                })}
            </div>
        );

    }

    render() {

        return (
            <div className="grid-block vertical rkt_viewer_patient_line_toolbox_gallery">
                {this.render_thumbnails()}
            </div>
        );
    }
}