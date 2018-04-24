import React, { Component } from 'react';
import { isObjectAFunction } from './../../../../modules/rkt_module_object.js';

export class PlComponentButtonRect extends Component {

    constructor() {

        super()

        this.state = {
            loaded: false,
            hover: false
        };

    }

    onHoverButton(ev) {

        this.setState({
            hover: !this.state.hover
        });

    }

    onClickButton(ev) {

        ev.preventDefault();
        ev.stopPropagation();

        if (isObjectAFunction(this.props.onclickelement)) {
            this.props.onclickelement();
        }
    }

    render() {

        var text = this.props.text;

        var style = {
            "color": this.props.fontcolor,
            "backgroundColor": this.props.backgroundcolor,
            "border": "2px solid" + this.props.bordercolor
        };

        if (this.state.hover) {
            style["color"] = this.props.fonthovercolor; 
            style["backgroundColor"] = this.props.backgroundhovercolor;
            style["border"] = "2px solid" + this.props.borderhovercolor;
        }

        return (

            <a className="grid-block pl_component_button_rect"
                style={style}
                onMouseEnter={this.onHoverButton.bind(this)} 
                onMouseLeave={this.onHoverButton.bind(this)}
                onClick={this.onClickButton.bind(this)}>
                {text}
            </a>
        );
    }
}