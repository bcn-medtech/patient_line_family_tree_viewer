import React, { Component } from 'react';
import { isObjectAFunction } from './../../../../modules/pl_modules_object';

// components
import { PlComponentListVerticalMetadataItem } from './pl_component_list_vertical_metadata_item/pl_component_list_vertical_metadata_item';

export class PlComponentListVerticalMetadata extends Component {

    constructor() {

        super()

        this.state = {};

    }

    onClickListItem(item) {

        if (isObjectAFunction(this.props.onclickelement)) {
            this.props.onclickelement(item);
        }
    }

    renderList(metadata) {

        return (
            <div className="grid-block vertical pl_component_list_vertical_items">
                {
                    metadata.map((item, index) => {

                        return (
                            <PlComponentListVerticalMetadataItem
                                key={index}
                                name={item.name}
                                date={item.date}
                                author={item.author}
                                metadata={item.metadata}
                                onClickListItem={this.onClickListItem.bind(this)}
                            />
                        );
                    })
                }
            </div>
        );
    }

    render() {

        var listItems = this.props.items;
        var listHeader = this.props.header;
        
        return (

            <div className="grid-block shrink vertical pl_component_list_vertical_metadata">
                <div className="grid-block pl_component_list_vertical_metadata_title">{listHeader}</div>
                {this.renderList(listItems)}
            </div>
        );
    }
}