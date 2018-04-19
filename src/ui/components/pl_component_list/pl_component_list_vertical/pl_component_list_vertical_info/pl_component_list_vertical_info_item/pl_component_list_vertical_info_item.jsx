import React, { Component } from 'react';
import { isObjectAFunction } from './../../../../../modules/pl_modules_object';

// components
import { PlComponentButtonIcon } from './../../../../pl_component_button/pl_component_button_icon/pl_component_button_icon';
import { PlComponentFormItemInputText } from './../../../../pl_component_form/pl_component_form_item/pl_component_form_item_input_text/pl_component_form_item_input_text';

export class PlComponentListVerticalInfoItem extends Component {

    constructor() {

        super()

        this.state = {
            loaded: false,
            isItemHovered: false
        };

    }
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

        if (isObjectAFunction(this.props.onClickRemoveItemButton)) {
            this.props.onClickRemoveItemButton(this.props.index);
        }

    }

    onClickAddButton(e) {

        if (isObjectAFunction(this.props.onClickAddItemButton)) {

            var name_new_item = this.refs.input_name_text_field.state.input;
            var value_new_item = this.refs.input_value_text_field.state.input;

            if ((name_new_item.trim() !== "") && (value_new_item.trim() !== "")) {
                // the fields have been filled out => edited item
                this.props.onClickAddItemButton(this.props.index, name_new_item, value_new_item);

            } else { // not all fields have been filled out => non-edited item

                var message = "You have to fill out this field";

                if (name_new_item.trim() === "") {
                    this.refs.input_name_text_field.setState({
                        isInputInvalid: true,
                        message: message
                    });
                }

                if (value_new_item.trim() === "") {
                    this.refs.input_value_text_field.setState({
                        isInputInvalid: true,
                        message: message
                    });
                }

            }

        }

    }

    renderListItemName(widgetMode, name) {

        // if we are in "addition" mode and the item's name is undefined --> editable name --> form_item_input_text
        if ((widgetMode === "addition") && (name === undefined)) {

            return (
                <div className="pl_component_list_vertical_info_item_name editable">
                    <PlComponentFormItemInputText
                        ref="input_name_text_field"
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
                    ref="input_value_text_field"
                    key={"value"}
                    required_input={""}
                    placeholder={value !== undefined ? value : "value"} // in the value is undefined, the placeholder is the string "value"
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

            } else {

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

            icon = <i className="fi-plus"></i> // add button
            onClickMethod = this.onClickAddButton.bind(this);

        } else if (widgetMode === "deletion") {
            icon = <i className="fi-x"></i> // delete button
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
                    fontcolor={fontcolor} fonthovercolor={fontcolor}
                    bordercolor={"transparent"} borderhovercolor={"transparent"}
                    onclickelement={onClickMethod} />
            </div>
        );
    }

    render() {

        // "name" and "value" are displayed starting with a capital letter
        var name, value;

        if ((typeof this.props.name === 'string') && (this.props.name.trim() !== "")) name = (this.props.name[0]).toUpperCase() + (this.props.name).slice(1);
        else name = this.props.name;
        if ((typeof this.props.value === 'string') && (this.props.value.trim() !== "")) value = (this.props.value[0]).toUpperCase() + (this.props.value).slice(1);
        else value = this.props.value;

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