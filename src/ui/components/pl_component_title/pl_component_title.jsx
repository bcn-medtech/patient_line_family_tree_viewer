import React, { Component } from 'react';

export class PlComponentTitle extends Component {

    constructor() {

        super()

        this.state = {
            loaded: false,
        };

    }

    render() {

        var title = this.props.title;

        return (
            <div className="grid-block shrink pl_component_title">
                <h3>{title}</h3>
            </div>
        );
    }
}
