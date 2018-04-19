import React, { Component } from 'react';
import { isObjectAFunction } from './../../../../modules/pl_modules_object';

//components
import { PlComponentButtonIcon } from './../../../pl_component_button/pl_component_button_icon/pl_component_button_icon';

export class PlComponentListHorizontalSelectableIcons extends Component {

    constructor() {

        super()

        this.state = {};

    }

    renderSelectableIcons(icons_info) {

        return (
            icons_info.map((item) => {
                var icon = item.icon;
                var onClickFunction = item.onClick;

                return (
                    <div className="pl_component_list_horizontal_selectable_icon" key={icon}>
                        <PlComponentButtonIcon
                            icon={<i className={"fi-" + icon}></i>}
                            backgroundcolor={this.props.backgroundcolor}
                            backgroundhovercolor={this.props.backgroundhovercolor}
                            fontcolor={this.props.fontcolor}
                            fonthovercolor={this.props.fonthovercolor}
                            bordercolor={this.props.bordercolor}
                            borderhovercolor={this.props.borderhovercolor}
                            onclickelement={onClickFunction} />
                    </div>
                );
            })
        );
    }

    render() {

        var icons_info = this.props.icons_info;

        return (
            <div className="grid-block">
                {this.renderSelectableIcons(icons_info)}
            </div>
        );
    }
}