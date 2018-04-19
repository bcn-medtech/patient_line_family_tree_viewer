import React, { Component } from 'react';
import { isObjectAFunction } from './../../../../modules/pl_modules_object';

//components
import { PlComponentButtonText } from './../../../pl_component_button/pl_component_button_text/pl_component_button_text';

export class PlComponentListHorizontalSelectableText extends Component {

    constructor() {

        super()

        this.state = {};

    }

    onClickListSelectableTextItem(item) {

        this.setState({
            selectedItem: item
        });

        if (isObjectAFunction(this.props.onclickelement)) {
            this.props.onclickelement(item);
        }
    }

    renderSelectableText(items) {
        var fontcolor, fonthovercolor;
        var toWriteCommas = this.props.toWriteCommas;
        var commaDiv;
        
        if ((toWriteCommas!==undefined) && (toWriteCommas===true)) {
            commaDiv = <div style={{"color":this.props.fontcolor, "font":"20px Helvetica"}}>,</div>;
        }
        
        return (
            items.map((item, index) => {

                if (item !== this.state.selectedItem) { // non-selected items
                    fontcolor = this.props.fontcolor;
                    fonthovercolor = this.props.fonthovercolor;
                }
                else { // selected item
                    fontcolor = "#3A99D8";
                    fonthovercolor = "#3A99D8";
                }

                if (index===items.length -1 ) {
                    commaDiv = null;
                }

                return (
                    <div className="grid-block shrink pl_component_list_horizontal_selectable_text_item" key={item}>
                        <PlComponentButtonText
                            text={item}
                            backgroundcolor={this.props.backgroundcolor}
                            backgroundhovercolor={this.props.backgroundhovercolor}
                            fontcolor={fontcolor}
                            fonthovercolor={fonthovercolor}
                            bordercolor={this.props.bordercolor}
                            borderhovercolor={this.props.borderhovercolor}
                            onclickelement={this.onClickListSelectableTextItem.bind(this)} />
                        {commaDiv}
                    </div>
                );
            })
        );
    }

    render() {

        var items = this.props.items;

        return (
            <div className="grid-block">
                {this.renderSelectableText(items)}
            </div>
        );
    }
}