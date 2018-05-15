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
import {
    where
} from 'underscore';
import { isObjectEmpty } from '../../../../../modules/rkt_module_object';

export class PlComponentCardPatientStatus extends Component {


    render() {

        var status = this.props.status;
        var gender = this.props.gender;
        var item;

        var status_types = [
            {
                "status": "muerte-por-otras-causas",
                "gender": "female",
                "svg": <svg width="45" height="45"><rect id="svg_2" height="30" width="30" y="12.5" x="9" fillOpacity="null" strokeOpacity="null" strokeWidth="1.5" stroke="#000" fill="#fff" /><line stroke="#000" strokeWidth="2" stroke-linecap="null" stroke-linejoin="null" id="svg_13" y2="7.5" x2="43" y1="44.5" x1="5" fillOpacity="null" strokeOpacity="null" fill="none" /></svg>
            },
            {
                "status": "muerte-por-otras-causas",
                "gender": "male",
                "svg": <svg width="45" height="45"><ellipse ry="17" rx="17" id="svg_1" cy="26" cx="28" strokeWidth="1.5" stroke="#000" fill="#fff" /><line strokeWidth="2" stroke-linecap="null" stroke-linejoin="null" id="svg_15" y2="7.5" x2="45.538451" y1="44.5" x1="7.538451" fillOpacity="null" strokeOpacity="null" stroke="#000" fill="none" /></svg>
            },
            {
                "status": "muerte-subita",
                "gender": "female",
                "svg": <svg width="45" height="45"><rect id="svg_5" height="30" width="30" y="8.5" x="8" strokeOpacity="null" strokeWidth="1.5" stroke="#000" fill="#000000" /><line strokeWidth="2" stroke-linecap="null" stroke-linejoin="null" id="svg_17" y2="4.624963" x2="41" y1="41.624963" x1="3" fillOpacity="null" strokeOpacity="null" stroke="#000" fill="none" /></svg>
            },
            {
                "status": "muerte-subita",
                "gender": "male",
                "svg": <svg width="45" height="45"><ellipse ry="17" rx="17" id="svg_4" cy="23" cx="24" strokeWidth="1.5" stroke="#000" fill="#000000" /><line strokeWidth="2" stroke-linecap="null" stroke-linejoin="null" id="svg_16" y2="3.374964" x2="40.538451" y1="40.374964" x1="2.538451" fillOpacity="null" strokeOpacity="null" stroke="#000" fill="none" /></svg>
            },
            {
                "status": "ms-o-fv-recuperada",
                "gender": "female",
                "svg": <svg width="45" height="45"><rect id="svg_5" height="30" width="30" y="8.5" x="8" strokeOpacity="null" strokeWidth="1.5" stroke="#000" fill="#000000" /></svg>
            },
            {
                "status": "ms-o-fv-recuperada",
                "gender": "male",
                "svg": <svg width="45" height="45"><ellipse ry="17" rx="17" id="svg_4" cy="23" cx="24" strokeWidth="1.5" stroke="#000" fill="#000000" /></svg>
            },
            {
                "status": "manifestacion-responsable",
                "gender": "female",
                "svg": <svg width="45" height="45"><rect id="svg_5" height="30" width="30" y="8.5" x="8" strokeOpacity="null" strokeWidth="1.5" stroke="#000" fill="#ff0000" /></svg>
            },
            {
                "status": "manifestacion-responsable",
                "gender": "male",
                "svg": <svg width="45" height="45"><ellipse ry="17" rx="17" id="svg_4" cy="23" cx="24" strokeWidth="1.5" stroke="#000" fill="#ff0000" /></svg>
            },
            {
                "status": "sin-manifestacion-fenotipica",
                "gender": "female",
                "svg": <svg width="45" height="45"><rect id="svg_5" height="30" width="30" y="8.5" x="8" strokeOpacity="null" strokeWidth="1.5" stroke="#000" fill="#fcfcfc" /></svg>
            },
            {
                "status": "sin-manifestacion-fenotipica",
                "gender": "male",
                "svg": <svg width="45" height="45"><ellipse ry="17" rx="17" id="svg_4" cy="23" cx="24" strokeWidth="1.5" stroke="#000" fill="#fcfcfc" /></svg>
            },
            {
                "status": "portador-obligado",
                "gender": "female",
                "svg": <svg width="45" height="45"><rect id="svg_5" height="30" width="30" y="8.5" x="8" strokeOpacity="null" strokeWidth="1.5" stroke="#000" fill="#b2b2b2" /></svg>
            },
            {
                "status": "portador-obligado",
                "gender": "male",
                "svg": <svg width="45" height="45"><ellipse ry="17" rx="17" id="svg_4" cy="23" cx="24" strokeWidth="1.5" stroke="#000" fill="#b2b2b2" /></svg>
            },
            {
                "status": "portador-obligado",
                "gender": "female",
                "svg": <svg width="45" height="45"><rect id="svg_5" height="30" width="30" y="8.5" x="8" strokeOpacity="null" strokeWidth="1.5" stroke="#000" fill="#b2b2b2" /></svg>
            },
            {
                "status": "portador-obligado",
                "gender": "male",
                "svg": <svg width="45" height="45"><ellipse ry="17" rx="17" id="svg_4" cy="23" cx="24" strokeWidth="1.5" stroke="#000" fill="#b2b2b2" /></svg>
            },
            {
                "status": "probando",
                "gender": "female",
                "svg": <svg width="45" height="45"><rect id="svg_5" height="30" width="30" y="8.5" x="8" strokeOpacity="null" strokeWidth="1.5" stroke="#56aaff" fill="#fcfcfc" /></svg>
            },
            {
                "status": "probando",
                "gender": "male",
                "svg": <svg width="45" height="45"><ellipse ry="17" rx="17" id="svg_4" cy="23" cx="24" strokeWidth="1.5" stroke="#56aaff" fill="#fcfcfc" /></svg>
            },
            {
                "status": "portador-mutacion-responsable",
                "gender": "female",
                "svg": <svg width="45" height="45">
                    <rect id="svg_11" height="30" width="30" y="7.5" x="8" fillOpacity="null" strokeOpacity="null" strokeWidth="1.5" stroke="#000" fill="#fff" />
                    <line strokeWidth="2" stroke-linecap="null" stroke-linejoin="null" id="svg_32" y2="7.707798" x2="20.590397" y1="17.954545" x1="8.044944" fillOpacity="null" fill="none" stroke="#ff0000" />
                    <line strokeWidth="2" stroke-linecap="null" stroke-linejoin="null" id="svg_33" y2="7.694806" x2="32.083904" y1="28.590909" x1="8.10988" fillOpacity="null" fill="none" stroke="#ff0000" />
                    <line strokeWidth="2" stroke-linecap="null" stroke-linejoin="null" id="svg_34" y2="13.876625" x2="37.941049" y1="37.37013" x1="10.850139" fillOpacity="null" fill="none" stroke="#ff0000" />
                    <line strokeWidth="2" stroke-linecap="null" stroke-linejoin="null" id="svg_35" y2="26.785714" x2="37.551437" y1="37.032468" x1="25.265725" fill="none" stroke="#ff0000" />
                    <rect id="svg_44" height="30" width="30" y="7.613598" x="8" fillOpacity="0" strokeOpacity="null" strokeWidth="1.5" stroke="#000" fill="#fcfcfc" />
                </svg>
            },
            {
                "status": "portador-mutacion-responsable",
                "gender": "male",
                "svg": <svg width="45" height="45">
                    <ellipse ry="17" rx="17" id="svg_10" cy="23" cx="23" strokeWidth="1.5" stroke="#000" fill="#fff" />
                    <line strokeWidth="2" stroke-linecap="null" stroke-linejoin="null" id="svg_40" y2="6.370137" x2="24.083904" y1="20.772727" x1="6.083906" fillOpacity="null" fill="none" stroke="#ff0000" />
                    <line strokeWidth="2" stroke-linecap="null" stroke-linejoin="null" id="svg_41" y2="8.694806" x2="32.200788" y1="29.590909" x1="8.226764" fillOpacity="null" fill="none" stroke="#ff0000" />
                    <line strokeWidth="2" stroke-linecap="null" stroke-linejoin="null" id="svg_42" y2="14.876624" x2="38.057932" y1="36.551948" x1="12.785205" fillOpacity="null" fill="none" stroke="#ff0000" />
                    <line strokeWidth="2" stroke-linecap="null" stroke-linejoin="null" id="svg_43" y2="25.448051" x2="39.746242" y1="39.59091" x1="21.486506" fill="none" stroke="#ff0000" />
                    <ellipse ry="17" rx="17" id="svg_45" cy="22.853858" cx="23" strokeWidth="1.5" stroke="#000" fill="#000000" fillOpacity="0" />
                </svg>
            },
            {
                "status": "no-portador-de-mutacion-responsable",
                "gender": "female",
                "svg": <svg width="45" height="45">
                    <rect id="svg_21" height="30" width="30" y="7.999925" x="7" fillOpacity="null" strokeOpacity="null" strokeWidth="1.5" stroke="#000" fill="#fff" />
                    <line stroke-linecap="null" stroke-linejoin="null" id="svg_22" y2="23.249907" x2="26.812691" y1="23.249907" x1="16.1877" fillOpacity="null" strokeOpacity="null" strokeWidth="2" stroke="#000" fill="none" />
                </svg>
            },
            {
                "status": "no-portador-de-mutacion-responsable",
                "gender": "male",
                "svg": <svg width="45" height="45">
                    <ellipse ry="17" rx="17" id="svg_20" cy="22.499925" cx="22" strokeWidth="1.5" stroke="#000" fill="#fff" />
                    <line stroke-linecap="null" stroke-linejoin="null" id="svg_24" y2="23.249907" x2="26.937654" y1="23.249907" x1="16.312663" fillOpacity="null" strokeOpacity="null" strokeWidth="2" stroke="#000" fill="none" />
                </svg>
            },
            {
                "status": "no-estudiado",
                "gender": "female",
                "svg": <svg width="45" height="45">
                    <rect id="svg_26" height="30" width="30" y="7.499888" x="7" fillOpacity="null" strokeOpacity="null" strokeWidth="1.5" stroke="#000" fill="#fff" />
                    <text text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="24" id="svg_27" y="31.499866" x="14.9377" fillOpacity="null" strokeOpacity="null" strokeWidth="0" stroke="#000" fill="#000000">?</text>
                </svg>
            },
            {
                "status": "no-estudiado",
                "gender": "male",
                "svg": <svg width="45" height="45">
                    <ellipse ry="17" rx="17" id="svg_25" cy="22.999888" cx="23" strokeWidth="1.5" stroke="#000" fill="#fff" />
                    <text text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="24" id="svg_28" y="32.499866" x="15.437664" fillOpacity="null" strokeOpacity="null" strokeWidth="0" stroke="#000" fill="#000000">?</text>
                </svg>
            },
            {
                "status": "nuevo-miembro-familia",
                "gender": "female",
                "svg": <svg width="45" height="45">
                    <rect id="svg_60" height="30" width="30" y="7.785602" x="7" strokeOpacity="null" strokeWidth="1.5" stroke="#000" fill="#ffaa56" />
                    <text text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="24" id="svg_61" y="28.928437" x="14.9377" fillOpacity="null" strokeOpacity="null" strokeWidth="0" stroke="#000" fill="#000000">+</text>
                </svg>
            },
            {
                "status": "nuevo-miembro-familia",
                "gender": "male",
                "svg": <svg width="45" height="45">
                    <ellipse ry="17" rx="17" id="svg_59" cy="22.285602" cx="22" strokeWidth="1.5" stroke="#000" fill="#ffaa56" />
                    <text text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="24" id="svg_62" y="28.928437" x="15.009093" fillOpacity="null" strokeOpacity="null" strokeWidth="0" stroke="#000" fill="#000000">+</text>
                </svg>
            },

        ]

        var patient_status = where(status_types, { status: status, gender: gender });
        

        if (!isObjectEmpty(patient_status)) {

            if(patient_status.length === 1){
                
                item = patient_status[0].svg;

            }else{
                
                item = <div className="grid-block"><h4>?</h4></div>;
            }
            
        } else {

            item = <div className="grid-block"><h4>?</h4></div>;
        }

        return (
            <div className="grid-block shrink pl-component-card-patient-status">
                {item}
            </div>
        );
    }
}