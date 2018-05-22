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
import { PlComponentCardPatientStatus } from './../../pl_component_card_patient_status/pl_component_card_patient_status';
//actions
import { sort_relatives_by_dob, calculate_age } from './pl_component_card_patient_widget_relatives_actions';

import { filter } from "underscore";

export class PlComponentCardPatientWidgetRelatives extends Component {

    render_card_patient_widget_relatives(relatives, mode_edit) {

        if (!isObjectEmpty(relatives)) {

            var relatives_to_display = filter(relatives, function(relative) {
                return relative.relation !== "current patient";
            });

            return (
                <table className="grid-block vertical">
                    <tbody>
                        {this.render_list_of_relatives(relatives_to_display)}
                    </tbody>
                </table>
            );

        } else {

            return (

                <div className="grid-block pl-component-card-patient-widget-relatives-undefined-message">
                    There are no relatives defined
                </div>

            );

        }

    }

    render_list_of_relatives(relatives) {

        var sorted_relatives = sort_relatives_by_dob(relatives);

        return (

            sorted_relatives.map((relative, index) => {

                var id = relative.id;
                var name = relative.name;

                var status = relative.status;
                var gender = relative.gender;

                var dob = relative.dob;
                var relation = relative.relation;

                return (

                    <tr className="grid-block shrink pl-component-card-patient-widget-relatives-item" key={index}>
                        <td className="grid-block pl-component-card-patient-widget-relatives-element">
                            <PlComponentCardPatientStatus status={status} gender={gender} />
                        </td>
                        <td className="grid-block vertical pl-component-card-patient-widget-relatives-element">
                            <h6>{name}</h6>
                            <div className="grid-block shrink text">{id}</div>
                        </td>
                        <td className="grid-block vertical pl-component-card-patient-widget-relatives-element centered">
                            {this.render_age(dob)}
                            <div className="grid-block shrink text">age</div>
                        </td>
                        <td className="grid-block vertical pl-component-card-patient-widget-relatives-element centered">
                            <h6>{relation}</h6>
                            <div className="grid-block shrink text">relation</div>
                        </td>
                    </tr>
                );

            })

        );

    }

    render_age(dob) {

        var age = calculate_age(dob);

        if (!isNaN(age)) return (<h6>{age}</h6>);
        else return (<h6>?</h6>);

    }

    render() {

        var relatives = this.props.relatives;
        var mode_edit = this.props.mode_edit;

        return (
            <div className="grid-block pl-component-card-patient-widget-relatives">
                {this.render_card_patient_widget_relatives(relatives, mode_edit)}
            </div>
        );

    }
}