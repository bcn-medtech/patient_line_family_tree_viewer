import React, { Component } from 'react';
import { isObjectAFunction } from './../../../../../modules/rkt_module_object.js';

//components
import { PlComponentFormItemLabel } from './../pl_component_form_item_label/pl_component_form_item_label';
import { PlComponentFormItemMessage } from './../pl_component_form_item_message/pl_component_form_item_message';

export class PlComponentFormItemInputOptions extends Component {

    constructor() {

        super();
        this.state = {
            input: "",
            isInputInvalid: true,
            message: ""
        };
    }

    // order of execution: onBlur, onFocus, onClick, onChange
    onInputBlur(e) {
        this.setState({ isFormItemSelected: false });
    }

    onInputFocus(e) {
        this.setState({ isFormItemSelected: true });
    }

    onInputChange(e) {
        var isInputInvalid = false;
        this.setState({ input: e.target.value, isInputInvalid: false, message: "" });

        // this change is notified to the form
        if (isObjectAFunction(this.props.onInputChange)) {
            this.props.onInputChange(this.props.index, isInputInvalid);
        }
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

    renderOptions(options, index) {
        var isFormItemSelected = this.state.isFormItemSelected;
        
        return (
            <div className={this.state.isFormItemSelected ? "grid-block shrink pl_component_form_item_input_options_highlighted" : "grid-block shrink pl_component_form_item_input_options"}>
                <form className="grid-block vertical">
                    {options.map((option, index) => {
                        return (
                            <div className="grid-block pl_component_form_item_input_option" key={index}>
                                <input
                                    type="radio"
                                    value={option}
                                    name="option"
                                    id={"option_" + parseInt(index + 1)}
                                    onBlur={this.onInputBlur.bind(this)}
                                    onFocus={this.onInputFocus.bind(this)}
                                    onChange={this.onInputChange.bind(this)}
                                    onClick={this.onInputClick.bind(this)} />
                                <label className="grid-block" htmlFor={"option_" + parseInt(index + 1)}>{option}</label>
                            </div>
                        );
                    })}
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
        
        var options = this.props.items;
        var message = this.state.message;

        var toWriteNumber = false;
        if (index!==undefined) toWriteNumber = true;

        return (
            <div className="grid-block vertical" style={{"overflow":"hidden"}}>
                {this.renderFormItemLabel(toWriteNumber, index, label, isFormItemSelected)}
                {this.renderOptions(options, index)}
                {this.renderErrorMessage(message)}
            </div>
        );
    }
}