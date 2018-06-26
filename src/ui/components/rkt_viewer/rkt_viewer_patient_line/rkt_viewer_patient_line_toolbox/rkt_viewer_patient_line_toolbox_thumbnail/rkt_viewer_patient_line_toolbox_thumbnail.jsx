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
import { Card, Loading, OverflowMenu, OverflowMenuItem } from 'carbon-components-react';

//import modules
import { isObjectEmpty } from './../../../../../../modules/rkt_module_object.js';
import { obtain_user_token_from_local_storage } from './../../../../../../modules/rkt_module_user_token_auth.js';
//import actions
import { downloadImage, downloadGif } from './rkt_viewer_patient_line_toolbox_thumbnail_actions';

export default class RktViewerPatientLineToolboxThumbnail extends Component {

    constructor(props) {

        super(props);

        this.state = {
            display_video: false,
            resource: false
        }

    }

    componentDidMount() {

        if (this.props.resource.jpg !== false) {

            var user_token = obtain_user_token_from_local_storage();
            var myComponent = this;

            downloadImage(this.props.resource.jpg, this.props.resource.name, this.props.url_api, user_token, function (result) {

                if (result) {
                    console.log(result);

                    myComponent.setState({
                        resource: {
                            image: result.resource,
                            image_blob:result.resource_blob,
                            image_gif: false
                        }
                    });

                    if (myComponent.props.resource.gif !== false) {

                        downloadGif(myComponent.props.resource.gif, myComponent.props.resource.name, myComponent.props.url_api, user_token, function (result) {

                            myComponent.setState({
                                resource: {
                                    image: myComponent.state.resource.image,
                                    image_blob: myComponent.state.resource.image_blob,
                                    image_gif: result.resource
                                }
                            });

                        });
                    }



                } else {
                    console.log("error");
                }

            });
        }
    }

    on_settings_clicked(mode) {

        var resource = this.props.resource;

        if (mode === "show_image") {

            this.props.resource["image"]= this.state.resource.image;
            this.props.resource["image_blob"]= this.state.resource.image_blob;
            this.props.display_element(this.props.resource);

        } else if (mode === "export_image") {

            resource["action"] = "export_image";
            this.props.on_perform_action(resource);
        }

    }

    //events
    display_element() {

        if ("display_element" in this.props) {

            this.props.resource["image"]= this.state.resource.image;
            this.props.resource["image_blob"]= this.state.resource.image_blob;

            this.props.display_element(this.props.resource);

        }
    }

    display_thumbnail_video() {

        var resource = this.state.resource;

        if (!isObjectEmpty(resource)) {

            if ("image_gif" in resource) {

                if (!isObjectEmpty(resource.image_gif)) {

                    this.setState({
                        display_video: true
                    });
                }
            }
        }
    }

    display_thumbnail_image() {

        var resource = this.state.resource;

        if (!isObjectEmpty(resource)) {

            if ("image_gif" in resource) {

                if (!isObjectEmpty(resource.image_gif)) {

                    this.setState({
                        display_video: false
                    });
                }
            }
        }
    }

    //renders
    render_thumbnail_loading() {
        return (
            <div className="grid-block">
                <Loading className="some-class" small withOverlay={false} />
            </div>
        );
    }

    render_thumbnail_gif(gif) {

        return (<img src={gif} alt="" onClick={this.display_element.bind(this)} />);

    }

    render_thumbnail_jpg(image) {

        return (
            <img src={image} alt="" onClick={this.display_element.bind(this)} />
        );
    }

    render_thumbnail_label() {

        var resource = this.state.resource;

        if (!isObjectEmpty(resource)) {

            if ("image_gif" in resource) {

                if (!isObjectEmpty(resource.image_gif)) {
                    return (<div className="grid-block shrink">video</div>);

                }
            }
        }
    }

    render_thumbnail() {

        var resource = this.state.resource;
        var controls = this.props.controls;

        if (isObjectEmpty(resource)) {
            return this.render_thumbnail_loading();
        } else if (!("image" in resource) && !("image_gif" in resource)) {
            return this.render_thumbnail_loading();
        } else if ("image_gif" in resource) {

            if (!isObjectEmpty(controls)) {

                if ("autoplaythumbnails" in controls) {

                    if (controls.autoplaythumbnails) {

                        return this.render_thumbnail_gif(resource.image_gif);

                    } else {

                        if (this.state.display_video) {

                            return this.render_thumbnail_gif(resource.image_gif);

                        } else {

                            return this.render_thumbnail_jpg(resource.image);

                        }

                    }
                } else {

                    return this.render_thumbnail_jpg(resource.image);
                }
            } else {
         
                return this.render_thumbnail_jpg(resource.image);
            }

        } else if ("image" in resource) {
            return this.render_thumbnail_jpg(resource.image);
        }
    }

    render() {

        return (
            <div className="grid-block vertical rkt_viewer_patient_line_toolbox_thumbnail wrap" onMouseEnter={this.display_thumbnail_video.bind(this)} onMouseLeave={this.display_thumbnail_image.bind(this)}>
                <Card className="grid-block rkt_viewer_patient_line_toolbox_thumbnail-card wrap" >{this.render_thumbnail()}</Card>
                <div className="grid-block menu_thumbnail">
                    <OverflowMenu className="some-class" floatingMenu>
                        <OverflowMenuItem onClick={this.on_settings_clicked.bind(this, "export_image")} className="some-class" itemText="Export image" />
                        <OverflowMenuItem onClick={this.on_settings_clicked.bind(this, "show_image")} className="some-class" itemText="Show image" />
                    </OverflowMenu>
                </div>
                <div className="grid-block label_thumbnail">
                    {this.render_thumbnail_label()}
                </div>
            </div>
        );
    }
}