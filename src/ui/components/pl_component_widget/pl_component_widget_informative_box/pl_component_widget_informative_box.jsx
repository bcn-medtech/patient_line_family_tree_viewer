import React, { Component } from 'react';
import { isObjectAFunction, isObjectEmpty } from './../../../../modules/rkt_module_object';

// components
import { PlComponentButtonIcon } from './../../pl_component_button/pl_component_button_icon/pl_component_button_icon';

export class PlComponentWidgetInformativeBox extends Component {

    constructor() {

        super()

        this.state = {};

    }

    render() {

        var icon = this.props.icon;
        var backgroundcolor_icon = this.props.backgroundcolor_icon;
        var backgroundhovercolor_icon = this.props.backgroundhovercolor_icon;
        var fontcolor_icon = this.props.fontcolor_icon;
        var fonthovercolor_icon = this.props.fonthovercolor_icon;
        var fontselectedcolor_icon = this.props.fontselectedcolor_icon;
        var bordercolor_icon = this.props.bordercolor_icon;
        var borderhovercolor_icon = this.props.borderhovercolor_icon;

        return (
            <div className="grid-block shrink pl_component_widget_informative_box">
                <div className="grid-block shrink pl_component_widget_informative_box_icon">
                    <PlComponentButtonIcon
                        icon={this.props.icon}
                        backgroundcolor={backgroundcolor_icon} backgroundhovercolor={backgroundhovercolor_icon}
                        fontcolor={fontcolor_icon} fonthovercolor={fonthovercolor_icon} fontselectedcolor={fontselectedcolor_icon}
                        bordercolor={bordercolor_icon} borderhovercolor={borderhovercolor_icon}
                        onclickelement={this.props.onClickIcon} />
                </div>
            </div>
        );
    }
}