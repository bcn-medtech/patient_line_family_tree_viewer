import React, { Component } from 'react';

//actions
import { create_table, /*create_list_vertical,*/ update_patient } from './pl_component_sidebar_actions';

//components
//import { PlComponentDatabaseHeader } from './../../components/pl_component_database/pl_component_database_header/pl_component_database_header';
import { PlComponentSidebarHeader } from './pl_component_sidebar_header/pl_component_sidebar_header';
import { PlComponentCardPatient } from './../pl_component_card/pl_component_card_patient/pl_component_card_patient';
import { PlComponentMenuTags } from './../pl_component_menu/pl_component_menu_tags/pl_component_menu_tags';
import { isObjectEmpty, isObjectAFunction, isObjectAnArray } from './../../../modules/rkt_module_object';
import { PlComponentTable } from './../pl_component_table/pl_component_table';
import { PlComponentButtonRect } from './../pl_component_button/pl_component_button_rect/pl_component_button_rect';
//import { PlComponentWidgetListVertical } from './../pl_component_widget/pl_component_widget_list_vertical/pl_component_widget_list_vertical.jsx';
import { keys, without } from 'underscore';

export class PlComponentSidebar extends Component {

    constructor() {
        super();

        this.state = {
            mode: "patient",
            family_default_columns: ["id", "name", "description", "num_family_members"],
            patient_default_columns: ["id", "name", "gender", "mother", "married_with", "family_id", "center", "num_relatives"],
            family_columns_selected: ["id", "name", "description", "num_family_members"],
            patient_columns_selected: ["id", "name", "gender", "mother", "married_with", "family_id", "center", "num_relatives"],
        }
    }

    set_database_component_mode(mode) {

        this.setState({
            mode: mode
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

    on_save_data_table() {

        if (isObjectAFunction(this.props.perform_database_action)) {

            var patient = this.props.patient;
            var data_keys = keys(patient);

            var updated_table = this.refs.sidebarTable.refs;
            var updated_table_keys = keys(updated_table);

            var updated_patient = {};

            for (var i = 0; i < data_keys.length; i++) {

                if (updated_table_keys.includes(data_keys[i])) {
                    
                    updated_patient[data_keys[i]] = updated_table[data_keys[i]].state.input;

                } else {

                    updated_patient[data_keys[i]] = patient[data_keys[i]];

                }

            }

            //console.log(updated_patient);
            var data = { "action": "edit", "data": updated_patient };

            this.props.perform_database_action(data);

        }

    }

    on_save_data_list_vertical(updated_table, changed_items, action) {

        if (isObjectAFunction(this.props.perform_database_action)) {

            var patient = this.props.patient;
            var updated_patient = update_patient(patient, updated_table);
            //console.log(updated_patient);
            var data = { "action": "edit", "data": updated_patient };

            this.props.perform_database_action(data);

        }

    }


    render_menu_patient(patient) {

        var data_keys_selected = this.state.patient_columns_selected;
        var data = [];
        data.push(patient);
        var data_table = create_table(patient, data_keys_selected);
        console.log(data_table);
        // var data_list_vertical = create_list_vertical(patient, data_keys_selected);
        // console.log(data_list_vertical);

        return (
            <div className="grid-block vertical">
                <div className="grid-block shrink pl_component_sidebar_element">
                    <PlComponentCardPatient patient={patient} />
                </div>
                <div className="pl_component_sidebar_element">
                    <PlComponentMenuTags data={data} keys_selected={data_keys_selected} on_select_tag={this.on_select_tag.bind(this)} on_un_selected_tag={this.on_unselect_tag.bind(this)}></PlComponentMenuTags>
                </div>
                <div className="grid-block pl_component_sidebar_element">
                    <PlComponentTable ref="sidebarTable" data={data_table} table_mode={"edition"} />
                </div>
                <div className="grid-block pl_component_sidebar_element_footer">
                    <PlComponentButtonRect
                        text="Save"
                        backgroundcolor={"transparent"}
                        backgroundhovercolor={"#5C4EE5"}
                        fontcolor={"#5C4EE5"}
                        fonthovercolor={"white"}
                        bordercolor={"#5C4EE5"}
                        borderhovercolor={"#5C4EE5"}
                        onclickelement={this.on_save_data_table.bind(this)} />
                </div>
                {/* <PlComponentWidgetListVertical
                    ref="measurementsList"
                    // isEditable={((roleUser === "super-admin") || (roleUser === "admin") || (roleUser === "editor")) ? true : false}
                    // editor_actions={["search", "edit", "add", "delete"]}
                    isEditable={true}
                    editor_actions={["edit"]}
                    icon={""}
                    title={"Data"}
                    type_of_list_vertical={"info"}
                    list_vertical_items={data_list_vertical}
                    saveWidgetChanges={this.on_save_data_list_vertical.bind(this)}
                /> */}
            </div>
        )
    }

    render_menu_family(family) {

        console.log(family);

        return (
            <div className="grid-block vertical">

            </div>
        )
    }

    render() {

        var sidebar_header_items = ["patient", "family"];
        var family = this.props.family;
        var patient = this.props.patient;
        var mode = this.state.mode;
        var sidebar;


        if (mode === "patient") {

            sidebar = this.render_menu_patient(patient);

        } else if (mode === "family") {

            sidebar = this.render_menu_family(family);

        }

        return (
            <div className="grid-block vertical pl_component_sidebar">
                <div className="grid-block shrink pl_component_sidebar_element">
                    <PlComponentSidebarHeader mode={this.state.mode} items={sidebar_header_items} set_database_component_mode={this.set_database_component_mode.bind(this)} />
                </div>
                {sidebar}
            </div>
        );
    }
}