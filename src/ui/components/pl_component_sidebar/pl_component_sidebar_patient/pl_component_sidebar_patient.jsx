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
import { PlComponentTextFieldEditable } from './../../pl_component_text_field_editable/pl_component_text_field_editable';

//actions
import { create_table, update_patient_from_table, update_patient_from_text_field_editable } from './pl_component_sidebar_patient_actions';
import { findWhere, omit, without } from 'underscore';

export class PlComponentSidebarPatient extends Component {


    constructor() {

        super();

        this.state = {
            mode_menu: "relatives",
            mode_edit: false,
            family_default_columns: ["id", "name", "description", "num_family_members"],
            patient_default_columns: ["center", "nhc", "mutations", "diagnosis", "symptoms"],
            family_columns_selected: ["id", "name", "description", "num_family_members"],
            patient_columns_selected: ["center", "nhc", "mutations", "diagnosis", "symptoms"],
            to_remove_patient: false
        }
    }

    get_patient_comments() {

        return this.refs.patient_comments.refs.FormItemInputText.state.input.trim();

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
            var edited_inputs = {};
            edited_inputs["name"] = this.refs.patient_card.get_patient_name();
            edited_inputs["id"] = this.refs.patient_card.get_patient_id();
            edited_inputs["comments"] = this.get_patient_comments();

            var children = this.props.children;
            var father = this.props.father;
            var mother = this.props.mother;

            var new_data = update_patient_from_text_field_editable(edited_inputs, patient.id, updated_patient, children, father, mother);

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

                
                new_data["to_remove"] = to_remove;

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

    render_widget_patient_data(patient, data_tags_selected, mode_menu, mode_edit) {

        var data_tags = omit(patient, "children", "comments", "depth", "gender", "father", "id", "mother", "name", "num_relatives", "parent", "relation", "genotype", "phenotype", "x", "y");
        data_tags = [data_tags];

        var table_mode;
        if (mode_edit) table_mode = "edition";
        var data_table = create_table(patient, data_tags_selected);

        var widget_content =
            <div>
                <div className="pl_component_sidebar_patient_element">
                    <PlComponentMenuTags
                        data={data_tags}
                        keys_selected={data_tags_selected}
                        on_select_tag={this.on_select_tag.bind(this)}
                        on_un_selected_tag={this.on_unselect_tag.bind(this)} />
                </div>
                <div className="grid-block pl_component_sidebar_patient_element">
                    <PlComponentTable ref="patient_table" data={data_table} table_mode={table_mode} />
                </div>
            </div>


        var widget_style = { "display": "none" };
        if (mode_menu === "data") widget_style["display"] = "";

        return (
            <div className="grid-block" style={widget_style}>
                <PlComponentCardPatientWidget
                    ref="patient_widget_data"
                    tittle={mode_menu}
                    content={widget_content}
                />
            </div>
        );

    }

    render_widget_patient_comments(comments, mode_menu, mode_edit) {

        var widget_content;

        if (!isObjectEmpty(comments)) {

            widget_content =

                <PlComponentTextFieldEditable
                    text={comments}
                    isEditionMode={mode_edit ? true : false}
                    ref="patient_comments"
                />

        } else {

            var message;
            if (!mode_edit) {

                message = "There are not comments defined yet";

            } else {

                message =
                    <PlComponentTextFieldEditable
                        text={"There are not comments defined yet"}
                        isEditionMode={mode_edit ? true : false}
                        ref="patient_comments"
                    />

            }

            widget_content =

                <div className="grid-block pl_component_sidebar_patient_undefined_message">
                    {message}
                </div>

        }

        var widget_style = { "display": "none" };
        if (mode_menu === "comments") widget_style["display"] = "";

        return (
            <div className="grid-block" style={widget_style}>
                <PlComponentCardPatientWidget
                    tittle={mode_menu}
                    content={widget_content}
                />
            </div>
        );
    }

    render() {

        var patient = this.props.patient;
        var father = this.props.father;
        var mother = this.props.mother;
        var children = this.props.children;
        var relatives = this.props.relatives;
        var comments = patient.comments;

        var data_tags_selected = this.state.patient_columns_selected;

        var mode_menu = this.state.mode_menu;
        var mode_edit = this.props.mode_edit;

        var widget;

        if (this.state.mode_menu !== false) {

            var widget_content;

            if ((mode_menu !== "data") && (mode_menu !== "comments")) {

                if (mode_menu === "relatives") {

                    widget_content = <PlComponentCardPatientWidgetRelatives relatives={relatives} toDisplayCurrentPatient={false}/>

                } else if (mode_menu === "children") {

                    widget_content = <PlComponentCardPatientWidgetChildren patient={patient} children={children} perform_database_action={this.props.perform_database_action} />

                } else if (mode_menu === "father") {

                    widget_content = <PlComponentCardPatientWidgetParent parent={father} type_parent={mode_menu} />

                } else if (mode_menu === "mother") {

                    widget_content = <PlComponentCardPatientWidgetParent parent={mother} type_parent={mode_menu} />

                }

                widget =
                    <PlComponentCardPatientWidget
                        tittle={mode_menu}
                        content={widget_content}
                        perform_database_action={this.props.perform_database_action}
                    />

            }

        }

        return (
            <div className="grid-block vertical pl-component-sidebar-patient">
                <div className="grid-block shrink pl_component_sidebar_patient_element">
                    <PlComponentCardPatient
                        patient={patient}
                        father={father}
                        mother={mother}
                        children={children}
                        on_click_action={this.on_set_mode_menu.bind(this)}
                        mode_menu={mode_menu}
                        mode_edit={mode_edit}
                        ref="patient_card"
                        perform_database_action={this.props.perform_database_action}
                        on_ask_to_remove_patient={this.on_ask_to_remove_patient.bind(this)}
                    />
                </div>
                <div className="grid-block vertical">
                    <div className="grid-block shrink">
                        {widget}
                        {this.render_widget_patient_data(patient, data_tags_selected, mode_menu, mode_edit)}
                        {this.render_widget_patient_comments(comments, mode_menu, mode_edit)}
                    </div>
                </div>
                {this.render_edit_patient_button(mode_edit)}
                {this.render_modal()}
            </div>
        );

    }
}