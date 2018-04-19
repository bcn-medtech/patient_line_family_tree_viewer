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
import { PlComponentTable } from './../pl_component_table/pl_component_table'

//modules
import { isObjectEmpty } from './../../../modules/rkt_module_object';

//actions
import { 
    clean_data_table
    //obtain_data_from_query
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

        /*if (!isObjectEmpty(this.state.studies)) {
    
          var studies = obtainStudiesFromQuery(text_field_value, this.state.studies);
    
          this.setState({
            studies_to_display: studies
          })
    
        }*/

        var data_to_display;

        if(this.state.mode === "families"){

            data_to_display = this.props.families;

        }else{

            data_to_display = this.props.patients;
        }

        //data_to_display = obtain_data_from_query(data_to_display,text_field_value);

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

        this.setState({
            mode: mode
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

        if (this.state.mode === "families") {
            data = families;
            data_keys_selected = this.state.family_columns_selected;
            console.log(data_keys_selected);
        } else {
            data = patients;
            data_keys_selected = this.state.patient_columns_selected;
            console.log(data_keys_selected);
        }

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
            </div>
        );
    }
}