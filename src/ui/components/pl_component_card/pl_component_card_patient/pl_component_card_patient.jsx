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
import { PlComponentButtonCircle } from './../../pl_component_button/pl_component_button_circle/pl_component_button_circle';


export class PlComponentCardPatient extends Component {

    on_add_patient(){
        alert("On add patient");
    }

    render_male() {

        return (
            <div className="grid-block shrink vertical card-item">
                <div className="grid-block align-center">
                    <h4>
                        <svg width="25" height="25" className="gender">
                            <circle cx="11" cy="11" r="10" />
                        </svg>
                    </h4>
                </div>
                <div className="grid-block align-center gender-text">male</div>
            </div>
        );
    }

    render_female() {

        return (
            <div className="grid-block shrink vertical card-item">
                <div className="grid-block align-center">
                    <h4>
                        <svg width="25" height="25" className="gender">
                            <rect width="25" height="25" />
                        </svg>
                    </h4>
                </div>
                <div className="grid-block align-center gender-text">female</div>
            </div>
        );
    }

    render() {

        var patient = this.props.patient;
        var patient_id;
        var patient_name;
        var patient_num_relatives;
        var gender;

        var button_add =
        {
          "name": "add",
          "icon": <svg width='15' height='15' viewBox='0 0 24 24' fill-rule='evenodd'><path d='M14 0h-4v10H0v4h10v10h4V14h10v-4H14z'></path></svg>
        }

        var button_delete = 
        {
            "name":"delete",
            "icon":<svg width='10' height='18' viewBox='0 0 16 24' fill-rule='evenodd'><path d='M4 0h8v2H4zM0 3v4h1v17h14V7h1V3H0zm13 18H3V8h10v13z'></path><path d='M5 10h2v9H5zm4 0h2v9H9z'></path></svg>
        }

        if ("id" in patient) {
            patient_id = patient.id;
        }

        if ("name" in patient) {
            patient_name = patient.name;
        }

        if ("num_relatives" in patient) {
            patient_num_relatives = patient.num_relatives;
        }

        if ("gender" in patient) {

            if (patient.gender === "female") {
                gender = this.render_female();
            } else if (patient.gender === "male") {
                gender = this.render_male();
            }
        }

        return (
            <div className="grid-block pl-component-card-patient">
                <div className="grid-block vertical card-item">
                    <div className="grid-block shrink"><h4>{patient_name}</h4></div>
                    <div className="grid-block shrink">{patient_id}</div>
                </div>
                {gender}
                <div className="grid-block shrink vertical card-item">
                    <div className="grid-block align-center"><h4>{patient_num_relatives}</h4></div>
                    <div className="grid-block align-center">relatives</div>
                </div>
                <div className="grid-block shrink">
                    <PlComponentButtonCircle
                        text={""}
                        icon={button_add.icon}
                        backgroundcolor={"transparent"}
                        backgroundhovercolor={"#5C4EE5"}
                        fontcolor={"#5C4EE5"}
                        fonthovercolor={"white"}
                        bordercolor={"#5C4EE5"}
                        borderhovercolor={"#5C4EE5"}
                        onclickelement={this.on_add_patient.bind(this, button_add.name)} />
                </div>
                <div className="grid-block shrink">
                    <PlComponentButtonCircle
                        text={""}
                        icon={button_delete.icon}
                        backgroundcolor={"transparent"}
                        backgroundhovercolor={"#5C4EE5"}
                        fontcolor={"#5C4EE5"}
                        fonthovercolor={"white"}
                        bordercolor={"#5C4EE5"}
                        borderhovercolor={"#5C4EE5"}
                        onclickelement={this.on_add_patient.bind(this, button_delete.name)} />
                </div>
            </div>
        );


    }
}