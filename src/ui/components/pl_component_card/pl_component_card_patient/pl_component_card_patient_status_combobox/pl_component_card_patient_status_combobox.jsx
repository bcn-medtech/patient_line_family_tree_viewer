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
import { PlComponentCardPatientStatus } from './../pl_component_card_patient_status/pl_component_card_patient_status';

import {
    filter, where
} from 'underscore';

import { isObjectAFunction, isObjectEmpty } from './../../../../../modules/rkt_module_object';

export class PlComponentCardPatientStatusCombobox extends Component {

    constructor() {
        super();

        this.state = {
            type: false,
            phenotype: false,
            genotype: false,
            gender: false,
        }
    }

    init_component(type, phenotype, genotype, gender) {

        this.setState({
            type: type,
            phenotype: phenotype,
            genotype: genotype,
            gender: gender
        });

    }

    componentDidMount() {

        var type = this.props.type;
        var phenotype = this.props.phenotype;
        var genotype = this.props.genotype;
        var gender = this.props.gender;
        
        this.init_component(type, phenotype, genotype, gender);
    }

    componentWillReceiveProps(nextprops) {

        var type = nextprops.type;
        var phenotype = nextprops.phenotype;
        var genotype = nextprops.genotype;
        var gender = nextprops.gender;
        
        this.init_component(type, phenotype, genotype, gender);

    }

    edit_item(type, item) {

        if (isObjectAFunction(this.props.perform_database_action)) {

            var data_to_update = {"key": type, "value": item.status};
            this.props.perform_database_action(data_to_update);

        }

    }

