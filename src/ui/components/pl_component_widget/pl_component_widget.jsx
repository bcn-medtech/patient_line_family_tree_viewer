import React, { Component } from 'react';
import { isObjectAFunction, isObjectEmpty } from './../../../modules/rkt_module_object';

// components
import { PlComponentButtonRect } from './../pl_component_button/pl_component_button_rect/pl_component_button_rect';
import { PlComponentFormItemInputText } from './../pl_component_form/pl_component_form_item/pl_component_form_item_input_text/pl_component_form_item_input_text';
import { PlComponentListHorizontalSelectableIcons } from './../pl_component_list/pl_component_list_horizontal/pl_component_list_horizontal_selectable_icons/pl_component_list_horizontal_selectable_icons';

export class PlComponentWidget extends Component {

    constructor(props) {

        super(props)

        this.svg_pencil =
            <svg width='16' height='16' viewBox='0 0 16 16' fillRule='evenodd'>
                <path d='M2.032 10.924l7.99-7.99 2.97 2.97-7.99 7.99zm9.014-8.91l1.98-1.98 2.97 2.97-1.98 1.98zM0 16l3-1-2-2z'></path>
            </svg>

        this.svg_plus =
            <svg width='16' height='16' viewBox='0 0 24 24' fillRule='evenodd'>
                <path d='M14 0h-4v10H0v4h10v10h4V14h10v-4H14z'></path>
            </svg>

        this.svg_trash =
            <svg width='16' height='16' viewBox='0 0 16 24' fillRule='evenodd'>
                <path d='M4 0h8v2H4zM0 3v4h1v17h14V7h1V3H0zm13 18H3V8h10v13z'></path>
                <path d='M5 10h2v9H5zm4 0h2v9H9z'></path>
            </svg>

        this.svg_search_16px =
            <svg width='16' height='16' viewBox='0 0 16 16' fillRule='evenodd'>
                <path d='M6 2c2.2 0 4 1.8 4 4s-1.8 4-4 4-4-1.8-4-4 1.8-4 4-4zm0-2C2.7 0 0 2.7 0 6s2.7 6 6 6 6-2.7 6-6-2.7-6-6-6zm10 13.8L13.8 16l-3.6-3.6 2.2-2.2z'></path>
                <path d='M16 13.8L13.8 16l-3.6-3.6 2.2-2.2z'></path>
            </svg>

        this.svg_search_20px =
            <svg width='20' height='20' viewBox='0 0 16 16' fillRule='evenodd'>
                <path d='M6 2c2.2 0 4 1.8 4 4s-1.8 4-4 4-4-1.8-4-4 1.8-4 4-4zm0-2C2.7 0 0 2.7 0 6s2.7 6 6 6 6-2.7 6-6-2.7-6-6-6zm10 13.8L13.8 16l-3.6-3.6 2.2-2.2z'></path>
                <path d='M16 13.8L13.8 16l-3.6-3.6 2.2-2.2z'></path>
            </svg>

        this.svg_settings =
            <svg width='20' height='20' viewBox='0 0 24 24' fillRule='evenodd'>
                <path d='M21.2 12c0-.5 0-1-.1-1.4L24 8l-2.5-4.1L18 5.1c-.8-.7-1.8-1.3-2.9-1.7L14.4 0H9.6l-.8 3.4c-1.1.4-2 1-2.9 1.7L2.5 3.9 0 8l2.9 2.6c-.1.4-.1.9-.1 1.4 0 .5 0 1 .1 1.4L0 16l2.5 4.1L6 18.9c.8.7 1.8 1.3 2.9 1.7l.7 3.4h4.8l.8-3.4c1.1-.4 2-1 2.9-1.7l3.5 1.1 2.4-4-2.9-2.6c.1-.4.1-.9.1-1.4zM12 15c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3z'></path>
            </svg>


        if ((this.props.isEditable === true) && (!isObjectEmpty(this.props.editor_actions))) { // only for "editor"/"admin" users

            var editor_actions = this.props.editor_actions;
            this.createEditionIcons(editor_actions);
        }

        this.state = {
            loaded: false
        };

    }

    componentWillReceiveProps(nextProps) {

        if (this.props !== nextProps) {

            var editor_actions = nextProps.editor_actions;

            if (isObjectEmpty(editor_actions)) {

                this.icons_info = undefined;

            } else if (this.icons_info === undefined) {

                this.createEditionIcons(editor_actions);

            }

        }

    }

    /* EVENTS */

    /* "Editor" events */
    onClickTopIcon(action) {
        // action = "search" OR "edit" OR "add" OR "delete"

        if (isObjectAFunction(this.props.onClickTopIcon)) {
            this.props.onClickTopIcon(action);
        }
    }

