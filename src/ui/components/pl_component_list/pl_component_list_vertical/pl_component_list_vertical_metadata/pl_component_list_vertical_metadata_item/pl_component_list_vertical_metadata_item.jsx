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
import { PlComponentLabel } from './../../../../pl_component_label/pl_component_label';
import { isObjectAFunction } from './../../../../../modules/pl_modules_object';

export class PlComponentListVerticalMetadataItem extends Component {

    constructor() {

        super()

        this.state = {
            loaded: false,
        };

    }

    onClickListItem(item){
        
        if(isObjectAFunction(this.props.onClickListItem)){
            this.props.onClickListItem(this.props);
        }
    }

    renderMetadata(metadata) {

        if (metadata!==undefined) {

            return (
                <div className="grid-block align-center">
    
                   {
                        metadata.map((item) => {
                            return(<PlComponentLabel key={item.name} top_text={item.value} bottom_text={item.name} align="center" />);
                        })
                   }
    
                </div>
            );

        }

    }

    render() {

        var name = this.props.name;
        var date = this.props.date;
        var author = this.props.author;
        var metadata = this.props.metadata;

        return (

            <div className="grid-block shrink pl_component_list_vertical_metadata_item">
                <PlComponentLabel top_text={name} bottom_text={date} align="left" onClickLabel={this.onClickListItem.bind(this)}/>
                {this.renderMetadata(metadata)}
                <PlComponentLabel top_text={author} bottom_text="author" align="right" />
            </div>
        );
    }
}