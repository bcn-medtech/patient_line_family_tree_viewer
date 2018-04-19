import React, { Component } from 'react';
import { PlComponentLabel } from './../../../../pl_component_label/pl_component_label';
import { isObjectAFunction } from './../../../../../modules/pl_modules_object';

export class PlComponentListVerticalMetadataItem extends Component {

    constructor() {

        super()

        this.state = {
            loaded: false,
        };

    }

    onClickListItem(item){
        
        if(isObjectAFunction(this.props.onClickListItem)){
            this.props.onClickListItem(this.props);
        }
    }

    renderMetadata(metadata) {

        if (metadata!==undefined) {

            return (
                <div className="grid-block align-center">
    
                   {
                        metadata.map((item) => {
                            return(<PlComponentLabel key={item.name} top_text={item.value} bottom_text={item.name} align="center" />);
                        })
                   }
    
                </div>
            );

        }

    }

    render() {

        var name = this.props.name;
        var date = this.props.date;
        var author = this.props.author;
        var metadata = this.props.metadata;

        return (

            <div className="grid-block shrink pl_component_list_vertical_metadata_item">
                <PlComponentLabel top_text={name} bottom_text={date} align="left" onClickLabel={this.onClickListItem.bind(this)}/>
                {this.renderMetadata(metadata)}
                <PlComponentLabel top_text={author} bottom_text="author" align="right" />
            </div>
        );
    }
}