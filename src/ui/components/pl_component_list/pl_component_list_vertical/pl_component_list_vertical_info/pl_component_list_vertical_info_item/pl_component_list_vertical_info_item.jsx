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
import { isObjectAFunction } from './../../../../../../modules/rkt_module_object';

// components
import { PlComponentButtonIcon } from './../../../../pl_component_button/pl_component_button_icon/pl_component_button_icon';
import { PlComponentFormItemInputText } from './../../../../pl_component_form/pl_component_form_item/pl_component_form_item_input_text/pl_component_form_item_input_text';

export class PlComponentListVerticalInfoItem extends Component {

    constructor() {

        super()

        this.svg_cross =
            <svg width='16' height='16' viewBox='0 0 10 10' fillRule='evenodd'>
                <path d='M9.8 8.6L8.4 10 5 6.4 1.4 10 0 8.6 3.6 5 .1 1.4 1.5 0 5 3.6 8.6 0 10 1.4 6.4 5z'></path>
            </svg>

        this.svg_plus =
            <svg width='16' height='16' viewBox='0 0 24 24' fillRule='evenodd'>
                <path d='M14 0h-4v10H0v4h10v10h4V14h10v-4H14z'></path>
            </svg>

        this.state = {
            loaded: false,
            isItemHovered: false
        };

    }

    /* EVENTS */

    onClickListItem(e) {

        if (isObjectAFunction(this.props.onClickListItem)) {
            this.props.onClickListItem(this.props.index);
        }
    }

    onHoverListItemValue(action) {

        var isItemHovered;

        if (action === "enter") isItemHovered = true;
        else if (action === "leave") isItemHovered = false;

        this.setState({
            isItemHovered: isItemHovered
        });

    }

    onClickDeleteButton(e) {

        if (isObjectAFunction(this.props.onClickDeleteItemButton)) {
            var index_item_to_delete = this.props.index;
            this.props.onClickDeleteItemButton(index_item_to_delete);
        }

    }

    onClickAddButton(e) {

        if (isObjectAFunction(this.props.onClickAddItemButton)) {

            var name_new_item = this.refs.input_name.state.input;
            var value_new_item = this.refs.input_value.state.input;

            if ((name_new_item.trim() !== "") && (value_new_item.trim() !== "")) {

                // the fields have been filled out => edited item
                this.props.onClickAddItemButton(this.props.index, name_new_item, value_new_item);

            } else { // not all fields have been filled out => non-edited item

                if (name_new_item.trim() === "") this.refs.input_name.setErrorMessage(" ");
                if (value_new_item.trim() === "") this.refs.input_value.setErrorMessage(" ");

            }

        }

    }

    onClickExtraButton() {

        if (isObjectAFunction(this.props.extra_button.onClick)) {

            var onClickMethod = this.props.extra_button.onClick;
            var item = { "name": this.props.name, "value": this.props.value };

            onClickMethod(item);

        }

    }

    /* RENDER METHODS */

    renderListItemName(widgetMode, name) {

        // if we are in "addition" mode and the item's name is undefined --> editable name --> form_item_input_text
        if ((widgetMode === "addition") && (name === undefined)) {

            return (
                <div className="_pl_component_list_vertical_info_item_name editable">
                    <PlComponentFormItemInputText
                        ref="input_name"
                        key={"name"}
                        placeholder={"name"}
                        required_input={""} />
                </div>
            );

            // otherwise, non-editable name --> NO form_item_input_text
        } else {

            return (
                <div className="tooltip">
                    <div className="pl_component_list_vertical_info_item_name">{name}</div>
                    <span className="tooltiptext_item_name">{name}</span>
                </div>

            );

        }
    }

