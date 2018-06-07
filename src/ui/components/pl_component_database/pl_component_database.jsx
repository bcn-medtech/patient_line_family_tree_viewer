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
import { PlComponentTable } from './../pl_component_table/pl_component_table';
import { PlComponentMenu } from './../pl_component_menu/pl_component_menu/pl_component_menu';
import { PlComponentDatabaseHeader } from './pl_component_database_header/pl_component_database_header';
import { PlComponentMenuTags } from './../pl_component_menu/pl_component_menu_tags/pl_component_menu_tags';
import { PlComponentConfirmMessage } from './../pl_component_comfirm_message/pl_component_confirm_message';
import { PlComponentModal } from './../../components/pl_component_modal/pl_component_modal';
//modules
import { isObjectEmpty, isObjectAFunction } from './../../../modules/rkt_module_object';

//actions
import {
    clean_data_table,
    query_data,
    filter_data_by_ids,
    create_search_bar_place_holder_from_data,
    get_root_patient_of_family
} from './pl_component_database_actions';

export class PlComponentDatabase extends Component {

    constructor() {
        super();

        this.state = {
            mode: "families",
            family_default_columns: ["id", "name", "description", "num_family_members", "symptoms", "comments"],
            patient_default_columns: ["id", "name", "gender", "mother", "family_id", "center", "num_relatives"],
            family_columns_selected: ["id", "name", "description", "num_family_members", "symptoms", "comments"],
            patient_columns_selected: ["id", "name", "gender", "mother", "family_id", "center", "num_relatives"],
            data_to_display: [],
            menu_action: false,
        }
    }
    componentDidMount() {

    }

    onChangePagination(element) {
        //console.log("On change pagination");
        //console.log(element);
    }

    onProcessQuery(index, isInputInvalid, text_field_value) {

        var data_to_display;

        if (this.state.mode === "families") {

            data_to_display = this.props.families;

        } else {

            data_to_display = this.props.patients;
        }

        if (!isObjectEmpty(data_to_display)) {

            data_to_display = query_data(data_to_display, text_field_value);

            if (!isObjectEmpty(data_to_display)) {

                this.setState({
                    "data_to_display": data_to_display
                });
            }
        }
    }

    onClickRow(element_selected) {

        if (isObjectAFunction(this.props.perform_database_action)) {

            if (this.state.mode === "families") {

                var action = {};
                action["action"] = "explore_family";

                var family_id = element_selected.id;
                var patients = this.props.patients;
                element_selected.root_patient = get_root_patient_of_family(family_id, patients);       
                action["data"] = element_selected;

                this.props.perform_database_action(action);

            } else if (this.state.mode === "patients") {

                var action = {};
                action["action"] = "explore_patient";
                action["data"] = element_selected;

                this.props.perform_database_action(action);
            }

        }
    }

