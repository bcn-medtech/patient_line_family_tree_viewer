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
import { PlComponentCardFamilyHeader } from './pl_component_card_family_header/pl_component_card_family_header';
import { PlComponentCardFamilyTextButton } from './pl_component_card_family_text_button/pl_component_card_family_text_button';
import { PlComponentTextFieldEditable } from './../../pl_component_text_field_editable/pl_component_text_field_editable';

//modules
import { isObjectAFunction, isObjectAnArray, isObjectEmpty } from './../../../../modules/rkt_module_object';

//actions
import { format_family_statistics } from './pl_component_card_family_actions';

export class PlComponentCardFamily extends Component {

    on_click_card_component(type) {

        if (type === "diagnosis" || type === "mutations" || type === "statistics") {

            if (isObjectAFunction(this.props.on_click_action)) {

                this.props.on_click_action(type);

            }
        }

    }

    render_menu(family, mode_menu) {

        var family_diagnosis;
        var family_mutations;
        var mode_diagnosis = false;
        var mode_mutations = false;
        var mode_statistics = false;

        if ("diagnosis" in family) family_diagnosis = family.diagnosis.length;
        if ("mutations" in family) family_mutations = family.mutations.length;
        
        if (mode_menu === "diagnosis") {
            mode_diagnosis = true;
        } else if (mode_menu === "mutations") {
            mode_mutations = true;
        } else if (mode_menu === "statistics") {
            mode_statistics = true;
        }

        var icon_statistics =
            <svg width='25' height='25' viewBox='0 0 24 24' fillRule='evenodd'>
                <path d='M0 0v24h24V0H0zm22.1 7l-7.2 8.9-9.2-3.8c-.2-.1-.4 0-.6.1L1 16.6V7h21.1zm.9 16H1v-4.9l4.6-5 9.2 3.8c.2.1.4 0 .6-.1L23 7.5V23zm0-17H1V1h22v5z'>
                </path>
            </svg>

        return (
            <div className="grid-block align-spaced card-row">
                <div className="grid-block shrink card-item">
                    <PlComponentCardFamilyTextButton
                        text={family_diagnosis}
                        type="diagnosis"
                        on_click_component={this.on_click_card_component.bind(this)}
                        selected={mode_diagnosis}
                    />
                </div>
                <div className="grid-block shrink card-item">
                    <PlComponentCardFamilyTextButton
                        text={family_mutations}
                        type="mutations"
                        on_click_component={this.on_click_card_component.bind(this)}
                        selected={mode_mutations}
                    />
                </div>
                <div className="grid-block shrink card-item">
                    <PlComponentCardFamilyTextButton
                        text={icon_statistics}
                        type="statistics"
                        on_click_component={this.on_click_card_component.bind(this)}
                        selected={mode_statistics}
                    />
                </div>
            </div>
        );
    }

    get_family_id() {

        return this.refs.family_card_header.refs.family_id.refs.FormItemInputText.state.input.trim();

    }

    get_family_name() {

        return this.refs.family_card_header.refs.family_name.refs.FormItemInputText.state.input.trim();

    }

    get_family_description() {

        return this.refs.family_card_header.refs.family_description.refs.FormItemInputText.state.input.trim();

    }

    get_family_symptoms() {

        return this.refs.family_card_header.refs.family_symptoms.refs.FormItemInputText.state.input.trim();

    }

    render() {

        var family = this.props.family;

        var mode_edit = this.props.mode_edit;
        var mode_menu = this.props.mode_menu;

        return (
            <div className="grid-block vertical pl-component-card-family">
                <PlComponentCardFamilyHeader
                    ref="family_card_header"
                    family={family}
                    mode_edit={mode_edit}
                />
                {this.render_menu(family, mode_menu)}
            </div>
        );


    }
}