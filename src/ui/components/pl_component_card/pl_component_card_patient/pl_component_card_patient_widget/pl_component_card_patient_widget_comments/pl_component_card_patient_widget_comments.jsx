/*
# Rocket viewer is (c) BCNMedTech, UNIVERSITAT POMPEU FABRA
#
# Rocket viewer is free software: you can redistribute it and/or modify
# it under the terms of the GNU Affero General Public License as
# published by the Free Software Foundation, either version 3 of the
# License, or (at your option) any later version.
#
# Rocket viewer is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU Affero General Public License for more details.
#
# You should have received a copy of the GNU Affero General Public License
# along with this program.  If not, see <http://www.gnu.org/licenses/>.
#
# Authors:
# Carlos Yagüe Méndez
# María del Pilar García
# Daniele Pezzatini
# Contributors: 
# Sergio Sánchez Martínez
*/

import React, { Component } from 'react';
import { isObjectEmpty } from './../../../../../../modules/rkt_module_object';

//components
import { PlComponentTextFieldEditable } from '../../../../pl_component_text_field_editable/pl_component_text_field_editable';


export class PlComponentCardPatientWidgetComments extends Component {

    render_card_patient_widget_comments(comments, mode_edit) {
        console.log(mode_edit);
        if (!isObjectEmpty(comments)) {

            return (

                <PlComponentTextFieldEditable
                    text={comments}
                    isEditionMode={mode_edit ? true : false}
                    ref="patient_comments_value"
                />

            );

        } else {

            var message;
            if (!mode_edit) {

                message = "There are not comments defined yet";

            } else {

                message = 
                    <PlComponentTextFieldEditable
                        text={"There are not comments defined yet"}
                        isEditionMode={mode_edit ? true : false}
                        ref="patient_comments_value"
                    />

            }

            return (

                <div className="grid-block pl-component-card-patient-widget-comments-undefined-message">
                    {message}
                </div>

            );

        }

    }

    get_patient_comments() {

        return this.refs.patient_comments_value.refs.FormItemInputText.state.input;

    }

    render() {

        var comments = this.props.comments;
        var mode_edit = this.props.mode_edit;

        return (
            <div className="grid-block pl-component-card-patient-widget-comments">
                {this.render_card_patient_widget_comments(comments, mode_edit)}
            </div>
        );

    }
}