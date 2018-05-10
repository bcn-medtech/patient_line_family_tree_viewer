import React, { Component } from 'react';

//actions
import { create_table, /*create_list_vertical,*/ update_patient } from './pl_component_sidebar_actions';

//components
import { PlComponentSidebarHeader } from './pl_component_sidebar_header/pl_component_sidebar_header';
import { PlComponentSidebarPatient } from './pl_component_sidebar_patient/pl_component_sidebar_patient';

//#TODO organizar
import { isObjectEmpty, isObjectAFunction, isObjectAnArray } from './../../../modules/rkt_module_object';
import { keys, without } from 'underscore';

export class PlComponentSidebar extends Component {

    constructor() {
        super();

        this.state = {
            mode: "patient",
        }
    }

    set_database_component_mode(mode) {

        this.setState({
            mode: mode
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