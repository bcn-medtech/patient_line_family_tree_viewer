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
import {PlComponentSidebar } from './../../components/pl_component_sidebar/pl_component_sidebar';
import { PlComponentMenu } from './../../components/pl_component_menu/pl_component_menu/pl_component_menu';
//modules
import { url_getParameterByName } from './../../../modules/rkt_module_url';
import { isObjectEmpty } from './../../../modules/rkt_module_object';

export default class PlPageViewer extends Component {

  constructor(){
    super();

    this.state={
      root:false,
      siblings:false
    };
  }

  componentDidMount(){

    var location = window.location;
    var myComponent = this;

    if ("href" in location) {

      var location_url = location.href;
      var family_id = url_getParameterByName("family_id", location_url);
      var patient_id = url_getParameterByName("patient_id", location_url);

      get_family(family_id,function(result){
          
          var root = result.root;
          var siblings = result.siblings;

          myComponent.setState({
            root:root,
            siblings:siblings
          });

      });
      
    }
  }

  on_click_menu(action){
    console.log(action);
  }

  render() {

    var tree_viewer;
    var sidebar;

    var menu_items = [
      {
          "name": "go_back",
          "icon": <svg width='16' height='14' viewBox='0 0 16 14' fill-rule='evenodd'><path d='M3.4 8H16V6H3.3l5-4.7L7 0 0 7l7 7 1.3-1.3z'></path></svg>
      }
  ]

    if(this.state.root !== false && this.state.siblings !== false){
        tree_viewer=<PlComponentFamilyTreeViewer root={this.state.root} siblings={this.state.siblings}/>;
        sidebar = <PlComponentSidebar/>
    }

    return (
      <div className="grid-frame pl-page-viewer">
          <div className="grid-block medium-8">{tree_viewer}</div>
          <div className="grid-block medium-4">{sidebar}</div>
          <div className="grid-block bottom_bar"><PlComponentMenu menu_items={menu_items} on_click_button={this.on_click_menu.bind(this)} /></div>
      </div>
    );
  }
}