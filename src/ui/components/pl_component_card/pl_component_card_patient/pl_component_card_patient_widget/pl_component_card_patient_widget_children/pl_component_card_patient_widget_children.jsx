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
//modules
import { isObjectAFunction, isObjectEmpty } from './../../../../../../modules/rkt_module_object';
//components
import { PlComponentButtonCircle } from './../../../../pl_component_button/pl_component_button_circle/pl_component_button_circle';
import { PlComponentCardPatientStatus } from './../../pl_component_card_patient_status/pl_component_card_patient_status';
//actions
import {
    calculate_age,
    create_child_existing_family,
    create_new_family,
    process_children_by_parents,
    sort_children_by_dob
} from './pl_component_card_patient_widget_children_actions';

export class PlComponentCardPatientWidgetChildren extends Component {

    on_click_edit_children(action, data) {

        if (isObjectAFunction(this.props.perform_database_action)) {

            var patient, result, new_data;

            if (action === "search") {

                // TODO

            } else if (action === "add_child_existing_family") {

                patient = this.props.patient;
                var id_father = data.id_father;
                var id_mother = data.id_mother;
                result = create_child_existing_family(patient, id_father, id_mother);

                new_data = {
                    "action": "add_child_existing_family",
                    "data": result,
                    "patient_id": patient.id,
                    "family_id": patient.family_id
                };
                this.props.perform_database_action(new_data);

            } else if (action === "add_child_new_family") {

                patient = data;
                result = create_new_family(patient);

                new_data = {
                    "action": "add_child_new_family",
                    "data": result,
                    "patient_id": patient.id,
                    "family_id": patient.family_id
                };
                this.props.perform_database_action(new_data);

            }

        }

    }

    render_card_patient_widget_children(children, patient, mode_edit) {

        if (!isObjectEmpty(children)) {

            var families = process_children_by_parents(children); // family: (partner 1 + partner 2) with common children 
            
            return (
                <div className="grid-block vertical">
                    {this.render_families(families, mode_edit)}
                    {this.render_extra_family_to_create(patient, mode_edit)}
                </div>
            );

        } else {

            if (!mode_edit) {

                return (

                    <div className="grid-block pl-component-card-patient-widget-children-undefined-message">
                        There are no children defined
                    </div>

                );

            } else {

                if (!isObjectEmpty(patient.gender)) {

                    return (

                        <div className="grid-block vertical">
                            {this.render_extra_family_to_create(patient, mode_edit)}
                        </div>

                    );

                } else {

                    return (

                        <div className="grid-block pl-component-card-patient-widget-children-undefined-message">
                            First define the patient's gender, please
                        </div>

                    );


                }


            }

        }

    }

    render_families(families, mode_edit) {

        return (

            families.map((family, index) => {

                var id_father = family.id_father;
                var id_mother = family.id_mother;
                var children = family.children;

                return (

                    <div className="grid-block shrink vertical family-list" key={index}>
                        {this.render_family_parents_icons(id_father, id_mother, mode_edit)}
                        {this.render_family_children(children)}
                    </div>
                );

            })

        );
    }

