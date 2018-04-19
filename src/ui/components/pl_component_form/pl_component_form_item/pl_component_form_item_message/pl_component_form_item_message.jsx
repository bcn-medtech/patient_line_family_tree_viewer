import React, { Component } from 'react';

export class PlComponentFormItemMessage extends Component {

    constructor() {

        super()

        this.state = {
            loaded: false,
        };

    }

    render() {

        var message = this.props.message;
        
        return (

            <div className="grid-block pl_component_form_item_message">
                {message}
            </div>

        );
    }
}