import React, { Component } from 'react';
import { isObjectAFunction } from './../../../../../modules/rkt_module_object';

//components
import { PlComponentListVerticalOptionsItem } from './pl_component_list_vertical_options_item/pl_component_list_vertical_options_item';

// components

export class PlComponentListVerticalOptions extends Component {

    constructor() {

        super()

        this.state = {
            loaded: false,
            widgetMode: "none"
        };

    }

    /* EVENTS */

    onClickListItem(item) {
        if (isObjectAFunction(this.props.clickelement)) {
            this.props.clickelement(item);
        }
    }

    onClickDeleteItemButton(index_item_to_delete) {

        if (isObjectAFunction(this.props.onClickDeleteItemButton)) {

            var items = this.props.items;
            var name_item_to_delete = items[index_item_to_delete]["name"];
            var author_item_to_delete = items[index_item_to_delete]["author"];
            var value_item_to_delete = items[index_item_to_delete]["value"];

            var component_item_to_delete =
                <div className="grid-block shrink" style={{ "width": "500px" }} >
                    <PlComponentListVerticalOptionsItem
                        index={0}
                        name={name_item_to_delete}
                        author={author_item_to_delete}
                        value={value_item_to_delete}
                        widgetMode={"none"}
                    />
                </div>

            this.props.onClickDeleteItemButton(index_item_to_delete, component_item_to_delete);
        }

    }

    /* RENDER METHODS */
    
    renderListVerticalOptionsItems(items) {
        return (

            items.map((item, index) => {

                return (
                    <PlComponentListVerticalOptionsItem
                        ref={index}
                        index={index}
                        key={index}
                        name={item.name}
                        author={item.author}
                        value={item.value}
                        onClickListItem={this.onClickListItem.bind(this)}
                        onClickDeleteItemButton={this.onClickDeleteItemButton.bind(this)}
                        onClickAddItemButton={this.props.onClickAddItemButton}
                        extra_button={this.props.extra_button}
                        widgetMode={this.props.widgetMode} // either "none", "addition", "edition" or "delete"
                    />
                );
            })

        );
    }

    render() {

        var items = this.props.items;

        return (
            <div className="grid-block vertical pl_component_list_vertical_options">
                {this.renderListVerticalOptionsItems(items)}
            </div>
        );
    }
}