    render_list_items_status(gender, current_phenotype, current_genotype_symbol) {

        var status_types = [
            {
                "status": "death-from-other-causes",
                "gender": "male",
                "svg":
                    <svg width="45" height="45">
                        <rect id="svg_2" height="30" width="30" y="7.5" x="7.5" fillOpacity="null" strokeOpacity="null" strokeWidth="1.5" stroke="#000" fill="#fff" />
                        <line stroke="#000" strokeWidth="2" strokeLinecap="null" strokeLinejoin="null" id="svg_13" x1="0" x2="45" y1="45" y2="0" fillOpacity="null" strokeOpacity="null" fill="none" />
                        {current_genotype_symbol}
                    </svg>
            },
            {
                "status": "death-from-other-causes",
                "gender": "female",
                "svg":
                    <svg width="45" height="45">
                        <ellipse ry="17" rx="17" id="svg_1" cy="22.5" cx="22.5" strokeWidth="1.5" stroke="#000" fill="#fff" />
                        <line strokeWidth="2" strokeLinecap="null" strokeLinejoin="null" id="svg_15" x1="0" y1="45" x2="45" y2="0" fillOpacity="null" strokeOpacity="null" stroke="#000" fill="none" />
                        {current_genotype_symbol}
                    </svg>
            },
            {
                "status": "sudden-cardiac-death",
                "gender": "male",
                "svg":
                    <svg width="45" height="45">
                        <rect id="svg_5" height="30" width="30" y="7.5" x="7.5" strokeOpacity="null" strokeWidth="1.5" stroke="#000" fill="#000000" />
                        <line strokeWidth="2" strokeLinecap="null" strokeLinejoin="null" id="svg_17" x1="0" x2="45" y1="45" y2="0" fillOpacity="null" strokeOpacity="null" stroke="#000" fill="none" />
                        {current_genotype_symbol}
                    </svg>
            },
            {
                "status": "sudden-cardiac-death",
                "gender": "female",
                "svg":
                    <svg width="45" height="45">
                        <ellipse ry="17" rx="17" id="svg_4" cy="22.5" cx="22.5" strokeWidth="1.5" stroke="#000" fill="#000000" />
                        <line strokeWidth="2" strokeLinecap="null" strokeLinejoin="null" id="svg_16" x1="0" y1="45" x2="45" y2="0" fillOpacity="null" strokeOpacity="null" stroke="#000" fill="none" />
                        {current_genotype_symbol}
                    </svg>
            },
            {
                "status": "ressucitated-scd-or-vf",
                "gender": "male",
                "svg":
                    <svg width="45" height="45">
                        <rect id="svg_5" height="30" width="30" y="7.5" x="7.5" strokeOpacity="null" strokeWidth="1.5" stroke="#000" fill="#000000" />
                        {current_genotype_symbol}
                    </svg>
            },
            {
                "status": "ressucitated-scd-or-vf",
                "gender": "female",
                "svg":
                    <svg width="45" height="45">
                        <ellipse ry="17" rx="17" id="svg_4" cy="23" cx="24" strokeWidth="1.5" stroke="#000" fill="#000000" />
                        {current_genotype_symbol}
                    </svg>
            },
            {
                "status": "phenotypic-manifestation",
                "gender": "male",
                "svg":
                    <svg width="45" height="45">
                        <rect id="svg_5" height="30" width="30" y="7.5" x="7.5" strokeOpacity="null" strokeWidth="1.5" stroke="#000" fill="#b2b2b2" />
                        {current_genotype_symbol}
                    </svg>
            },
            {
                "status": "phenotypic-manifestation",
                "gender": "female",
                "svg":
                    <svg width="45" height="45">
                        <ellipse ry="17" rx="17" id="svg_4" cy="23" cx="24" strokeWidth="1.5" stroke="#000" fill="#b2b2b2" />
                        {current_genotype_symbol}
                    </svg>
            },
            {
                "status": "no-phenotypic-manifestation",
                "gender": "male",
                "svg":
                    <svg width="45" height="45">
                        <rect id="svg_5" height="30" width="30" y="7.5" x="7.5" strokeOpacity="null" strokeWidth="1.5" stroke="#000" fill="#fff" />
                        {current_genotype_symbol}
                    </svg>
            },
            {
                "status": "no-phenotypic-manifestation",
                "gender": "female",
                "svg":
                    <svg width="45" height="45">
                        <ellipse ry="17" rx="17" id="svg_4" cy="23" cx="24" strokeWidth="1.5" stroke="#000" fill="#fff" />
                        {current_genotype_symbol}
                    </svg>
            },
            // {
            //     "status": "manifestacion-responsable",
            //     "gender": "male",
            //     "svg":
            //         <svg width="45" height="45">
            //             <rect id="svg_5" height="30" width="30" y="7.5" x="7.5" strokeOpacity="null" strokeWidth="1.5" stroke="#000" fill="#ff0000" />
            //             {current_genotype_symbol}
            //         </svg>
            // },
            // {
            //     "status": "manifestacion-responsable",
            //     "gender": "female",
            //     "svg":
            //         <svg width="45" height="45">
            //             <ellipse ry="17" rx="17" id="svg_4" cy="23" cx="24" strokeWidth="1.5" stroke="#000" fill="#ff0000" />
            //             {current_genotype_symbol}
            //         </svg>
            // },
            // {
            //     "status": "portador-mutacion-responsable",
            //     "gender": "male",
            //     "svg":
            //         <svg width="45" height="45">
            //             <rect id="svg_11" height="30" width="30" y="7.5" x="7.5" fillOpacity="null" strokeOpacity="null" strokeWidth="1.5" stroke="#000" fill="#fff" />
            //             <line strokeWidth="2" strokeLinecap="null" strokeLinejoin="null" id="svg_32" y2="7.707798" x2="20.590397" y1="17.954545" x1="8.044944" fillOpacity="null" fill="none" stroke="#ff0000" />
            //             <line strokeWidth="2" strokeLinecap="null" strokeLinejoin="null" id="svg_33" y2="7.694806" x2="32.083904" y1="28.590909" x1="8.10988" fillOpacity="null" fill="none" stroke="#ff0000" />
            //             <line strokeWidth="2" strokeLinecap="null" strokeLinejoin="null" id="svg_34" y2="13.876625" x2="37.941049" y1="37.37013" x1="10.850139" fillOpacity="null" fill="none" stroke="#ff0000" />
            //             <line strokeWidth="2" strokeLinecap="null" strokeLinejoin="null" id="svg_35" y2="26.785714" x2="37.551437" y1="37.032468" x1="25.265725" fill="none" stroke="#ff0000" />
            //             <rect id="svg_44" height="30" width="30" y="7.613598" x="8" fillOpacity="0" strokeOpacity="null" strokeWidth="1.5" stroke="#000" fill="#fcfcfc" />
            //             {current_genotype_symbol}
            //         </svg>
            // },
            // {
            //     "status": "portador-mutacion-responsable",
            //     "gender": "female",
            //     "svg":
            //         <svg width="45" height="45">
            //             <ellipse ry="17" rx="17" id="svg_10" cy="23" cx="23" strokeWidth="1.5" stroke="#000" fill="#fff" />
            //             <line strokeWidth="2" strokeLinecap="null" strokeLinejoin="null" id="svg_40" y2="6.370137" x2="24.083904" y1="20.772727" x1="6.083906" fillOpacity="null" fill="none" stroke="#ff0000" />
            //             <line strokeWidth="2" strokeLinecap="null" strokeLinejoin="null" id="svg_41" y2="8.694806" x2="32.200788" y1="29.590909" x1="8.226764" fillOpacity="null" fill="none" stroke="#ff0000" />
            //             <line strokeWidth="2" strokeLinecap="null" strokeLinejoin="null" id="svg_42" y2="14.876624" x2="38.057932" y1="36.551948" x1="12.785205" fillOpacity="null" fill="none" stroke="#ff0000" />
            //             <line strokeWidth="2" strokeLinecap="null" strokeLinejoin="null" id="svg_43" y2="25.448051" x2="39.746242" y1="39.59091" x1="21.486506" fill="none" stroke="#ff0000" />
            //             <ellipse ry="17" rx="17" id="svg_45" cy="22.853858" cx="23" strokeWidth="1.5" stroke="#000" fill="#000000" fillOpacity="0" />
            //             {current_genotype_symbol}
            //         </svg>
            // },
            // {
            //     "status": "sin-manifestacion-fenotipica",
            //     "gender": "male",
            //     "svg":
            //         <svg width="45" height="45">
            //             <rect id="svg_5" height="30" width="30" y="7.5" x="7.5" strokeOpacity="null" strokeWidth="1.5" stroke="#000" fill="#fcfcfc" />
            //             {current_genotype_symbol}
            //         </svg>
            // },
            // {
            //     "status": "sin-manifestacion-fenotipica",
            //     "gender": "female",
            //     "svg":
            //         <svg width="45" height="45">
            //             <ellipse ry="17" rx="17" id="svg_4" cy="22.5" cx="22.5" strokeWidth="1.5" stroke="#000" fill="#fcfcfc" />
            //             {current_genotype_symbol}
            //         </svg>
            // },
            // {
            //     "status": "no-portador-de-mutacion-responsable",
            //     "gender": "male",
            //     "svg":
            //         <svg width="45" height="45">
            //             <rect id="svg_21" height="30" width="30" y="7.5" x="7.5" fillOpacity="null" strokeOpacity="null" strokeWidth="1.5" stroke="#000" fill="#fff" />
            //             <line strokeLinecap="null" strokeLinejoin="null" id="svg_22" y2="23.249907" x2="26.812691" y1="23.249907" x1="16.1877" fillOpacity="null" strokeOpacity="null" strokeWidth="2" stroke="#000" fill="none" />
            //             {current_genotype_symbol}
            //         </svg>
            // },
            // {
            //     "status": "no-portador-de-mutacion-responsable",
            //     "gender": "female",
            //     "svg":
            //         <svg width="45" height="45">
            //             <ellipse ry="17" rx="17" id="svg_20" cy="22.499925" cx="22" strokeWidth="1.5" stroke="#000" fill="#fff" />
            //             <line strokeLinecap="null" strokeLinejoin="null" id="svg_24" y2="23.249907" x2="26.937654" y1="23.249907" x1="16.312663" fillOpacity="null" strokeOpacity="null" strokeWidth="2" stroke="#000" fill="none" />
            //             {current_genotype_symbol}
            //         </svg>
            // },
            // {
            //     "status": "no-estudiado",
            //     "gender": "male",
            //     "svg":
            //         <svg width="45" height="45">
            //             <rect id="svg_26" height="30" width="30" y="7.5" x="7.5" fillOpacity="null" strokeOpacity="null" strokeWidth="1.5" stroke="#000" fill="#fff" />
            //             <text textAnchor="start" fontFamily="Helvetica, Arial, sans-serif" fontSize="24" id="svg_27" y="31.499866" x="14.9377" fillOpacity="null" strokeOpacity="null" strokeWidth="0" stroke="#000" fill="#000000">?</text>
            //             {current_genotype_symbol}
            //         </svg>
            // },
            // {
            //     "status": "no-estudiado",
            //     "gender": "female",
            //     "svg":
            //         <svg width="45" height="45">
            //             <ellipse ry="17" rx="17" id="svg_25" cy="22.999888" cx="23" strokeWidth="1.5" stroke="#000" fill="#fff" />
            //             <text textAnchor="start" fontFamily="Helvetica, Arial, sans-serif" fontSize="24" id="svg_28" y="32.499866" x="15.437664" fillOpacity="null" strokeOpacity="null" strokeWidth="0" stroke="#000" fill="#000000">?</text>
            //             {current_genotype_symbol}
            //         </svg>
            // },
            // {
            //     "status": "portador-obligado",
            //     "gender": "male",
            //     "svg":
            //         <svg width="45" height="45">
            //             <rect id="svg_5" height="30" width="30" y="7.5" x="7.5" strokeOpacity="null" strokeWidth="1.5" stroke="#000" fill="#b2b2b2" />
            //             {current_genotype_symbol}
            //         </svg>
            // },
            // {
            //     "status": "portador-obligado",
            //     "gender": "female",
            //     "svg":
            //         <svg width="45" height="45">
            //             <ellipse ry="17" rx="17" id="svg_4" cy="23" cx="24" strokeWidth="1.5" stroke="#000" fill="#b2b2b2" />
            //             {current_genotype_symbol}
            //         </svg>
            // },
            // {
            //     "status": "probando",
            //     "gender": "male",
            //     "svg":
            //         <svg width="45" height="45">
            //             <rect id="svg_5" height="30" width="30" y="7.5" x="7.5" strokeOpacity="null" strokeWidth="1.5" stroke="#56aaff" fill="#fcfcfc" />
            //             {current_genotype_symbol}
            //         </svg>
            // },
            // {
            //     "status": "probando",
            //     "gender": "female",
            //     "svg":
            //         <svg width="45" height="45">
            //             <ellipse ry="17" rx="17" id="svg_4" cy="22.5" cx="22.5" strokeWidth="1.5" stroke="#56aaff" fill="#fcfcfc" />
            //             {current_genotype_symbol}
            //         </svg>
            // }
        ]

        status_types = filter(status_types, function (item) {

            if (item.gender === gender) {
                return true;
            }

        });

        if (!isObjectEmpty(status_types)) {

            return (
            
                <div className="grid-block vertical list">
    
                    {
                        status_types.map((item, index) => {
                            if (item.status === current_phenotype) {
                                return (
                                    <div className="grid-block shrink list-item-selected" key={index}>{item.svg}</div>
                                );
                            } else {
                                return (
                                    <div className="grid-block shrink list-item" onClick={this.edit_item.bind(this, "phenotype", item)} key={index}>{item.svg}</div>
                                );
                            }
    
                        })
                    }
                </div>
    
            )

        } else {

            return (

                <div className="grid-block">
                    <div style={{"padding":"10px"}}>
                        First define the patient's gender, please
                    </div>
                </div>

            );

        }

    }

