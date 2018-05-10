import React, { Component } from 'react';
import { isObjectAFunction } from './../../../../modules/rkt_module_object';

export class PlComponentButtonIcon extends Component {

    constructor() {

        super()

        this.state = {
            loaded: false,
            hover: false
        };

    }

    onHoverButton(action) {
        
        var hover_status;
        if (action === "enter") hover_status = true;
        else if (action === "leave") hover_status = false;

        this.setState({
            hover: hover_status
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
            "fill": this.props.fontcolor, // svg styling
            "backgroundColor": this.props.backgroundcolor,
            "border": "2px solid" + this.props.bordercolor
        };

        if (this.state.hover) {
            style["color"] = this.props.fonthovercolor;
            style["fill"] = this.props.fonthovercolor; // svg styling 
            style["backgroundColor"] = this.props.backgroundhovercolor;
            style["border"] = "2px solid" + this.props.borderhovercolor;
        }

        return (
            
            <a className="grid-block shrink pl_component_button_icon"
                style={style}
                onMouseEnter={this.onHoverButton.bind(this, "enter")} 
                onMouseLeave={this.onHoverButton.bind(this, "leave")}
                onClick={this.onClickButton.bind(this)}>
                {icon}
            </a>
        );
    }
}