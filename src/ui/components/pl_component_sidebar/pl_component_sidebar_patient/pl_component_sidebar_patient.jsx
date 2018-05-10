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
import {PlComponentCardPatient} from './../../pl_component_card/pl_component_card_patient/pl_component_card_patient';
import {PlComponentCardPatientWidget} from './../../pl_component_card/pl_component_card_patient/pl_component_card_patient_widget/pl_component_card_patient_widget';

export class PlComponentSidebarPatient extends Component {


    constructor(){
        
        super();

        this.state={
            mode_menu:false,
            mode_edit:false
        }
    }

    on_set_mode_menu(mode){

        if(this.state.mode_menu === mode){
            this.setState({
                mode_menu:false
            })
        }else{
            this.setState({
                mode_menu:mode
            })
        }
    }

    on_set_mode_edit(){

        this.setState({
            mode_edit:!this.state.mode_edit
        });
    }

    render(){

        var patient = this.props.patient;
        var father = this.props.father;
        var mother = this.props.mother;
        var children = this.props.children;
        var mode_menu = this.state.mode_menu;
        var mode_edit = this.state.mode_edit;
        var widget;

        if(this.state.mode_menu !== false){
            widget = <PlComponentCardPatientWidget tittle={mode_menu} />
        }

        return (
            <div className="grid-block pl-component-sidebar-patient vertical">
                <div className="grid-block shrink pl_component_sidebar_element">
                    <PlComponentCardPatient 
                    patient={patient} 
                    father={father} 
                    mother={mother}
                    on_click_action={this.on_set_mode_menu.bind(this)}
                    on_set_mode_edit={this.on_set_mode_edit.bind(this)}
                    on_set_children={children}
                    mode_menu={mode_menu}
                    mode_edit={mode_edit}
                    ref="patient_card" />
                </div>
                <div className="grid-block shrink">
                    {widget}
                </div>
            </div>
        );

    }
}