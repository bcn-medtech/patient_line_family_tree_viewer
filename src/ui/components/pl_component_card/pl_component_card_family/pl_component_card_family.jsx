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
import { PlComponentCardFamilyTextButton } from './pl_component_card_family_text_button/pl_component_card_family_text_button';
import { PlComponentTextFieldEditable } from './../../pl_component_text_field_editable/pl_component_text_field_editable';

//modules
import {
    isObjectEmpty, isObjectAFunction
} from './../../../../modules/rkt_module_object';

export class PlComponentCardFamily extends Component {

    on_click_card_component(type) {

        if (type === "number of family members" || type === "mother" || type === "children" || type === "relatives") {

            if (isObjectAFunction(this.props.on_click_action)) {

                this.props.on_click_action(type);

            }
        }
    }

    render_menu(family, mode_menu) {

        var family_num_members;

        if ("num_family_members" in family) family_num_members = family.num_family_members;

        var mode_family_members = false;

        if (mode_menu === "family members") mode_family_members = true;

        return (
            <div className="grid-block align-spaced card-row">
                <div className="grid-block shrink card-item">
                    <PlComponentCardFamilyTextButton
                        text={family_num_members}
                        type="family members"
                        on_click_component={this.on_click_card_component.bind(this)}
                        selected={mode_family_members} />
                </div>
            </div>
        );
    }

    render() {

        var family = this.props.family;
        var mode_edit = this.props.mode_edit;
        var mode_menu = this.props.mode_menu;
        var family_id;
        var family_name;
        var family_description;
        var family_symptoms;

        family_id = family.id;
        family_name = family.name;
        family_description = family.description;
        
        if (isObjectEmpty(family_description)) family_description = "Description";
        family_symptoms = family.symptoms;
        if (isObjectEmpty(family_symptoms)) family_symptoms = "Symptoms";

        return (
            <div className="grid-block vertical pl-component-card-family">
                <div className="grid-block card-header">
                    <div className="grid-block vertical card-item">
                        <div className="grid-block shrink">
                            <h4>
                                <PlComponentTextFieldEditable
                                    text={family_name}
                                    isEditionMode={mode_edit ? true : false}
                                    ref="family_name"
                                />
                            </h4>
                        </div>
                        <div className="grid-block shrink">
                            <PlComponentTextFieldEditable
                                text={family_id}
                                isEditionMode={mode_edit ? true : false}
                                ref="family_id" />
                        </div>
                        <div className="grid-block shrink" style={{ "paddingTop": "20px"}}>
                            <h4>
                                <PlComponentTextFieldEditable
                                    text={family_description}
                                    isEditionMode={mode_edit ? true : false}
                                    ref="family_description" />
                            </h4>
                        </div>
                        <div className="grid-block shrink" style={{"paddingBottom": "8px" }}>
                            <PlComponentTextFieldEditable
                                text={family_symptoms}
                                isEditionMode={mode_edit ? true : false}
                                ref="family_symptoms" />
                        </div>
                    </div>
                </div>
                {this.render_menu(family, mode_menu)}
            </div>
        );


    }
}