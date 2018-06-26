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
import { OverflowMenu,OverflowMenuItem } from 'carbon-components-react';
import {isObjectEmpty} from './../../../../../../modules/rkt_module_object';

export default class RktViewerPatientLineToolboxHeader extends Component {

    constructor(props) {

        super(props);

        this.state = {}

    }

    onPerformAction(action){
        
        this.props.on_perform_action(action);

    }

    render() {

        //console.log(this.props);
        var controls = this.props.controls;
        var auto_play_thumbnail_button_text = "test";

        var id_patient = "NaN";
        var id_modality = "NaN";
        var id_followup = "NaN";
        var num_images = "NaN";
        var num_videos = "NaN";
        var date_day = "NaN";
        var date_month = "NaN";
        var date_year = "NaN";
        var user_email = this.props.user_email;

        if(controls.autoplaythumbnails){
            auto_play_thumbnail_button_text = "Stop thumbnails";
        }else{
            auto_play_thumbnail_button_text = "Auto play thumbnails";
        }

        if(!isObjectEmpty(this.props.id_patient)){
            id_patient = this.props.id_patient;
        }

        if(!isObjectEmpty(this.props.id_modality)){
            id_modality = this.props.id_modality;
        }

        if(!isObjectEmpty(this.props.id_followup)){
            id_followup = this.props.id_followup;
            date_year = id_followup.substring(0,4);
            date_month = id_followup.substring(4,6);
            date_day = id_followup.substring(7,9);
        }

        if(this.props.num_images!==undefined){
            num_images = this.props.num_images;
        }

        if(this.props.num_videos!==undefined){
            num_videos = this.props.num_videos;
        }


        return (
            <div className="grid-block shrink rtk_viewer_patient_line_toolbox_header">
                <div className="grid-block vertical content">
                    <h4>{id_patient}</h4>
                    <div>Modality: {id_modality}, Followup: {date_day}/{date_month}/{date_year}, {num_images} images, {num_videos} videos</div>
                </div>
                <div className="grid-block shrink menu">
                    <OverflowMenu className="some-class" floatingMenu>
                        <OverflowMenuItem onClick={this.onPerformAction.bind(this,"auto_play_thumbnails")} className="some-class" itemText={auto_play_thumbnail_button_text}/>
                        <OverflowMenuItem onClick={this.onPerformAction.bind(this,"logout")} className="some-class" itemText="Logout"/>
                    </OverflowMenu>
                    <div className="grid-block shrink user_email">{user_email}</div>
                </div>
            </div>
        );
    }
}