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

//components
import { PlComponentListVerticalInfoItem } from './pl_component_list_vertical_info_item/pl_component_list_vertical_info_item';

export class PlComponentListVerticalInfo extends Component {

    constructor() {

        super()

        this.state = {
            loaded: false
        };

    }

    /* EVENTS */

    onClickListItem(item) {

        if (isObjectAFunction(this.props.clickelement)) {
            this.props.clickelement(item);
        }
    }

    onClickDeleteItemButton(index_item_to_delete) {

        if (isObjectAFunction(this.props.onClickDeleteItemButton)) {

            var items = this.props.items;
            var name_item_to_delete = items[index_item_to_delete]["name"];
            var value_item_to_delete = items[index_item_to_delete]["value"];

            var component_item_to_delete =
                <div className="grid-block shrink" style={{ "width": "250px" }}>
                    <PlComponentListVerticalInfoItem
                        index={0}
                        name={name_item_to_delete}
                        value={value_item_to_delete}
                        widgetMode={"none"}
                        extra_button={this.props.extra_button}
                    />
                </div>

            this.props.onClickDeleteItemButton(index_item_to_delete, component_item_to_delete);

        }
    }

    /* RENDER METHODS */

    renderListVerticalInfoItems(items) {
        
        if (items !== undefined) {
            
            return (

                items.map((item, index) => {
                    
                    return (
                        <PlComponentListVerticalInfoItem
                            ref={index}
                            index={index}
                            key={index}
                            name={item.name}
                            value={item.value}
                            onClickListItem={this.onClickListItem.bind(this)}
                            onClickDeleteItemButton={this.onClickDeleteItemButton.bind(this)}
                            onClickAddItemButton={this.props.onClickAddItemButton}
                            extra_button={this.props.extra_button}
                            widgetMode={this.props.widgetMode} // either "none", "search", "edition", "addition" or "delete"
                        />
                    );
                })

            );

        }

    }

    render() {

        var items = this.props.items;

        return (
            <div className="grid-block vertical pl_component_list_vertical_info">
                {this.renderListVerticalInfoItems(items)}
            </div>
        );
    }
}