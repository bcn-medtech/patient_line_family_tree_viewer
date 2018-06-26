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
import { PlComponentButtonIcon } from './../../../pl_component_button/pl_component_button_icon/pl_component_button_icon';

export class PlComponentListHorizontalSelectableIcons extends Component {

    constructor() {

        super()

        this.state = {
            selectedIcon:undefined
        };

    }

    onClickListSelectableIcon(item) {

        this.setState({
            selectedIcon: item.icon
        });

        if (isObjectAFunction(item.onClick)) {
            item.onClick();
        }
    }

    renderSelectableIcons(icons_info) {
        var fontcolor, fonthovercolor;
        
        return (
            icons_info.map((item, index) => {
                var icon = item.icon;
                
                if (item.icon !== this.state.selectedIcon) { // non-selected items
                    fontcolor = this.props.fontcolor;
                    fonthovercolor = this.props.fonthovercolor;
                    
                } else { // selected item
                    fontcolor = this.props.fontselectedcolor;
                    fonthovercolor = this.props.fontselectedcolor;
                }

                return (
                    <div className="pl_component_list_horizontal_selectable_icon" key={index}>
                        <PlComponentButtonIcon
                            icon={icon}
                            backgroundcolor={this.props.backgroundcolor}
                            backgroundhovercolor={this.props.backgroundhovercolor}
                            fontcolor={fontcolor}
                            fonthovercolor={fonthovercolor}
                            bordercolor={this.props.bordercolor}
                            borderhovercolor={this.props.borderhovercolor}
                            onclickelement={this.onClickListSelectableIcon.bind(this, item)} />
                    </div>
                );
            })
        );
    }

    render() {

        var icons_info = this.props.icons_info;

        return (
            <div className="grid-block shrink">
                {this.renderSelectableIcons(icons_info)}
            </div>
        );
    }
}