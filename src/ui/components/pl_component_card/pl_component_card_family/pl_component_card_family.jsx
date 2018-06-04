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

    on_edit_family() {

        if (isObjectAFunction(this.props.on_set_mode_edit)) {

            this.props.on_set_mode_edit();

        }
    }

    on_remove_family() {

        if (isObjectAFunction(this.props.on_ask_to_remove_family)) {

            this.props.on_ask_to_remove_family();

        }

    }

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

        var button_delete =
            {
                "name": "delete",
                "icon": <svg width='10' height='18' viewBox='0 0 16 24' fillRule='evenodd'><path d='M4 0h8v2H4zM0 3v4h1v17h14V7h1V3H0zm13 18H3V8h10v13z'></path><path d='M5 10h2v9H5zm4 0h2v9H9z'></path></svg>
            }

        var button_edit =
            {
                "name": "edit",
                "icon": <svg width='15' height='15' viewBox='0 0 16 16' fillRule='evenodd'><path d='M2.032 10.924l7.99-7.99 2.97 2.97-7.99 7.99zm9.014-8.91l1.98-1.98 2.97 2.97-1.98 1.98zM0 16l3-1-2-2z'></path></svg>,
                "selected": mode_edit
            }

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
                    <div className="grid-block pl-component-card-family-edition-buttons shrink">
                        <PlComponentButtonCircleSelectable
                            text={""}
                            icon={button_edit.icon}
                            backgroundcolor={"transparent"}
                            backgroundhovercolor={"#5C4EE5"}
                            backgroundselectedcolor={"#5C4EE5"}
                            fontcolor={"#5C4EE5"}
                            fonthovercolor={"white"}
                            fontselectedcolor={"white"}
                            bordercolor={"#5C4EE5"}
                            borderhovercolor={"#5C4EE5"}
                            borderselectedcolor={"#5C4EE5"}
                            selected={button_edit.selected}
                            onclickelement={this.on_edit_family.bind(this, button_edit.name)} />

                        <PlComponentButtonCircle
                            icon={button_delete.icon}
                            backgroundcolor={"transparent"}
                            backgroundhovercolor={"#5C4EE5"}
                            fontcolor={"#5C4EE5"}
                            fonthovercolor={"white"}
                            bordercolor={"#5C4EE5"}
                            borderhovercolor={"#5C4EE5"}
                            onclickelement={this.on_remove_family.bind(this, button_delete.name)} />
                    </div>
                </div>
                {this.render_menu(family, mode_menu)}
            </div>
        );


    }
}