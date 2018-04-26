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

import {
  get_data_from_database,
  import_data_to_app,
  perform_database_action
} from './pl_page_patients_actions';

import {
  get_patients,
  get_families
} from './pl_page_patients_data_analisis';

//modules
import { isObjectEmpty } from './../../../modules/rkt_module_object';


export default class PlPagePatients extends Component {


  constructor() {
    super();

    this.state = {
      families: [],
      patients: [],
      isModalOpen: false,
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


  import_data(file) {

    import_data_to_app(file, function (result) {

      if (result) {
        console.log(result);
        console.log("Data imported");
      } else {
        console.log("Error! Problems importing data");
      }

    });

  }

  perform_database_action(data){
    
    var myComponent = this;

    perform_database_action(data,function(resut){

        myComponent.update_component_state_from_database() 
    });

  }

  render() {

    var body;

    var families = this.state.families;
    var patients = this.state.patients;

    if (isObjectEmpty(families)) {
      body = <PlComponentDragAndDrop get_files_from_drag_and_drop={this.import_data.bind(this)} />
    } else {

      patients = get_patients(patients);
      families = get_families(patients,families);

      body = <PlComponentDatabase families={families} patients={patients} perform_database_action={this.perform_database_action.bind(this)}/>
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