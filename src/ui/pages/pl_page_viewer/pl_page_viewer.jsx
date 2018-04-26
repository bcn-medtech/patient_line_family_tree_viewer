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
//actions
import {get_family} from './pl_page_viewer_actions';
//components
import {PlComponentFamilyTreeViewer} from './../../components/pl_component_family_tree_viewer/pl_component_family_tree_viewer';
//modules
import { url_getParameterByName } from './../../../modules/rkt_module_url';

export default class PlPageViewer extends Component {

  componentDidMount(){

    var location = window.location;

    if ("href" in location) {

      var location_url = location.href;
      var family_id = url_getParameterByName("family_id", location_url);
      var patient_id = url_getParameterByName("patient_id", location_url);

      get_family(family_id);
      
    }
  }

  render() {

    return (
      <div className="grid-frame pl-page-viewer">
         <PlComponentFamilyTreeViewer/>
      </div>
    );
  }
}