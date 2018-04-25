import React, { Component } from 'react';
import { isObjectAFunction } from './../../../modules/rkt_module_object';

//components
import { PlComponentButtonRect } from './../pl_component_button/pl_component_button_rect/pl_component_button_rect';

export class PlComponentConfirmMessage extends Component {

    onClickAnswerButton(answer) {
        // "answer" is either "Yes" or "Cancel"

        if (isObjectAFunction(this.props.onclickanswerbutton)) {
            this.props.onclickanswerbutton(answer);
        }

    }

    render() {

        var message = this.props.message;
        var extra_message = this.props.extra_message;

        return (
            <div className="grid-frame pl_component_confirm_message">
                <div className="grid-block vertical">
                    <div className="grid-block">&nbsp;</div>
                    <div className="grid-block shrink align-center pl_component_confirm_message_main_message">
                        {message}
                    </div>
                    <div className="grid-block shrink align-center pl_component_confirm_message_extra_message">
                        {extra_message}
                    </div>
                    <div className="grid-block shrink align-center pl_component_confirm_message_bottom_bar">
                        <div className="pl_component_confirm_message_bottom_bar_answer_button">
                            <PlComponentButtonRect
                                text={"Yes"}
                                backgroundcolor={"transparent"} backgroundhovercolor={"#5C4EE5"}
                                fontcolor={"#5C4EE5"} fonthovercolor={"white"}
                                bordercolor={"#5C4EE5"} borderhovercolor={"#5C4EE5"}
                                onclickelement={this.onClickAnswerButton.bind(this, "Yes")} />
                        </div>
                        <div className="pl_component_confirm_message_bottom_bar_answer_button">
                            <PlComponentButtonRect
                                text={"Cancel"}
                                backgroundcolor={"transparent"} backgroundhovercolor={"#5C4EE5"}
                                fontcolor={"#5C4EE5"} fonthovercolor={"white"}
                                bordercolor={"#5C4EE5"} borderhovercolor={"#5C4EE5"}
                                onclickelement={this.onClickAnswerButton.bind(this, "Cancel")} />
                        </div>
                    </div>
                    <div className="grid-block pl_component_footer">&nbsp;</div>
                </div>
            </div>
        );
    }
}