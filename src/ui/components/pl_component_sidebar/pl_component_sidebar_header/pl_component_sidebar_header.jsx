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

//components
import { PlComponentButtonCircle } from './../../pl_component_button/pl_component_button_circle/pl_component_button_circle';
import { PlComponentButtonCircleSelectable } from './../../pl_component_button/pl_component_button_circle_selectable/pl_component_button_circle_selectable';
//modules
import { isObjectAFunction, isObjectEmpty } from './../../../../modules/rkt_module_object';
import { capitalize_first_letter } from './../../../../modules/rkt_module_string';


export class PlComponentSidebarHeader extends Component {


    set_database_component_mode(item) {

        if (isObjectAFunction(this.props.set_database_component_mode)) {

            this.props.set_database_component_mode(item);

        }
    }

    set_edit_mode(){

        if (isObjectAFunction(this.props.on_set_edit_mode)) {

            this.props.on_set_edit_mode(!this.props.edit_mode);

        }

    }

    on_click_edit_item_button(mode, action) {
        
        if (isObjectAFunction(this.props.on_click_edit_item_button)) {
            
            this.props.on_click_edit_item_button(mode, action);

        }

    }

    render_edition_buttons(mode, mode_edit) {

        var button_edit =
            {
                "name": "edit",
                "icon": <svg width='15' height='15' viewBox='0 0 16 16' fillRule='evenodd'><path d='M2.032 10.924l7.99-7.99 2.97 2.97-7.99 7.99zm9.014-8.91l1.98-1.98 2.97 2.97-1.98 1.98zM0 16l3-1-2-2z'></path></svg>,
                "selected": mode_edit
            }

        var button_delete =
            {
                "name": "delete",
                "icon": <svg width='10' height='18' viewBox='0 0 16 24' fillRule='evenodd'><path d='M4 0h8v2H4zM0 3v4h1v17h14V7h1V3H0zm13 18H3V8h10v13z'></path><path d='M5 10h2v9H5zm4 0h2v9H9z'></path></svg>
            }
        
        var button_export =
            {
                "name": "export",
                "icon": <svg width='15' height='15' viewBox='0 0 24 24' fillRule='evenodd'><path d='M19 9.4l-1.2-1.1L13 13V0h-2v13L6.2 8.3 5 9.4l7 6.6z'></path><path d='M22 14v6H2v-6H0v10h24V14z'></path></svg>
            }

        if (mode === "patient") {

            return (
                <div className="grid-block shrink pl-component-sidebar-header-edition-buttons">
                    <PlComponentButtonCircleSelectable
                        text={""} icon={button_edit.icon}
                        backgroundcolor={"transparent"} backgroundhovercolor={"#5C4EE5"} backgroundselectedcolor={"#5C4EE5"}
                        fontcolor={"#5C4EE5"} fonthovercolor={"white"} fontselectedcolor={"white"}
                        bordercolor={"#5C4EE5"} borderhovercolor={"#5C4EE5"} borderselectedcolor={"#5C4EE5"}
                        selected={button_edit.selected} onclickelement={this.on_click_edit_item_button.bind(this, mode, button_edit.name)} />
                    <PlComponentButtonCircle
                        icon={button_delete.icon}
                        backgroundcolor={"transparent"} backgroundhovercolor={"#5C4EE5"}
                        fontcolor={"#5C4EE5"} fonthovercolor={"white"}
                        bordercolor={"#5C4EE5"} borderhovercolor={"#5C4EE5"}
                        onclickelement={this.on_click_edit_item_button.bind(this, mode, button_delete.name)} />
                    <PlComponentButtonCircle
                        icon={button_export.icon}
                        backgroundcolor={"transparent"} backgroundhovercolor={"#5C4EE5"}
                        fontcolor={"#5C4EE5"} fonthovercolor={"white"}
                        bordercolor={"#5C4EE5"} borderhovercolor={"#5C4EE5"}
                        onclickelement={this.on_click_edit_item_button.bind(this, mode, button_export.name)} />
                </div>
            );

        } else if (mode === "family") {

            return (
                <div className="grid-block pl-component-sidebar-header-edition-buttons">
                    <PlComponentButtonCircleSelectable
                        text={""} icon={button_edit.icon}
                        backgroundcolor={"transparent"} backgroundhovercolor={"#5C4EE5"} backgroundselectedcolor={"#5C4EE5"}
                        fontcolor={"#5C4EE5"} fonthovercolor={"white"} fontselectedcolor={"white"}
                        bordercolor={"#5C4EE5"} borderhovercolor={"#5C4EE5"} borderselectedcolor={"#5C4EE5"}
                        selected={button_edit.selected} onclickelement={this.on_click_edit_item_button.bind(this, mode, button_edit.name)} />
                    <PlComponentButtonCircle
                        icon={button_delete.icon}
                        backgroundcolor={"transparent"} backgroundhovercolor={"#5C4EE5"}
                        fontcolor={"#5C4EE5"} fonthovercolor={"white"}
                        bordercolor={"#5C4EE5"} borderhovercolor={"#5C4EE5"}
                        onclickelement={this.on_click_edit_item_button.bind(this, mode, button_delete.name)} />
                </div>
            );

        }

    }

    render() {

        var mode = this.props.mode;
        var mode_edit = this.props.mode_edit;
        var items = this.props.items;
        
        return (
            <div className="grid-block sub-header pl-component-sidebar-header">
                
                {
                    items.map((item, index) => {

                        if (item === mode) {
                            return (
                                <a onClick={this.set_database_component_mode.bind(this, item)} key={index}><h3 className="mode_selected">{capitalize_first_letter(item)}</h3></a>
                            )
                        } else {
                            return (
                                <a onClick={this.set_database_component_mode.bind(this, item)} key={index}><h3 className="mode_unselected">{capitalize_first_letter(item)}</h3></a>
                            )
                        }

                    })
                }
                {this.render_edition_buttons(mode, mode_edit)}
            </div>
        );


    }
}