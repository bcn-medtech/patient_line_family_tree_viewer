import React, { Component } from 'react';
import { isObjectAFunction } from './../../../../modules/pl_modules_object';

//components
import { PlComponentListVerticalInfoItem } from './pl_component_list_vertical_info_item/pl_component_list_vertical_info_item';

// components

export class PlComponentListVerticalInfo extends Component {

    constructor() {

        super()

        this.state = {
            loaded: false
        };

    }

    onClickListItem(item) {

        if (isObjectAFunction(this.props.clickelement)) {
            this.props.clickelement(item);
        }
    }

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
                            onClickRemoveItemButton={this.props.onClickRemoveItemButton}
                            onClickAddItemButton={this.props.onClickAddItemButton}
                            widgetMode={this.props.widgetMode} // either "none", "edition" or "addition"
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