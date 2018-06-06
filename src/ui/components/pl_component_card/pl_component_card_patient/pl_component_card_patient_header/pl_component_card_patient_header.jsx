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

//components
import { PlComponentCardPatientGenderCombobox } from './../pl_component_card_patient_gender_combobox/pl_component_card_patient_gender_combobox';
import { PlComponentCardPatientStatusCombobox } from './../pl_component_card_patient_status_combobox/pl_component_card_patient_status_combobox';
import { PlComponentTextFieldEditable } from './../../../pl_component_text_field_editable/pl_component_text_field_editable';

//modules
import { isObjectAFunction } from './../../../../../modules/rkt_module_object';
import { mapObject } from 'underscore';

export class PlComponentCardPatientHeader extends Component {

    perform_database_action(data_to_update) {

        if (isObjectAFunction(this.props.perform_database_action)) {

            var key_to_update = data_to_update.key;
            var updated_value = data_to_update.value;

            var patient = this.props.patient;
            var updated_patient = mapObject(patient, function (value, key) {
                return value;
            });

            updated_patient[key_to_update] = updated_value;

            var data = {
                "action": "edit_patient",
                "data": updated_patient,
                "patient_id": updated_patient.id,
                "family_id": updated_patient.family_id
            };

            this.props.perform_database_action(data);

        }
    }

    render() {

        var patient = this.props.patient;
        var mode_edit = this.props.mode_edit;
        var patient_id;
        var patient_name;
        var patient_gender;
        var patient_status;

        if ("id" in patient) patient_id = patient.id;
        if ("name" in patient) patient_name = patient.name;
        if ("gender" in patient) patient_gender = patient.gender;
        if ("gender" in patient) patient_status = patient.status;

        return (
            <div className="grid-block pl-component-card-patient-header">
                <div className="grid-block align-spaced shrink card-row-gender-status">
                    <div className="grid-block shrink card-item">
                        <PlComponentCardPatientGenderCombobox
                            gender={patient_gender}
                            ref="patient_gender"
                            perform_database_action={this.perform_database_action.bind(this)} />
                    </div>
                    <div className="grid-block shrink card-item">
                        <PlComponentCardPatientStatusCombobox
                            status={patient_status}
                            gender={patient_gender}
                            ref="patient_status"
                            perform_database_action={this.perform_database_action.bind(this)} />
                        {/* <PlComponentCardPatientStatusCombobox
                            status={patient_status}
                            gender={patient_gender}
                            ref="patient_status"
                            perform_database_action={this.perform_database_action.bind(this)} /> */}
                    </div>
                    <div className="grid-block shrink card-item">
                        <PlComponentCardPatientStatusCombobox
                            status={patient_status}
                            gender={patient_gender}
                            ref="patient_status"
                            perform_database_action={this.perform_database_action.bind(this)} />
                        {/* <PlComponentCardPatientStatusCombobox
                            status={patient_status}
                            gender={patient_gender}
                            ref="patient_status"
                            perform_database_action={this.perform_database_action.bind(this)} /> */}
                    </div>
                </div>
                <div className="grid-block shrink vertical card-item">
                    <div className="grid-block shrink">
                        <h4>
                            <PlComponentTextFieldEditable
                                text={patient_name}
                                isEditionMode={mode_edit ? true : false}
                                ref="patient_name"
                            />
                        </h4>
                    </div>
                    <div className="grid-block shrink">
                        <PlComponentTextFieldEditable
                            text={patient_id}
                            isEditionMode={mode_edit ? true : false}
                            ref="patient_id" />
                    </div>

                </div>
            </div>
        );

    }
}