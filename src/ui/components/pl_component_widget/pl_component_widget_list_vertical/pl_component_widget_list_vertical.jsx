import React, { Component } from 'react';
import { isObjectAFunction, isObjectEmpty } from './../../../../modules/rkt_module_object';
import _  from 'underscore';

// components
import { PlComponentConfirmMessage } from './../../pl_component_comfirm_message/pl_component_confirm_message';
import { PlComponentListVerticalInfo } from './../../pl_component_list/pl_component_list_vertical/pl_component_list_vertical_info/pl_component_list_vertical_info';
import { PlComponentListVerticalOptions } from './../../pl_component_list/pl_component_list_vertical/pl_component_list_vertical_options/pl_component_list_vertical_options';
import { PlComponentModal } from './../../pl_component_modal/pl_component_modal';
import { PlComponentTextPlain } from './../../pl_component_text/pl_component_text_plain/pl_component_text_plain';
import { PlComponentWidget } from './../pl_component_widget';
import { PlComponentWidgetInformativeBox } from './../pl_component_widget_informative_box/pl_component_widget_informative_box';

// actions
import { obtainListVerticalInfoFromQuery } from './pl_component_widget_list_vertical_actions';

export class PlComponentWidgetListVertical extends Component {

    constructor(props) {

        super(props)

        this.svg_plus =
            <svg width='16' height='16' viewBox='0 0 24 24' fillRule='evenodd'>
                <path d='M14 0h-4v10H0v4h10v10h4V14h10v-4H14z'></path>
            </svg>

        var list_vertical_items = this.props.list_vertical_items;
        var editor_actions = this.props.editor_actions;
        if (isObjectEmpty(list_vertical_items)) {
            editor_actions = [];
        }

        this.state = {
            loaded: false,
            widgetMode: "none",
            editor_actions: editor_actions,
            list_vertical_items: this.props.list_vertical_items,
            previous_items: this.props.list_vertical_items,
            isModalOpen: false,
            index_item_to_delete: undefined,
            component_confirm_message: undefined
        };

    }

    componentWillReceiveProps(nextProps) {

        if (nextProps !== this.props) {

            var editor_actions = nextProps.editor_actions;

            //
            var widgetMode = this.state.widgetMode;
            
            if (isObjectEmpty(nextProps.list_vertical_items)) {
                editor_actions = [];
                widgetMode = "none";
                
            } else if (widgetMode === "edition") {
                widgetMode = "none";

            } else if (nextProps.isEditable === false) {
                widgetMode = "none";
            }
            //

            this.setState({
                list_vertical_items: nextProps.list_vertical_items,
                previous_items: nextProps.list_vertical_items,
                editor_actions: editor_actions,
                widgetMode: widgetMode
            });
        }

    }

    /* EVENTS */

    onClickStartEditionButton() {

        this.onClickTopIcon("add");

    }

    onClickTopIcon(action) {
        // action = "search" OR "edit" OR "add" OR "delete"

        var widgetMode, edited_items;
        edited_items = (this.state.list_vertical_items).slice();

        // only items with both "name" and "value" defined can be edited
        edited_items = _.filter(edited_items, function (item) {
            return item["name"] !== undefined && item["value"] !== undefined
        });


        if (action === "search") widgetMode = "search";

        else if (action === "edit") widgetMode = "edition";

        else if (action === "add") {

            widgetMode = "addition";
            // we add a new item in the list with undefined fields to edit
            edited_items.unshift({ "name": undefined, "value": undefined });

        }

        else if (action === "delete") widgetMode = "deletion";

        this.setState({
            widgetMode: widgetMode,
            list_vertical_items: edited_items
        });

    }

