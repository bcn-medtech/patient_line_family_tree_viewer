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
//modules
import { isObjectAFunction, isObjectEmpty } from './../../../../modules/rkt_module_object';
//components
import { PlComponentButtonRect } from './../../pl_component_button/pl_component_button_rect/pl_component_button_rect';
import { PlComponentCardPatient } from './../../pl_component_card/pl_component_card_patient/pl_component_card_patient';
import { PlComponentCardPatientWidget } from './../../pl_component_card/pl_component_card_patient/pl_component_card_patient_widget/pl_component_card_patient_widget';
import { PlComponentCardPatientWidgetChildren } from './../../pl_component_card/pl_component_card_patient/pl_component_card_patient_widget/pl_component_card_patient_widget_children/pl_component_card_patient_widget_children';
import { PlComponentCardPatientWidgetParent } from './../../pl_component_card/pl_component_card_patient/pl_component_card_patient_widget/pl_component_card_patient_widget_parent/pl_component_card_patient_widget_parent';
import { PlComponentCardPatientWidgetRelatives } from './../../pl_component_card/pl_component_card_patient/pl_component_card_patient_widget/pl_component_card_patient_widget_relatives/pl_component_card_patient_widget_relatives';
import { PlComponentConfirmMessage } from './../../pl_component_comfirm_message/pl_component_confirm_message';
import { PlComponentMenuTags } from './../../pl_component_menu/pl_component_menu_tags/pl_component_menu_tags';
import { PlComponentModal } from './../../pl_component_modal/pl_component_modal';
import { PlComponentTable } from './../../pl_component_table/pl_component_table';

//actions
import { create_table, update_patient_from_table, update_patient_from_text_field_editable } from './pl_component_sidebar_patient_actions';
import { findWhere, without } from 'underscore';

export class PlComponentSidebarPatient extends Component {


    constructor() {

        super();

        this.state = {
            mode_menu: false,
            mode_edit: false,
            family_default_columns: ["id", "name", "description", "num_family_members"],
            patient_default_columns: ["id", "name", "gender", "mother", "married_with", "family_id", "center", "num_relatives"],
            family_columns_selected: ["id", "name", "description", "num_family_members"],
            patient_columns_selected: ["id", "name", "gender", "mother", "married_with", "family_id", "center", "num_relatives"],
            to_remove_patient: false
        }
    }

    componentWillReceiveProps(nextProps) {

        if (this.props !== nextProps) {

            this.setState({
                mode_edit: false
            });

        }

    }

    on_set_mode_menu(mode) {

        if (this.state.mode_menu === mode) {
            this.setState({
                mode_menu: false
            })
        } else {
            this.setState({
                mode_menu: mode
            })
        }
    }

    on_set_mode_edit() {

        this.setState({
            mode_edit: !this.state.mode_edit
        });
    }

    on_select_tag(tag) {

        var updated_patient_columns_selected = this.state.patient_columns_selected.slice();
        updated_patient_columns_selected.push(tag);

        this.setState({
            patient_columns_selected: updated_patient_columns_selected
        });

    }

    on_unselect_tag(tag) {

        var patient_columns_selected = this.state.patient_columns_selected;
        var updated_patient_columns_selected = without(patient_columns_selected, tag);

        this.setState({
            patient_columns_selected: updated_patient_columns_selected
        });
    }

    on_save_data_patient() {

        if (isObjectAFunction(this.props.perform_database_action)) {

            var patient = this.props.patient;
            var updated_patient;
            
            // "table"
            var edited_table = this.refs.patient_table.refs;
            updated_patient = update_patient_from_table(patient, edited_table);

            // "text_field_editable"
            var edited_name = this.refs.patient_card.refs.patient_name.refs.FormItemInputText.state.input;
            var edited_id = this.refs.patient_card.refs.patient_id.refs.FormItemInputText.state.input;
            var couple_patient;
            if (!isObjectEmpty(patient.married_with)) couple_patient = findWhere(this.props.relatives, {"id":patient.married_with});
            var children = this.props.children;
            var father = this.props.father;
            var mother = this.props.mother;

            var new_data = update_patient_from_text_field_editable(edited_name, edited_id, patient.id, updated_patient, couple_patient, children, father, mother);
            
            // the changes in "table" and "text_field_editable" are saved
            if ("patient_to_update" in new_data) updated_patient = new_data.patient_to_update;
            else updated_patient = new_data;
            
            var data = {
                "action": "edit_patient",
                "data": new_data,
                "patient_id": updated_patient.id,
                "family_id": updated_patient.family_id
            };
            this.props.perform_database_action(data);

        }

    }

    on_ask_to_remove_patient() {

        this.setState({
            to_remove_patient: true
        });

    }

