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
import { PlComponentCardFamilyHeader} from './pl_component_card_family_header/pl_component_card_family_header';
import { PlComponentCardFamilyTextButton } from './pl_component_card_family_text_button/pl_component_card_family_text_button';
import { PlComponentTextFieldEditable } from './../../pl_component_text_field_editable/pl_component_text_field_editable';

//modules
import { isObjectAFunction } from './../../../../modules/rkt_module_object';

//actions
import { format_family_statistics } from './pl_component_card_family_actions';

export class PlComponentCardFamily extends Component {

    on_click_card_component(type) {

        if (isObjectAFunction(this.props.on_click_action)) {

            this.props.on_click_action(type);

        }
    }

    render_menu(family, family_statistics, mode_menu) {

        var myComponent = this;

        var family_num_members;
        if ("num_family_members" in family) family_num_members = family.num_family_members;
        
        family_statistics = format_family_statistics(family_statistics, family_num_members, 2);

        return this.render_table_family_stats(family_statistics, mode_menu);

    }

    render_table_family_stats(family_statistics, mode_menu) {

        return (
            <table className="grid-block vertical">
                <tbody>
                    {
                        family_statistics.map((group_stats, index) => {

                            return this.render_row_table_family_stats(group_stats, index, mode_menu);

                        })
                    }
                </tbody>
            </table>
        );

    }

    render_row_table_family_stats(group_stats, index, mode_menu) {

        return (

            <tr className="grid-block shrink card-row" key={index}>
                {
                    group_stats.map((item, index) => {

                        return (

                            <td className="grid-block card-item" key={index}>
                                <PlComponentCardFamilyTextButton
                                    text={item.text}
                                    type={item.type}
                                    on_click_component={this.on_click_card_component.bind(this)}
                                    selected={mode_menu === item.type ? true : false} />
                            </td>

                        );

                    })
                }

            </tr>

        );

    }

    get_family_id() {

        return this.refs.family_card_header.refs.family_id.refs.FormItemInputText.state.input;

    }

    get_family_name() {

        return this.refs.family_card_header.refs.family_name.refs.FormItemInputText.state.input;

    }

    get_family_description() {

        return this.refs.family_card_header.refs.family_description.refs.FormItemInputText.state.input;

    }

    get_family_diagnostic() {

        return this.refs.family_card_header.refs.family_diagnostic.refs.FormItemInputText.state.input;

    }

    get_family_symptoms() {

        return this.refs.family_card_header.refs.family_symptoms.refs.FormItemInputText.state.input;

    }

    render() {

        var family = this.props.family;
        var family_statistics = this.props.family_statistics;
        
        var mode_edit = this.props.mode_edit;
        var mode_menu = this.props.mode_menu;

        return (
            <div className="grid-block vertical pl-component-card-family">
                <PlComponentCardFamilyHeader
                    ref="family_card_header"
                    family={family}
                    mode_edit={mode_edit}
                />
                {this.render_menu(family, family_statistics, mode_menu)}
            </div>
        );


    }
}