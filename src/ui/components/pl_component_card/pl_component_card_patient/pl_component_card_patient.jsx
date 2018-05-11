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
import { PlComponentCardPatientStatusCombobox } from './pl_component_card_patient_status_combobox/pl_component_card_patient_status_combobox';
import { PlComponentCardPatientStatusButton } from './pl_component_card_patient_status_button/pl_component_card_patient_status_button';
import { PlComponentCardPatientGenderCombobox } from './pl_component_card_patient_gender_combobox/pl_component_card_patient_gender_combobox';
import { PlComponentCardPatientTextButton } from './pl_component_card_patient_text_button/pl_component_card_patient_text_button';

//modules
import {
    isObjectEmpty, isObjectAnArray, isObjectAFunction
} from './../../../../modules/rkt_module_object';

import { PlComponentTextFieldEditable } from './../../pl_component_text_field_editable/pl_component_text_field_editable';

export class PlComponentCardPatient extends Component {

    on_edit_patient() {

        if(isObjectAFunction(this.props.on_set_mode_edit)){

            this.props.on_set_mode_edit();

        }
    }

    on_remove_patient(){
        alert("On delete patient");
    }

    on_click_card_component(type) {

        if (type === "father" || type === "mother" || type === "children" || type == "relatives") {

            if (isObjectAFunction(this.props.on_click_action)) {

                this.props.on_click_action(type);

            }
        }
    }

    render_menu(patient, father, mother, children, mode_menu,mode_edit) {

        var patient_num_relatives;
        var patient_num_children;
        var gender;
        var mode_relatives = false;
        var mode_children = false;
        var mode_father = false;
        var mode_mother = false;

        if ("num_relatives" in patient) {
            patient_num_relatives = patient.num_relatives;
        }

        if ("gender" in patient) {
            gender = patient.gender;
        }
        
        if (!isObjectEmpty(children)) {
            if (isObjectAnArray(children)) {
                patient_num_children = children.length;
            } else {
                patient_num_children = 0;
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
        }

        return (
            <div className="grid-block card-row">
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
                    <PlComponentCardPatientGenderCombobox
                        gender={gender}
                        ref="patient_gender"
                    mode_edit={mode_edit}/>
                </div>
                <div className="grid-block shrink card-item">
                    <PlComponentCardPatientStatusCombobox
                        status={patient.status}
                        gender={patient.gender}
                        ref="patient_status"
                        mode_edit={mode_edit}/>
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
            </div>
        );
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

        var button_delete =
            {
                "name": "delete",
                "icon": <svg width='10' height='18' viewBox='0 0 16 24' fill-rule='evenodd'><path d='M4 0h8v2H4zM0 3v4h1v17h14V7h1V3H0zm13 18H3V8h10v13z'></path><path d='M5 10h2v9H5zm4 0h2v9H9z'></path></svg>
            }

        var button_edit =
            {
                "name": "edit",
                "icon": <svg width='15' height='15' viewBox='0 0 16 16' fill-rule='evenodd'><path d='M2.032 10.924l7.99-7.99 2.97 2.97-7.99 7.99zm9.014-8.91l1.98-1.98 2.97 2.97-1.98 1.98zM0 16l3-1-2-2z'></path></svg>,
                "selected":mode_edit
            }

        if ("id" in patient) {
            patient_id = patient.id;
        }

        if ("name" in patient) {
            patient_name = patient.name;
        }

        return (
            <div className="grid-block vertical pl-component-card-patient">
                <div className="grid-block card-header">
                    <div className="grid-block vertical card-item">
                        <div className="grid-block shrink">
                            <h4>
                                <PlComponentTextFieldEditable
                                    text={patient_name}
                                    isEditionMode={mode_edit ? true : false} 
                                />
                            </h4>
                        </div>
                        <div className="grid-block shrink">
                            <PlComponentTextFieldEditable 
                                text={patient_id} 
                                isEditionMode={mode_edit ? true : false} 
                            />
                        </div> 
                    </div>
                    <div className="grid-block shrink">
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
                    </div>
                    <div className="grid-block shrink">
                        <PlComponentButtonCircle
                            text={""}
                            icon={button_delete.icon}
                            backgroundcolor={"transparent"}
                            backgroundhovercolor={"#5C4EE5"}
                            fontcolor={"#5C4EE5"}
                            fonthovercolor={"white"}
                            bordercolor={"#5C4EE5"}
                            borderhovercolor={"#5C4EE5"}
                            onclickelement={this.on_remove_patient.bind(this, button_delete.name)} />
                    </div>
                </div>
                {this.render_menu(patient, father, mother, children, mode_menu,mode_edit)}
            </div>
        );


    }
}