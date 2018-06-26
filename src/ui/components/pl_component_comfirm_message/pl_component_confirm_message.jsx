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