    renderListItemValue(widgetMode, value, kind_value) {

        var item_value_classname = "grid-block pl_component_list_vertical_info_item_value " + kind_value;

        // if we are in "edition" mode, OR in "addition" mode with an undefined value --> editable value --> form_item_input_text
        if ((widgetMode === "edition") || ((widgetMode === "addition") && (value === undefined))) {

            var editable_item_value =
                <PlComponentFormItemInputText
                    ref="input_value" key={"value"} required_input={""}
                    placeholder={value !== undefined ? value : "value"} // in the value is undefined, the placeholder is the string "value"
                    value={value !== undefined ? value.toString() : ""}
                />

            if (widgetMode === "edition") {

                return (
                    <div className={item_value_classname + " editable"} >
                        {editable_item_value}
                    </div>
                );

            } else if ((widgetMode === "addition") && (value === undefined)) {
                return (
                    <div className={item_value_classname + " editable"}
                        onMouseEnter={this.onHoverListItemValue.bind(this, "enter")}
                        onMouseLeave={this.onHoverListItemValue.bind(this, "leave")} >
                        {editable_item_value}
                        {this.renderItemValueButton(widgetMode, value)}
                    </div>
                );

            }

        // otherwise, non-editable value --> NO form_item_input_text
        } else {

            if (widgetMode === "deletion") {

                return (
                    <div className={item_value_classname + " hoverable"}
                        onMouseEnter={this.onHoverListItemValue.bind(this, "enter")}
                        onMouseLeave={this.onHoverListItemValue.bind(this, "leave")} >
                        {value}
                        {this.renderItemValueButton(widgetMode, value)}
                    </div>
                );

            } else if ((widgetMode === "none") && (this.props.extra_button)) { // non-editable value with extra button

                return (
                    <div className={item_value_classname}>
                        {value}
                        <div className="grid-block shrink" style={{ "position": "absolute", "right": "0px" }} >
                            <PlComponentButtonIcon
                                icon={this.props.extra_button.icon}
                                backgroundcolor={"transparent"} backgroundhovercolor={"transparent"}
                                fontcolor={"#3A99D8"} fonthovercolor={"#81B9DE"}
                                bordercolor={"transparent"} borderhovercolor={"transparent"}
                                onclickelement={this.onClickExtraButton.bind(this)}
                            />
                        </div>
                    </div>
                );

            } else { // non-editable value in (search mode || addition mode with value !== undefined)

                return (
                    <div className={item_value_classname}>
                        {value}
                    </div>
                );

            }
        }
    }

    renderItemValueButton(widgetMode, value) {

        // the item's value displays a button to add/delete the item in "addition"/"deletion" mode

        var icon, onClickMethod;
        var backgroundhovercolor, fontcolor, fonthovercolor, opacity;
        if ((widgetMode === "addition") && (value === undefined)) {

            icon = this.svg_plus // add button
            onClickMethod = this.onClickAddButton.bind(this);

        } else if (widgetMode === "deletion") {
            icon = this.svg_cross // delete button
            onClickMethod = this.onClickDeleteButton.bind(this);

        }

        if (!this.state.isItemHovered) {
            fontcolor = "transparent";
            fonthovercolor = "#3A99D8";

        } else {
            fontcolor = "#3A99D8";
            fonthovercolor = "#3A99D8";

        }


        return (
            <div className="grid-block shrink" style={{ "position": "absolute", "right": "0px" }} >
                <PlComponentButtonIcon
                    icon={icon}
                    backgroundcolor={"transparent"} backgroundhovercolor={"transparent"}
                    fontcolor={fontcolor} fonthovercolor={fonthovercolor}
                    bordercolor={"transparent"} borderhovercolor={"transparent"}
                    onclickelement={onClickMethod} />
            </div>
        );
    }

    render() {

        // // "name" and "value" are displayed starting with a capital letter
        // var name, value;

        // if ((typeof this.props.name === 'string') && (this.props.name.trim() !== "")) name = (this.props.name[0]).toUpperCase() + (this.props.name).slice(1);
        // else name = this.props.name;
        // if ((typeof this.props.value === 'string') && (this.props.value.trim() !== "")) value = (this.props.value[0]).toUpperCase() + (this.props.value).slice(1);
        // else value = this.props.value;

        var name = this.props.name;
        var value = this.props.value;

        var index = this.props.index;
        var kind_value;

        var widgetMode = this.props.widgetMode; // either "none", "edition" or "addition"

        if (index % 2 === 0) kind_value = "two"; // even index case
        else kind_value = "one"; // odd index case, or undefined index

        return (

            <div className="grid-block pl_component_list_vertical_info_item" onClick={this.onClickListItem.bind(this)} >
                {this.renderListItemName(widgetMode, name)}
                {this.renderListItemValue(widgetMode, value, kind_value)}
            </div>
        );
    }
}