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
// import { initClient } from './../../../modules/rkt_module_google_apis';
import { isObjectEmpty } from './../../../modules/rkt_module_object';


//config
import config from './../../../config/config.json';

export default class PlPagePatients extends Component {


  constructor() {
    super();

    this.state = {
      families: [],
      patients: [],
      isModalOpen: false,
      isUserSignedIn: false
    }

    var initClient = this.initClient.bind(this);
    window.gapi.load("client:auth2", initClient);

  }

  initClient() {
    
    // Initialize the JavaScript client library.
    var myComponent = this;
    
    window.gapi.client.init(
      config.google.params
    ).then(function(){

        // Listen for sign-in state changes.
        window.gapi.auth2.getAuthInstance().isSignedIn.listen(myComponent.updateSigningStatus.bind(myComponent));

        // Handle the initial sign-in state.
        myComponent.updateSigningStatus(window.gapi.auth2.getAuthInstance().isSignedIn.get(), myComponent);

    });

  }

  updateSigningStatus(isSignedIn) {

      // When signin status changes, this function is called.
      // If the signin status is changed to signedIn, we make an API call.

      // if (isSignedIn) makeApiCall();

      this.setState({
        isUserSignedIn: isSignedIn
      })

  }

  handle_authentication(action) {

    if (action === "sign in") window.gapi.auth2.getAuthInstance().signIn();
    else if (action === "sign out") window.gapi.auth2.getAuthInstance().signOut();

  }

  on_log_out() {


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
    
    this.update_component_state_from_database();

  }


  import_data(file) {

    var myComponent = this;

    import_data_to_app(file, function (result) {

      if (result) {
        console.log("Data imported");

        myComponent.update_component_state_from_database();
      } else {
        console.log("Error! Problems importing data");
      }

    });

  }

  perform_database_action(data){
    
    var myComponent = this;
    var browserHistory = this.props.history;
    
    perform_database_action(data,browserHistory,function(resut){

        myComponent.update_component_state_from_database() 
    });

  }

  render() {

    var body;
    
    var families = this.state.families;
    var patients = this.state.patients;
    var isUserSignedIn = this.state.isUserSignedIn;
    
    if (isObjectEmpty(families)) {
      body = <PlComponentDragAndDrop get_files_from_drag_and_drop={this.import_data.bind(this)} import_template_database={this.import_data.bind(this)} perform_database_action={this.perform_database_action.bind(this)}/>
    } else {

      patients = get_patients(patients);
      families = get_families(patients,families);
      
      body = <PlComponentDatabase families={families} patients={patients} perform_database_action={this.perform_database_action.bind(this)}/>
    }

    return (
      <div className="grid-frame pl-page-patients" >
        <div className="grid-block vertical">
          <PlHeader isUserSignedIn={isUserSignedIn} handle_authentication={this.handle_authentication.bind(this)}/>
          {body}
        </div>
      </div>
    );
  }
}