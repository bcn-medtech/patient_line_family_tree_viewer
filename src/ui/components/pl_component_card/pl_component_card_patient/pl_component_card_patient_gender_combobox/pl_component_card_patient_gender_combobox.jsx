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

export class PlComponentCardPatientGenderCombobox extends Component {

    constructor() {

        super();

        this.state = {
            gender: false,
        }
    }

    set_gender(gender) {

        this.setState({
            gender: gender
        })
    }

    componentDidMount() {

        var gender = this.props.gender;

        this.set_gender(gender);
    }

    componentWillReceiveProps(nextprops) {

        var gender = nextprops.gender;

        if (this.state.gender !== gender) {

            this.set_gender(gender);
        }

    }

    render_gender(gender) {

        if (gender === "female") {

            return (<svg width="45" height="45" className="gender"><circle cx="22.5" cy="22.5" r="17" strokeWidth="1.5" /></svg>);

        } else if (gender === "male") {

            return (<svg width="45" height="45" className="gender"><rect width="30" height="30" x="7.5" y="7.5" strokeWidth="1.5" /></svg>);

        }
    }

    render_combobox(gender) {

        if (gender === "female") {

            return (
                <div className="grid-block vertical">
                    <div className="grid-block shrink vertical list-item-selected">
                        <div className="grid-block align-center">
                            {this.render_gender("female")}
                        </div>
                        <div className="grid-block align-center">
                            female
                        </div>
                    </div>
                    <div className="grid-block shrink vertical list-item" onClick={this.set_gender.bind(this, "male")}>
                        <div className="grid-block align-center">
                            <h4>
                                {this.render_gender("male")}
                            </h4>
                        </div>
                        <div className="grid-block align-center text">
                            male
                        </div>
                    </div>
                </div>
            );

        } else if (gender === "male") {

            return (
                <div className="grid-block vertical">
                    <div className="grid-block shrink vertical list-item" onClick={this.set_gender.bind(this, "female")}>
                        <div className="grid-block align-center">
                            {this.render_gender("female")}
                        </div>
                        <div className="grid-block align-center">
                            female
                        </div>
                    </div>
                    <div className="grid-block shrink vertical list-item-selected">
                        <div className="grid-block align-center">
                            {this.render_gender("male")}
                        </div>
                        <div className="grid-block align-center text">
                            male
                        </div>
                    </div>
                </div>
            );

        } else {
            return (
                <div className="grid-block vertical">
                    <div className="grid-block shrink vertical list-item" onClick={this.set_gender.bind(this, "female")}>
                        <div className="grid-block align-center">
                            {this.render_gender("female")}
                        </div>
                        <div className="grid-block align-center">
                            female
                        </div>
                    </div>
                    <div className="grid-block shrink vertical list-item" onClick={this.set_gender.bind(this, "male")}>
                        <div className="grid-block align-center">
                            {this.render_gender("male")}
                        </div>
                        <div className="grid-block align-center text">
                            male
                        </div>
                    </div>
                </div>
            );
        }

    }

    render_element(gender, svg) {

        return (
            <div>
                <div className="grid-block shrink vertical pl-component-card-patient-gender-combobox pl-component-card-patient-gender-combobox-tooltip ">
                    <div className="grid-block align-center">
                        {svg}
                    </div>
                    <div className="grid-block align-center text">{gender}</div>
                </div>
            </div>

        )
    }

    render_element_edit_mode(gender, svg) {

        return (

            <a className="grid-block shrink vertical pl-component-card-patient-gender-combobox pl-component-card-patient-gender-combobox-tooltip-selected">
                <div className="grid-block align-center">
                    {svg}
                </div>
                <div className="grid-block tooltipcontent">
                    {this.render_combobox(gender)}
                </div>
                <div className="grid-block align-center text">{gender}</div>
            </a>
        );

    }

    render() {

        var gender = this.state.gender;
        var mode_edit = this.props.mode_edit;
        var element;

        var svg;

        if (gender === "female") {

            svg = this.render_gender("female");

        } else if (gender === "male") {

            svg = this.render_gender("male");

        } else {

            svg = <div className="grid-block pl-component-card-patient-gender-combobox-undefined-gender"><h4>?</h4></div>;
            gender = "gender";

        }

        if (mode_edit) {
            element = this.render_element_edit_mode(gender, svg);
        } else {
            element = this.render_element(gender, svg);
        }

        return (
            <div className="grid-block vertical">
                {element}
            </div>
        );

    }
}