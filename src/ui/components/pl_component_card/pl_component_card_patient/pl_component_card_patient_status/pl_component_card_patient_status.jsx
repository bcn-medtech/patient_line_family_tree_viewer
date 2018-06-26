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
import {
    findWhere,
    keys,
    where
} from 'underscore';
import { isObjectEmpty } from '../../../../../modules/rkt_module_object';

export class PlComponentCardPatientStatus extends Component {

    get_patient_genotype_symbol(genotype, gender) {

        var genotype_symbols = [
            
            {
                "status": "mutation-carrier",
                "gender": "male",
                "svg": <text textAnchor="start" fontFamily="Helvetica, Arial, sans-serif" fontSize="24" id="svg_61" y="28.928437" x="14.9377" fillOpacity="null" strokeOpacity="null" strokeWidth="0" stroke="#000" fill="#000000">+</text>
            },
            {
                "status": "mutation-carrier",
                "gender": "female",
                "svg": <text textAnchor="start" fontFamily="Helvetica, Arial, sans-serif" fontSize="24" id="svg_61" y="28.928437" x="16.9377" fillOpacity="null" strokeOpacity="null" strokeWidth="0" stroke="#000" fill="#000000">+</text>
            },
            {
                "status": "no-mutation-carrier",
                "gender": "male",
                "svg": <line strokeLinecap="null" strokeLinejoin="null" id="svg_22" y2="23.249907" x2="27.812691" y1="23.249907" x1="17.1877" fillOpacity="null" strokeOpacity="null" strokeWidth="2" stroke="#000" fill="none" />
            },
            {
                "status": "no-mutation-carrier",
                "gender": "female",
                "svg": <line strokeLinecap="null" strokeLinejoin="null" id="svg_24" y2="23.249907" x2="28.937654" y1="23.249907" x1="18.312663" fillOpacity="null" strokeOpacity="null" strokeWidth="2" stroke="#000" fill="none" />
            },
            {
                "status": "not-genotyped",
                "gender": "male",
                "svg": <text textAnchor="start" fontFamily="Helvetica, Arial, sans-serif" fontSize="24" id="svg_27" y="31.499866" x="14.9377" fillOpacity="null" strokeOpacity="null" strokeWidth="0" stroke="#000" fill="#000000">?</text>
            },
            {
                "status": "not-genotyped",
                "gender": "female",
                "svg": <text textAnchor="start" fontFamily="Helvetica, Arial, sans-serif" fontSize="24" id="svg_28" y="32.499866" x="16.437664" fillOpacity="null" strokeOpacity="null" strokeWidth="0" stroke="#000" fill="#000000">?</text>
            },
            {
                "status": "obligate-carrier",
                "gender": "male",
                "svg": <text textAnchor="start" fontFamily="Helvetica, Arial, sans-serif" fontSize="24" id="svg_61" y="28.928437" x="14.9377" fillOpacity="null" strokeOpacity="null" strokeWidth="0" stroke="#000" fill="#565656">+</text>
            },
            {
                "status": "obligate-carrier",
                "gender": "female",
                "svg": <text textAnchor="start" fontFamily="Helvetica, Arial, sans-serif" fontSize="24" id="svg_62" y="28.928437" x="16.009093" fillOpacity="null" strokeOpacity="null" strokeWidth="0" stroke="#000" fill="#565656">+</text>
            }
        ]

        
        var patient_genotype = where(genotype_symbols, { status: genotype, gender : gender});

        var patient_genotype_symbol;
        if (patient_genotype.length === 1) {

            patient_genotype_symbol = patient_genotype[0].svg;

        }

        return patient_genotype_symbol;

    }

    render_patient_status(phenotype, genotype, gender) {

        if (!isObjectEmpty(phenotype) && !isObjectEmpty(genotype)) {
            
            var genotype_symbol = this.get_patient_genotype_symbol(genotype, gender);
            return this.render_patient_phenotype(gender, phenotype, genotype_symbol);

        } else if (!isObjectEmpty(phenotype)) {
            
            return this.render_patient_phenotype(gender, phenotype, "");

        } else if (!isObjectEmpty(genotype)) {

            return this.render_patient_genotype(gender, genotype);

        } else if (isObjectEmpty(phenotype) && isObjectEmpty(genotype)) {

            return this.render_undefined_status();

        }
    }

