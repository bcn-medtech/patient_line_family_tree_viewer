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