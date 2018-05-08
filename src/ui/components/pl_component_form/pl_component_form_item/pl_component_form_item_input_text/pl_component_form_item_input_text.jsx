import React, { Component } from 'react';
import { isObjectAFunction } from './../../../../../modules/rkt_module_object';

//components
import { PlComponentFormItemLabel } from './../pl_component_form_item_label/pl_component_form_item_label';
import { PlComponentFormItemMessage } from './../pl_component_form_item_message/pl_component_form_item_message';

export class PlComponentFormItemInputText extends Component {

    constructor(props) {

        super(props);
        
        var input = props.value;
        if (input === undefined) input = "";
        
        this.state = {
            input: input,
            isFormItemSelected: false,
            isInputInvalid: true,
            message: ""
        };
    }

    resetComponent(){

        this.setState({
            input: "",
            isFormItemSelected: false,
            isInputInvalid: true,
            message: ""
        });
    }

    onInputChange(e) {
        var text_field_value = e.target.value;
        var required_input = this.props.required_input;

        var isInputInvalid;

        if (text_field_value.trim() === "") { // if the input is an empty string (that is, "", " ", "   "...), the input is INVALID
            isInputInvalid = true;
            this.setState({ input: text_field_value, isInputInvalid: true, message: '' });

        } else {
            var valueHasNumbers = /\d/.test(text_field_value);
            var valueHasLetters = /[a-z]/i.test(text_field_value);
            var valueHasSymbols = /[^A-Za-z0-9\s]/.test(text_field_value);
            var valueHasSymbols_metalanguage_complete_case = /[^A-Za-z0-9#:><≥≤\s]/.test(text_field_value); // only for the metalanguage complete case, in which "#" and ":" are allowed
            var valueHasSymbols_metalanguage_widget_case = /[^A-Za-z0-9#\s]/.test(text_field_value); // only for the metalanguage widget case, in which "#" is allowed

            var required_input = this.props.required_input;
            switch (required_input) {
                case 'letter':
                    if ((valueHasNumbers) || (valueHasSymbols)) {
                        isInputInvalid = true;
                        this.setState({ input: text_field_value, isInputInvalid: true, message: "You have to write letters" });
                    }
                    else {
                        isInputInvalid = false;
                        this.setState({ input: text_field_value, isInputInvalid: false, message: '' });
                    }
                    break;

                case 'metalanguage_complete':
                    if (valueHasSymbols_metalanguage_complete_case) {
                        isInputInvalid = true;
                        this.setState({ input: text_field_value, isInputInvalid: true, message: "You have to write letters or numbers, '#' and ':', '>', '<', '≥' or '≤'" });
                    }
                    else {
                        isInputInvalid = false;
                        this.setState({ input: text_field_value, isInputInvalid: false, message: '' });
                    }
                    break;

                case 'metalanguage_widget':
                    if (valueHasSymbols_metalanguage_widget_case) {
                        isInputInvalid = true;
                        this.setState({ input: text_field_value, isInputInvalid: true, message: "You have to write letters or numbers, and '#'" });
                    }
                    else {
                        isInputInvalid = false;
                        this.setState({ input: text_field_value, isInputInvalid: false, message: '' });
                    }
                    break;

                case 'number':
                    if ((valueHasLetters) || (valueHasSymbols)) {
                        isInputInvalid = true;
                        this.setState({ input: text_field_value, isInputInvalid: true, message: "You have to write a number" });
                    }
                    else {
                        isInputInvalid = false;
                        this.setState({ input: text_field_value, isInputInvalid: false, message: '' });
                    }
                    break;

                case '':
                    isInputInvalid = false;
                    this.setState({ input: text_field_value, isInputInvalid: false, message: '' });
                    break;
            }
        }

        // this change is notified to the form
        if (isObjectAFunction(this.props.onInputChange)) {
            this.props.onInputChange(this.props.index, isInputInvalid, text_field_value);
        }
    }

    onInputFocus(e) {
        this.setState({ isFormItemSelected: true });
    }

    onInputBlur(e) {
        this.setState({ isFormItemSelected: false });
    }

    onInputClick(e) {
        if (isObjectAFunction(this.props.onclickelement)) {
            this.props.onclickelement();
        }
    }

    renderFormItemLabel(toWriteNumber, index, label, isFormItemSelected) {

        if (label !== undefined) {
            return (
                <PlComponentFormItemLabel toWriteNumber={toWriteNumber} index={index} label={label} isFormItemSelected={isFormItemSelected} />
            );
        }
    }

    renderTextField() {
        var isInputInvalid = this.state.isInputInvalid;
        var message = this.state.message;
        var classNameDiv = "grid-block pl_component_form_item_input_text"

        return (
            <div className={(isInputInvalid && message) ? classNameDiv+" invalid": classNameDiv}>
                <form className="grid-block">
                    <input className="grid-block"
                        type={this.props.type} // either "text" or "password" (default:"text")
                        value={this.state.input}
                        placeholder={this.props.placeholder}
                        onChange={this.onInputChange.bind(this)}
                        onFocus={this.onInputFocus.bind(this)}
                        onBlur={this.onInputBlur.bind(this)}
                        onClick={this.onInputClick.bind(this)} />
                </form>
                {this.renderIcon(this.props.icon)}
            </div>
        )
    }

    renderIcon(icon) {
        if (icon!==undefined){
            var classNameDiv = "grid-block shrink pl_component_form_item_input_text_icon"
            return (
                <div className={this.state.isFormItemSelected ? classNameDiv+" highlighted": classNameDiv}>
                    {icon}
                </div>
            );
        }
    }

    renderErrorMessage(message) {
        var isInputInvalid = this.state.isInputInvalid;

        if ((isInputInvalid) && (message)) {
            return (<PlComponentFormItemMessage message={message} />);
        }
    }

    render() {

        var index = this.props.index;
        var label = this.props.label;
        var isFormItemSelected = this.state.isFormItemSelected;
        var message = this.state.message;

        var toWriteNumber = false;
        if (index !== undefined) toWriteNumber = true;

        return (
            // <div className="grid-block shrink vertical">
            <div className="grid-block vertical">
                {this.renderFormItemLabel(toWriteNumber, index, label, isFormItemSelected)}
                {this.renderTextField()}
                {this.renderErrorMessage(message)}
            </div>
        );
    }
}

PlComponentFormItemInputText.defaultProps = {
    type:'text',
    placeholder: '',
    required_input:''
}