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

//import components
import RktViewerPatientLineToolboxHeader from './rkt_viewer_patient_line_toolbox_header/rkt_viewer_patient_line_toolbox_header';
import RktViewerPatientLineToolboxGallery from './rkt_viewer_patient_line_toolbox_gallery/rkt_viewer_patient_line_toolbox_gallery';

//import modules
import { isObjectEmpty } from './../../../../../modules/rkt_module_object.js';

export default class RktViewerPatientLineToolbox extends Component {

    constructor(props) {

        super(props);

        this.state = {
            controls: {
                autoplaythumbnails: false,
            }
        }

    }

    display_element(element) {

        if ("display_element" in this.props) {

            this.props.display_element(element);

        }
    }

    onPerformAction(action) {

        if (action === "auto_play_thumbnails") {

            this.setState({
                controls: {
                    autoplaythumbnails: !this.state.controls.autoplaythumbnails
                }
            });

        }else if(action === "logout"){

            var resource = {
                "action":action
            }

            this.props.on_perform_action(resource);
        }
    }

    on_perform_action_from_gallery(resource){

        this.props.on_perform_action(resource);
    }

    render() {

        var resources = [];
        var controls = {};

        var id_patient = this.props.id_patient;
        var id_modality = this.props.id_modality;
        var id_followup = this.props.id_followup;
        var num_images = this.props.num_images;
        var num_videos = this.props.num_videos;
        var user_email = this.props.user_email;
        var url_api = this.props.url_api;

        if (!isObjectEmpty(this.props.resources)) {

            resources = this.props.resources;

        }

        if (!isObjectEmpty(this.state.controls)) {

            controls = this.state.controls;

        }


        return (

            <div className="grid-block vertical medium-5 grid-block">
                <RktViewerPatientLineToolboxHeader
                    id_patient={id_patient}
                    id_modality={id_modality}
                    id_followup={id_followup}
                    num_images={num_images}
                    num_videos={num_videos}
                    controls={controls}
                    on_perform_action={this.onPerformAction.bind(this)}
                    user_email={user_email}
                />
                <RktViewerPatientLineToolboxGallery 
                resources={resources} 
                url_api={url_api}
                controls={controls} 
                display_element={this.display_element.bind(this)}
                on_perform_action={this.on_perform_action_from_gallery.bind(this)} />
            </div>
        );
    }
}