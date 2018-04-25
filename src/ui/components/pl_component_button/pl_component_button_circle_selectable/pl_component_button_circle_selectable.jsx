import React, { Component } from 'react';
import { isObjectAFunction } from './../../../../modules/rkt_module_object';

export class PlComponentButtonCircleSelectable extends Component {

    constructor() {

        super()

        this.state = {
            loaded: false,
            hover: false,
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
            "border": "2px solid " + this.props.bordercolor,
            "fill":this.props.fontcolor
        };

        if (this.state.hover) {
            style["color"] = this.props.fonthovercolor; 
            style["backgroundColor"] = this.props.backgroundhovercolor;
            style["border"] = "2px solid " + this.props.borderhovercolor;
            style["fill"] = this.props.fonthovercolor
        }

        if(this.props.selected){
            style["color"] = this.props.fontselectedcolor; 
            style["backgroundColor"] = this.props.backgroundselectedcolor;
            style["border"] = "2px solid " + this.props.borderselectedcolor;
            style["fill"] = this.props.fontselectedcolor;
        }

        return (
            <a className="grid-block pl_component_button_circle_selectable"
                style={style}
                onMouseEnter={this.onHoverButton.bind(this)} 
                onMouseLeave={this.onHoverButton.bind(this)}
                onClick={this.onClickButton.bind(this)}>
                <div className="grid-block shrink button_circle_icon">
                    {icon}
                </div>
            </a>
        );
    }
}