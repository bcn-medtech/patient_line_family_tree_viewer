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
import PlHeader from './../../components/pl_component_header/pl_component_header';
import { PlComponentDragAndDrop } from './../../components/pl_component_drag_and_drop/pl_component_drag_and_drop';
import { PlComponentDatabase } from './../../components/pl_component_database/pl_component_database.jsx';

//actions
/*import {
  dowload_studies_from_api,
  obtainStudiesFromQuery,
  obtain_user_token,
  obtain_user_email_from_token,
  logout,
  devLogin,
  navigate_to_url
} from './pl_page_patients_actions';*/

import {
  get_data_from_database
} from './pl_page_patients_actions';

import {
  import_data_to_app
} from './pl_page_patients_actions';

//modules
import { isObjectEmpty } from './../../../modules/rkt_module_object';

//config
//import config from './../../../config/config.json';

export default class PlPagePatients extends Component {


  constructor() {
    super();

    this.state = {
      families: [],
      patients: [],
      //studies_to_display: [],
    }
  }

  setUrl(url) {

    if (url !== false) {
      var browserHistory = this.props.history;
      browserHistory.push("/patients" + url);

    } else {
      alert("URL not compatible");
    }

  }

  update_component_state_from_database() {

    var myComponent = this;

    get_data_from_database(function (result) {

      if ("families" in result) {

        if ("patients" in result) {

          myComponent.setState({
            patients: result.patients,
            families: result.families
          });

        } else {

          myComponent.setState({
            families: result.families
          });

        }

      } else {

        if ("patients" in result) {

          myComponent.setState({
            patients: result.patients,
          });

        }
      }
    });
  }


  componentDidMount() {

    var location = window.location;
    this.update_component_state_from_database();

  }

  onChangePagination(element) {
    console.log("On change pagination");
    console.log(element);
  }

  get_files_from_drag_and_drop(file) {

    import_data_to_app(file, function (result) {

      if (result) {
        console.log(result);
        console.log("Data imported");
      } else {
        console.log("Error! Problems importing data");
      }

    });

  }

  render() {

    var body;

    var families = this.state.families;
    var patients = this.state.patients;

    if (isObjectEmpty(families)) {
      body = <PlComponentDragAndDrop get_files_from_drag_and_drop={this.get_files_from_drag_and_drop.bind(this)} />
    } else {
      body = <PlComponentDatabase families={families} patients={patients}/>
    }


    return (
      <div className="grid-frame pl-page-patients" >
        <div className="grid-block vertical">
          <PlHeader />
          {body}
        </div>
      </div>
    );
  }
}