    set_database_component_mode(mode) {

        this.refs.SearchBar.resetComponent();

        this.setState({
            mode: mode,
            data_to_display: []
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

    on_click_database_menu_button(action) {

        if ((action === "add") && (this.state.mode === "families")) {

            this.setState({
                menu_action: false
            });

            if (isObjectAFunction(this.props.perform_database_action)) {

                var action = {}
                action["action"] = "add_family";
                action["data"] = {};

                this.props.perform_database_action(action);
            }

        } else if (action === "export") {

            this.setState({
                menu_action: false
            });

            if (isObjectAFunction(this.props.perform_database_action)) {

                var action = {};
                action["action"] = "export";
                action["data"] = {};

                this.props.perform_database_action(action);
            }

        } else if (action === "delete_database") {

            this.setState({
                menu_action: "delete_database"
            });

        } else if (action === "close") {

            this.setState({
                menu_action: false
            });
        }

    }

    on_delete_database(answer) {

        if (answer === "Yes") {

            if (isObjectAFunction(this.props.perform_database_action)) {

                var action = {};
                action["action"] = "delete_database";
                action["data"] = {};

                this.refs.Modal.closeModal();
                this.props.perform_database_action(action);

            }

        } else if (answer === "Cancel") {

            this.refs.Modal.closeModal();

        }


    }

    on_close_add_modal() {

        this.setState({
            menu_action: false
        });

    }

    render_modal() {

        var mode = this.state.mode;
        var menu_action = this.state.menu_action;

        if (!isObjectEmpty(menu_action)) {

            if ((mode === "families") && (menu_action === "delete_database")) {

                var modal_title, modal_content;

                modal_title = "Delete Database";
                var message_to_show = "Are you sure you want to delete the database?";
                
                modal_content =
                    <PlComponentConfirmMessage
                        message={message_to_show}
                        extra_message={"You will not be able to undo it"}
                        onclickanswerbutton={this.on_delete_database.bind(this)}
                    />

            }

            return (
                <PlComponentModal
                    ref="Modal"
                    title={modal_title}
                    Modal_content={modal_content}
                    onclickesc={this.on_close_add_modal.bind(this)} />
            );

        }

    }



    render() {

        var families = this.props.families;
        var patients = this.props.patients;
        var data;
        var data_keys_selected;
        var data_filtered;
        var search_bar_place_holder;
        var menu_items;

        if (this.state.mode === "families") {
            data = families;
            data_keys_selected = this.state.family_columns_selected;

            menu_items = [
                {
                    "name": "add",
                    "icon": <svg width='16' height='16' viewBox='0 0 24 24' fillRule='evenodd'><path d='M14 0h-4v10H0v4h10v10h4V14h10v-4H14z'></path></svg>
                },
                {
                    "name": "export",
                    "icon": <svg width='15' height='15' viewBox='0 0 24 24' fillRule='evenodd'><path d='M19 9.4l-1.2-1.1L13 13V0h-2v13L6.2 8.3 5 9.4l7 6.6z'></path><path d='M22 14v6H2v-6H0v10h24V14z'></path></svg>
                },
                {
                    "name": "delete_database",
                    "icon": <svg width='10' height='18' viewBox='0 0 16 24' fillRule='evenodd'><path d='M4 0h8v2H4zM0 3v4h1v17h14V7h1V3H0zm13 18H3V8h10v13z'></path><path d='M5 10h2v9H5zm4 0h2v9H9z'></path></svg>
                }
            ]

        } else {
            data = patients;
            data_keys_selected = this.state.patient_columns_selected;

            menu_items = [
                {
                    "name": "export",
                    "icon": <svg width='15' height='15' viewBox='0 0 24 24' fillRule='evenodd'><path d='M19 9.4l-1.2-1.1L13 13V0h-2v13L6.2 8.3 5 9.4l7 6.6z'></path><path d='M22 14v6H2v-6H0v10h24V14z'></path></svg>
                }
            ]

        }

        search_bar_place_holder = create_search_bar_place_holder_from_data(data);
        data = filter_data_by_ids(data, this.state.data_to_display);
        data_filtered = clean_data_table(data, data_keys_selected);

        return (
            <div className="grid-block vertical pl_component_database">
                <PlComponentDatabaseHeader mode={this.state.mode} data={data} set_database_component_mode={this.set_database_component_mode.bind(this)}></PlComponentDatabaseHeader>
                <div className="grid-block shrink">
                    <PlComponentFormItemInputText
                        className="pl_component_form_item_input_text"
                        ref="SearchBar"
                        key={"patients_search_bar"}
                        required_input={""}
                        placeholder={search_bar_place_holder}
                        onInputChange={this.onProcessQuery.bind(this)} />
                </div>
                <PlComponentMenuTags data={data} keys_selected={data_keys_selected} on_select_tag={this.database_show_column.bind(this)} on_un_selected_tag={this.database_hide_column.bind(this)}></PlComponentMenuTags>
                <div className="grid-block table">
                    <PlComponentTable data={data_filtered}
                        on_click_row={this.onClickRow.bind(this)} />
                </div>
                <div className="grid-block shrink">
                    <Pagination
                        onChange={this.onChangePagination.bind(this)}
                        pageSizes={[10, 20, 30]}
                        pagesUnknown
                        pageInputDisabled
                    />
                </div>
                <div className="grid-block bottom_bar"><PlComponentMenu menu_items={menu_items} on_click_button={this.on_click_database_menu_button.bind(this)} /></div>
                {this.render_modal()}
            </div>
        );
    }
}