    render_family_parents_icons(id_father, id_mother, mode_edit) {

        var icon_father = <svg fill="#5596e6" width='32' height='32' viewBox='0 0 32 32' fillRule='evenodd'><path d='M16 6.4c3.9 0 7 3.1 7 7s-3.1 7-7 7-7-3.1-7-7 3.1-7 7-7zm0-2c-5 0-9 4-9 9s4 9 9 9 9-4 9-9-4-9-9-9z'></path><path d='M16 0C7.2 0 0 7.2 0 16s7.2 16 16 16 16-7.2 16-16S24.8 0 16 0zm7.3 24.3H8.7c-1.2 0-2.2.5-2.8 1.3C3.5 23.1 2 19.7 2 16 2 8.3 8.3 2 16 2s14 6.3 14 14c0 3.7-1.5 7.1-3.9 9.6-.6-.8-1.7-1.3-2.8-1.3z'></path></svg>
        var icon_mother = <svg fill="#e6409e" width='32' height='32' viewBox='0 0 32 32' fillRule='evenodd'><path d='M16 6.4c3.9 0 7 3.1 7 7s-3.1 7-7 7-7-3.1-7-7 3.1-7 7-7zm0-2c-5 0-9 4-9 9s4 9 9 9 9-4 9-9-4-9-9-9z'></path><path d='M16 0C7.2 0 0 7.2 0 16s7.2 16 16 16 16-7.2 16-16S24.8 0 16 0zm7.3 24.3H8.7c-1.2 0-2.2.5-2.8 1.3C3.5 23.1 2 19.7 2 16 2 8.3 8.3 2 16 2s14 6.3 14 14c0 3.7-1.5 7.1-3.9 9.6-.6-.8-1.7-1.3-2.8-1.3z'></path></svg>

        return (

            <div className="grid-block shrink family-list-header">
                <div className="grid-block family-list-header-parents">
                    <div className="grid-block shrink vertical family-list-header-parent">
                        {icon_father}
                        <div className="grid-block shrink text">{id_father}</div>
                    </div>
                    <div className="grid-block shrink vertical family-list-header-link">
                        <svg height="10" width="50">
                            <line x1="0" y1="0" x2="50" y2="0" stroke="white" strokeWidth="4" strokeDasharray="5,5" />
                        </svg>
                    </div>
                    <div className="grid-block shrink vertical family-list-header-parent">
                        {icon_mother}
                        <div className="grid-block shrink text">{id_mother}</div>
                    </div>
                    {this.render_edition_buttons(mode_edit, id_father, id_mother)}
                </div>
            </div>

        );
    }

    render_edition_buttons(mode_edit, id_father, id_mother) {

        if (mode_edit) {

            var edition_buttons_data = [
                {
                    "name": "search",
                    "icon": <svg width='15' height='15' viewBox='0 0 16 16' fillRule='evenodd'><path d='M6 2c2.2 0 4 1.8 4 4s-1.8 4-4 4-4-1.8-4-4 1.8-4 4-4zm0-2C2.7 0 0 2.7 0 6s2.7 6 6 6 6-2.7 6-6-2.7-6-6-6zm10 13.8L13.8 16l-3.6-3.6 2.2-2.2z'></path><path d='M16 13.8L13.8 16l-3.6-3.6 2.2-2.2z'></path></svg>
                },
                {
                    "name": "add_child_existing_family",
                    "icon": <svg width='15' height='15' viewBox='0 0 24 24' fillRule='evenodd'><path d='M14 0h-4v10H0v4h10v10h4V14h10v-4H14z'></path></svg>
                }
            ];

            var parents_data = { "id_father": id_father, "id_mother": id_mother };
            return (

                <div className="grid-block shrink family-list-header-edition-buttons">
                    {edition_buttons_data.map((button, index) => {
                        return (
                            <PlComponentButtonCircle
                                key={index}
                                text={""} icon={button.icon}
                                backgroundcolor={"transparent"}
                                backgroundhovercolor={"#5C4EE5"}
                                fontcolor={"#5C4EE5"}
                                fonthovercolor={"white"}
                                bordercolor={"#5C4EE5"}
                                borderhovercolor={"#5C4EE5"}
                                onclickelement={this.on_click_edit_children.bind(this, button.name, parents_data)}
                            />
                        )
                    })}
                </div>

            );

        }

    }

    render_family_children(children) {

        var sorted_children = sort_children_by_dob(children);

        return (
            <table className="grid-block shrink vertical family-list-children">
                <tbody>
                    {sorted_children.map((child, index) => {

                        var id = child.id;
                        var name = child.name;

                        var status = child.status;
                        var gender = child.gender;

                        var dob = child.dob;

                        return (

                            <tr className="grid-block shrink family-list-item" key={index}>
                                <td className="grid-block family-list-item-element">
                                    <PlComponentCardPatientStatus status={status} gender={gender} />
                                </td>
                                <td className="grid-block vertical family-list-item-element">
                                    <h6>{name}</h6>
                                    <div className="grid-block shrink text">{id}</div>
                                </td>
                                <td className="grid-block vertical family-list-item-element centered">
                                    {this.render_age(dob)}
                                    <div className="grid-block shrink text">age</div>
                                </td>
                            </tr>
                        );

                    })}
                </tbody>
            </table>
        );

    }

