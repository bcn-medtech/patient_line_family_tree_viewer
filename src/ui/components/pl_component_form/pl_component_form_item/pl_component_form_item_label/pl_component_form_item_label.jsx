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

export class PlComponentFormItemLabel extends Component {

    constructor() {

        super()

        this.state = {
            loaded: false,
        };

    }

    render() {

        var label = this.props.label;

        // to enumerate the label
        var index = this.props.index;
        var toWriteNumber = this.props.toWriteNumber;
        var number_label = "";
        if ((toWriteNumber!==undefined) && (index!==undefined)) number_label = index + 1 + ".";
        
        // to highlight or not the label
        var isFormItemSelected = this.props.isFormItemSelected;
        
        return (

            <div className={isFormItemSelected ? "grid-block shrink pl_component_form_item_label_highlighted" : "grid-block shrink pl_component_form_item_label" }>
                <div className="grid-block shrink pl_component_form_item_label_number">
                    {number_label}
                </div>
                {label}
            </div>

        );
    }
}