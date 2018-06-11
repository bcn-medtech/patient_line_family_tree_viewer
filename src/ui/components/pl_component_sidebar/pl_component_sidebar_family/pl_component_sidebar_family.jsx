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
import { isObjectAFunction, isObjectAnArray, isObjectEmpty } from "./../../../../modules/rkt_module_object";
//components
import { PlComponentButtonRect } from "./../../pl_component_button/pl_component_button_rect/pl_component_button_rect";
import { PlComponentCardFamily } from "./../../pl_component_card/pl_component_card_family/pl_component_card_family";
import { PlComponentCardFamilyWidget } from "./../../pl_component_card/pl_component_card_family/pl_component_card_family_widget/pl_component_card_family_widget";
import { PlComponentCardFamilyWidgetStatistics } from "./../../pl_component_card/pl_component_card_family/pl_component_card_family_widget/pl_component_card_family_widget_statistics/pl_component_card_family_widget_statistics";
import { PlComponentConfirmMessage } from "./../../pl_component_comfirm_message/pl_component_confirm_message";
import { PlComponentModal } from "./../../pl_component_modal/pl_component_modal";
import { PlComponentTextFieldEditable } from "./../../pl_component_text_field_editable/pl_component_text_field_editable";
//actions
import { update_family_from_text_field_editable } from './pl_component_sidebar_family_actions';

import { keys, map } from "underscore";

import family_diagnosis_suggestions_json from './../../pl_component_card/pl_component_card_family/pl_component_card_family_jsons/pl_component_card_family_diagnosis_suggestions.json';
import family_genes_suggestions_json from './../../pl_component_card/pl_component_card_family/pl_component_card_family_jsons/pl_component_card_family_genes_suggestions.json';

export class PlComponentSidebarFamily extends Component {

    constructor() {

        super();

        this.state = {
            mode_menu: "statistics",
            mode_edit: false,
            to_remove_family: false
        }
    }

    get_family_diagnosis() {

        var diagnosis = [];

        if ("family_diagnosis_0" in this.refs) {

            var diagnosis_0 = this.refs.family_diagnosis_0.refs.FormItemInputText.state.input;
            if (!isObjectEmpty(diagnosis_0) && diagnosis_0 !== "Write a diagnosis") diagnosis.push(diagnosis_0.trim());

        }

        if ("family_diagnosis_1" in this.refs) {

            var diagnosis_1 = this.refs.family_diagnosis_1.refs.FormItemInputText.state.input;
            if (!isObjectEmpty(diagnosis_1) && diagnosis_1 !== "Write a diagnosis") diagnosis.push(diagnosis_1.trim());

        }

        return diagnosis;

    }

