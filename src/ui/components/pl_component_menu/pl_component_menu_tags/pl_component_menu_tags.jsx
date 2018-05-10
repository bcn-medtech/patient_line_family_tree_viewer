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
import { Tag } from 'carbon-components-react';
//modules
import { isObjectEmpty, isObjectAFunction } from './../../../../modules/rkt_module_object';

import {
    get_keys_from_data
} from './pl_component_menu_tags_actions';

export class PlComponentMenuTags extends Component {


    on_unselect_tag(tag) {
        if (isObjectAFunction(this.props.on_un_selected_tag)) {
            this.props.on_un_selected_tag(tag);
        }
    }

    on_select_tag(tag) {
        
        if (isObjectAFunction(this.props.on_select_tag)) {
            this.props.on_select_tag(tag);
        }
    }

    render_tags() {

        var data = this.props.data;
        var keys_selected = this.props.keys_selected;

        if (!isObjectEmpty(data)) {

            if (data.length >= 1) {

                var columns = get_keys_from_data(data);

                return (

                    columns.map((item, index) => {

                        if (keys_selected.indexOf(item) !== -1) {
                            return (

                                <a onClick={this.on_unselect_tag.bind(this, item)} className="grid-block shrink"><Tag className="tag-selected" type="beta">{item}</Tag></a>

                            );
                        } else {
                            return (

                                <a onClick={this.on_select_tag.bind(this, item)} className="grid-block shrink"><Tag className="tag-un-selected" type="beta">{item}</Tag></a>

                            );
                        }

                    })

                );
            }
        }
    }

    render() {

        var data = this.props.data;

        var divStyle = {
            overflow:'scroll'
          };

        return (
            <div className="grid-block shrink pl-component-menu-tags" style={divStyle}>
                <a className="grid-block shrink"><Tag className="tag-info" type="beta">Items:{data.length}</Tag></a>
                {this.render_tags()}
            </div>
        );
    }
}