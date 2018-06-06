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

//components
import { PlComponentCardPatientHeader } from './pl_component_card_patient_header/pl_component_card_patient_header';
import { PlComponentCardPatientStatusButton } from './pl_component_card_patient_status_button/pl_component_card_patient_status_button';
import { PlComponentCardPatientTextButton } from './pl_component_card_patient_text_button/pl_component_card_patient_text_button';

//modules
import {
    isObjectEmpty, isObjectAnArray, isObjectAFunction
} from './../../../../modules/rkt_module_object';
import { mapObject } from 'underscore';

export class PlComponentCardPatient extends Component {

    on_click_card_component(type) {

        if (type === "father" || type === "mother" || type === "children" || type === "relatives"
            || type === "data" || type === "comments") {

            if (isObjectAFunction(this.props.on_click_action)) {

                this.props.on_click_action(type);

            }
        }
    }

    render_menu(patient, father, mother, children, mode_menu) {

        var patient_num_relatives;
        var patient_num_children;
        var mode_relatives = false;
        var mode_children = false;
        var mode_father = false;
        var mode_mother = false;
        var mode_data = false;
        var mode_comments = false;

        if ("num_relatives" in patient) {
            patient_num_relatives = patient.num_relatives;
        }

        if (!isObjectEmpty(children)) {
            if (isObjectAnArray(children)) {
                patient_num_children = children.length;
            } else {
                patient_num_children = 1;
            }
        } else {
            patient_num_children = 0;
        }

        if (mode_menu === "relatives") {
            mode_relatives = true;
        } else if (mode_menu === "children") {
            mode_children = true;
        } else if (mode_menu === "father") {
            mode_father = true;
        } else if (mode_menu === "mother") {
            mode_mother = true;
        } else if (mode_menu === "data") {
            mode_data = true;
        } else if (mode_menu === "comments") {
            mode_comments = true;
        }

        var icon_data =
            <svg width='25' height='25' viewBox='0 0 24 24' fillRule='evenodd'>
                <path d='M0 0v24h24V0H0zm22.1 7l-7.2 8.9-9.2-3.8c-.2-.1-.4 0-.6.1L1 16.6V7h21.1zm.9 16H1v-4.9l4.6-5 9.2 3.8c.2.1.4 0 .6-.1L23 7.5V23zm0-17H1V1h22v5z'>
                </path>
            </svg>

        var icon_comments = 
            <svg width="25" height="25" viewBox="0 0 60 60" style={{"enableBackground":"new 0 0 485.211 485.211"}} xmlSpace="preserve">
                <path d="M54,2H6C2.748,2,0,4.748,0,8v33c0,3.252,2.748,6,6,6h28.558l9.703,10.673C44.454,57.885,44.724,58,45,58
                    c0.121,0,0.243-0.022,0.361-0.067C45.746,57.784,46,57.413,46,57V47h8c3.252,0,6-2.748,6-6V8C60,4.748,57.252,2,54,2z M58,41
                    c0,2.168-1.832,4-4,4h-9c-0.552,0-1,0.448-1,1v8.414l-8.243-9.068l-4.998-5.811c-0.36-0.418-0.991-0.466-1.411-0.106
                    c-0.418,0.36-0.466,0.992-0.106,1.41L32.821,45H6c-2.168,0-4-1.832-4-4V8c0-2.168,1.832-4,4-4h48c2.168,0,4,1.832,4,4V41z"
                />
            </svg>

        return (
            <div className="grid-block align-spaced card-row">
                <div className="grid-block shrink card-item">
                    <PlComponentCardPatientTextButton
                        text={patient_num_relatives}
                        type="relatives"
                        on_click_component={this.on_click_card_component.bind(this)}
                        selected={mode_relatives} />
                </div>
                <div className="grid-block shrink card-item">
                    <PlComponentCardPatientTextButton
                        text={patient_num_children}
                        type="children"
                        on_click_component={this.on_click_card_component.bind(this)}
                        selected={mode_children} />
                </div>
                <div className="grid-block shrink card-item">
                    <PlComponentCardPatientStatusButton
                        relative={father}
                        type="father"
                        on_click_component={this.on_click_card_component.bind(this)}
                        selected={mode_father} />
                </div>
                <div className="grid-block shrink card-item">
                    <PlComponentCardPatientStatusButton
                        relative={mother}
                        type="mother"
                        on_click_component={this.on_click_card_component.bind(this)}
                        selected={mode_mother} />
                </div>
                <div className="grid-block shrink card-item">
                    <PlComponentCardPatientTextButton
                        text={icon_data}
                        type="data"
                        on_click_component={this.on_click_card_component.bind(this)}
                        selected={mode_data} />
                </div>
                <div className="grid-block shrink card-item">
                    <PlComponentCardPatientTextButton
                        text={icon_comments}
                        type="comments"
                        on_click_component={this.on_click_card_component.bind(this)}
                        selected={mode_comments} />
                </div>
            </div>
        );
    }

    get_patient_id() {

        return this.refs.patient_card_header.refs.patient_id.refs.FormItemInputText.state.input;

    }

    get_patient_name() {

        return this.refs.patient_card_header.refs.patient_name.refs.FormItemInputText.state.input;

    }

    render() {
        
        var patient = this.props.patient;
        var father = this.props.father;
        var mother = this.props.mother;
        var children = this.props.children;
        var mode_edit = this.props.mode_edit;
        var mode_menu = this.props.mode_menu;
        var patient_id;
        var patient_name;
        var patient_gender;
        var patient_status;

        if ("id" in patient) patient_id = patient.id;
        if ("name" in patient) patient_name = patient.name;
        if ("gender" in patient) patient_gender = patient.gender;
        if ("gender" in patient) patient_status = patient.status;

        return (
            <div className="grid-block vertical pl-component-card-patient">
                <PlComponentCardPatientHeader
                    ref="patient_card_header"
                    patient={patient}
                    mode_edit={mode_edit}
                    perform_database_action={this.props.perform_database_action}
                />
                {this.render_menu(patient, father, mother, children, mode_menu)}
            </div>
        );


    }
}