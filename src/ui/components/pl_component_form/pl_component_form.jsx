import React, { Component } from 'react';
import { isObjectAFunction } from './../../../modules/rkt_module_object.js';

//components
import { PlComponentFormItemInputOptions } from './pl_component_form_item/pl_component_form_item_input_options/pl_component_form_item_input_options';
import { PlComponentFormItemInputText } from './pl_component_form_item/pl_component_form_item_input_text/pl_component_form_item_input_text';
import { PlComponentFormItemInputTextDate } from './pl_component_form_item/pl_component_form_item_input_text_date/pl_component_form_item_input_text_date';
import { PlComponentFormItemInputTextSuggestion } from './pl_component_form_item/pl_component_form_item_input_text_suggestion/pl_component_form_item_input_text_suggestion';
import { PlComponentButtonRect } from './../pl_component_button/pl_component_button_rect/pl_component_button_rect';

export class PlComponentForm extends Component {

    constructor(props) {

        super(props);
        var form_status = { "fields": [], "num_filled_fields": 0 }

        var items = this.props.form.form_elements;

        for (var i = 0; i < items.length; i++) {
            form_status["fields"].push({ "index": i, "filled": false });
        }

        this.state = {
            form_status: form_status,
            filled_form: {}
        };
    }

    renderFormItems(items) {
        
        return (
            <div className="grid-block vertical pl_component_form_items">
                {items.map((item, index) => {
                    var form_type = item.form_type;
                    var item_data = item.data;

                    if (form_type === "input_options") {

                        return (
                            <PlComponentFormItemInputOptions
                                ref={item_data.key}
                                index={index}
                                key={item_data.key}
                                label={item_data.label}
                                items={item_data.items}
                                onInputChange={this.computeFormStatus.bind(this)} />
                        );

                    } else if (form_type === "input_text") {
                        return (
                            <PlComponentFormItemInputText
                                ref={item_data.key}
                                index={index}
                                key={item_data.key}
                                label={item_data.label}
                                required_input={item_data.required_input}
                                onInputChange={this.computeFormStatus.bind(this)} />
                        );

                    } else if (form_type === "input_text_date") {

                        return (
                            <PlComponentFormItemInputTextDate
                                ref={item_data.key}
                                index={index}
                                key={item_data.key}
                                label={item_data.label}
                                onInputChange={this.computeFormStatus.bind(this)} />
                        );

                    } else if (form_type === "input_text_suggestion") {

                        return (
                            <PlComponentFormItemInputTextSuggestion
                                ref={item_data.key}
                                index={index}
                                key={item_data.key}
                                label={item_data.label}
                                suggestions={item_data.suggestions}
                                icon={<i className="fi-magnifying-glass"></i>}
                                required_input={item_data.required_input}
                                onInputChange={this.computeFormStatus.bind(this)} />
                        );
                    }

                })}
            </div>
        );
    }

    computeFormStatus(index_input, isInputInvalid) {

        var form_status = this.state.form_status; // {"fields":[{...},...,{...}], "num_fields": int, "num_filled_fields":int}
        var fields_info = form_status["fields"]; // [{"index":0, "filled":boolean},...,{"index":N, "filled":boolean}]

        var current_field_status = fields_info[index_input];
        current_field_status["filled"] = !isInputInvalid;

        var items = this.props.form.form_elements;
        var current_num_filled_fields = 0;

        for (var i = 0; i < items.length; i++) {
            var field_to_check = fields_info[i];
            var isFieldFilled = field_to_check["filled"]; // boolean

            if (isFieldFilled === true) {
                current_num_filled_fields = current_num_filled_fields + 1;
            }
        }
        form_status["num_filled_fields"] = current_num_filled_fields;

        this.setState({
            form_status: form_status
        });
    }

    saveAndSendFormInputs() {
        var keys = Object.keys(this.refs);
        var filled_form = { "form": [] };

        for (var i = 0; i < keys.length; i++) {
            var current_key = keys[i];
            var form_item_state = this.refs[current_key].state;

            var current_value = form_item_state.input;
            var isValueInvalid = form_item_state.isInputInvalid;
            var message_in_form_item = form_item_state.message;

            if ((isValueInvalid) && (!message_in_form_item)) {
                this.refs[current_key].setState({
                    message: "You have to fill out this field"
                })

            } else {
                filled_form["form"].push({ "key": current_key, "value": current_value.trim() });
            }
        }

        // we only save and send the answered form if it is complete
        if (this.state.form_status["num_filled_fields"] === keys.length) {

            this.setState({ filled_form: filled_form });

            if (isObjectAFunction(this.props.onclicksave)) {
                this.props.onclicksave(filled_form);
            }
        }
    }

    render() {

        var items = this.props.form.form_elements;
        var form_status = this.state.form_status;

        return (
            <div className="grid-frame">
                <div className="grid-block vertical pl_component_form">
                    <div className="pl_component_form_content">
                        <div className="grid-block">
                            <div className="grid-block small-2">&nbsp;</div>
                            {this.renderFormItems(items)}
                            <div className="grid-block small-2">&nbsp;</div>
                        </div>
                    </div>
                    <div className="grid-block pl_component_form_bottom_bar">
                        <div className="grid-block pl_component_form_bottom_bar_form_status">
                            {form_status["num_filled_fields"] + " of " + items.length}
                        </div>
                        <div className="pl_component_form_bottom_bar_save_button">
                            <PlComponentButtonRect
                                text={"Save"}
                                backgroundcolor={"transparent"}
                                backgroundhovercolor={"#5C4EE5"}
                                fontcolor={"#5C4EE5"}
                                fonthovercolor={"#ffffff"}
                                bordercolor={"#5C4EE5"}
                                borderhovercolor={"#5C4EE5"}
                                onclickelement={this.saveAndSendFormInputs.bind(this)} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}