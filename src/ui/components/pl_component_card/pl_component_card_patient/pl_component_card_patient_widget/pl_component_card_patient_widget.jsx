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


    on_close_widget(type) {

        if(isObjectAFunction(this.props.on_click_component)){
            this.props.on_click_component(type);
        }
    }

    render() {

        var tittle = "widget";
        var close_icon = <svg width='24' height='24' viewBox='0 0 24 24' fill-rule='evenodd'><path d='M17.1 15.8l-1.5 1.5-3.7-3.8-3.8 3.8-1.5-1.5 3.8-3.8-3.7-3.8 1.5-1.5 3.8 3.8 3.9-3.8 1.5 1.5-4 3.8z'></path><path d='M12 2c5.5 0 10 4.5 10 10s-4.5 10-10 10S2 17.5 2 12 6.5 2 12 2zm0-2C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0z'></path></svg>
        var content = this.props.content;

        return (
            <div className="grid-block vertical">
                <div className="grid-block">
                    <div className="grid-block"><h4>{tittle}</h4></div>
                    <div className="grid-block">{close_icon}</div>
                    <div className="grid-block">{content}</div>
                </div>
            </div>
        );

    }
}