    on_remove_patient(answer) {

        if (answer === "Yes") {

            if (isObjectAFunction(this.props.perform_database_action)) {
                
                var new_data = {};
                var to_remove = [];
                var to_update = [];
                
                var patient = this.props.patient;
                to_remove.push(patient.id);

                var father = this.props.father;
                var mother = this.props.mother;

                if (father && mother) {

                    // we remove this patient from the "children" array of their parents
                    var father_children = without(father.children, patient.id);
                    var mother_children = without(mother.children, patient.id);
                    father.children = father_children;
                    mother.children = mother_children;

                    to_update.push(father);
                    to_update.push(mother);

                    new_data["to_update"] = to_update;

                }
                
                // in case this patient has a couple, should this couple be removed too?
                if (!isObjectEmpty(patient.married_with)) {

                    to_remove.push(patient.married_with);
                    
                    // TRY:
                    // var couple_patient = findWhere(this.props.relatives, {"id":patient.married_with});

                    // if ((!couple_patient.father) && (!couple_patient.mother)) {

                    //     to_remove.push(patient.married_with);

                    // }
                    
                }

                new_data["to_remove"] = to_remove;

                // var data = { 
                //     "action": "remove_patient",
                //     "data": { 
                //         "to_remove": to_remove, 
                //         "to_update": [ father, mother ] 
                //     },
                //     "patient_id": undefined,
                //     "family_id": patient.family_id 
                // };

                var data = { 
                    "action": "remove_patient",
                    "data": new_data,
                    "patient_id": undefined,
                    "family_id": patient.family_id 
                };
                
                this.refs.ModalRemovePatient.closeModal();
                this.props.perform_database_action(data);

            }

        } else if (answer === "Cancel") {

            this.refs.ModalRemovePatient.closeModal();

        }

    }

    on_close_modal(answer) {

        this.setState({
            to_remove_patient: false
        })

    }

    render_edit_patient_button(mode_edit) {

        if (mode_edit) {

            return (
                <div style={{ "position": "absolute", "bottom": "0px", "right": "0px", "margin": "20px" }}>
                    <PlComponentButtonRect
                        text={"Save"}
                        backgroundcolor={"transparent"} backgroundhovercolor={"#5C4EE5"}
                        fontcolor={"#5C4EE5"} fonthovercolor={"white"}
                        bordercolor={"#5C4EE5"} borderhovercolor={"#5C4EE5"}
                        onclickelement={this.on_save_data_patient.bind(this)}
                    />
                </div>
            );

        }

    }

    render_modal() {
        
        if (this.state.to_remove_patient) {
            
            var patient = this.props.patient;
            var message_to_show = "Are you sure you want to remove the patient " + patient.id + "?";

            var content =
                <PlComponentConfirmMessage
                    message={message_to_show}
                    extra_message={"This action will remove it forever"}
                    onclickanswerbutton={this.on_remove_patient.bind(this)}
                />

            return (
                <PlComponentModal
                    ref="ModalRemovePatient"
                    title={""}
                    Modal_content={content}
                    onclickesc={this.on_close_modal.bind(this)}
                />
            );

        }

    }

    render() {
        
        var patient = this.props.patient;
        var father = this.props.father;
        var mother = this.props.mother;
        var children = this.props.children;
        var relatives = this.props.relatives;
        var mode_menu = this.state.mode_menu;
        var mode_edit = this.state.mode_edit;
        var widget;
        var table_mode;

        if (mode_edit) {

            table_mode = "edition";
        }

        if (this.state.mode_menu !== false) {

            var widget_content;

            if (mode_menu === "relatives") {

                widget_content = <PlComponentCardPatientWidgetRelatives relatives={relatives} />

            } else if (mode_menu === "children") {

                widget_content = <PlComponentCardPatientWidgetChildren patient={patient} children={children} mode_edit={mode_edit} perform_database_action={this.props.perform_database_action} />

            } else if (mode_menu === "father") {

                widget_content = <PlComponentCardPatientWidgetParent parent={father} type_parent={mode_menu} mode_edit={mode_edit} perform_database_action={this.props.perform_database_action} />

            } else if (mode_menu === "mother") {

                widget_content = <PlComponentCardPatientWidgetParent parent={mother} type_parent={mode_menu} mode_edit={mode_edit} perform_database_action={this.props.perform_database_action} />
            }

            widget = <PlComponentCardPatientWidget tittle={mode_menu} content={widget_content} perform_database_action={this.props.perform_database_action} />
        }

        var data_keys_selected = this.state.patient_columns_selected;
        var data = [];
        data.push(patient);
        var data_table = create_table(patient, data_keys_selected);

        return (
            <div className="grid-block vertical pl-component-sidebar-patient">
                <div className="grid-block shrink pl_component_sidebar_patient_element">
                    <PlComponentCardPatient
                        patient={patient}
                        father={father}
                        mother={mother}
                        children={children}
                        on_click_action={this.on_set_mode_menu.bind(this)}
                        on_set_mode_edit={this.on_set_mode_edit.bind(this)}
                        mode_menu={mode_menu}
                        mode_edit={mode_edit}
                        ref="patient_card"
                        perform_database_action={this.props.perform_database_action}
                        on_ask_to_remove_patient={this.on_ask_to_remove_patient.bind(this)} />
                </div>
                <div className="grid-block shrink">
                    {widget}
                </div>
                <div className="pl_component_sidebar_patient_element scrollable-content">
                    <PlComponentMenuTags
                        data={data}
                        keys_selected={data_keys_selected}
                        on_select_tag={this.on_select_tag.bind(this)}
                        on_un_selected_tag={this.on_unselect_tag.bind(this)} />
                </div>
                <div className="grid-block pl_component_sidebar_patient_element">
                    <PlComponentTable ref="patient_table" data={data_table} table_mode={table_mode} />
                </div>
                {this.render_edit_patient_button(mode_edit)}
                {this.render_modal()}
            </div>
        );

    }
}