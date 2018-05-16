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

//modules
import { isObjectAFunction } from './../../../../modules/rkt_module_object';
import { capitalize_first_letter } from './../../../../modules/rkt_module_string';


export class PlComponentSidebarHeader extends Component {


    set_database_component_mode(item) {

        if (isObjectAFunction(this.props.set_database_component_mode)) {

            this.props.set_database_component_mode(item);

        }
    }

    render() {

        var mode = this.props.mode;
        var items = this.props.items;

        return (
            <div className="grid-block sub-header pl-component-sidebar-header">

                {
                    items.map((item, index) => {
                        
                        if (item === mode) {
                            return (
                                <a onClick={this.set_database_component_mode.bind(this,item)} key={index}><h3 className="mode_selected">{capitalize_first_letter(item)}</h3></a>
                            )
                        } else {
                            return(
                                <a onClick={this.set_database_component_mode.bind(this, item)} key={index}><h3 className="mode_unselected">{capitalize_first_letter(item)}</h3></a>
                            )
                        }

                    })
                }
            </div>
        );


    }
}