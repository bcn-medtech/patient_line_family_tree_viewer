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
import { calculate_age } from './../../../../../../modules/rkt_module_date';
import { isObjectEmpty } from './../../../../../../modules/rkt_module_object';
//components
import { PlComponentCardPatientStatus } from './../../../pl_component_card_patient/pl_component_card_patient_status/pl_component_card_patient_status';
//actions
import { sort_statistics } from './pl_component_card_family_widget_statistics_actions';

import { filter } from "underscore";

export class PlComponentCardFamilyWidgetStatistics extends Component {

    render_card_family_widget_statistics(statistics) {
        
        if (!isObjectEmpty(statistics)) {

            return (
                <table className="grid-block vertical">
                    <tbody>
                        {this.render_list_of_statistics(statistics)}
                    </tbody>
                </table>
            );

        }

    }

    render_list_of_statistics(statistics) {
        
        var sorted_statistics = sort_statistics(statistics);

        return (

            sorted_statistics.map((stat, index) => {
                
                var phenotype = stat["phenotype"];
                return (

                    <tr className="grid-block shrink pl-component-card-family-widget-statistics-item" key={index}>
                        <td className="grid-block pl-component-card-family-widget-statistics-element">
                            <PlComponentCardPatientStatus phenotype={phenotype} gender={"male"} />
                            <PlComponentCardPatientStatus phenotype={phenotype} gender={"female"} />
                        </td>
                        {/* <td className="grid-block vertical pl-component-card-patient-widget-relatives-element">
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
                        </td> */}
                    </tr>

                );

            })

        );

    }

    // render_age(dob) {

    //     var age = calculate_age(dob);

    //     if (!isNaN(age)) return (<h6>{age}</h6>);
    //     else return (<h6>?</h6>);

    // }

    render() {

        var family_statistics = this.props.family_statistics;

        return (
            <div className="grid-block pl-component-card-family-widget-statistics">
                {this.render_card_family_widget_statistics(family_statistics)}
            </div>
        );

    }
}