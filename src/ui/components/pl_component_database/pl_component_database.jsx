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

//components
import { PlComponentFormItemInputText } from './../pl_component_form/pl_component_form_item/pl_component_form_item_input_text/pl_component_form_item_input_text';
import { Pagination } from 'carbon-components-react';
import { Tag } from 'carbon-components-react';
import { PlComponentTable } from './../pl_component_table/pl_component_table';
import { PlComponentMenu } from './../pl_component_menu/pl_component_menu';

//modules
import { isObjectEmpty } from './../../../modules/rkt_module_object';

//actions
import { 
    clean_data_table,
    query_data,
    filter_data_by_ids,
    create_search_bar_place_holder_from_data
} from './pl_component_database_actions';

import {
    keys
} from 'underscore';
//config
//import config from './../../../config/config.json';

export class PlComponentDatabase extends Component {

    constructor() {
        super();

        this.state = {
            mode: "families",
            family_default_columns: ["id", "name", "description"],
            patient_default_columns: ["id", "name", "gender", "mother", "married_with", "family_id", "center"],
            family_columns_selected: ["id", "name", "description"],
            patient_columns_selected: ["id", "name", "gender", "mother", "married_with", "family_id", "center"],
            data_to_display:[]
        }
    }
    componentDidMount() {

    }

    onChangePagination(element) {
        console.log("On change pagination");
        console.log(element);
    }

    onProcessQuery(index, isInputInvalid, text_field_value) {

        var data_to_display;

        if(this.state.mode === "families"){

            data_to_display = this.props.families;

        }else{

            data_to_display = this.props.patients;
        }

        if(!isObjectEmpty(data_to_display)){

            data_to_display = query_data(data_to_display,text_field_value);

            if(!isObjectEmpty(data_to_display)){

                this.setState({
                    "data_to_display":data_to_display
                });
            }
        }
    }

    onClickRow(element_selected) {

        console.log(element_selected);

        /*var url_api = config.url_api;
        var patient_id = study_selected.patient;
        var modality_id = study_selected.modality;
        var followup_id = study_selected.date;
    
        var url_to_navigate = config.url_app + '/viewer?';
        url_to_navigate = url_to_navigate+"url="+url_api+"&";
        url_to_navigate = url_to_navigate+"patient_id="+patient_id+"&";
        url_to_navigate = url_to_navigate+"modality_id="+modality_id+"&";
        url_to_navigate = url_to_navigate+"followup_id="+followup_id+"&";
    
        navigate_to_url(url_to_navigate);*/
    }

    set_database_component_mode(mode) {

        this.refs.SearchBar.resetComponent();

        this.setState({
            mode: mode,
            data_to_display:[]
        });
    }

    database_hide_column(column) {

        var columns = [];
        var index = -1;

        if (this.state.mode === "families") {

            columns = this.state.family_columns_selected;

            if (columns.length > 1) {

                index = columns.indexOf(column);

                if (index > -1) {

                    columns.splice(index, 1);

                    this.setState({
                        family_columns_selected: columns
                    });
                }
            }

        } else {

            columns = this.state.patient_columns_selected;

            if (columns.length > 1) {

                index = columns.indexOf(column);

                if (index > -1) {

                    columns.splice(index, 1);

                    this.setState({
                        patient_columns_selected: columns
                    });
                }
            }
        }
    }

    database_show_column(column) {


        var columns = [];
        var index = -1;

        if (this.state.mode === "families") {

            columns = this.state.family_columns_selected;

            index = columns.indexOf(column);

            if (index === -1) {

                columns.push(column);

                this.setState({
                    family_columns_selected: columns
                });
            }

        } else {

            columns = this.state.patient_columns_selected;

            index = columns.indexOf(column);

            if (index === -1) {

                columns.push(column);

                this.setState({
                    patient_columns_selected: columns
                });
            }

        }
    }

    on_click_database_button(item){
        
        console.log("Database action:"+item);
    }

    render_database_component_header(mode, data) {

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

    render_database_columns_controler(data, keys_selected) {

        if (!isObjectEmpty(data)) {

            if (data.length >= 1) {

                var columns = keys(data[0]);

                return (

                    columns.map((item, index) => {

                        if (keys_selected.indexOf(item) !== -1) {
                            return (

                                <a onClick={this.database_hide_column.bind(this, item)} className="grid-block shrink"><Tag className="tag-selected" type="beta">{item}</Tag></a>

                            );
                        } else {
                            return (

                                <a onClick={this.database_show_column.bind(this, item)} className="grid-block shrink"><Tag className="tag-un-selected" type="beta">{item}</Tag></a>

                            );
                        }

                    })

                );
            }
        }


    }


    render() {

        var families = this.props.families;
        var patients = this.props.patients;
        var data;
        var data_keys_selected;
        var data_filtered;
        var search_bar_place_holder;
        var menu_items = [
            {
                "name":"add",
                "icon":<svg width='16' height='16' viewBox='0 0 24 24' fill-rule='evenodd'><path d='M14 0h-4v10H0v4h10v10h4V14h10v-4H14z'></path></svg>
            },
            {
                "name":"delete",
                "icon":<svg width='10' height='21' viewBox='0 0 16 24' fill-rule='evenodd'><path d='M4 0h8v2H4zM0 3v4h1v17h14V7h1V3H0zm13 18H3V8h10v13z'></path><path d='M5 10h2v9H5zm4 0h2v9H9z'></path></svg>
            },
            {
                "name":"export",
                "icon":<svg width='15' height='15' viewBox='0 0 24 24' fill-rule='evenodd'><path d='M19 9.4l-1.2-1.1L13 13V0h-2v13L6.2 8.3 5 9.4l7 6.6z'></path><path d='M22 14v6H2v-6H0v10h24V14z'></path></svg>
            }
        ]

        if (this.state.mode === "families") {
            data = families;
            data_keys_selected = this.state.family_columns_selected;
           
        } else {
            data = patients;
            data_keys_selected = this.state.patient_columns_selected;

        }
    
        search_bar_place_holder = create_search_bar_place_holder_from_data(data);
        data = filter_data_by_ids(data,this.state.data_to_display);
        data_filtered = clean_data_table(data, data_keys_selected);

        return (
            <div className="grid-block vertical pl-component-database">
                {this.render_database_component_header(this.state.mode, data)}
                <div className="grid-block shrink">
                    <PlComponentFormItemInputText
                        className="pl_component_form_item_input_text"
                        ref="SearchBar"
                        key={"patients_search_bar"}
                        required_input={""}
                        placeholder={search_bar_place_holder}
                        onInputChange={this.onProcessQuery.bind(this)} />
                </div>
                <div className="grid-block shrink table-columns-menu">
                    {this.render_database_columns_controler(data, data_keys_selected)}
                </div>
                <div className="grid-block table">
                    <PlComponentTable data={data_filtered} on_click_row={this.onClickRow.bind(this)} />
                </div>
                <div className="grid-block shrink">
                    <Pagination
                        onChange={this.onChangePagination.bind(this)}
                        pageSizes={[10, 20, 30]}
                        pagesUnknown
                        pageInputDisabled
                    />
                </div>
                <div className="grid-block bottom_bar"><PlComponentMenu menu_items={menu_items} on_click_button={this.on_click_database_button.bind(this)}/></div>
            </div>
        );
    }
}