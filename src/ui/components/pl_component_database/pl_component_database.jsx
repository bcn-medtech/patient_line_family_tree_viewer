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
import { PlComponentForm } from './../pl_component_form/pl_component_form';
import { PlComponentConfirmMessage } from './../pl_component_comfirm_message/pl_component_confirm_message';
import { PlComponentModal } from './../../components/pl_component_modal/pl_component_modal';
//schemes
import plComponentDatabaseModalAddSchemeFamily from './pl_component_database_modal_add_scheme/pl_component_database_modal_add_scheme_family.json';
import plComponentDatabaseModalAddSchemePatients from './pl_component_database_modal_add_scheme/pl_component_database_modal_add_scheme_patients.json';
//modules
import { isObjectEmpty, isObjectAFunction } from './../../../modules/rkt_module_object';

//actions
import {
    clean_data_table,
    query_data,
    filter_data_by_ids,
    create_search_bar_place_holder_from_data
} from './pl_component_database_actions';

export class PlComponentDatabase extends Component {

    constructor() {
        super();

        this.state = {
            mode: "families",
            family_default_columns: ["id", "name", "description", "num_family_members"],
            patient_default_columns: ["id", "name", "gender", "mother", "married_with", "family_id", "center", "num_relatives"],
            family_columns_selected: ["id", "name", "description", "num_family_members"],
            patient_columns_selected: ["id", "name", "gender", "mother", "married_with", "family_id", "center", "num_relatives"],
            data_to_display: [],
            menu_action: false,
            delete_row: false
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

        if (action === "add") {

            this.setState({
                menu_action: "add"
            });

        } else if (action === "delete") {

            if (this.state.menu_action === "delete") {

                this.setState({
                    menu_action: false
                });

            } else {

                this.setState({
                    menu_action: "delete"
                });
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

        } else if (action === "close") {

            this.setState({
                menu_action: false
            });
        }

    }

    on_save_add_modal(data) {

        if (isObjectAFunction(this.props.perform_database_action)) {

            var action = {}

            if (this.state.mode === "families") {

                action["action"] = "add_family";
                action["data"] = data;

            } else if (this.state.mode === "patients") {

                action["action"] = "add_patient";
                action["data"] = data;

            }

            this.props.perform_database_action(action);

        }

        this.setState({
            menu_action: false,
            delete_row: false
        })
    }

    on_close_add_modal() {

        if (this.state.delete_row !== false) {
            this.setState({
                delete_row: false
            })
        } else {
            this.setState({
                menu_action: false,
                delete_row: false
            })
        }


    }

    on_select_element_to_remove(element) {

        this.setState({
            delete_row: element
        })

    }

    on_remove_element(element) {

        if (element === "Yes") {

            if (isObjectAFunction(this.props.perform_database_action)) {

                var action = {}

                if (this.state.mode === "families") {

                    action["action"] = "remove_family";
                    action["data"] = this.state.delete_row;

                } else if (this.state.mode === "patients") {

                    action["action"] = "remove_patient";
                    action["data"] = this.state.delete_row;

                }

                this.props.perform_database_action(action);

            }

        }

        this.setState({
            delete_row: false
        });
    }

    render_modal() {

        var form;
        var mode = this.state.mode;
        var menu_action = this.state.menu_action;
        var delete_row = this.state.delete_row;

        if (menu_action === "add") {

            if (!isObjectEmpty(mode)) {

                if (mode === "families") {

                    form = <PlComponentForm form={plComponentDatabaseModalAddSchemeFamily} onclicksave={this.on_save_add_modal.bind(this)} />;

                } else if (mode === "patients") {

                    form = <PlComponentForm form={plComponentDatabaseModalAddSchemePatients} onclicksave={this.on_save_add_modal.bind(this)} />;

                }

            }

            return (
                <PlComponentModal
                    ref="ModalForm"
                    title={"Add Patient"}
                    Modal_content={form}
                    onclickesc={this.on_close_add_modal.bind(this)} />
            );

        } else if (delete_row !== false) {

            var message_to_show = "";

            if (mode === "families") {

                message_to_show = "Are you sure you want to remove the family " + delete_row.id + "?";

            } else if (mode === "patients") {

                message_to_show = "Are you sure you want to remove the patient " + delete_row.id + "?";

            }

            var content = <PlComponentConfirmMessage message={message_to_show} extra_message={"this action will remove it forever"} onclickanswerbutton={this.on_remove_element.bind(this)} />;;

            return (
                <PlComponentModal
                    ref="ModalForm"
                    title={""}
                    Modal_content={content}
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
        var table_mode;

        var menu_items = [
            {
                "name": "add",
                "icon": <svg width='16' height='16' viewBox='0 0 24 24' fill-rule='evenodd'><path d='M14 0h-4v10H0v4h10v10h4V14h10v-4H14z'></path></svg>
            },
            {
                "name": "delete",
                "icon": <svg width='10' height='21' viewBox='0 0 16 24' fill-rule='evenodd'><path d='M4 0h8v2H4zM0 3v4h1v17h14V7h1V3H0zm13 18H3V8h10v13z'></path><path d='M5 10h2v9H5zm4 0h2v9H9z'></path></svg>,
                "selected": false
            },
            {
                "name": "export",
                "icon": <svg width='15' height='15' viewBox='0 0 24 24' fill-rule='evenodd'><path d='M19 9.4l-1.2-1.1L13 13V0h-2v13L6.2 8.3 5 9.4l7 6.6z'></path><path d='M22 14v6H2v-6H0v10h24V14z'></path></svg>
            }
        ]

        if (this.state.menu_action === "delete") {

            table_mode = "delete";

            for (var i = 0; i < menu_items.length; i++) {
                if (menu_items[i].name === "delete") {
                    menu_items[i].selected = true;
                }
            }
        }

        if (this.state.mode === "families") {
            data = families;
            data_keys_selected = this.state.family_columns_selected;

        } else {
            data = patients;
            data_keys_selected = this.state.patient_columns_selected;

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
                        on_click_row={this.onClickRow.bind(this)}
                        table_mode={table_mode}
                        on_remove_element={this.on_select_element_to_remove.bind(this)} />
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