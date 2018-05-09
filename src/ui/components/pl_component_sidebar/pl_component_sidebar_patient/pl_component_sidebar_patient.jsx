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
            mode:false
        }
    }

    on_set_mode(mode){

        console.log(mode);

    }

    render() {

        var patient = this.props.patient;
        var father = this.props.father;
        var mother = this.props.mother;
        var children = this.props.children;
        var mode = this.state.mode;
        var widget;

        if(this.state.mode !== false){
            widget = <PlComponentCardPatientWidget tittle={mode} />
        }

        return (
            <div className="grid-block pl-component-sidebar-patient vertical">
                <div className="grid-block shrink pl_component_sidebar_element">
                    <PlComponentCardPatient patient={patient} father={father} mother={mother} on_click_action={this.on_set_mode.bind(this)} children={children} mode={mode} ref="patient_card" />
                </div>
                <div className="grid-block shrink">
                    {widget}
                </div>
            </div>
        );

    }
}