    render_patient_phenotype(gender, phenotype, genotype_symbol) {

        var status_types = [
            {
                "status": "death-from-other-causes",
                "gender": "male",
                "svg":
                    <svg width="45" height="45">
                        <rect id="svg_2" height="30" width="30" y="7.5" x="7.5" fillOpacity="null" strokeOpacity="null" strokeWidth="1.5" stroke="#000" fill="#fff" />
                        <line stroke="#000" strokeWidth="2" strokeLinecap="null" strokeLinejoin="null" id="svg_13" x1="0" x2="45" y1="45" y2="0" fillOpacity="null" strokeOpacity="null" fill="none" />
                        {genotype_symbol}
                    </svg>
            },
            {
                "status": "death-from-other-causes",
                "gender": "female",
                "svg":
                    <svg width="45" height="45">
                        <ellipse ry="17" rx="17" id="svg_1" cy="22.5" cx="22.5" strokeWidth="1.5" stroke="#000" fill="#fff" />
                        <line strokeWidth="2" strokeLinecap="null" strokeLinejoin="null" id="svg_15" x1="0" y1="45" x2="45" y2="0" fillOpacity="null" strokeOpacity="null" stroke="#000" fill="none" />
                        {genotype_symbol}
                    </svg>
            },
            {
                "status": "sudden-cardiac-death",
                "gender": "male",
                "svg":
                    <svg width="45" height="45">
                        <rect id="svg_5" height="30" width="30" y="7.5" x="7.5" strokeOpacity="null" strokeWidth="1.5" stroke="#000" fill="#000000" />
                        <line strokeWidth="2" strokeLinecap="null" strokeLinejoin="null" id="svg_17" x1="0" x2="45" y1="45" y2="0" fillOpacity="null" strokeOpacity="null" stroke="#000" fill="none" />
                        {genotype_symbol}
                    </svg>
            },
            {
                "status": "sudden-cardiac-death",
                "gender": "female",
                "svg":
                    <svg width="45" height="45">
                        <ellipse ry="17" rx="17" id="svg_4" cy="22.5" cx="22.5" strokeWidth="1.5" stroke="#000" fill="#000000" />
                        <line strokeWidth="2" strokeLinecap="null" strokeLinejoin="null" id="svg_16" x1="0" y1="45" x2="45" y2="0" fillOpacity="null" strokeOpacity="null" stroke="#000" fill="none" />
                        {genotype_symbol}
                    </svg>
            },
            {
                "status": "ressucitated-scd-or-vf",
                "gender": "male",
                "svg":
                    <svg width="45" height="45">
                        <rect id="svg_5" height="30" width="30" y="7.5" x="7.5" strokeOpacity="null" strokeWidth="1.5" stroke="#000" fill="#000000" />
                        {genotype_symbol}
                    </svg>
            },
            {
                "status": "ressucitated-scd-or-vf",
                "gender": "female",
                "svg":
                    <svg width="45" height="45">
                        <ellipse ry="17" rx="17" id="svg_4" cy="23" cx="24" strokeWidth="1.5" stroke="#000" fill="#000000" />
                        {genotype_symbol}
                    </svg>
            },
            {
                "status": "phenotypic-manifestation",
                "gender": "male",
                "svg":
                    <svg width="45" height="45">
                        <rect id="svg_5" height="30" width="30" y="7.5" x="7.5" strokeOpacity="null" strokeWidth="1.5" stroke="#000" fill="#b2b2b2" />
                        {genotype_symbol}
                    </svg>
            },
            {
                "status": "phenotypic-manifestation",
                "gender": "female",
                "svg":
                    <svg width="45" height="45">
                        <ellipse ry="17" rx="17" id="svg_4" cy="23" cx="24" strokeWidth="1.5" stroke="#000" fill="#b2b2b2" />
                        {genotype_symbol}
                    </svg>
            },
            {
                "status": "no-phenotypic-manifestation",
                "gender": "male",
                "svg":
                    <svg width="45" height="45">
                        <rect id="svg_5" height="30" width="30" y="7.5" x="7.5" strokeOpacity="null" strokeWidth="1.5" stroke="#000" fill="#fff" />
                        {genotype_symbol}
                    </svg>
            },
            {
                "status": "no-phenotypic-manifestation",
                "gender": "female",
                "svg":
                    <svg width="45" height="45">
                        <ellipse ry="17" rx="17" id="svg_4" cy="23" cx="24" strokeWidth="1.5" stroke="#000" fill="#fff" />
                        {genotype_symbol}
                    </svg>
            },
            // {
            //     "status": "manifestacion-responsable",
            //     "gender": "male",
            //     "svg":
            //         <svg width="45" height="45">
            //             <rect id="svg_5" height="30" width="30" y="7.5" x="7.5" strokeOpacity="null" strokeWidth="1.5" stroke="#000" fill="#ff0000" />
            //             {genotype_symbol}
            //         </svg>
            // },
            // {
            //     "status": "manifestacion-responsable",
            //     "gender": "female",
            //     "svg":
            //         <svg width="45" height="45">
            //             <ellipse ry="17" rx="17" id="svg_4" cy="23" cx="24" strokeWidth="1.5" stroke="#000" fill="#ff0000" />
            //             {genotype_symbol}
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
            //             {genotype_symbol}
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
            //             {genotype_symbol}
            //         </svg>
            // },
            // {
            //     "status": "sin-manifestacion-fenotipica",
            //     "gender": "male",
            //     "svg":
            //         <svg width="45" height="45">
            //             <rect id="svg_5" height="30" width="30" y="7.5" x="7.5" strokeOpacity="null" strokeWidth="1.5" stroke="#000" fill="#fcfcfc" />
            //             {genotype_symbol}
            //         </svg>
            // },
            // {
            //     "status": "sin-manifestacion-fenotipica",
            //     "gender": "female",
            //     "svg":
            //         <svg width="45" height="45">
            //             <ellipse ry="17" rx="17" id="svg_4" cy="22.5" cx="22.5" strokeWidth="1.5" stroke="#000" fill="#fcfcfc" />
            //             {genotype_symbol}
            //         </svg>
            // },
            // {
            //     "status": "no-portador-de-mutacion-responsable",
            //     "gender": "male",
            //     "svg":
            //         <svg width="45" height="45">
            //             <rect id="svg_21" height="30" width="30" y="7.5" x="7.5" fillOpacity="null" strokeOpacity="null" strokeWidth="1.5" stroke="#000" fill="#fff" />
            //             <line strokeLinecap="null" strokeLinejoin="null" id="svg_22" y2="23.249907" x2="26.812691" y1="23.249907" x1="16.1877" fillOpacity="null" strokeOpacity="null" strokeWidth="2" stroke="#000" fill="none" />
            //             {genotype_symbol}
            //         </svg>
            // },
            // {
            //     "status": "no-portador-de-mutacion-responsable",
            //     "gender": "female",
            //     "svg":
            //         <svg width="45" height="45">
            //             <ellipse ry="17" rx="17" id="svg_20" cy="22.499925" cx="22" strokeWidth="1.5" stroke="#000" fill="#fff" />
            //             <line strokeLinecap="null" strokeLinejoin="null" id="svg_24" y2="23.249907" x2="26.937654" y1="23.249907" x1="16.312663" fillOpacity="null" strokeOpacity="null" strokeWidth="2" stroke="#000" fill="none" />
            //             {genotype_symbol}
            //         </svg>
            // },
            // {
            //     "status": "no-estudiado",
            //     "gender": "male",
            //     "svg":
            //         <svg width="45" height="45">
            //             <rect id="svg_26" height="30" width="30" y="7.5" x="7.5" fillOpacity="null" strokeOpacity="null" strokeWidth="1.5" stroke="#000" fill="#fff" />
            //             <text textAnchor="start" fontFamily="Helvetica, Arial, sans-serif" fontSize="24" id="svg_27" y="31.499866" x="14.9377" fillOpacity="null" strokeOpacity="null" strokeWidth="0" stroke="#000" fill="#000000">?</text>
            //             {genotype_symbol}
            //         </svg>
            // },
            // {
            //     "status": "no-estudiado",
            //     "gender": "female",
            //     "svg":
            //         <svg width="45" height="45">
            //             <ellipse ry="17" rx="17" id="svg_25" cy="22.999888" cx="23" strokeWidth="1.5" stroke="#000" fill="#fff" />
            //             <text textAnchor="start" fontFamily="Helvetica, Arial, sans-serif" fontSize="24" id="svg_28" y="32.499866" x="15.437664" fillOpacity="null" strokeOpacity="null" strokeWidth="0" stroke="#000" fill="#000000">?</text>
            //             {genotype_symbol}
            //         </svg>
            // },
            // {
            //     "status": "portador-obligado",
            //     "gender": "male",
            //     "svg":
            //         <svg width="45" height="45">
            //             <rect id="svg_5" height="30" width="30" y="7.5" x="7.5" strokeOpacity="null" strokeWidth="1.5" stroke="#000" fill="#b2b2b2" />
            //             {genotype_symbol}
            //         </svg>
            // },
            // {
            //     "status": "portador-obligado",
            //     "gender": "female",
            //     "svg":
            //         <svg width="45" height="45">
            //             <ellipse ry="17" rx="17" id="svg_4" cy="23" cx="24" strokeWidth="1.5" stroke="#000" fill="#b2b2b2" />
            //             {genotype_symbol}
            //         </svg>
            // },
            // {
            //     "status": "probando",
            //     "gender": "male",
            //     "svg":
            //         <svg width="45" height="45">
            //             <rect id="svg_5" height="30" width="30" y="7.5" x="7.5" strokeOpacity="null" strokeWidth="1.5" stroke="#56aaff" fill="#fcfcfc" />
            //             {genotype_symbol}
            //         </svg>
            // },
            // {
            //     "status": "probando",
            //     "gender": "female",
            //     "svg":
            //         <svg width="45" height="45">
            //             <ellipse ry="17" rx="17" id="svg_4" cy="22.5" cx="22.5" strokeWidth="1.5" stroke="#56aaff" fill="#fcfcfc" />
            //             {genotype_symbol}
            //         </svg>
            // }
            
        ]

        var patient_status = where(status_types, { status: phenotype, gender: gender });
        var item_status;

        if (!isObjectEmpty(patient_status)) {

            if (patient_status.length === 1) {

                item_status = patient_status[0].svg;

            } else {

                item_status = this.render_undefined_status();
            }

        } else {

            item_status = this.render_undefined_status();
        }

        return (item_status);

    }

