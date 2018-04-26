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
import { isObjectAFunction } from './../../../modules/rkt_module_object';
import {process_data_to_show_in_table} from './pl_component_table_actions';


export class PlComponentTable extends Component {


    onClickRow(item) {

        //console.log(item);
        this.props.on_click_row(item);

    }

    on_remove_element(element) {

        if (isObjectAFunction(this.props.on_remove_element)){

            this.props.on_remove_element(element);
        }

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

        var table_columns = Object.keys(data);
        var table_columns_last_column = table_columns[table_columns.length - 1];
        var table_mode = this.props.table_mode;

        return (

            table_columns.map((key, index) => {

                if (table_mode === "delete") {

                    if (key === table_columns_last_column) {

                        return (

                            <TableData key={index}>
                                <div className="grid-block">
                                    <div className="grid-block">{data[key]}</div>
                                    <div className="grid-block shrink">
                                        <a className="grid-block pl-component-right-menu" onClick={this.on_remove_element.bind(this,data)}>
                                            <svg className="pl-component-right-menu-button" width='15' height='15' viewBox='0 0 24 24' fill-rule='evenodd'>
                                                <path d='M17.1 15.8l-1.5 1.5-3.7-3.8-3.8 3.8-1.5-1.5 3.8-3.8-3.7-3.8 1.5-1.5 3.8 3.8 3.9-3.8 1.5 1.5-4 3.8z'></path>
                                                <path d='M12 2c5.5 0 10 4.5 10 10s-4.5 10-10 10S2 17.5 2 12 6.5 2 12 2zm0-2C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0z'></path>
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </TableData>
                        )

                    } else {

                        return (

                            <TableData key={index}>{data[key]}</TableData>
                        )

                    }
                } else {
                    return (

                        <TableData key={index}>{data[key]}</TableData>
                    )
                }


            })

        );

    }

    render_rows(rows) {

        return (

            rows.map((row) => {

                return (
                    <TableRow onClick={this.onClickRow.bind(this, row)} className="pl-component-table-row">{this.render_rows_items(row)}</TableRow>
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
        data = process_data_to_show_in_table(data);

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