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
import { isObjectAFunction } from './../../../../../modules/pl_modules_object';

export class PlComponentListVerticalCheckableItem extends Component {

    constructor() {
        super()
        this.state = {};
    }

    onClickListVerticalCheckableItem(name_item) {

        if (isObjectAFunction(this.props.onclickelement)) {
            var clicked_button = document.getElementById("switch '" + name_item + "'");

            var updated_item = { "name": this.props.name, "checked": clicked_button.checked };
            this.props.onclickelement(this.props.index_item, updated_item);

        }
    }

    render() {

        
        var name = this.props.name;
        // if there are lower letter in the item's name, we display it starting with a capittal letter (e.g., from 'gender' to 'Gender')
        if (name.toUpperCase()!==name) name = (this.props.name[0]).toUpperCase()+(this.props.name).slice(1);

        var checked = this.props.checked;

        return (
            <div className="grid-block pl_component_list_vertical_checkable_item">
                <div className="grid-block pl_component_list_vertical_checkable_item_name">
                    <div className="grid-block shrink">
                        {name}
                    </div>
                </div>
                <div className="shrink pl_component_list_vertical_checkable_item_switch">
                    <div className="small switch grid-block shrink">
                        <input
                            type="checkbox"
                            checked={checked}
                            id={"switch '" + name + "'"}
                            onChange={this.onClickListVerticalCheckableItem.bind(this, name)} />
                        <label htmlFor={"switch '" + name + "'"}></label>
                    </div>
                </div>
            </div>
        );
    }
}