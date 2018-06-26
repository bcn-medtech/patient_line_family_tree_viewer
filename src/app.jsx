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
//react router
import { BrowserRouter as Router, Route } from 'react-router-dom';


//pages
import PlPageViewer from './ui/pages/pl_page_viewer/pl_page_viewer';
import PlPageTestApi from './ui/pages/pl_page_test_api/pl_page_test_api';
import PlPagePatients from './ui/pages/pl_page_patients/pl_page_patients';
import PlPageError from './ui/pages/pl_page_error/pl_page_error';

class App extends Component {

  render() {
    return (
      <Router>
        <div className="grid-frame">
          <Route exact path="/" component={PlPagePatients} />
          <Route path="/patients" component={PlPagePatients} />
          <Route path="/viewer" component={PlPageViewer} />
          <Route path="/error" component={PlPageError} />
          <Route path="/testapi" component={PlPageTestApi} />
          {/*<Route path="/viewer/:format/:url" component={RktPageViewer} />*/} 
        </div>
      </Router>
    );
  }
}

export default App;