    get_family_mutations() {

        var mutations = [];

        if ("family_genes_0" && "family_mutations_0" in this.refs) {

            var gene_0 = this.refs.family_genes_0.refs.FormItemInputText.state.input.trim();
            var mutation_0 = this.refs.family_mutations_0.refs.FormItemInputText.state.input.trim();
            
            if ((!isObjectEmpty(gene_0) && (gene_0 !== "Specify a gene")) && 
                (!isObjectEmpty(mutation_0) && (mutation_0 !== "Specify a mutation"))) {
                    mutations.push(gene_0.trim() + " + " + mutation_0.trim());
            }

        }

        if ("family_genes_1" && "family_mutations_1" in this.refs) {

            var gene_1 = this.refs.family_genes_1.refs.FormItemInputText.state.input.trim();
            var mutation_1 = this.refs.family_mutations_1.refs.FormItemInputText.state.input.trim();
            
            if ((!isObjectEmpty(gene_1) && (gene_1 !== "Specify a gene")) && 
                (!isObjectEmpty(mutation_1) && (mutation_1 !== "Specify a mutation"))) {
                    mutations.push(gene_1.trim() + " + " + mutation_1.trim());
            }

        }

        return mutations;

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

    on_save_data_family() {

        if (isObjectAFunction(this.props.perform_database_action)) {

            // the changes in "text_field_editable" are saved in "family"
            var family = this.props.family;

            var updated_family = {};
            var data_keys = keys(family);

            for (var i = 0; i < data_keys.length; i++) {

                var key = data_keys[i];
                updated_family[key] = family[key];

            }

            // "text_field_editable"
            var edited_inputs = {};
            edited_inputs["name"] = this.refs.family_card.get_family_name();
            edited_inputs["id"] = this.refs.family_card.get_family_id();
            edited_inputs["description"] = this.refs.family_card.get_family_description();
            edited_inputs["symptoms"] = this.refs.family_card.get_family_symptoms();
            edited_inputs["diagnosis"] = this.get_family_diagnosis();
            edited_inputs["mutations"] = this.get_family_mutations();

            var new_data = update_family_from_text_field_editable(edited_inputs, family.id, updated_family);

            // the changes in "table" and "text_field_editable" are saved
            if ("family_to_update" in new_data) updated_family = new_data.family_to_update;
            else updated_family = new_data;

            var data = {
                "action": "edit_family",
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

    render_widget_family_diagnosis(diagnosis, mode_menu, mode_edit) {

        var widget_content;

        if (!isObjectEmpty(diagnosis)) {

            if ((diagnosis.length === 1) && (mode_edit)) diagnosis.push("Diagnosis");

            widget_content =
                map(diagnosis, (item, index) => {
                    return (
                        <div className="grid-block vertical shrink pl_component_sidebar_family_diagnosis" key={"mutation_" + index} >
                            <PlComponentTextFieldEditable
                                text={item}
                                isEditionMode={mode_edit ? true : false}
                                isSearchBox={true}
                                suggestions={family_diagnosis_suggestions_json}
                                ref={"family_diagnosis_" + index}
                            />
                        </div>
                    );

                })

        } else {

            var message;
            if (!mode_edit) {

                message = "There are not any diagnosis defined yet";

            } else {

                message =
                    map(["Write a diagnosis", "Write a diagnosis"], (item, index) => {
                        return (
                            <div className="grid-block vertical shrink pl_component_sidebar_family_diagnosis" key={"mutation_" + index}>
                            
                                <PlComponentTextFieldEditable
                                    key={index}
                                    text={item}
                                    isEditionMode={mode_edit ? true : false}
                                    isSearchBox={true}
                                    suggestions={family_diagnosis_suggestions_json}
                                    ref={"family_diagnosis_" + index}
                                />
                            </div>
                        );

                    })

            }

            widget_content =

                <div className="grid-block vertical pl_component_sidebar_family_undefined_message">
                    {message}
                </div>

        }

        var widget_style = { "display": "none" };
        if (mode_menu === "diagnosis") widget_style["display"] = "";

        return (
            <div className="grid-block" style={widget_style}>
                <PlComponentCardFamilyWidget
                    tittle={mode_menu}
                    content={widget_content}
                />
            </div>
        );
    }

    render_widget_family_mutations(mutations, mode_menu, mode_edit) {

        var widget_content;

        if (!isObjectEmpty(mutations)) {

            if ((mutations.length === 1) && (mode_edit)) mutations.push("Specify a gene + Specify a mutation");

            widget_content =
                map(mutations, (mutation, index) => {
                    
                    var mutation_elements = mutation.split("+");
                    var gene = mutation_elements[0].trim();
                    var mutation = mutation_elements[1].trim();

                    return (
                        <div className="grid-block vertical shrink pl_component_sidebar_family_mutation" key={"mutation_" + index}>
                            <h5>{"Gene"}</h5>
                            <PlComponentTextFieldEditable
                                text={gene}
                                isEditionMode={mode_edit ? true : false}
                                isSearchBox={true}
                                suggestions={family_genes_suggestions_json}
                                ref={"family_genes_" + index} />

                            <h5>{"Mutation"}</h5>
                            <PlComponentTextFieldEditable
                                text={mutation}
                                isEditionMode={mode_edit ? true : false}
                                ref={"family_mutations_" + index} />
                        </div>
                    );

                })


        } else {

            var message;
            if (!mode_edit) {

                message = "There are not any mutations defined yet";

            } else {

                message =
                    map(["Specify a gene + Specify a mutation", "Specify a gene + Specify a mutation"], (mutation, index) => {
                        
                        var mutation_elements = mutation.split("+");
                        var gene = mutation_elements[0].trim();
                        var mutation = mutation_elements[1].trim();

                        return (
                            <div className="grid-block vertical shrink pl_component_sidebar_family_mutation" key={"mutation_" + index}>
                                <h5>{"Gene"}</h5>
                                <PlComponentTextFieldEditable
                                    text={gene}
                                    isEditionMode={mode_edit ? true : false}
                                    isSearchBox={true}
                                    suggestions={family_genes_suggestions_json}
                                    ref={"family_genes_" + index} />

                                <h5>{"Mutation"}</h5>
                                <PlComponentTextFieldEditable
                                    text={mutation}
                                    isEditionMode={mode_edit ? true : false}
                                    ref={"family_mutations_" + index} />
                            </div>
                        );

                    })

            }

            widget_content =

                <div className="grid-block vertical pl_component_sidebar_family_undefined_message">
                    {message}
                </div>

        }

        var widget_style = { "display": "none" };
        if (mode_menu === "mutations") widget_style["display"] = "";

        return (
            <div className="grid-block" style={widget_style}>
                <PlComponentCardFamilyWidget
                    tittle={mode_menu}
                    content={widget_content}
                />
            </div>
        );

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
        var family_statistics = this.props.family_statistics;
        var family_diagnosis = family.diagnosis;
        var family_mutations = family.mutations;

        var mode_menu = this.state.mode_menu;
        var mode_edit = this.props.mode_edit;

        var widget;

        if (this.state.mode_menu !== false) {

            var widget_content;

            if (mode_menu === "statistics") {

                widget_content = <PlComponentCardFamilyWidgetStatistics family_statistics={family_statistics} />

                widget =
                    <PlComponentCardFamilyWidget
                        tittle={"statistics"}
                        content={widget_content}
                    />

            }

        }

        return (
            <div className="grid-block vertical pl-component-sidebar-family">
                <div className="grid-block shrink pl_component_sidebar_family_element">
                    <PlComponentCardFamily
                        ref="family_card"
                        family={family}
                        on_click_action={this.on_set_mode_menu.bind(this)}
                        mode_menu={mode_menu}
                        mode_edit={mode_edit}
                        perform_database_action={this.props.perform_database_action}
                    />
                </div>
                <div className="grid-block vertical">
                    <div className="grid-block shrink">
                        {widget}
                        {this.render_widget_family_diagnosis(family_diagnosis, mode_menu, mode_edit)}
                        {this.render_widget_family_mutations(family_mutations, mode_menu, mode_edit)}
                    </div>
                </div>
                {this.render_edit_family_button(mode_edit)}
                {this.render_modal()}
            </div>
        );

    }
}