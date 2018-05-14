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
import { isObjectAFunction } from './../../../../modules/rkt_module_object';
import { PlComponentCardPatient } from './../../pl_component_card/pl_component_card_patient/pl_component_card_patient';
import { PlComponentCardPatientWidget } from './../../pl_component_card/pl_component_card_patient/pl_component_card_patient_widget/pl_component_card_patient_widget';
import { PlComponentCardPatientWidgetChildren } from './../../pl_component_card/pl_component_card_patient/pl_component_card_patient_widget/pl_component_card_patient_widget_children/pl_component_card_patient_widget_children';
import { PlComponentCardPatientWidgetParent } from './../../pl_component_card/pl_component_card_patient/pl_component_card_patient_widget/pl_component_card_patient_widget_parent/pl_component_card_patient_widget_parent';
import { PlComponentCardPatientWidgetRelatives } from './../../pl_component_card/pl_component_card_patient/pl_component_card_patient_widget/pl_component_card_patient_widget_relatives/pl_component_card_patient_widget_relatives';
import { PlComponentMenuTags } from './../../pl_component_menu/pl_component_menu_tags/pl_component_menu_tags';
import { PlComponentTable } from './../../pl_component_table/pl_component_table';

//actions
import { create_table, update_patient_from_table } from './pl_component_sidebar_patient_actions';
import { keys, without, map } from 'underscore';

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

    on_save_data_table() { // TODO

        //if (isObjectAFunction(this.props.perform_database_action)) {

        var patient = this.props.patient;
        var edited_table = this.refs.patient_table.refs;

        var updated_patient = update_patient_from_table(patient, edited_table);
        //var data = { "action": "edit", "data": updated_patient };

        //this.props.perform_database_action(data);

        //}

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
                
                widget_content = <PlComponentCardPatientWidgetRelatives relatives={relatives}/>

            } else if (mode_menu === "children") {

                widget_content = <PlComponentCardPatientWidgetChildren children={children} mode_edit={mode_edit} />

            } else if (mode_menu === "father") {

                widget_content = <PlComponentCardPatientWidgetParent parent={father} type_parent={mode_menu} mode_edit={mode_edit} />

            } else if (mode_menu === "mother") {

                widget_content = <PlComponentCardPatientWidgetParent parent={mother} type_parent={mode_menu} mode_edit={mode_edit} />
            }

            widget = <PlComponentCardPatientWidget tittle={mode_menu} content={widget_content} />
        }

        var data_keys_selected = this.state.patient_columns_selected;
        var data = [];
        data.push(patient);
        var data_table = create_table(patient, data_keys_selected);

        return (
            <div className="grid-block pl-component-sidebar-patient vertical">
                <div className="grid-block shrink pl_component_sidebar_patient_element">
                    <PlComponentCardPatient
                        patient={patient}
                        father={father}
                        mother={mother}
                        children={children}
                        on_click_action={this.on_set_mode_menu.bind(this)}
                        on_set_mode_edit={this.on_set_mode_edit.bind(this)}
                        //on_set_children={children}
                        mode_menu={mode_menu}
                        mode_edit={mode_edit}
                        ref="patient_card" />
                </div>
                <div className="grid-block shrink">
                    {widget}
                </div>
                <div className="pl_component_sidebar_patient_element">
                    <PlComponentMenuTags
                        data={data}
                        keys_selected={data_keys_selected}
                        on_select_tag={this.on_select_tag.bind(this)}
                        on_un_selected_tag={this.on_unselect_tag.bind(this)} />
                </div>
                <div className="grid-block pl_component_sidebar_patient_element">
                    <PlComponentTable ref="patient_table" data={data_table} table_mode={table_mode} />
                </div>
            </div >
        );

    }
}