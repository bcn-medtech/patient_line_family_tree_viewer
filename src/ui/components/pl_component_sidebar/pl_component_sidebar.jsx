import React, { Component } from 'react';

//actions
import {create_table} from './pl_component_sidebar_actions';

//components
//import { PlComponentDatabaseHeader } from './../../components/pl_component_database/pl_component_database_header/pl_component_database_header';
import { PlComponentSidebarHeader } from './pl_component_sidebar_header/pl_component_sidebar_header';
import { PlComponentCardPatient } from './../pl_component_card/pl_component_card_patient/pl_component_card_patient';
import { PlComponentMenuTags } from './../pl_component_menu/pl_component_menu_tags/pl_component_menu_tags';
import { isObjectEmpty, isObjectAnArray } from './../../../modules/rkt_module_object';
import { PlComponentTable } from './../pl_component_table/pl_component_table';
import { PlComponentButtonRect } from './../pl_component_button/pl_component_button_rect/pl_component_button_rect';
import { keys } from 'underscore';

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

    on_select_tag() {

    }

    on_unselect_tag() {

    }

    on_save_data() {

    }

    render_menu_patient(patient) {

        var data_keys_selected = this.state.patient_columns_selected;
        var data = [];
        data.push(patient);
        var data_table = create_table(patient);
        console.log(data_table);

        return (
            <div className="grid-block vertical">
                <div className="grid-block shrink pl_component_sidebar_element">
                    <PlComponentCardPatient patient={patient} />
                </div>
                <div className="grid-block shrink pl_component_sidebar_element">
                    <PlComponentMenuTags data={data} keys_selected={data_keys_selected} on_select_tag={this.on_select_tag.bind(this)} on_un_selected_tag={this.on_unselect_tag.bind(this)}></PlComponentMenuTags>
                </div>
                <div className="grid-block pl_component_sidebar_element">
                    <PlComponentTable data={data_table} />
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
                onclickelement={this.on_save_data.bind(this)} />
                </div>
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