    render_patient_genotype(gender, genotype) {

        var genotype_types = [

            {
                "genotype": "mutation-carrier",
                "gender": "male",
                "svg":
                    <svg width="45" height="45">
                        <rect id="svg_5" height="30" width="30" y="7.5" x="7.5" strokeOpacity="null" strokeWidth="1.5" stroke="#000" fill="#fff" />
                        <text textAnchor="start" fontFamily="Helvetica, Arial, sans-serif" fontSize="24" id="svg_61" y="28.928437" x="14.9377" fillOpacity="null" strokeOpacity="null" strokeWidth="0" stroke="#000" fill="#000000">+</text>
                    </svg>
            },
            {
                "genotype": "mutation-carrier",
                "gender": "female",
                "svg":
                    <svg width="45" height="45">
                        <ellipse ry="17" rx="17" id="svg_4" cy="23" cx="24" strokeWidth="1.5" stroke="#000" fill="#fff" />
                        <text textAnchor="start" fontFamily="Helvetica, Arial, sans-serif" fontSize="24" id="svg_61" y="28.928437" x="16.9377" fillOpacity="null" strokeOpacity="null" strokeWidth="0" stroke="#000" fill="#000000">+</text>
                    </svg>
            },
            {
                "genotype": "no-mutation-carrier",
                "gender": "male",
                "svg":
                    <svg width="45" height="45">
                        <rect id="svg_5" height="30" width="30" y="7.5" x="7.5" strokeOpacity="null" strokeWidth="1.5" stroke="#000" fill="#fff" />
                        <line strokeLinecap="null" strokeLinejoin="null" id="svg_22" y2="23.249907" x2="27.812691" y1="23.249907" x1="17.1877" fillOpacity="null" strokeOpacity="null" strokeWidth="2" stroke="#000" fill="none" />
                    </svg>
            },
            {
                "genotype": "no-mutation-carrier",
                "gender": "female",
                "svg":
                    <svg width="45" height="45">
                        <ellipse ry="17" rx="17" id="svg_4" cy="23" cx="24" strokeWidth="1.5" stroke="#000" fill="#fff" />
                        <line strokeLinecap="null" strokeLinejoin="null" id="svg_24" y2="23.249907" x2="28.937654" y1="23.249907" x1="18.312663" fillOpacity="null" strokeOpacity="null" strokeWidth="2" stroke="#000" fill="none" />
                    </svg>
            },
            {
                "genotype": "not-genotyped",
                "gender": "male",
                "svg":
                    <svg width="45" height="45">
                        <rect id="svg_5" height="30" width="30" y="7.5" x="7.5" strokeOpacity="null" strokeWidth="1.5" stroke="#000" fill="#fff" />
                        <text textAnchor="start" fontFamily="Helvetica, Arial, sans-serif" fontSize="24" id="svg_28" y="32.499866" x="15.437664" fillOpacity="null" strokeOpacity="null" strokeWidth="0" stroke="#000" fill="#000000">?</text>
                    </svg>
            },
            {
                "genotype": "not-genotyped",
                "gender": "female",
                "svg":
                    <svg width="45" height="45">
                        <ellipse ry="17" rx="17" id="svg_4" cy="23" cx="24" strokeWidth="1.5" stroke="#000" fill="#fff" />
                        <text textAnchor="start" fontFamily="Helvetica, Arial, sans-serif" fontSize="24" id="svg_28" y="32.499866" x="16.437664" fillOpacity="null" strokeOpacity="null" strokeWidth="0" stroke="#000" fill="#000000">?</text>
                    </svg>
            },
            {
                "genotype": "obligate-carrier",
                "gender": "male",
                "svg":
                    <svg width="45" height="45">
                        <rect id="svg_5" height="30" width="30" y="7.5" x="7.5" strokeOpacity="null" strokeWidth="1.5" stroke="#000" fill="#fff" />
                        <text textAnchor="start" fontFamily="Helvetica, Arial, sans-serif" fontSize="24" id="svg_61" y="28.928437" x="14.9377" fillOpacity="null" strokeOpacity="null" strokeWidth="0" stroke="#000" fill="grey">+</text>
                    </svg>
            },
            {
                "genotype": "obligate-carrier",
                "gender": "female",
                "svg":
                    <svg width="45" height="45">
                        <ellipse ry="17" rx="17" id="svg_4" cy="23" cx="24" strokeWidth="1.5" stroke="#000" fill="#fff" />
                        <text textAnchor="start" fontFamily="Helvetica, Arial, sans-serif" fontSize="24" id="svg_61" y="28.928437" x="16.9377" fillOpacity="null" strokeOpacity="null" strokeWidth="0" stroke="#000" fill="grey">+</text>
                    </svg>
            }
        ]

        var patient_genotype = where(genotype_types, { genotype: genotype, gender: gender });
        var item_genotype;

        if (!isObjectEmpty(patient_genotype)) {

            if (patient_genotype.length === 1) {

                item_genotype = patient_genotype[0].svg;

            } else {

                item_genotype = this.render_undefined_status();
            }

        } else {

            item_genotype = this.render_undefined_status();
        }

        return (item_genotype);

    }

    render_undefined_status() {

        return <div className="grid-block pl-component-card-patient-status-undefined-status"><h4>?</h4></div>;

    }


    render() {

        var phenotype = this.props.phenotype;
        var genotype = this.props.genotype;
        var gender = this.props.gender;
        var item;

        item = this.render_patient_status(phenotype, genotype, gender);
        
        return (
            <div className="grid-block shrink pl-component-card-patient-status">
                {item}
            </div>
        );

    }

}