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
        
        var phenotype = this.props.relative.phenotype;
        var genotype = this.props.relative.genotype;
        var gender = this.props.relative.gender;
        var type = this.props.type;
        var selected = this.props.selected;

        var component_style;

        if(selected){

            component_style = "grid-block vertical pl-component-status-button pl-component-status-button-selected";

        }else{

            component_style = "grid-block vertical pl-component-status-button";

        }

        return (
            <a className={component_style} onClick={this.on_click_component.bind(this, type)}>
                <div className="grid-block align-center">
                    <PlComponentCardPatientStatus phenotype={phenotype} genotype={genotype} gender={gender} />
                </div>
                <div className="grid-block align-center text">{type}</div>
            </a>
        );

    }
}