    /* "edition" events */
    onClickBottomButton(action) {
        // action = "save" OR "cancel"

        var final_items = [];

        if (action === "save") { // we SAVE the changes

            // we collect all the values of the editable items
            var component_list_vertical = this.refs.listVertical;
            var refs_component_list_vertical = component_list_vertical.refs;
            
            var name_final_item, value_final_item;
            
            for (var i = 0; i < Object.keys(refs_component_list_vertical).length; i++) {
                var item = refs_component_list_vertical[i];
                
                var props_name_item = item.props.name;
                var props_value_item = item.props.value;

                if (Object.keys(item.refs).length > 0) { // case of an item with editable fields => possibly edited item

                    // in "edition" mode,
                    var value_edited_name;  // "value" is always editable
                    name_final_item = props_name_item; // "name" is never editable
                    
                    if (this.props.type_of_list_vertical === "info") {

                        var value_edited_item = item.refs.input_value.state.input;

                        // //if the value field of the item is NOT empty => edited value
                        // if (value_edited_item.trim() !== "") value_final_item = value_edited_item;
                        // // otherwise, the value has not been edited => we save its initial value (props)
                        // else value_final_item = props_value_item;

                        value_final_item = value_edited_item;

                    } else if (this.props.type_of_list_vertical === "options") {
                        
                        value_edited_item = item.refs.input_value.value;
                        
                        if (value_edited_item === "select_list_title") value_final_item = props_value_item;
                        else value_final_item = value_edited_item;
                        
                    }

                    // Another possibility to take into account... (but not for the moment)
                    // value_final_item = value_edited_item;
                }

                // and we update the items
                final_items.push({ "name": name_final_item, "value": value_final_item });

            }

            // and we save this definitive change in the database
            var changed_items = final_items;
            this.saveWidgetChanges(final_items, changed_items, "edition");

        } else if (action === "cancel") { // we DO NOT save the changes

            final_items = this.state.previous_items.slice();

            // we remove possible items with undefined fields
            final_items = _.filter(final_items, function (item) {
                return item["name"] !== undefined && item["value"] !== undefined
            });

            this.setState({
                widgetMode: "none",
                list_vertical_items: final_items
            });

        }

    }
    /* "addition" events */
    onClickAddItemButton(index_item, name_new_item, value_new_item) {

        var final_items = (this.state.list_vertical_items).slice();
        final_items[index_item]["name"] = name_new_item;
        final_items[index_item]["value"] = value_new_item;

        var changed_items = final_items[index_item];

        // and we save this definitive change in the database
        if (this.props.type_of_list_vertical === "options") {
            // in this case, we want to know if the added item is valid
            // (see "onClickAddButton()" in "pl_component_list_vertical_options_item.jsx")

            var result = this.saveWidgetChanges(final_items, changed_items, "addition");

            return result;

        } else {
            this.saveWidgetChanges(final_items, changed_items, "addition");
        }

    }

    /* "deletion" events */
    onClickDeleteItemButton(index_item_to_delete, component_item_to_delete) {

        var component_confirm_message = this.createComponentConfirmMessage(index_item_to_delete, component_item_to_delete);

        this.setState({
            isModalOpen: true,
            index_item_to_delete: index_item_to_delete,
            component_confirm_message: component_confirm_message
        })

    }

    /* "search" events */
    onQueryInSearchBar(index, isInputInvalid, query) {// for the moment, only in "search" mode of "pl_component_list_vertical_info"

        if (!isInputInvalid) { // if the query is NOT invalid

            var final_items;
            var edited_items = (this.state.previous_items).slice();

            // we remove possible items with undefined fields
            edited_items = _.filter(edited_items, function (item) {
                return item["name"] !== undefined && item["value"] !== undefined
            });

            if (!isObjectEmpty(edited_items)) {

                // and we create a new list_vertica_info with the results of the query
                final_items = obtainListVerticalInfoFromQuery(query, edited_items);

            }

        } else if (query.trim() === "") { // if the query is invalid because the text field is empty
            // we display the previous list_vertical
            final_items = this.state.previous_items;

        }

        this.setState({
            list_vertical_items: final_items
        });
    }

    onClickConfirmMessageButton(answer) {
        // "answer" is either "Yes" or "Cancel"

        if (answer === "Yes") this.removeItem(); // we remove the item and close the modal
        else if (answer === "Cancel") this.refs.ModalRemoveItemMessage.closeModal(); // we close the modal without removing the item

    }

