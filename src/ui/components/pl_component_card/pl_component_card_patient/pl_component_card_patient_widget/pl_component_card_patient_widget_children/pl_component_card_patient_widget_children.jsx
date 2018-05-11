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
//import { isObjectAFunction } from './../../../../../modules/rkt_module_object';
//components
import { PlComponentCardPatientStatus } from './../../pl_component_card_patient_status/pl_component_card_patient_status';
//actions
import { sort_children_by_dob, calculate_age } from './pl_component_card_patient_widget_children_actions';

export class PlComponentCardPatientWidgetChildren extends Component {

    render_card_patient_widget_children(children, mode_edit) {

        if (children !== undefined) {

            if (mode_edit) {

                // TODO

            } else {

                return (
                    <div className="grid-block vertical">
                        {this.render_list_of_children(children)}
                    </div>
                );

            }

        } else {

            return (

                <div className="grid-block pl-component-card-patient-widget-children-undefined-message">
                    There are no children defined
                </div>

            );

        }

    }

    render_list_of_children(children) {

        var sorted_children = sort_children_by_dob(children);

        return (

            sorted_children.map((child, index) => {

                var id = child.id;
                var name = child.name;


                var status = child.status;
                var gender = child.gender;

                var name = child.name;
                var id = child.id;

                var dob = child.dob;


                return (

                    // <div className="grid-block pl-component-card-patient-widget-children-item" key={index}>
                    //     {id + ": " + name} */}

                    //     <div className="grid-block pl-component-card-patient-widget-parent">
                    //         <div className="grid-block shrink pl-component-card-patient-widget-parent-element">
                    //             <PlComponentCardPatientStatus status={status} gender={gender} />
                    //         </div>
                    //         <div className="grid-block shrink vertical pl-component-card-patient-widget-parent-element">
                    //             <h6>{name}</h6>
                    //             <div className="grid-block shrink text">{id}</div>
                    //         </div>
                    //         <div className="grid-block shrink vertical pl-component-card-patient-widget-parent-element parent-age">
                    //             {this.render_age(dob)}
                    //             <div className="grid-block shrink text">age</div>
                    //         </div>
                    //     </div>

                    // </div>

                    <table>
                        <tbody>
                            <tr className="grid-block pl-component-card-patient-widget-children-item" key={index}>
                                <td>
                                    <div className="grid-block shrink pl-component-card-patient-widget-children-element">
                                        <PlComponentCardPatientStatus status={status} gender={gender} />
                                    </div>
                                </td>
                                <td>
                                    <div className="grid-block shrink vertical pl-component-card-patient-widget-children-element">
                                        <h6>{name}</h6>
                                        <div className="grid-block shrink text">{id}</div>
                                    </div>
                                </td>
                                <td>
                                    <div className="grid-block shrink vertical pl-component-card-patient-widget-children-element children-age">
                                        {this.render_age(dob)}
                                        <div className="grid-block shrink text">age</div>
                                    </div>

                                </td>
                            </tr>
                        </tbody>
                    </table>

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

        var children = this.props.children;
        var mode_edit = this.props.mode_edit;

        return (
            <div className="grid-block pl-component-card-patient-widget-children">
                {this.render_card_patient_widget_children(children, mode_edit)}
            </div>
        );

    }
}