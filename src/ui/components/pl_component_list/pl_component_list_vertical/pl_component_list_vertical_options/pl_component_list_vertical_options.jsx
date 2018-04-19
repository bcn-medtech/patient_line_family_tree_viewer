import React, { Component } from 'react';
import { isObjectAFunction } from './../../../../modules/pl_modules_object';

//components
import { PlComponentListVerticalOptionsItem } from './pl_component_list_vertical_options_item/pl_component_list_vertical_options_item';

// components

export class PlComponentListVerticalOptions extends Component {

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

    renderListVerticalOptionsItems(items) {
        return (

            items.map((item, index) => {

                return (
                    <PlComponentListVerticalOptionsItem
                        index={index}
                        key={index}
                        name={item.name}
                        author={item.author}
                        option={item.option}
                        onClickListItem={this.onClickListItem.bind(this)}
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