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

//components
import { PlComponentFormItemLabel } from './../pl_component_form_item_label/pl_component_form_item_label';
import { PlComponentFormItemMessage } from './../pl_component_form_item_message/pl_component_form_item_message';

export class PlComponentFormItemInputTextDate extends Component {

    constructor() {

        super();
        this.state = {
            input: "",
            isFormItemSelected: false,
            isInputInvalid: true,
            message:""
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

    onInputChange(e) {
        var isInputInvalid = false;
        this.setState({ input: e.target.value, isInputInvalid: false, message: "" });

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

    renderTextField() {
        var isInputInvalid = this.state.isInputInvalid;
        var message = this.state.message;
        var classNameDiv = "grid-block pl_component_form_item_input_text_date";

        return (
            <div className={isInputInvalid && message ? classNameDiv+" invalid" : classNameDiv}>
                <form className="grid-block">
                    <input className="grid-block"
                        type="date"
                        value={this.state.input}
                        placeholder={""}
                        onChange={this.onInputChange.bind(this)}
                        onFocus={this.onInputFocus.bind(this)}
                        onBlur={this.onInputBlur.bind(this)} 
                        onClick={this.onInputClick.bind(this)}/>
                </form>
            </div>
        )
    }

    renderErrorMessage(message){
        var isInputInvalid = this.state.isInputInvalid;

        if ((isInputInvalid) && (message)){
            return(<PlComponentFormItemMessage message={message} />);
        }
    }

    render() {

        var index = this.props.index;
        var label = this.props.label;
        var isFormItemSelected = this.state.isFormItemSelected;
        var message = this.state.message;

        var toWriteNumber = false;
        if (index!==undefined) toWriteNumber = true;

        return (
            <div className="grid-block vertical">
                {this.renderFormItemLabel(toWriteNumber, index, label, isFormItemSelected)}
                {this.renderTextField()}
                {this.renderErrorMessage(message)}
            </div>
        );
    }
}