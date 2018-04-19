import React, { Component } from 'react';

export class PlComponentFormItemLabel extends Component {

    constructor() {

        super()

        this.state = {
            loaded: false,
        };

    }

    render() {

        var label = this.props.label;

        // to enumerate the label
        var index = this.props.index;
        var toWriteNumber = this.props.toWriteNumber;
        var number_label = "";
        if ((toWriteNumber!==undefined) && (index!==undefined)) number_label = index + 1 + ".";
        
        // to highlight or not the label
        var isFormItemSelected = this.props.isFormItemSelected;
        
        return (

            <div className={isFormItemSelected ? "grid-block shrink pl_component_form_item_label_highlighted" : "grid-block shrink pl_component_form_item_label" }>
                <div className="grid-block shrink pl_component_form_item_label_number">
                    {number_label}
                </div>
                {label}
            </div>

        );
    }
}