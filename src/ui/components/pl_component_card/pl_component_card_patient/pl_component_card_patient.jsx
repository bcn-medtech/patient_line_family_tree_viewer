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
import { PlComponentButtonCircle } from './../../pl_component_button/pl_component_button_circle/pl_component_button_circle';
import { PlComponentButtonCircleSelectable } from './../../pl_component_button/pl_component_button_circle_selectable/pl_component_button_circle_selectable';
import { PlComponentCardPatientGenderCombobox } from './pl_component_card_patient_gender_combobox/pl_component_card_patient_gender_combobox';
import { PlComponentCardPatientStatusCombobox } from './pl_component_card_patient_status_combobox/pl_component_card_patient_status_combobox';
import { PlComponentCardPatientStatusButton } from './pl_component_card_patient_status_button/pl_component_card_patient_status_button';
import { PlComponentCardPatientTextButton } from './pl_component_card_patient_text_button/pl_component_card_patient_text_button';
import { PlComponentTextFieldEditable } from './../../pl_component_text_field_editable/pl_component_text_field_editable';

//modules
import {
    isObjectEmpty, isObjectAnArray, isObjectAFunction
} from './../../../../modules/rkt_module_object';
import { mapObject } from 'underscore';

export class PlComponentCardPatient extends Component {

    on_edit_patient() {

        if (isObjectAFunction(this.props.on_set_mode_edit)) {

            this.props.on_set_mode_edit();

        }
    }

    on_remove_patient() {

        if (isObjectAFunction(this.props.on_ask_to_remove_patient)) {

            var patient = this.props.patient;

            if (isObjectEmpty(patient.children)) {

                this.props.on_ask_to_remove_patient();

            } else alert("You cannot delete a patient with children");

        }

    }

    on_export_patient() {

        if (isObjectAFunction(this.props.on_ask_to_export_patient)) {

            this.props.on_ask_to_export_patient();
        }

    }

    on_click_card_component(type) {

        if (type === "father" || type === "mother" || type === "children" || type === "relatives"
            || type === "Data" || type === "Comments") {

            if (isObjectAFunction(this.props.on_click_action)) {

                this.props.on_click_action(type);

            }
        }
    }

    perform_database_action(data_to_update) {

        if (isObjectAFunction(this.props.perform_database_action)) {

            var key_to_update = data_to_update.key;
            var updated_value = data_to_update.value;

            var patient = this.props.patient;
            var updated_patient = mapObject(patient, function (value, key) {
                return value;
            });

            updated_patient[key_to_update] = updated_value;

            var data = {
                "action": "edit_patient",
                "data": updated_patient,
                "patient_id": updated_patient.id,
                "family_id": updated_patient.family_id
            };
            this.props.perform_database_action(data);


        }
    }

