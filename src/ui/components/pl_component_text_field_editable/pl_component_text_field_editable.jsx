import React, { Component } from 'react';

//components
import { PlComponentFormItemInputText } from './../pl_component_form/pl_component_form_item/pl_component_form_item_input_text/pl_component_form_item_input_text';
import { PlComponentFormItemInputTextSuggestion } from './../pl_component_form/pl_component_form_item/pl_component_form_item_input_text_suggestion/pl_component_form_item_input_text_suggestion';
import { PlComponentTextPlain } from './../pl_component_text/pl_component_text_plain/pl_component_text_plain';

export class PlComponentTextFieldEditable extends Component {

    constructor(props) {

        super(props)

        this.state = {
            isEditionMode: this.props.isEditionMode
        };

    }

    componentWillReceiveProps(nextProps) {

        if (nextProps !== this.props) {

            this.setState({
                isEditionMode: nextProps.isEditionMode
            });
        }

    }

    getEditedText() {

        if (this.refs.FormItemInputText) return this.refs.FormItemInputText.state.value;
        else return this.props.text;

    }

    renderTextField(text) {

        if (!this.state.isEditionMode) {

            return (
                <PlComponentTextPlain text={text} />
            );

        } else {
            
            if (!this.props.isSearchBox) {

                return (
                    <PlComponentFormItemInputText
                        ref="FormItemInputText"
                        value={text}
                        placeholder={text}
                        required_input={""}
                    />
                );

            } else if ((this.props.isSearchBox) && (this.props.suggestions)) {
                
                return (
                    <PlComponentFormItemInputTextSuggestion
                        ref="FormItemInputText"
                        suggestions={this.props.suggestions}
                        value={text}
                        placeholder={text}
                        required_input={""}
                    />
                );

            }
            

        }


    }

    render() {

        var text = this.props.text;

        return (

             <div className="grid-block shrink pl_component_text_field_editable">
                {this.renderTextField(text)}
            </div>

        );
    }
}