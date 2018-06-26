/*
# Patient line family tree viewer is (c) BCNMedTech, UNIVERSITAT POMPEU FABRA
#
# Patient line family tree viewer is free software: you can redistribute it and/or modify
# it under the terms of the GNU Affero General Public License as
# published by the Free Software Foundation, either version 3 of the
# License, or (at your option) any later version.
#
# Patient line family tree viewer is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU Affero General Public License for more details.
#
# You should have received a copy of the GNU Affero General Public License
# along with this program.  If not, see <http://www.gnu.org/licenses/>.
#
# Authors:
# Carlos Yagüe Méndez
# Paula Bassagañas
# Paula Bassagañas
# Contributors: 
# Begoña Benito
# Bart Bijnens
# Oscar Camara
*/

import React, { Component } from 'react';
import { isObjectAFunction } from './../../../../../modules/rkt_module_object';

export class PlComponentCardFamilyTextButton extends Component {
    
    on_click_component(type) {

        if (isObjectAFunction(this.props.on_click_component)) {
            this.props.on_click_component(type);
        }
    }

    render() {

        var text = this.props.text;
        var type = this.props.type;
        var selected = this.props.selected;
        var component_style;

        if(selected){

            component_style = "grid-block vertical pl-component-card-family-text-button selected";

        }else{

            component_style = "grid-block vertical pl-component-card-family-text-button";

        }


        return (
            <a className={component_style} onClick={this.on_click_component.bind(this, type)}>
                <div className="grid-block align-center"><h4>{text}</h4></div>
                <div className="grid-block align-center text">{type}</div>
            </a>
        );

    }
}