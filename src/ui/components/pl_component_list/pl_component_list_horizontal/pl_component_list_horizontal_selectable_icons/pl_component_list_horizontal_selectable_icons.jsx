import React, { Component } from 'react';
import { isObjectAFunction } from './../../../../../modules/rkt_module_object';

//components
import { PlComponentButtonIcon } from './../../../pl_component_button/pl_component_button_icon/pl_component_button_icon';

export class PlComponentListHorizontalSelectableIcons extends Component {

    constructor() {

        super()

        this.state = {
            selectedIcon:undefined
        };

    }

    onClickListSelectableIcon(item) {

        this.setState({
            selectedIcon: item.icon
        });

        if (isObjectAFunction(item.onClick)) {
            item.onClick();
        }
    }

    renderSelectableIcons(icons_info) {
        var fontcolor, fonthovercolor;
        
        return (
            icons_info.map((item, index) => {
                var icon = item.icon;
                
                if (item.icon !== this.state.selectedIcon) { // non-selected items
                    fontcolor = this.props.fontcolor;
                    fonthovercolor = this.props.fonthovercolor;
                    
                } else { // selected item
                    fontcolor = this.props.fontselectedcolor;
                    fonthovercolor = this.props.fontselectedcolor;
                }

                return (
                    <div className="pl_component_list_horizontal_selectable_icon" key={index}>
                        <PlComponentButtonIcon
                            icon={icon}
                            backgroundcolor={this.props.backgroundcolor}
                            backgroundhovercolor={this.props.backgroundhovercolor}
                            fontcolor={fontcolor}
                            fonthovercolor={fonthovercolor}
                            bordercolor={this.props.bordercolor}
                            borderhovercolor={this.props.borderhovercolor}
                            onclickelement={this.onClickListSelectableIcon.bind(this, item)} />
                    </div>
                );
            })
        );
    }

    render() {

        var icons_info = this.props.icons_info;

        return (
            <div className="grid-block shrink">
                {this.renderSelectableIcons(icons_info)}
            </div>
        );
    }
}