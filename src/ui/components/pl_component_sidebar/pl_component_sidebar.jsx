import React, { Component } from 'react';

//actions
import {create_table} from './pl_component_sidebar_actions';

//components
//import { PlComponentDatabaseHeader } from './../../components/pl_component_database/pl_component_database_header/pl_component_database_header';
import { PlComponentSidebarHeader } from './pl_component_sidebar_header/pl_component_sidebar_header';
import { PlComponentCardPatient } from './../pl_component_card/pl_component_card_patient/pl_component_card_patient';
import { PlComponentCardPatientWidget } from './../pl_component_card/pl_component_card_patient/pl_component_card_patient_widget/pl_component_card_patient_widget';
import { keys } from 'underscore';
import { PlComponentSidebarPatient } from './pl_component_sidebar_patient/pl_component_sidebar_patient';

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

    /*render_menu_patient(patient,father,mother,children) {

        return (
            <div className="grid-block vertical">
                <div className="grid-block shrink pl_component_sidebar_element">
                    <PlComponentCardPatient patient={patient} father={father} mother={mother} children={children} ref="patient_card"/>
                </div>
                <div className="grid-block shrink">
                    <PlComponentCardPatientWidget tittle="relatives"/>
                </div>
                
            </div>
        )
    }*/

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
        var father = this.props.father;
        var mother = this.props.mother;
        var children = this.props.children;
        var mode = this.state.mode;
        var sidebar;

        if (mode === "patient") {

            sidebar = <PlComponentSidebarPatient patient={patient} mother={mother} father={father} children={children}/>

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