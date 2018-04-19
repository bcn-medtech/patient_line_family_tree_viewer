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
import { Table, TableRow, TableHeader, TableHead, TableBody, TableData } from 'carbon-components-react';


export class PlComponentTable extends Component {

    constructor(props) {

        super(props);

        this.state = {}

    }

    onClickRow(item) {

        //console.log(item);
        this.props.on_click_row(item);

    }

    render_header_items(data) {

        var first_item = data[0];
        var first_item_keys = Object.keys(first_item);

        return (

            first_item_keys.map((key) => {

                return (
                    <TableHeader>{key}</TableHeader>
                )
            })

        );
    }

    render_rows_items(data) {

        return (

            Object.keys(data).map((key, index) => (
                <TableData key={index}>{data[key]}</TableData>
            ))
        );

    }

    render_rows(rows) {

        return (

            rows.map((row) => {

                return (
                    <TableRow onClick={this.onClickRow.bind(this,row)}>{this.render_rows_items(row)}</TableRow>
                )
            })
        )
    }

    render_header(data) {

        return (
            <TableHead>
                <TableRow>
                    {this.render_header_items(data)}
                </TableRow>
            </TableHead>
        );
    }

    render_body(data) {

        return (
            <TableBody>
                {this.render_rows(data)}
            </TableBody>
        );
    }

    render() {

        var data = this.props.data;

        return (
            <div className="grid-block pl-component-table">
                <Table>
                    {this.render_header(data)}
                    {this.render_body(data)}
                </Table>
            </div>
        );
    }
}