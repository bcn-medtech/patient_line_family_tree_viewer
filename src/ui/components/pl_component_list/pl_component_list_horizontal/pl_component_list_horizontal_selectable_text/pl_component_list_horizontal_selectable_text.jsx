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

//components
import { PlComponentButtonText } from './../../../pl_component_button/pl_component_button_text/pl_component_button_text';

export class PlComponentListHorizontalSelectableText extends Component {

    constructor() {

        super()

        this.state = {};

    }

    onClickListSelectableTextItem(item) {

        this.setState({
            selectedItem: item
        });

        if (isObjectAFunction(this.props.onclickelement)) {
            this.props.onclickelement(item);
        }
    }

    renderSelectableText(items) {
        var fontcolor, fonthovercolor;
        var toWriteCommas = this.props.toWriteCommas;
        var commaDiv;
        
        if ((toWriteCommas!==undefined) && (toWriteCommas===true)) {
            commaDiv = <div style={{"color":this.props.fontcolor, "font":"20px Helvetica"}}>,</div>;
        }
        
        return (
            items.map((item, index) => {

                if (item !== this.state.selectedItem) { // non-selected items
                    fontcolor = this.props.fontcolor;
                    fonthovercolor = this.props.fonthovercolor;
                }
                else { // selected item
                    fontcolor = "#3A99D8";
                    fonthovercolor = "#3A99D8";
                }

                if (index===items.length -1 ) {
                    commaDiv = null;
                }

                return (
                    <div className="grid-block shrink pl_component_list_horizontal_selectable_text_item" key={item}>
                        <PlComponentButtonText
                            text={item}
                            backgroundcolor={this.props.backgroundcolor}
                            backgroundhovercolor={this.props.backgroundhovercolor}
                            fontcolor={fontcolor}
                            fonthovercolor={fonthovercolor}
                            bordercolor={this.props.bordercolor}
                            borderhovercolor={this.props.borderhovercolor}
                            onclickelement={this.onClickListSelectableTextItem.bind(this)} />
                        {commaDiv}
                    </div>
                );
            })
        );
    }

    render() {

        var items = this.props.items;

        return (
            <div className="grid-block">
                {this.renderSelectableText(items)}
            </div>
        );
    }
}