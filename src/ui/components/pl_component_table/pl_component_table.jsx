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
import { isObjectAFunction } from './../../../modules/rkt_module_object';
import { process_data_to_show_in_table } from './pl_component_table_actions';

//components
import { PlComponentFormItemInputText } from './../pl_component_form/pl_component_form_item/pl_component_form_item_input_text/pl_component_form_item_input_text';

export class PlComponentTable extends Component {


    onClickRow(item) {
        
        this.props.on_click_row(item);

    }

    on_remove_element(element) {

        if (isObjectAFunction(this.props.on_remove_element)) {

            this.props.on_remove_element(element);
        }

    }

    render_header_items(data) {

        var first_item = data[0];
        var first_item_keys = Object.keys(first_item);

        return (


            first_item_keys.map((key, index) => {

                return (
                    <td className="grid-block" key={index}><b>{key.toUpperCase()}</b></td>
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

                            <td key={index} >
                                <div className="grid-block">
                                    <div className="grid-block">{data[key]}</div>
                                    <div className="grid-block shrink">
                                        <a className="grid-block pl-component-right-menu" onClick={this.on_remove_element.bind(this, data)}>
                                            <svg className="pl-component-right-menu-button" width='15' height='15' viewBox='0 0 24 24' fillRule='evenodd'>
                                                <path d='M17.1 15.8l-1.5 1.5-3.7-3.8-3.8 3.8-1.5-1.5 3.8-3.8-3.7-3.8 1.5-1.5 3.8 3.8 3.9-3.8 1.5 1.5-4 3.8z'></path>
                                                <path d='M12 2c5.5 0 10 4.5 10 10s-4.5 10-10 10S2 17.5 2 12 6.5 2 12 2zm0-2C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0z'></path>
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </td>
                        )

                    } else {

                        return (

                            <td key={index}>{data[key]}</td>
                        )

                    }
                } else if (table_mode === "edition") {

                    if (key === "key") {

                        return (

                            <td key={index}>{data[key]}</td>
                        )

                    } else if (key === "value") {

                        return (
                            
                            <td key={index} className="value-editable">
                                <div className="grid-block shrink" >
                                    <PlComponentFormItemInputText
                                        className="pl_component_form_item_input_text"
                                        ref={data["key"]}
                                        key={data["key"]}
                                        required_input={""}
                                        value={data["value"]}
                                        placeholder={data[key].toString()} />
                                </div>
                            </td>
                        )
                    }

                } else {

                    if (key !== table_columns_last_column) {
                        return (

                            <td key={index} onClick={this.onClickRow.bind(this, data)} >{data[key]}</td>
                        )
                    } else {

                        return (

                            <td key={index} >{data[key]}</td>
                        )
                    }
                }

            })

        );

    }

    render_rows(rows) {

        return (

            rows.map((row,index) => {

                return (
                    
                    <tr className="grid-block shrink pl-component-table-row" key={index}>
                        {this.render_rows_items(row)}
                    </tr>

                )
            })
        )
    }

    render_header(data) {

        return (
            
            <tr className="grid-block">
                {this.render_header_items(data)}
            </tr>

        );
    }

    render_body(data) {

        return (
            this.render_rows(data)
        );
    }

    render() {

        var data = this.props.data;
        data = process_data_to_show_in_table(data);

        return (
            
            <div className="grid-block pl-component-table">
                <table className="grid-block vertical">
                    <thead className="grid-block shrink">
                        {this.render_header(data)}
                    </thead>
                    <tbody className="grid-block vertical">
                        {this.render_body(data)}
                    </tbody>
                </table>
            </div>
        );
    }
}