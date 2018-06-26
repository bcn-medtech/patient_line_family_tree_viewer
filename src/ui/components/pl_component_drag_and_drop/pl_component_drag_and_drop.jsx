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
import { download_resource } from './../../../modules/rkt_module_downloader';
import { isObjectAFunction, isObjectEmpty } from './../../../modules/rkt_module_object';
import { blob_getNumberOfFiles } from './../../../modules/rkt_module_blob';
import config from './../../../config/config.json';

export class PlComponentDragAndDrop extends Component {

    constructor() {

        super();

        this._onDragEnter = this._onDragEnter.bind(this);
        this._onDragLeave = this._onDragLeave.bind(this);
        this._onDragOver = this._onDragOver.bind(this);
        this._onDrop = this._onDrop.bind(this);
    }

    componentDidMount() {

        //component did mount
        window.addEventListener('mouseup', this._onDragLeave);
        window.addEventListener('dragenter', this._onDragEnter);
        window.addEventListener('dragover', this._onDragOver);
        window.addEventListener('drop', this._onDrop);
        document.getElementById('dragbox').addEventListener('dragleave', this._onDragLeave);

    }

    componentWillUnmount() {

        window.removeEventListener('mouseup', this._onDragLeave);
        window.removeEventListener('dragenter', this._onDragEnter);
        window.addEventListener('dragover', this._onDragOver);
        document.getElementById('dragbox').removeEventListener('dragleave', this._onDragLeave);
        window.removeEventListener('drop', this._onDrop);

    }

    _onDragEnter(e) {

        e.stopPropagation();
        e.preventDefault();
        return false;
    }

    _onDragOver(e) {

        e.preventDefault();
        e.stopPropagation();
        return false;
    }

    _onDragLeave(e) {

        e.stopPropagation();
        e.preventDefault();
        return false;
    }

    _onDrop(e) {

        e.preventDefault();

        let blob = e;
        
        if (blob_getNumberOfFiles(blob) === 1) {

            var files = blob.dataTransfer.files;

            if (!isObjectEmpty(files)) {

                this.props.get_files_from_drag_and_drop(files[0]);
            }

        } else {

            console.log("Problems opening the files");

        }
    }

    load_template_xlsx_workbook() {

        var load_button = document.getElementById("load-template-button");
        var url_template_xlsx_workbook = config.url_template_xlsx_workbook;

        load_button.href = url_template_xlsx_workbook;

    }

    import_template_xlsx_workbook_to_database() {

        var myComponent = this;
        var url_template_xlsx_workbook = config.url_template_xlsx_workbook;

        download_resource(url_template_xlsx_workbook, "template_database.xlsx", "donwload_template_xlsx", "", function(task) {
            
            if (task) {
                var file = task["resource_blob"];
                myComponent.props.import_template_database(file);

            } else console.log("error importing the database");

        });
        
    }

    on_create_family() {

        if (isObjectAFunction(this.props.perform_database_action)) {

            var action = {}
            action["action"] = "add_family";
            action["data"] = {};

            this.props.perform_database_action(action);
        }

    }

    render() {

        return (
            <div className="align-center grid-block vertical" id="dragbox">

                <div className="grid-block"><svg className="grid-block align-center pl-upload-icon" width="200" height="200" viewBox="0 0 24 18" fillRule="evenodd">
                    <path d="M6 9h1V8H6v1zM4 9h1V8H4v1zm-1-.5a1.5 1.5 0 1 1-2.999.001A1.5 1.5 0 0 1 3 8.5zM13 12a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm9.5-5c-.652 0-1.2.42-1.408 1h-4.234a3.968 3.968 0 0 0-.85-1.61l2.274-3.41c.072.008.144.02.218.02A1.5 1.5 0 1 0 17 1.5c0 .39.152.74.395 1.007l-2.132 3.198A3.978 3.978 0 0 0 13 5a3.988 3.988 0 0 0-3.858 3H8v1h1a3.999 3.999 0 0 0 6.263 3.295l2.132 3.198A1.49 1.49 0 0 0 17 16.5a1.5 1.5 0 1 0 1.5-1.5c-.074 0-.146.012-.218.02l-2.274-3.41c.61-.702.992-1.607.992-2.61h4.092c.207.58.756 1 1.408 1a1.5 1.5 0 0 0 0-3z" />
                </svg></div>
                <div className="grid-block align-center text-center pl-upload-message">
                    <p>
                        Drag and drop your database
                        <br />or click <a id="load-template-button" onClick={this.load_template_xlsx_workbook.bind(this)}>here</a> to download a template database
                        <br />or <a onClick={this.import_template_xlsx_workbook_to_database.bind(this)}>start with a template database</a>
                        <br />or <a onClick={this.on_create_family.bind(this)}>create a first family</a>
                    </p>
                </div>
            </div>
        );
    }
}

PlComponentDragAndDrop.defaultProps = {

};