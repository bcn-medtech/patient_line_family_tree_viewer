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
import { isObjectAFunction } from './../../../../../modules/rkt_module_object';

export class PlComponentCardPatientWidget extends Component {

    capitalize_first_letter(s) {
        return s && s[0].toUpperCase() + s.slice(1);
    }

    render() {

        var tittle = this.props.tittle;
        var content = this.props.content;

        console.log(tittle);

        return (
            <div className="grid-block vertical pl-component-card-patient-widget">
                <div className="grid-block"><h5>{this.capitalize_first_letter(tittle)}</h5></div>
                <div className="grid-block">{content}</div>
            </div>
        );

    }
}