    onClickModalEscButton() { // a modal with a confirm message is opened/closed --> see "renderModal()"

        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    /* ACTIONS */

    saveWidgetChanges(final_items, changed_items, action) {

        if (isObjectAFunction(this.props.saveWidgetChanges)) {

            if (this.props.type_of_list_vertical === "options") {
                // in an options list, we want to check that an added item is correct
                // (see "onClickAddItemButton()")
                var result = this.props.saveWidgetChanges(final_items, changed_items, action);

                return result;

            } else if (this.props.type_of_list_vertical === "info") {

                this.props.saveWidgetChanges(final_items, changed_items, action);

            }

        }
    }

    createComponentConfirmMessage(index_item_to_delete, component_item_to_delete) {
        var delete_item_message = "Are you sure you want to delete this element?";
        /* 
            "component_item_to_delete" is a React component (either "PlComponentListVerticalInfoItem"
            OR "PlComponentListVerticalOptionsItem" that is displayed in the confirmMessage as an extra message)
        */
        
        var confirm_message =
            <PlComponentConfirmMessage
                message={delete_item_message} extra_message={component_item_to_delete}
                confirm_button_text={"Yes"}
                cancel_button_text={"Cancel"}
                onclickanswerbutton={this.onClickConfirmMessageButton.bind(this)}
                
            />;

        return confirm_message;
    }

    removeItem() {

        var index_item_to_delete = this.state.index_item_to_delete;

        // then, we remove the item from the list_vertical
        var final_items = (this.state.list_vertical_items).slice();
        var changed_items = final_items[index_item_to_delete];

        final_items.splice(index_item_to_delete, 1);

        // and we close the modal
        this.refs.ModalRemoveItemMessage.closeModal();

        // and we save this definitive change in the database
        this.saveWidgetChanges(final_items, changed_items, "deletion");

        this.setState({
            index_item_to_delete: undefined,
            component_confirm_message: undefined
        });

    }

    /* RENDER METHODS */

    renderModal() {

        var isModalOpen = this.state.isModalOpen;

        if (isModalOpen) {

            var component_confirm_message = this.state.component_confirm_message;

            return (
                <PlComponentModal
                    ref="ModalRemoveItemMessage"
                    title={""}
                    Modal_content={component_confirm_message}
                    onclickesc={this.onClickModalEscButton.bind(this)} />
            );

        }
    }

    renderWidgetContent() {

        var list_vertical_items = this.state.list_vertical_items;
        var type_of_list_vertical = this.props.type_of_list_vertical;
        var widget_content;
        var widgetMode = this.state.widgetMode;

        if (isObjectEmpty(list_vertical_items) && (widgetMode === "none")) {

            if (this.props.isEditable === true) {
                widget_content =
                    <PlComponentWidgetInformativeBox
                        icon={this.svg_plus}
                        backgroundcolor_icon={"transparent"}
                        backgroundhovercolor_icon={"transparent"}
                        fontcolor_icon={"#5C4EE5"}
                        fonthovercolor_icon={"$color-normal-2"}
                        fontselectedcolor_icon={"$color-normal-2"}
                        bordercolor_icon={"transparent"}
                        borderhovercolor_icon={"transparent"}
                        onClickIcon={this.onClickStartEditionButton.bind(this)}
                    />
                } else widget_content = widget_content = <PlComponentTextPlain ref="text" text={"No data available"} />

        } else {

            if (type_of_list_vertical === "info") {
                
                widget_content =
                    <PlComponentListVerticalInfo
                        ref="listVertical"
                        items={list_vertical_items}
                        widgetMode={widgetMode} // either "none", "search", "edition", "addition" or "deletion"
                        onClickDeleteItemButton={this.onClickDeleteItemButton.bind(this)}
                        onClickAddItemButton={this.onClickAddItemButton.bind(this)}
                        extra_button={this.props.extra_button}
                    />

            } else if (this.props.type_of_list_vertical === "options") {

                widget_content =
                    <PlComponentListVerticalOptions
                        ref="listVertical"
                        items={list_vertical_items}
                        widgetMode={widgetMode} // either "none", "search", "edition", "addition" or "deletion"
                        onClickDeleteItemButton={this.onClickDeleteItemButton.bind(this)}
                        onClickAddItemButton={this.onClickAddItemButton.bind(this)}
                        extra_button={this.props.extra_button}
                    />

            }

        }

        return widget_content;

    }

    render() {

        return (

            <div className="grid-block pl_component_widget_list_vertical" >
                <PlComponentWidget
                    ref="widget"
                    isEditable={this.props.isEditable} // boolean
                    editor_actions={this.state.editor_actions} // only for "editor" users
                    widgetMode={this.state.widgetMode} // either "none", "search", "edition", "addition" or "deletion"
                    icon={this.props.icon}
                    title={this.props.title}
                    onQuery={this.onQueryInSearchBar.bind(this)}
                    Widget_content={this.renderWidgetContent()}
                    onClickTopIcon={this.onClickTopIcon.bind(this)}
                    onClickEndButton={this.onClickBottomButton.bind(this)}
                />

                {this.renderModal()}
            </div>
        );
    }
}