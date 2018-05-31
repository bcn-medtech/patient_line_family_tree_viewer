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
import { isObjectAFunction } from "./../../../../modules/rkt_module_object";
//components
import { PlComponentButtonRect } from "./../../pl_component_button/pl_component_button_rect/pl_component_button_rect";
import { PlComponentCardFamily } from "./../../pl_component_card/pl_component_card_family/pl_component_card_family";
import { PlComponentConfirmMessage } from "./../../pl_component_comfirm_message/pl_component_confirm_message";
import { PlComponentModal } from "./../../pl_component_modal/pl_component_modal";
//actions
import { update_family_from_text_field_editable } from './pl_component_sidebar_family_actions';

import { keys } from "underscore";

export class PlComponentSidebarFamily extends Component {

    constructor() {

        super();

        this.state = {
            mode_menu: false,
            mode_edit: false,
            to_remove_family: false
        }
    }

    componentWillReceiveProps(nextProps) {

        if (this.props !== nextProps) {

            this.setState({
                mode_edit: false
            });

        }

    }

    on_set_mode_menu(mode) {

        if (this.state.mode_menu === mode) {
            this.setState({
                mode_menu: false
            })
        } else {
            this.setState({
                mode_menu: mode
            })
        }
    }

    on_set_mode_edit() {

        this.setState({
            mode_edit: !this.state.mode_edit
        });
    }

    on_save_data_family() {

        if (isObjectAFunction(this.props.perform_database_action)) {

            // the changes in "text_field_editable" are saved in "family"
            var family = this.props.family;
            
            var updated_family = {};
            var data_keys = keys(family);
            
            for (var i = 0; i<data_keys.length; i++) {

                var key = data_keys[i];
                updated_family[key] = family[key];

            }

            // "text_field_editable"
            var edited_name = this.refs.family_card.refs.family_name.refs.FormItemInputText.state.input;
            var edited_id = this.refs.family_card.refs.family_id.refs.FormItemInputText.state.input;
            var edited_description = this.refs.family_card.refs.family_description.refs.FormItemInputText.state.input;
            var edited_symptoms = this.refs.family_card.refs.family_symptoms.refs.FormItemInputText.state.input;

            var new_data = update_family_from_text_field_editable(edited_name, edited_id, family.id, edited_description, edited_symptoms, updated_family);

            // the changes in "table" and "text_field_editable" are saved
            if ("family_to_update" in new_data) updated_family = new_data.family_to_update;
            else updated_family = new_data;
            
            var data = { "action": "edit_family",
                "data": new_data,
                "family_id": updated_family.id
            };
            
            this.props.perform_database_action(data);

        }

    }

    on_ask_to_remove_family() {
        
        this.setState({
            to_remove_family: true
        });

    }

    on_remove_family(answer) {

        if (answer === "Yes") {

            if (isObjectAFunction(this.props.perform_database_action)) {

                var family = this.props.family;
                var data = { 
                    "action": "remove_family",
                    "data": family.id,
                    "family_id": undefined
                };

                this.refs.ModalRemoveFamily.closeModal();
                this.props.perform_database_action(data);

            }

        } else if (answer === "Cancel") {

            this.refs.ModalRemoveFamily.closeModal();

        }

    }

    on_close_modal(answer) {

        this.setState({
            to_remove_family: false
        })

    }

    render_edit_family_button(mode_edit) {

        if (mode_edit) {

            return (
                <div style={{ "position": "absolute", "bottom": "0px", "right": "0px", "margin": "20px" }}>
                    <PlComponentButtonRect
                        text={"Save"}
                        backgroundcolor={"transparent"} backgroundhovercolor={"#5C4EE5"}
                        fontcolor={"#5C4EE5"} fonthovercolor={"white"}
                        bordercolor={"#5C4EE5"} borderhovercolor={"#5C4EE5"}
                        onclickelement={this.on_save_data_family.bind(this)}
                    />
                </div>
            );

        }

    }

    render_modal() {
        
        if (this.state.to_remove_family) {
            
            var family = this.props.family;
            var message_to_show = "Are you sure you want to remove the family " + family.id + "?";

            var content =
                <PlComponentConfirmMessage
                    message={message_to_show}
                    extra_message={"This action will remove it forever"}
                    onclickanswerbutton={this.on_remove_family.bind(this)}
                />

            return (
                <PlComponentModal
                    ref="ModalRemoveFamily"
                    title={""}
                    Modal_content={content}
                    onclickesc={this.on_close_modal.bind(this)}
                />
            );

        }

    }


    render() {

        var family = this.props.family;
        var mode_menu = this.state.mode_menu;
        var mode_edit = this.state.mode_edit;
        
        return (
            <div className="grid-block vertical pl-component-sidebar-family">
                <div className="grid-block shrink pl_component_sidebar_family_element">
                    <PlComponentCardFamily
                        family={family}
                        on_click_action={this.on_set_mode_menu.bind(this)}
                        on_set_mode_edit={this.on_set_mode_edit.bind(this)}
                        mode_menu={mode_menu}
                        mode_edit={mode_edit}
                        ref="family_card"
                        perform_database_action={this.props.perform_database_action}
                        on_ask_to_remove_family={this.on_ask_to_remove_family.bind(this)} />
                </div>
                {this.render_edit_family_button(mode_edit)}
                {this.render_modal()}
            </div>
        );

    }
}