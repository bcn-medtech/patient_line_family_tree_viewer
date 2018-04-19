import React, { Component } from 'react';
import { isObjectAFunction } from './../../../../../modules/pl_modules_object';

export class PlComponentListVerticalOptionsItem extends Component {

    constructor() {

        super()

        this.state = {
            loaded: false,
        };

    }

    onClickListItem(item) {

        if (isObjectAFunction(this.props.onClickListItem)) {
            this.props.onClickListItem(item);
        }
    }

    render() {

        // the elements of this item will always be displayed starting with a capital letter
        var name = (this.props.name[0]).toUpperCase()+(this.props.name).slice(1);
        var author = (this.props.author[0]).toUpperCase()+(this.props.author).slice(1);
        var option = (this.props.option[0]).toUpperCase()+(this.props.option).slice(1);
        
        return (

            <div className="grid-block pl_component_list_vertical_options_item" onClick={this.onClickListItem()}>
                <div className="grid-block vertical align-left">
                    <div className="pl_component_list_vertical_options_item_name">
                        {name}
                    </div>
                    <div className="pl_component_list_vertical_options_item_author">
                        {author}
                    </div> 
                </div>
                <div className="grid-block align-right pl_component_list_vertical_options_item_option">
                    {option}
                </div>
            </div>
        );
    }
}