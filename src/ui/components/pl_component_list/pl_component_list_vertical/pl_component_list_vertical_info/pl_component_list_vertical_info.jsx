import React, { Component } from 'react';
import { isObjectAFunction } from './../../../../../modules/rkt_module_object';

//components
import { PlComponentListVerticalInfoItem } from './pl_component_list_vertical_info_item/pl_component_list_vertical_info_item';

export class PlComponentListVerticalInfo extends Component {

    constructor() {

        super()

        this.state = {
            loaded: false
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
            var value_item_to_delete = items[index_item_to_delete]["value"];

            var component_item_to_delete =
                <div className="grid-block shrink" style={{ "width": "250px" }}>
                    <PlComponentListVerticalInfoItem
                        index={0}
                        name={name_item_to_delete}
                        value={value_item_to_delete}
                        widgetMode={"none"}
                        extra_button={this.props.extra_button}
                    />
                </div>

            this.props.onClickDeleteItemButton(index_item_to_delete, component_item_to_delete);

        }
    }

    /* RENDER METHODS */

    renderListVerticalInfoItems(items) {
        
        if (items !== undefined) {
            
            return (

                items.map((item, index) => {
                    
                    return (
                        <PlComponentListVerticalInfoItem
                            ref={index}
                            index={index}
                            key={index}
                            name={item.name}
                            value={item.value}
                            onClickListItem={this.onClickListItem.bind(this)}
                            onClickDeleteItemButton={this.onClickDeleteItemButton.bind(this)}
                            onClickAddItemButton={this.props.onClickAddItemButton}
                            extra_button={this.props.extra_button}
                            widgetMode={this.props.widgetMode} // either "none", "search", "edition", "addition" or "delete"
                        />
                    );
                })

            );

        }

    }

    render() {

        var items = this.props.items;

        return (
            <div className="grid-block vertical pl_component_list_vertical_info">
                {this.renderListVerticalInfoItems(items)}
            </div>
        );
    }
}