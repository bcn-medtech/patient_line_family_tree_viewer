import React, { Component } from 'react';
import { isObjectAFunction } from './../../../../modules/rkt_module_object';

export class PlComponentButtonCircle extends Component {

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

        var icon = this.props.icon;

        var style = {
            "color": this.props.fontcolor,
            "backgroundColor": this.props.backgroundcolor,
            "border": "2px solid" + this.props.bordercolor,
            "fill":this.props.fontcolor
        };

        if (this.state.hover) {
            style["color"] = this.props.fonthovercolor; 
            style["backgroundColor"] = this.props.backgroundhovercolor;
            style["border"] = "2px solid" + this.props.borderhovercolor;
            style["fill"] = this.props.fonthovercolor
        }

        return (
            <a className="grid-block shrink pl_component_button_circle"
                style={style} 
                onMouseEnter={this.onHoverButton.bind(this, "enter")} 
                onMouseLeave={this.onHoverButton.bind(this, "leave")} 
                onClick={this.onClickButton.bind(this)}>
                {icon}
            </a>
        );
    }
}