/*
# Patient line family tree viewer is (c) BCNMedTech, UNIVERSITAT POMPEU FABRA
#
# Patient line family tree viewer is free software: you can redistribute it and/or modify
# it under the terms of the GNU Affero General Public License as
# published by the Free Software Foundation, either version 3 of the
# License, or (at your option) any later version.
#
# Patient line family tree viewer is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU Affero General Public License for more details.
#
# You should have received a copy of the GNU Affero General Public License
# along with this program.  If not, see <http://www.gnu.org/licenses/>.
#
# Authors:
# Carlos Yagüe Méndez
# Paula Bassagañas
# Paula Bassagañas
# Contributors: 
# Begoña Benito
# Bart Bijnens
# Oscar Camara
*/

import React, { Component } from 'react';
import { isObjectAFunction } from './../../../../../modules/rkt_module_object.js';
import TextInput from 'react-autocomplete-input';

//components
import { PlComponentFormItemLabel } from './../pl_component_form_item_label/pl_component_form_item_label';
import { PlComponentFormItemMessage } from './../pl_component_form_item_message/pl_component_form_item_message'

export class PlComponentFormItemInputTextSuggestion extends Component {

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

    resetInput() {

        this.setState({
            input: ""
        });
        
    }

    setErrorMessage(error_message) {

        this.setState({
            isInputInvalid: true,
            message: error_message
        });

    }

    onInputChange(text_field_value) {
        // 'TextInput' component with a props 'value' provides the value itself each time onChange is executed,
        // so here we do not do 'this.setState({ input: e.target.value });'

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
            this.props.onInputChange(this.props.index, isInputInvalid);
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

    renderTextField(suggestions) {
        var isInputInvalid = this.state.isInputInvalid;
        var message = this.state.message;
        var classNameDiv = "grid-block pl_component_form_item_input_text_suggestion";
        return (
            <div className={(isInputInvalid && message) ? classNameDiv+" invalid" : classNameDiv}>
                <form className="grid-block">
                    <TextInput
                        className="grid-block"
                        Component={"input"}
                        type={"text"}
                        value={this.state.input}
                        placeholder={this.props.placeholder}
                        onChange={this.onInputChange.bind(this)}
                        onFocus={this.onInputFocus.bind(this)}
                        onBlur={this.onInputBlur.bind(this)}
                        trigger={""}
                        regex={"^[a-zA-Z0-9_\-]+$"}
                        maxOptions={0}
                        options={suggestions}
                        onClick={this.onInputClick.bind(this)} />
                </form>
                {this.renderIcon(this.props.icon)}
            </div>
        );
    }

    renderIcon(icon) {
        if (icon !== undefined) {
            var classNameDiv = "grid-block shrink pl_component_form_item_input_text_suggestion_icon";
            return (
                <div className={this.state.isFormItemSelected ? classNameDiv+" highlighted" : classNameDiv}>
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
        var suggestions = this.props.suggestions;
        var message = this.state.message;

        var toWriteNumber = false;
        if (index !== undefined) toWriteNumber = true;

        return (
            <div className="grid-block vertical">
                {this.renderFormItemLabel(toWriteNumber, index, label, isFormItemSelected)}
                {this.renderTextField(suggestions)}
                {this.renderErrorMessage(message)}
            </div>
        );
    }
}


PlComponentFormItemInputTextSuggestion.defaultProps = {
    placeholder: '',
    required_input:''
}