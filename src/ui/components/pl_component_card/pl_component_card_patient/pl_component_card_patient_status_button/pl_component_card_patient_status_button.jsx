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
import { PlComponentCardPatientStatus } from './../pl_component_card_patient_status/pl_component_card_patient_status';
import { isObjectAFunction } from './../../../../../modules/rkt_module_object';

export class PlComponentCardPatientStatusButton extends Component {


    on_click_component(type) {

        if(isObjectAFunction(this.props.on_click_component)){
            this.props.on_click_component(type);
        }
    }

    render() {

        var status = this.props.relative.status;
        var type = this.props.type;
        var gender = this.props.relative.gender;

        return (
            <div className="grid-block vertical pl-component-status-button" onClick={this.on_click_component.bind(this, type)}>
                <div className="grid-block align-center"><PlComponentCardPatientStatus status={status} gender={gender} /></div>
                <div className="grid-block align-center">{type}</div>
            </div>
        );

    }
}