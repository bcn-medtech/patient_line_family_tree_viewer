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


export class PlComponentCardPatientStatus extends Component {


    render() {

        var status=[
            {
                "status":"muerte_por_otras_causas",
                "gender":"female",
                "svg":<svg width="45" height="45"><rect id="svg_2" height="30" width="30" y="12.5" x="9" fill-opacity="null" stroke-opacity="null" stroke-width="1.5" stroke="#000" fill="#fff" /><line stroke="#000" stroke-width="2" stroke-linecap="null" stroke-linejoin="null" id="svg_13" y2="7.5" x2="43" y1="44.5" x1="5" fill-opacity="null" stroke-opacity="null" fill="none" /></svg>
            },
            {
                "status":"muerte_por_otras_causas",
                "gender":"male",
                "svg":<svg width="45" height="45"><ellipse ry="17" rx="17" id="svg_1" cy="26" cx="28" stroke-width="1.5" stroke="#000" fill="#fff"/><line stroke-width="2" stroke-linecap="null" stroke-linejoin="null" id="svg_15" y2="7.5" x2="45.538451" y1="44.5" x1="7.538451" fill-opacity="null" stroke-opacity="null" stroke="#000" fill="none"/></svg>
            },
            {
                "status":"muerte_subita",
                "gender":"female",
                "svg":<svg width="45" height="45"><rect id="svg_5" height="30" width="30" y="8.5" x="8" stroke-opacity="null" stroke-width="1.5" stroke="#000" fill="#000000"/><line stroke-width="2" stroke-linecap="null" stroke-linejoin="null" id="svg_17" y2="4.624963" x2="41" y1="41.624963" x1="3" fill-opacity="null" stroke-opacity="null" stroke="#000" fill="none"/></svg>
            },
            {
                "status":"muerte_subita",
                "gender":"male",
                "svg":<svg width="45" height="45"><ellipse ry="17" rx="17" id="svg_4" cy="23" cx="24" stroke-width="1.5" stroke="#000" fill="#000000"/><line stroke-width="2" stroke-linecap="null" stroke-linejoin="null" id="svg_16" y2="3.374964" x2="40.538451" y1="40.374964" x1="2.538451" fill-opacity="null" stroke-opacity="null" stroke="#000" fill="none"/></svg>
            },
            {
                "status":"ms_o_fv_recuperada",
                "gender":"female",
                "svg":<svg width="45" height="45"><rect id="svg_5" height="30" width="30" y="8.5" x="8" stroke-opacity="null" stroke-width="1.5" stroke="#000" fill="#000000"/></svg>
            },
            {
                "status":"ms_o_fv_recuperada",
                "gender":"male",
                "svg":<svg width="45" height="45"><ellipse ry="17" rx="17" id="svg_4" cy="23" cx="24" stroke-width="1.5" stroke="#000" fill="#000000"/></svg>
            },
            {
                "status":"manifestacion_responsable",
                "gender":"female",
                "svg":<svg width="45" height="45"><rect id="svg_5" height="30" width="30" y="8.5" x="8" stroke-opacity="null" stroke-width="1.5" stroke="#000" fill="#ff0000"/></svg>
            },
            {
                "status":"manifestacion_responsable",
                "gender":"male",
                "svg":<svg width="45" height="45"><ellipse ry="17" rx="17" id="svg_4" cy="23" cx="24" stroke-width="1.5" stroke="#000" fill="#ff0000"/></svg>
            },
            {
                "status":"sin_manifestacion_fenotipica",
                "gender":"female",
                "svg":<svg width="45" height="45"><rect id="svg_5" height="30" width="30" y="8.5" x="8" stroke-opacity="null" stroke-width="1.5" stroke="#000" fill="#fcfcfc"/></svg>
            },
            {
                "status":"sin_manifestacion_fenotipica",
                "gender":"male",
                "svg":<svg width="45" height="45"><ellipse ry="17" rx="17" id="svg_4" cy="23" cx="24" stroke-width="1.5" stroke="#000" fill="#fcfcfc"/></svg>
            },
            
        ]

        return (
            <div className="grid-block pl-component-card-patient">
                {status[9].svg}
            </div>
        );
    }
}