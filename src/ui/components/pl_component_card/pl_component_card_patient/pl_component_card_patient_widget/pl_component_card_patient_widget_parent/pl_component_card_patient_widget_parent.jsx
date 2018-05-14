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
//import { isObjectAFunction } from './../../../../../../modules/rkt_module_object';

//components
import { PlComponentCardPatientStatus } from './../../pl_component_card_patient_status/pl_component_card_patient_status';
//actions
import { calculate_age } from './pl_component_card_patient_widget_parent_actions';

export class PlComponentCardPatientWidgetParent extends Component {

    render_card_patient_widget_parent(parent, type_parent, mode_edit) {

        if (parent) {

            if (mode_edit) {

                // TODO

            } else {

                return (

                    this.render_parent(parent)

                );

            }

        } else {

            var message = "There is not any " + type_parent + " defined";

            return (

                <div className="grid-block pl-component-card-patient-widget-parent-undefined-message">
                    {message}
                </div>

            );

        }

    }

    render_parent(parent) {

        var status = parent.status;
        var gender = parent.gender;

        var name = parent.name;
        var id = parent.id;

        var dob = parent.dob;

        return (
            // <div className="grid-block pl-component-card-patient-widget-parent-item">
            //     <div className="grid-block shrink pl-component-card-patient-widget-parent-element">
            //         <PlComponentCardPatientStatus status={status} gender={gender} />
            //     </div>
            //     <div className="grid-block shrink vertical pl-component-card-patient-widget-parent-element">
            //         <h6>{name}</h6>
            //         <div className="grid-block shrink text">{id}</div>
            //     </div>
            //     <div className="grid-block shrink vertical pl-component-card-patient-widget-parent-element parent-age">
            //         {this.render_age(dob)}
            //         <div className="grid-block shrink text">age</div>
            //     </div>
            // </div>
            <div className="grid-block shrink pl-component-card-patient-widget-parent-item">
                <div className="grid-block shrink pl-component-card-patient-widget-parent-element">
                    <PlComponentCardPatientStatus status={status} gender={gender} />
                </div>
                <div className="grid-block vertical pl-component-card-patient-widget-parent-element">
                    <h6>{name}</h6>
                    <div className="grid-block shrink text">{id}</div>
                </div>
                <div className="grid-block shrink vertical pl-component-card-patient-widget-parent-element parent-age">
                    {this.render_age(dob)}
                    <div className="grid-block shrink text">age</div>
                </div>
            </div>
        );

    }

    render_age(dob) {

        var age = calculate_age(dob);

        if (!isNaN(age)) return (<h6>{age}</h6>);
        else return (<h6>?</h6>);

    }

    render() {

        var parent = this.props.parent;
        var type_parent = this.props.type_parent;
        var mode_edit = this.props.mode_edit;

        return (
            <div className="grid-block pl-component-card-patient-widget-parent">
                {this.render_card_patient_widget_parent(parent, type_parent, mode_edit)}
            </div>
        );

    }
}