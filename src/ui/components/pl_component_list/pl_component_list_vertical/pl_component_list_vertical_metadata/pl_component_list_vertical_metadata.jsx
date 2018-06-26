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
import { isObjectAFunction } from './../../../../modules/pl_modules_object';

// components
import { PlComponentListVerticalMetadataItem } from './pl_component_list_vertical_metadata_item/pl_component_list_vertical_metadata_item';

export class PlComponentListVerticalMetadata extends Component {

    constructor() {

        super()

        this.state = {};

    }

    onClickListItem(item) {

        if (isObjectAFunction(this.props.onclickelement)) {
            this.props.onclickelement(item);
        }
    }

    renderList(metadata) {

        return (
            <div className="grid-block vertical pl_component_list_vertical_items">
                {
                    metadata.map((item, index) => {

                        return (
                            <PlComponentListVerticalMetadataItem
                                key={index}
                                name={item.name}
                                date={item.date}
                                author={item.author}
                                metadata={item.metadata}
                                onClickListItem={this.onClickListItem.bind(this)}
                            />
                        );
                    })
                }
            </div>
        );
    }

    render() {

        var listItems = this.props.items;
        var listHeader = this.props.header;
        
        return (

            <div className="grid-block shrink vertical pl_component_list_vertical_metadata">
                <div className="grid-block pl_component_list_vertical_metadata_title">{listHeader}</div>
                {this.renderList(listItems)}
            </div>
        );
    }
}