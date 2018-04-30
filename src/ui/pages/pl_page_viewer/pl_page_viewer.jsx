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
import { get_family } from './pl_page_viewer_actions';
//components
import { PlComponentFamilyTreeViewer } from './../../components/pl_component_family_tree_viewer/pl_component_family_tree_viewer';
import { PlComponentSidebar } from './../../components/pl_component_sidebar/pl_component_sidebar';
import { PlComponentButtonCircle } from './../../components/pl_component_button/pl_component_button_circle/pl_component_button_circle';
import { PlComponentButtonCircleSelectable } from './../../components/pl_component_button/pl_component_button_circle_selectable/pl_component_button_circle_selectable';
import { PlComponentLegend } from './../../components/pl_component_legend/pl_component_legend';
//modules
import { url_getParameterByName } from './../../../modules/rkt_module_url';
import { isObjectEmpty } from './../../../modules/rkt_module_object';

export default class PlPageViewer extends Component {

  constructor() {
    super();

    this.state = {
      root: false,
      siblings: false,
      show_legend:false
    };
  }

  componentDidMount() {

    var location = window.location;
    var myComponent = this;

    if ("href" in location) {

      var location_url = location.href;
      var family_id = url_getParameterByName("family_id", location_url);
      var patient_id = url_getParameterByName("patient_id", location_url);

      get_family(family_id, function (result) {

        var root = result.root;
        var siblings = result.siblings;

        myComponent.setState({
          root: root,
          siblings: siblings
        });

      });

    }
  }

  on_click_button(action) {

    if (action === "go_back") {

      var browserHistory = this.props.history;
      browserHistory.push("/patients");

    } else if (action === "show_legend") {

        this.setState({
          show_legend:!this.state.show_legend
        })
    }

  }

  render() {

    var tree_viewer;
    var sidebar;
    var viewer_legend;

    var bottom_button_left =
      {
        "name": "go_back",
        "icon": <svg width='16' height='14' viewBox='0 0 16 14' fill-rule='evenodd'><path d='M3.4 8H16V6H3.3l5-4.7L7 0 0 7l7 7 1.3-1.3z'></path></svg>
      }

    var bottom_button_right =
      {
        "name": "show_legend",
        "icon": <svg width='16' height='15' viewBox='0 0 12 11' fill-rule='evenodd'><path d='M1 9V1h2.8S6 1 6 2.5v7.1S5.7 9 3.7 9H1zm6.5-9C6.4 0 6 .8 6 .8S5.6 0 3.8 0H0v10h3.7S6 10 6 11c0-1 2.2-1 2.2-1H12V0H7.5z'></path></svg>,
        "selected":this.state.show_legend
      }

    if (this.state.root !== false && this.state.siblings !== false) {
      tree_viewer = <PlComponentFamilyTreeViewer root={this.state.root} siblings={this.state.siblings} />;
      sidebar = <PlComponentSidebar />
    }

    if(this.state.show_legend){
      viewer_legend = <PlComponentLegend/>;
    }

    return (
      <div className="grid-frame pl-page-viewer">
        <div className="grid-block medium-8">
          {tree_viewer}
          <div className="grid-block bottom_bar_left">
            <PlComponentButtonCircle
              text={""}
              icon={bottom_button_left.icon}
              backgroundcolor={"transparent"}
              backgroundhovercolor={"#5C4EE5"}
              fontcolor={"#5C4EE5"}
              fonthovercolor={"white"}
              bordercolor={"#5C4EE5"}
              borderhovercolor={"#5C4EE5"}
              onclickelement={this.on_click_button.bind(this, bottom_button_left.name)} />
          </div>
          <div className="grid-block bottom_bar_right">
            <PlComponentButtonCircleSelectable
              text={""}
              icon={bottom_button_right.icon}
              backgroundcolor={"transparent"}
              backgroundhovercolor={"#5C4EE5"}
              backgroundselectedcolor={"#5C4EE5"}
              fontcolor={"#5C4EE5"}
              fonthovercolor={"white"}
              fontselectedcolor={"white"}
              bordercolor={"#5C4EE5"}
              borderhovercolor={"#5C4EE5"}
              borderselectedcolor={"#5C4EE5"}
              selected={bottom_button_right.selected}
              onclickelement={this.on_click_button.bind(this, bottom_button_right.name)} />
          </div>
          <div className="grid-block shrink legend">
          {viewer_legend}
          </div>
        </div>
        <div className="grid-block medium-4">
        {sidebar}
        </div>
      </div>
    );
  }
}