    onClickEndButton(action) {
        // only for "edition"; action = "Save" OR "Cancel"

        if (this.refs.widgetEditionButtons !== undefined) {

            this.refs.widgetEditionButtons.setState({
                selectedIcon: undefined
            });

        }

        if (isObjectAFunction(this.props.onClickEndButton)) {

            this.props.onClickEndButton(action);
        }

    }

    onQueryInSearchBar(index, isInputInvalid, text_field_value) {

        if (isObjectAFunction(this.props.onQuery)) {
            this.props.onQuery(index, isInputInvalid, text_field_value);
        }

    }

    /* ACTIONS */

    createEditionIcons(editor_actions) {
        this.icons_info = [];

        for (var i = 0; i < editor_actions.length; i++) {
            var action = editor_actions[i];
            var icon;

            switch (action) {
                case "search":
                    icon = this.svg_search_16px;
                    break;

                case "edit":
                    icon = this.svg_pencil;
                    break;

                case "add":
                    icon = this.svg_plus;
                    break;

                case "delete":
                    icon = this.svg_trash;
                    break;
            }

            this.icons_info.push({ "icon": icon, "onClick": this.onClickTopIcon.bind(this, action) });
        }

    }

    /* RENDER METHODS */
    renderIconsStartEdition() {
        // only for "editor" users

        if ((this.props.isEditable === true) && (this.icons_info !== undefined)) {
            return (
                <div className="grid-block align-right shrink">
                    <PlComponentListHorizontalSelectableIcons
                        ref="widgetEditionButtons" icons_info={this.icons_info}
                        backgroundcolor={"transparent"} backgroundhovercolor={"transparent"}
                        fontcolor={"#5C4EE5"} fonthovercolor={"#ffffff"} fontselectedcolor={"#ffffff"}
                        bordercolor={"transparent"} borderhovercolor={"transparent"} />
                </div>
            );
        }

    }

    renderSearchBar() { // only for "editor" users in "search" mode

        if ((this.props.isEditable) && (this.props.widgetMode === "search")) {
            return (
                <div className="grid-block shrink pl_component_widget_search_bar">
                    <PlComponentFormItemInputText
                        ref="searchBar" key={"widget_search_bar"} placeholder={"#search"}
                        required_input={""}
                        icon={this.svg_search_20px}
                        onInputChange={this.onQueryInSearchBar.bind(this)} />
                </div>
            );
        }

    }

    renderButtonsEndEdition() { // only for "editor" users, to save/cancel the changes in "edition" mode
        
        if ((this.props.widgetMode !== "none") && ((this.props.isEditable === true))) {

            if (this.props.widgetMode === "edition") {

                return (
                    <div className="grid-block align-right shrink pl_component_widget_end_edition_buttons">
                        <PlComponentButtonRect
                            text={"Save"} backgroundcolor={"#272822"}
                            backgroundhovercolor={"#5C4EE5"} fontcolor={"#5C4EE5"}
                            fonthovercolor={"#ffffff"} bordercolor={"#5C4EE5"} borderhovercolor={"#5C4EE5"}
                            onclickelement={this.onClickEndButton.bind(this, "save")} />
                        <PlComponentButtonRect
                            text={"Cancel"} backgroundcolor={"#272822"}
                            backgroundhovercolor={"#5C4EE5"} fontcolor={"#5C4EE5"}
                            fonthovercolor={"#ffffff"} bordercolor={"#5C4EE5"} borderhovercolor={"#5C4EE5"}
                            onclickelement={this.onClickEndButton.bind(this, "cancel")} />
                    </div>

                );

            } else {

                return (
                    <div className="grid-block align-right shrink pl_component_widget_end_edition_buttons">
                        <PlComponentButtonRect
                            text={"Cancel"} backgroundcolor={"#272822"}
                            backgroundhovercolor={"#5C4EE5"} fontcolor={"#5C4EE5"}
                            fonthovercolor={"#ffffff"} bordercolor={"#5C4EE5"} borderhovercolor={"#5C4EE5"}
                            onclickelement={this.onClickEndButton.bind(this, "cancel")} />
                    </div>

                );

            }

        }

    }

    render() {

        var icon = this.props.icon;
        var title = this.props.title;
        var Widget_content = this.props.Widget_content;

        return (

            <div className="grid-block vertical pl_component_widget" >
                <div className="grid-block shrink pl_component_view_widget_top_bar">
                    <div className="grid-block shrink pl_component_view_widget_top_bar_icon">
                        {icon}
                    </div>
                    <div className="grid-block pl_component_view_widget_top_bar_title">
                        {title}
                    </div>
                    {this.renderIconsStartEdition()}
                </div>
                {this.renderSearchBar()}
                <div className="pl_component_widget_content" style={this.props.style_content}>
                    {Widget_content}
                    {this.renderButtonsEndEdition()}
                </div>
            </div>

        );
    }
}