    render_menu(patient, father, mother, children, mode_menu, mode_edit) {

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
        } else if (mode_menu === "Data") {
            mode_data = true;
        } else if (mode_menu === "Comments") {
            mode_comments = true;
        }

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
                        text={""}
                        type="Data"
                        on_click_component={this.on_click_card_component.bind(this)}
                        selected={mode_data} />
                </div>
                <div className="grid-block shrink card-item">
                    <PlComponentCardPatientTextButton
                        text={""}
                        type="Comments"
                        on_click_component={this.on_click_card_component.bind(this)}
                        selected={mode_comments} />
                </div>
            </div>
        );
    }

    get_patient_id() {

        return this.refs.patient_id.refs.FormItemInputText.state.input;

    }

    get_patient_name() {

        return this.refs.patient_name.refs.FormItemInputText.state.input;

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

        var button_delete =
            {
                "name": "delete",
                "icon": <svg width='10' height='18' viewBox='0 0 16 24' fillRule='evenodd'><path d='M4 0h8v2H4zM0 3v4h1v17h14V7h1V3H0zm13 18H3V8h10v13z'></path><path d='M5 10h2v9H5zm4 0h2v9H9z'></path></svg>
            }

        var button_edit =
            {
                "name": "edit",
                "icon": <svg width='15' height='15' viewBox='0 0 16 16' fillRule='evenodd'><path d='M2.032 10.924l7.99-7.99 2.97 2.97-7.99 7.99zm9.014-8.91l1.98-1.98 2.97 2.97-1.98 1.98zM0 16l3-1-2-2z'></path></svg>,
                "selected": mode_edit
            }

        var button_export =
            {
                "name": "export",
                "icon": <svg width='15' height='15' viewBox='0 0 24 24' fillRule='evenodd'><path d='M19 9.4l-1.2-1.1L13 13V0h-2v13L6.2 8.3 5 9.4l7 6.6z'></path><path d='M22 14v6H2v-6H0v10h24V14z'></path></svg>
            }

        if ("id" in patient) {
            patient_id = patient.id;
        }

        if ("name" in patient) {
            patient_name = patient.name;
        }

        if ("gender" in patient) {
            patient_gender = patient.gender;
        }

        if ("gender" in patient) {
            patient_status = patient.status;
        }

        return (
            <div className="grid-block vertical pl-component-card-patient">
                <div className="grid-block card-header">
                    <div className="grid-block align-spaced shrink card-row-gender-status">
                        <div className="grid-block shrink card-item">
                            <PlComponentCardPatientGenderCombobox
                                gender={patient_gender}
                                ref="patient_gender"
                                mode_edit={mode_edit}
                                perform_database_action={this.perform_database_action.bind(this)} />
                        </div>
                        <div className="grid-block shrink card-item">
                            <PlComponentCardPatientStatusCombobox
                                status={patient_status}
                                gender={patient_gender}
                                ref="patient_status"
                                mode_edit={mode_edit}
                                perform_database_action={this.perform_database_action.bind(this)} />
                        </div>
                    </div>
                    <div className="grid-block shrink vertical card-item">
                        <div className="grid-block shrink">
                            <h4>
                                <PlComponentTextFieldEditable
                                    text={patient_name}
                                    isEditionMode={mode_edit ? true : false}
                                    ref="patient_name"
                                />
                            </h4>
                        </div>
                        <div className="grid-block shrink">
                            <PlComponentTextFieldEditable
                                text={patient_id}
                                isEditionMode={mode_edit ? true : false}
                                ref="patient_id" />
                        </div>

                    </div>
                    <div className="grid-block pl-component-card-patient-edition-buttons shrink">
                        <PlComponentButtonCircleSelectable
                            text={""}
                            icon={button_edit.icon}
                            backgroundcolor={"transparent"}
                            backgroundhovercolor={"#5C4EE5"}
                            backgroundselectedcolor={"#5C4EE5"}
                            fontcolor={"#5C4EE5"}
                            fonthovercolor={"white"}
                            fontselectedcolor={"white"}
                            bordercolor={"#5C4EE5"}
                            borderhovercolor={"#5C4EE5"}
                            borderselectedcolor={"#5C4EE5"}
                            selected={button_edit.selected}
                            onclickelement={this.on_edit_patient.bind(this, button_edit.name)} />
                        <PlComponentButtonCircle
                            icon={button_delete.icon}
                            backgroundcolor={"transparent"}
                            backgroundhovercolor={"#5C4EE5"}
                            fontcolor={"#5C4EE5"}
                            fonthovercolor={"white"}
                            bordercolor={"#5C4EE5"}
                            borderhovercolor={"#5C4EE5"}
                            onclickelement={this.on_remove_patient.bind(this, button_delete.name)} />
                        <PlComponentButtonCircle
                            icon={button_export.icon}
                            backgroundcolor={"transparent"}
                            backgroundhovercolor={"#5C4EE5"}
                            fontcolor={"#5C4EE5"}
                            fonthovercolor={"white"}
                            bordercolor={"#5C4EE5"}
                            borderhovercolor={"#5C4EE5"}
                            onclickelement={this.on_export_patient.bind(this, button_export.name)} />
                    </div>
                </div>
                {this.render_menu(patient, father, mother, children, mode_menu, mode_edit)}
            </div>
        );


    }
}