    render_age(dob) {

        var age = calculate_age(dob);

        if (!isNaN(age)) return (<h6>{age}</h6>);
        else return (<h6>?</h6>);

    }

    render_extra_family_to_create(patient, mode_edit) {

        if (mode_edit) {

            var id_patient = patient.id;

            var add_button_data = {
                "name": "add_child_new_family",
                "icon": <svg width='15' height='15' viewBox='0 0 24 24' fillRule='evenodd'><path d='M14 0h-4v10H0v4h10v10h4V14h10v-4H14z'></path></svg>
            }

            var add_button =
                <PlComponentButtonCircle
                    text={""} icon={add_button_data.icon}
                    backgroundcolor={"transparent"}
                    backgroundhovercolor={patient.gender === "male" ? "#e6409e" : "#5596e6"}
                    fontcolor={patient.gender === "male" ? "#e6409e" : "#5596e6"}
                    fonthovercolor={"white"}
                    bordercolor={patient.gender === "male" ? "#e6409e" : "#5596e6"}
                    borderhovercolor={patient.gender === "male" ? "#e6409e" : "#5596e6"}
                    onclickelement={this.on_click_edit_children.bind(this, add_button_data.name, patient)}
                />

            var id_father, id_mother;
            var father_icon, mother_icon;
            if (patient.gender === "male") {

                id_father = id_patient;
                father_icon = <svg fill="#5596e6" width='32' height='32' viewBox='0 0 32 32' fillRule='evenodd'><path d='M16 6.4c3.9 0 7 3.1 7 7s-3.1 7-7 7-7-3.1-7-7 3.1-7 7-7zm0-2c-5 0-9 4-9 9s4 9 9 9 9-4 9-9-4-9-9-9z'></path><path d='M16 0C7.2 0 0 7.2 0 16s7.2 16 16 16 16-7.2 16-16S24.8 0 16 0zm7.3 24.3H8.7c-1.2 0-2.2.5-2.8 1.3C3.5 23.1 2 19.7 2 16 2 8.3 8.3 2 16 2s14 6.3 14 14c0 3.7-1.5 7.1-3.9 9.6-.6-.8-1.7-1.3-2.8-1.3z'></path></svg>
                mother_icon = add_button;
            }
            else if (patient.gender === "female") {

                id_mother = id_patient;
                mother_icon = <svg fill="#e6409e" width='32' height='32' viewBox='0 0 32 32' fillRule='evenodd'><path d='M16 6.4c3.9 0 7 3.1 7 7s-3.1 7-7 7-7-3.1-7-7 3.1-7 7-7zm0-2c-5 0-9 4-9 9s4 9 9 9 9-4 9-9-4-9-9-9z'></path><path d='M16 0C7.2 0 0 7.2 0 16s7.2 16 16 16 16-7.2 16-16S24.8 0 16 0zm7.3 24.3H8.7c-1.2 0-2.2.5-2.8 1.3C3.5 23.1 2 19.7 2 16 2 8.3 8.3 2 16 2s14 6.3 14 14c0 3.7-1.5 7.1-3.9 9.6-.6-.8-1.7-1.3-2.8-1.3z'></path></svg>
                father_icon = add_button;
            }


            return (
                <div className="grid-block shrink vertical family-list">
                    <div className="grid-block shrink family-list-header">
                        <div className="grid-block family-list-header-parents">
                            <div className="grid-block shrink vertical family-list-header-parent">
                                {father_icon}
                                <div className="grid-block shrink text">{id_father}</div>
                            </div>
                            <div className="grid-block shrink vertical family-list-header-link">
                                <svg height="10" width="50">
                                    <line x1="0" y1="0" x2="50" y2="0" stroke="white" strokeWidth="4" strokeDasharray="5,5" />
                                </svg>
                            </div>
                            <div className="grid-block shrink vertical family-list-header-parent">
                                {mother_icon}
                                <div className="grid-block shrink text">{id_mother}</div>
                            </div>
                        </div>
                    </div>
                </div>

            );

        }

    }

    render() {

        var children = this.props.children;
        var patient = this.props.patient;
        var mode_edit = this.props.mode_edit;

        return (
            <div className="grid-block pl-component-card-patient-widget-children">
                {this.render_card_patient_widget_children(children, patient, mode_edit)}
            </div>
        );

    }
}