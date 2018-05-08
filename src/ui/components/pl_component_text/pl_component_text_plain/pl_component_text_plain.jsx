import React, { Component } from 'react';

export class PlComponentTextPlain extends Component {

    constructor() {

        super()

        this.state = {
            loaded: false,
        };

    }

    render() {

        var text = this.props.text;
        
        return (

            <div className="pl_component_text_plain">
                {text}
            </div>

        );
    }
}