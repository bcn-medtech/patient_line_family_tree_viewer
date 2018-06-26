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


//components
import RktViewerPatientLineToolbox from './rkt_viewer_patient_line_toolbox/rkt_viewer_patient_line_toolbox';
import RktViewerPatientLineViewer from './rkt_viewer_patient_line_viewer/rkt_viewer_patient_line_viewer';
//modules
import { url_getParameterByName } from './../../../../modules/rkt_module_url';

import {
    obtain_user_token,
    obtain_user_email_from_token,
    obtain_user_token_from_local_storage,
    logout,
} from './../../../../modules/rkt_module_user_token_auth';

import {
    download_resource_and_export
} from './../../../../modules/rkt_module_downloader';

import {
    searchInArrayOfObjects,
    isObjectAnArray,
    isObjectEmpty
} from './../../../../modules/rkt_module_object';

// actions
import {
    load_component,
    download_resource_video,
} from './rkt_viewer_patient_line_actions';


import { sortBy } from 'underscore';

//config
import config from './../../../../config/config.json';

export default class RktViewerStudyViewer extends Component {

    constructor() {
        super();

        this.state = {};
    }

    componentDidMount() {

        var location = window.location;

        if ("href" in location) {

            var user_token = obtain_user_token(location);

            if (user_token) {

                var user_email = obtain_user_email_from_token(user_token);

                this.setState({
                    user_email: user_email,
                    user_token:user_token
                });

                var location_url = location.href;
                var url_api = url_getParameterByName("url", location_url);
                var patient_id = url_getParameterByName("patient_id", location_url);
                var modality_id = url_getParameterByName("modality_id", location_url);
                var followup_id = url_getParameterByName("followup_id", location_url);

                var myComponent = this;

                load_component(url_api, patient_id, modality_id, followup_id,user_token, function (task) {

                    if (task) {

                        if ("resources" in task) {

                            myComponent.setState({
                                resources: task.resources,
                                id_patient: task.patient_id,
                                id_modality: task.modality_id,
                                id_followup: followup_id,
                                num_videos: task.videos,
                                num_images: task.images,
                            });
                        }
                    }
                });

            } else {

                this.setState({
                    user_email: false
                })
            }

        }
    }

    on_perform_action(resource) {

        if ("action" in resource) {

            if (resource.action === "export_image") {

                var user_token = obtain_user_token_from_local_storage();
                download_resource_and_export(resource.dicom, resource.name,user_token);

            } else if (resource.action === "logout") {

                var url_api = config.url_api;
                var patient_id = this.state.patient;
                var modality_id = this.state.modality;
                var followup_id = this.state.date;

                var url_to_navigate = config.url_app+'/viewer?';
                url_to_navigate = url_to_navigate + "url=" + url_api + "&";
                url_to_navigate = url_to_navigate + "patient_id=" + patient_id + "&";
                url_to_navigate = url_to_navigate + "modality_id=" + modality_id + "&";
                url_to_navigate = url_to_navigate + "followup_id=" + followup_id + "&";

                logout(url_to_navigate);
            }
        }

    }

    display_element(element) {

        var resources = this.state.resources;

        this.setState({
            current_resource: element
        });

        if ("time_series" in element) {

            if (isObjectAnArray(element.time_series)) {

                if (!isObjectEmpty(element.time_series)) {

                    var myComponent = this;

                    download_resource_video(element.time_series, element.name, config.url_api, this.state.user_token, function (result) {

                        if (result) {

                            var resource = searchInArrayOfObjects("name", result.name, resources);
                            resource["local_time_serie"] = sortBy(result.video, "frame");

                            myComponent.setState({
                                resources: resources,
                                current_resource: resource
                            });
                        }

                    });

                }
            }
        }
    }

    renderViewer() {

        var resource = {};

        if ("current_resource" in this.state) {

            resource = this.state.current_resource;

        }

        return (<RktViewerPatientLineViewer resource={resource} />)
    }

    renderToolbox() {

        var resources = [];
        var id_patient;
        var id_modality;
        var id_followup;
        var num_images;
        var num_videos;
        var user_email;

        if ("resources" in this.state) {

            resources = this.state.resources;
        }

        if ("id_patient" in this.state) {

            id_patient = this.state.id_patient;

        }

        if ("id_modality" in this.state) {

            id_modality = this.state.id_modality;

        }

        if ("id_followup" in this.state) {

            id_followup = this.state.id_followup;

        }

        if ("num_images" in this.state) {

            num_images = this.state.num_images;

        }

        if ("num_videos" in this.state) {

            num_videos = this.state.num_videos;

        }

        if ("user_email" in this.state) {

            user_email = this.state.user_email;

        }

        return (<RktViewerPatientLineToolbox
            resources={resources}
            id_patient={id_patient}
            id_modality={id_modality}
            id_followup={id_followup}
            url_api = {config.url_api}
            num_images={num_images}
            num_videos={num_videos}
            display_element={this.display_element.bind(this)}
            on_perform_action={this.on_perform_action.bind(this)}
            user_email={user_email} />);
    }

    render_view_user_no_authenticated() {

        return (
            <div className="grid-block vertical user-authentication">
                <div className="grid-block align-center shrink">
                    Ups! Sorry you must be authenticated
                </div>
                <div className="grid-block align-center shrink">
                    <p>click <a href={config.url_api+"/auth/google"}> here </a> for google login</p>
                </div>

            </div>
        );

    }

    render_view_user_authenticated() {

        return (
            <div className="grid-block">
                {this.renderToolbox()}
                {this.renderViewer()}
            </div>
        );
    }

    render() {

        var view;

        if (this.state.user_email !== undefined) {

            if (this.state.user_email !== false) {
                view = this.render_view_user_authenticated();
            } else {
                view = this.render_view_user_no_authenticated();
            }
        }

        return (
            <div className="grid-block rkt-viewer-patient-line">
                {view}
            </div>
        );
    }
}