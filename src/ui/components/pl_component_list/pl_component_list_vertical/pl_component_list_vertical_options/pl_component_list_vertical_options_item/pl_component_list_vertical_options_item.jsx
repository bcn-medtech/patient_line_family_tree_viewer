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

export class PlComponentListVerticalOptionsItem extends Component {

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
            isItemHovered: false,
            isSelectedOptionInvalid: false
        };

    }

    /* EVENTS */

    // onClickListItem(props_item) {
        
    //     if (isObjectAFunction(this.props.onClickListItem)) {
    //         this.props.onClickListItem(props_item);
    //     }
    // }

    onHoverListItemValue(action) {

        var widgetMode = this.props.widgetMode;
        var name = this.props.name;
        var value = this.props.value;

        // the list item will hover in "deletion" mode OR in "addition" mode when the item has an undefined value
        if ((widgetMode === "deletion") || (widgetMode === "addition") && (value === undefined)) {

            var isItemHovered;

            if (action === "enter") isItemHovered = true;
            else if (action === "leave") isItemHovered = false;

            this.setState({
                isItemHovered: isItemHovered
            });

        }

    }

    onClickDeleteButton(e) {

        if (isObjectAFunction(this.props.onClickDeleteItemButton)) {
            var index_item_to_delete = this.props.index;
            this.props.onClickDeleteItemButton(index_item_to_delete);
        }

    }

    onChangeSelectedInput(e) {

        if (this.state.isSelectedOptionInvalid) {
            this.setState({
                isSelectedOptionInvalid: false
            });
        }
    }

    onClickAddButton(e) {

        if (isObjectAFunction(this.props.onClickAddItemButton)) {

            // 1st we check that this new item is available in the database
            var name_new_item = this.refs.input_name.state.input;
            var value_new_item = this.refs.input_value.value;

            if ((name_new_item.trim() !== "") && (value_new_item !== "select_list_title")) {

                // the fields have been filled out => edited item

                // this item can only be added if "name" (i.e., a user id) exists in the corresponding database
                var result = this.props.onClickAddItemButton(this.props.index, name_new_item, value_new_item);

                if (result === false) this.refs.input_name.setErrorMessage("Invalid user");

            } else { // not all fields have been filled out => non-edited item

                if (name_new_item.trim() === "") this.refs.input_name.setErrorMessage(" ");

                if (value_new_item === "select_list_title") {
                    this.setState({
                        isSelectedOptionInvalid: true
                    });

                }

            }

        }

    }

    onClickExtraButton() {
        
        if (isObjectAFunction(this.props.extra_button.onClick)) {
    
            var onClickMethod = this.props.extra_button.onClick;
            var item = {"name": this.props.name, "value": this.props.value, "author": this.props.author};
            
            onClickMethod(item);
            
        }

    }

    /* RENDER METHODS */

    renderListItemNameAndAuthor(widgetMode, name, author) {

        if ((widgetMode === "addition") && (name === undefined)) { // in "addition" mode with an undefined name --> editable name

            return (
                <div className="grid-block shrink pl_component_list_vertical_options_item_name editable">
                    <PlComponentFormItemInputText
                        ref="input_name"
                        key={"name"}
                        placeholder={"email"}
                        required_input={""} />
                </div>
            );

        } else { // --> non-editable name and author

            return (
                <div className="grid-block vertical align-left" >
                    <div className="pl_component_list_vertical_options_item_name">
                        {name}
                    </div>
                    <div className="pl_component_list_vertical_options_item_author">
                        {author}
                    </div>
                </div>
            );

        }

    }
    
    renderListItemValue(widgetMode, value) {
        
        if (((widgetMode === "none") && (this.props.extra_button))) { // --> non-editable value with an extra button
            
            return (
                <div className="grid-block align-right pl_component_list_vertical_options_item_value">
                    {value}
                    <div style={{ "position": "absolute", "right": "0px", "bottom":"0px" }} >
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

        } else if (((widgetMode === "none") && (!this.props.extra_button)) || (widgetMode === "addition") && (value !== undefined)) { // --> non-editable value

            return (
                <div className="grid-block align-right pl_component_list_vertical_options_item_value">
                    {value}
                </div>
            );

        } else if ((widgetMode === "addition") && (value === undefined)) { // --> editable value with button (select list)
            var classNameValueDiv = "grid-block pl_component_list_vertical_options_item_value editable"

            return (
                <div style={{"paddingRight":"50px"}} className={this.state.isSelectedOptionInvalid ? classNameValueDiv + " invalid" : classNameValueDiv}>
                    <select id="mySelect" ref="input_value" defaultValue="select_list_title" onChange={this.onChangeSelectedInput.bind(this)}>
                        <option disabled value="select_list_title">role</option>
                        <option value="Admin">Admin</option>
                        <option value="Editor">Editor</option>
                        <option value="Viewer">Viewer</option>
                    </select>
                    {this.renderListItemButton(widgetMode, value)}
                </div>
            );

        } else if (widgetMode === "edition") { // --> editable value without button
            var classNameValueDiv = "grid-block pl_component_list_vertical_options_item_value editable"
            
            return (
                <div className={this.state.isSelectedOptionInvalid ? classNameValueDiv + " invalid" : classNameValueDiv}>
                    <select id="mySelect" ref="input_value" defaultValue="select_list_title" onChange={this.onChangeSelectedInput.bind(this)}>
                        <option disabled value="select_list_title">{value}</option>
                        <option value="Admin">Admin</option>
                        <option value="Editor">Editor</option>
                        <option value="Viewer">Viewer</option>
                    </select>
                </div>
            );

        } else if (widgetMode === "deletion") { // --> non-editable value, but hoverable and with button
            
            return (
                <div className="grid-block align-right pl_component_list_vertical_options_item_value"
                    onMouseEnter={this.onHoverListItemValue.bind(this, "enter")}
                    onMouseLeave={this.onHoverListItemValue.bind(this, "leave")} >
                    {value}
                    {this.renderListItemButton(widgetMode, value)}
                </div>
            );
        }

    }

    renderListItemButton(widgetMode, value) {
        // the item's value displays a button to add/delete the item in "addition"/"deletion" mode

        var icon, onClickMethod;
        var backgroundhovercolor, fontcolor, fonthovercolor, opacity;

        if (widgetMode !== "none") {

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
                <div style={{ "position": "absolute", "right": "0px", "bottom":"0px" }} >
                    <PlComponentButtonIcon
                        icon={icon}
                        backgroundcolor={"transparent"} backgroundhovercolor={"transparent"}
                        fontcolor={fontcolor} fonthovercolor={fonthovercolor}
                        bordercolor={"transparent"} borderhovercolor={"transparent"}
                        onclickelement={onClickMethod} />
                </div>
            );
        }

    }


    render() {

        // "name" and "value" are displayed starting with a capital letter
        var name, value;

        if ((typeof this.props.name === 'string') && (this.props.name.trim() !== "")) name = (this.props.name[0]).toUpperCase() + (this.props.name).slice(1);
        else name = this.props.name;
        if ((typeof this.props.value === 'string') && (this.props.value.trim() !== "")) value = (this.props.value[0]).toUpperCase() + (this.props.value).slice(1);
        else value = this.props.value;

        // "author"
        var author;
        if (this.props.author === undefined) author = "";
        else author = this.props.author;


        var widgetMode = this.props.widgetMode;

        return (

            <div className={((this.state.isItemHovered) && (widgetMode === "deletion")) ? "grid-block pl_component_list_vertical_options_item hovered" : "grid-block pl_component_list_vertical_options_item"}
                // onClick={this.onClickListItem(this.props)}
                onMouseEnter={this.onHoverListItemValue.bind(this, "enter")}
                onMouseLeave={this.onHoverListItemValue.bind(this, "leave")} >
                {this.renderListItemNameAndAuthor(widgetMode, name, author)}
                {this.renderListItemValue(widgetMode, value)}
            </div>
        );
    }
}