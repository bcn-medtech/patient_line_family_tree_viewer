/*
# Patient line family tree viewer is (c) BCNMedTech, UNIVERSITAT POMPEU FABRA
#
# Patient line family tree viewer is free software: you can redistribute it and/or modify
# it under the terms of the GNU Affero General Public License as
# published by the Free Software Foundation, either version 3 of the
# License, or (at your option) any later version.
#
# Patient line family tree viewer is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU Affero General Public License for more details.
#
# You should have received a copy of the GNU Affero General Public License
# along with this program.  If not, see <http://www.gnu.org/licenses/>.
#
# Authors:
# Carlos Yagüe Méndez
# Paula Bassagañas
# Paula Bassagañas
# Contributors: 
# Begoña Benito
# Bart Bijnens
# Oscar Camara
*/

import React, { Component } from 'react';

//modules
import { isObjectAFunction } from './../../../../modules/rkt_module_object';


export class PlComponentDatabaseHeader extends Component {


    set_database_component_mode(item) {

        if (isObjectAFunction(this.props.set_database_component_mode)) {

            this.props.set_database_component_mode(item);

        }
    }

    render() {

        var mode = this.props.mode;
        var data = this.props.data;

        var families_button;
        var patients_button;

        if (mode === "families") {
            families_button = <a onClick={this.set_database_component_mode.bind(this, "families")}><h3 className="mode_selected">Families</h3></a>;
            patients_button = <a onClick={this.set_database_component_mode.bind(this, "patients")}><h3 className="mode_unselected">Patients</h3></a>;
        } else {
            families_button = <a onClick={this.set_database_component_mode.bind(this, "families")}><h3 className="mode_unselected">Families</h3></a>;
            patients_button = <a onClick={this.set_database_component_mode.bind(this, "patients")}><h3 className="mode_selected">Patients</h3></a>;
        }

        return (
            <div className="grid-block sub-header shrink pl-component-database-header">
                <div className="grid-block shrink">
                    {families_button}
                </div>
                <div className="grid-block">
                    {patients_button}
                </div>
                <div className="grid-block shrink">
                    <h3 className="mode_selected">{data.length}</h3>
                </div>
            </div>
        );


    }
}