    render_list_items_genotype(gender, current_genotype) {

        var genotype_types = [

            {
                "status": "mutation-carrier",
                "gender": "male",
                "svg":
                    <svg width="45" height="45">
                        <rect id="svg_5" height="30" width="30" y="7.5" x="7.5" strokeOpacity="null" strokeWidth="1.5" stroke="#000" fill="#fff" />
                        <text textAnchor="start" fontFamily="Helvetica, Arial, sans-serif" fontSize="24" id="svg_61" y="28.928437" x="14.9377" fillOpacity="null" strokeOpacity="null" strokeWidth="0" stroke="#000" fill="#000000">+</text>
                    </svg>
            },
            {
                "status": "mutation-carrier",
                "gender": "female",
                "svg":
                    <svg width="45" height="45">
                        <ellipse ry="17" rx="17" id="svg_4" cy="23" cx="24" strokeWidth="1.5" stroke="#000" fill="#fff" />
                        <text textAnchor="start" fontFamily="Helvetica, Arial, sans-serif" fontSize="24" id="svg_61" y="28.928437" x="16.9377" fillOpacity="null" strokeOpacity="null" strokeWidth="0" stroke="#000" fill="#000000">+</text>
                    </svg>
            },
            {
                "status": "no-mutation-carrier",
                "gender": "male",
                "svg":
                    <svg width="45" height="45">
                        <rect id="svg_5" height="30" width="30" y="7.5" x="7.5" strokeOpacity="null" strokeWidth="1.5" stroke="#000" fill="#fff" />
                        <line strokeLinecap="null" strokeLinejoin="null" id="svg_22" y2="23.249907" x2="27.812691" y1="23.249907" x1="17.1877" fillOpacity="null" strokeOpacity="null" strokeWidth="2" stroke="#000" fill="none" />
                    </svg>
            },
            {
                "status": "no-mutation-carrier",
                "gender": "female",
                "svg":
                    <svg width="45" height="45">
                        <ellipse ry="17" rx="17" id="svg_4" cy="23" cx="24" strokeWidth="1.5" stroke="#000" fill="#fff" />
                        <line strokeLinecap="null" strokeLinejoin="null" id="svg_24" y2="23.249907" x2="28.937654" y1="23.249907" x1="18.312663" fillOpacity="null" strokeOpacity="null" strokeWidth="2" stroke="#000" fill="none" />
                    </svg>
            },
            {
                "status": "not-genotyped",
                "gender": "male",
                "svg":
                    <svg width="45" height="45">
                        <rect id="svg_5" height="30" width="30" y="7.5" x="7.5" strokeOpacity="null" strokeWidth="1.5" stroke="#000" fill="#fff" />
                        <text textAnchor="start" fontFamily="Helvetica, Arial, sans-serif" fontSize="24" id="svg_28" y="32.499866" x="15.437664" fillOpacity="null" strokeOpacity="null" strokeWidth="0" stroke="#000" fill="#000000">?</text>
                    </svg>
            },
            {
                "status": "not-genotyped",
                "gender": "female",
                "svg":
                    <svg width="45" height="45">
                        <ellipse ry="17" rx="17" id="svg_4" cy="23" cx="24" strokeWidth="1.5" stroke="#000" fill="#fff" />
                        <text textAnchor="start" fontFamily="Helvetica, Arial, sans-serif" fontSize="24" id="svg_28" y="32.499866" x="16.437664" fillOpacity="null" strokeOpacity="null" strokeWidth="0" stroke="#000" fill="#000000">?</text>
                    </svg>
            },
            {
                "status": "obligate-carrier",
                "gender": "male",
                "svg":
                    <svg width="45" height="45">
                        <rect id="svg_5" height="30" width="30" y="7.5" x="7.5" strokeOpacity="null" strokeWidth="1.5" stroke="#000" fill="#fff" />
                        <text textAnchor="start" fontFamily="Helvetica, Arial, sans-serif" fontSize="24" id="svg_61" y="28.928437" x="14.9377" fillOpacity="null" strokeOpacity="null" strokeWidth="0" stroke="#000" fill="#565656">+</text>
                    </svg>
            },
            {
                "status": "obligate-carrier",
                "gender": "female",
                "svg":
                    <svg width="45" height="45">
                        <ellipse ry="17" rx="17" id="svg_4" cy="23" cx="24" strokeWidth="1.5" stroke="#000" fill="#fff" />
                        <text textAnchor="start" fontFamily="Helvetica, Arial, sans-serif" fontSize="24" id="svg_61" y="28.928437" x="16.9377" fillOpacity="null" strokeOpacity="null" strokeWidth="0" stroke="#000" fill="#565656">+</text>
                    </svg>
            }
        ]
        
        genotype_types = filter(genotype_types, function (item) {

            if (item.gender === gender) {
                return true;
            }

        });

        if (!isObjectEmpty(genotype_types)) {

            return (
            
                <div className="grid-block vertical list">
    
                    {
                        genotype_types.map((item, index) => {
                            if (item.status === current_genotype) {
                                return (
                                    <div className="grid-block shrink list-item-selected" key={index}>{item.svg}</div>
                                );
                            } else {
                                return (
                                    <div className="grid-block shrink list-item" onClick={this.edit_item.bind(this, "genotype", item)} key={index}>{item.svg}</div>
                                );
                            }
    
                        })
                    }
                </div>
    
            )

        } else {

            return (

                <div className="grid-block">
                    <div style={{"padding":"10px"}}>
                        First define the patient's gender, please
                    </div>
                </div>

            );

        }

    }

    render_element(type, phenotype, genotype, gender) {

        var card_patient_status;
        var card_patient_status_combobox;
        
        if (type === "phenotype") {

            card_patient_status = 
                <PlComponentCardPatientStatus phenotype={phenotype} gender={gender} />

            card_patient_status_combobox = this.render_list_items_status(gender, phenotype, "");
            
        } else if (type === "genotype") {

            card_patient_status = 
                <PlComponentCardPatientStatus genotype={genotype} gender={gender} />

            card_patient_status_combobox = this.render_list_items_genotype(gender, genotype);
                        
        }

        return (
            <div>
                <a className="grid-block vertical pl-component-card-patient-status-combobox tooltip">
                    <div className="grid-block align-center">
                        {card_patient_status}
                        <div className="grid-block tooltipcontent">
                            {card_patient_status_combobox}
                        </div>
                    </div>
                    <div className="grid-block align-center text">{type}</div>
                </a>
            </div>
        );
    }
    

    render() {

        var type = this.state.type;
        var phenotype = this.state.phenotype;
        var genotype = this.state.genotype;
        var gender = this.state.gender;

        return (
            <div className="grid-block">
                {this.render_element(type, phenotype, genotype, gender)}
            </div>

        );


    }
}