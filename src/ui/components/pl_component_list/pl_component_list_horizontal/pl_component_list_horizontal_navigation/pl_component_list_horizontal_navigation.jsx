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
import { PlComponentButtonText } from './../../../pl_component_button/pl_component_button_text/pl_component_button_text';
import { PlComponentTitle } from './../../../pl_component_title/pl_component_title';

export class PlComponentListHorizontalNavigation extends Component {

    constructor() {

        super()

        this.state = {};

    }

    onClickNavigationListItem(item) {

        this.setState({
            selectedItem: item
        });

        if (isObjectAFunction(this.props.onclickelement)) {
            this.props.onclickelement(item);
        }
    }

    renderTitle(title){

        if ((title!==undefined) && (title.trim()!=="")) {
            return(
                <PlComponentTitle title={title} />
            );
        }
    }

    renderNavigationListItems(items) {
        var backgroundcolor = "transparent";
        var backgroundhovercolor= "transparent";
        var bordercolor = "transparent";
        var borderhovercolor= "transparent";
        var fontcolor, fonthovercolor;
        var status_item;

        return (
            <div className="grid-block shrink pl_component_list_horizontal_navigation_items">
                {items.map((item) => {

                    if (item !== this.state.selectedItem) { // non-selected items
                        // style
                        fontcolor = "#5BAADF";
                        fonthovercolor = "#81B9DE";
                        // status
                        status_item = "";

                    } else { // selected item
                        // style
                        fontcolor = "#3A99D8";
                        fonthovercolor = "#3A99D8";
                        // status
                        status_item = "_selected";
                    }

                    return (
                        <div className={"pl_component_list_horizontal_navigation_item"+status_item} key={item}>
                            <PlComponentButtonText
                                text={item}
                                backgroundcolor={backgroundcolor}
                                backgroundhovercolor={backgroundhovercolor}
                                fontcolor={fontcolor}
                                fonthovercolor={fonthovercolor}
                                bordercolor={bordercolor}
                                borderhovercolor={borderhovercolor}
                                onclickelement={this.onClickNavigationListItem.bind(this)} />
                        </div>
                    );
                })}
            </div>
        );
    }

    render() {

        var title = this.props.title;
        var items = this.props.items;

        return (

            <div className="grid-block">
                {this.renderTitle(title)}
                {this.renderNavigationListItems(items)}
            </div>
        );
    }
}