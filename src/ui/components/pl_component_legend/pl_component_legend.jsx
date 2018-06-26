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

export class PlComponentLegend extends Component {

    render() {

        return (
            <div>
                {/* <svg width="340" height="310" xmlns="http://www.w3.org/2000/svg" className="pl_component_legend" viewBox="0 0 680 610">
                    <g>
                        <title>background</title>
                        <rect x="-1" y="-1" width="582" height="512" id="canvas_background" fill="#4c4c4c" className="main_rect"/>
                        <g id="canvasGrid" display="none">
                            <rect id="svg_14" width="100%" height="100%" x="0" y="0" strokeWidth="0" fill="url(#gridpattern)" />
                        </g>
                    </g>
                    <g>
                        <title>Layer 1</title>
                        <g id="muerte-por-otras-causas-female">
                            <ellipse fill="#fff" stroke="#000" strokeWidth="1.5" cx="85" cy="42" id="svg_1" rx="17" ry="17" />
                            <line fill="none" stroke="#000" strokeOpacity="null" fillOpacity="null" x1="64.538451" y1="60.5" x2="102.538451" y2="23.5" id="svg_15" strokeLinejoin="null" strokeLinecap="null" strokeWidth="2" />
                        </g>
                        <g id="muerte-por-otras-causas-male">
                            <rect fill="#fff" stroke="#000" strokeWidth="1.5" strokeOpacity="null" fillOpacity="null" x="27" y="27.5" width="30" height="30" id="svg_2" />
                            <line fill="none" stroke="#000" strokeOpacity="null" fillOpacity="null" x1="23" y1="60.5" x2="61" y2="23.5" id="svg_13" strokeLinejoin="null" strokeLinecap="null" strokeWidth="2" />
                        </g>
                        <g id="muerte-subita-female">
                            <ellipse fill="#000000" stroke="#000" strokeWidth="1.5" cx="86" cy="85" id="svg_4" rx="17" ry="17" />
                            <line fill="none" stroke="#000" strokeOpacity="null" fillOpacity="null" x1="64.538451" y1="102.374964" x2="102.538451" y2="65.374964" id="svg_16" strokeLinejoin="null" strokeLinecap="null" strokeWidth="2" />
                        </g>
                        <g id="muerte-subita-male">
                            <rect fill="#000000" stroke="#000" strokeWidth="1.5" strokeOpacity="null" x="28" y="70.5" width="30" height="30" id="svg_5" />
                            <line fill="none" stroke="#000" strokeOpacity="null" fillOpacity="null" x1="23" y1="103.624963" x2="61" y2="66.624963" id="svg_17" strokeLinejoin="null" strokeLinecap="null" strokeWidth="2" />
                        </g>
                        <g id="ms-o-fv-recuperada-female">
                            <ellipse fill="#000000" stroke="#000" strokeWidth="1.5" cx="85" cy="129" id="svg_6" rx="17" ry="17" />
                        </g>
                        <g id="ms-o-fv-recuperada-male">
                            <rect fill="#000000" stroke="#000" strokeWidth="1.5" strokeOpacity="null" x="27" y="114.5" width="30" height="30" id="svg_7" />
                        </g>
                        <g id="manifestacion-responsable-female">
                            <ellipse fill="#ff0000" stroke="#000" strokeWidth="1.5" cx="85" cy="174" id="svg_8" rx="17" ry="17" />
                        </g>
                        <g id="manifestacion-responsable-male">
                            <rect fill="#ff0000" stroke="#000" strokeWidth="1.5" strokeOpacity="null" x="27" y="159.5" width="30" height="30" id="svg_9" />
                        </g>
                        <g id="portador-mutacion-responsable-female">
                            <ellipse fill="#fff" stroke="#000" strokeWidth="1.5" cx="86" cy="218" id="svg_10" rx="17" ry="17" />
                            <line stroke="#ff0000" fill="none" fillOpacity="null" x1="69.083906" y1="215.772727" x2="87.083904" y2="201.370137" id="svg_40" strokeLinejoin="null" strokeLinecap="null" strokeWidth="2" />
                            <line stroke="#ff0000" fill="none" fillOpacity="null" x1="71.226764" y1="224.590909" x2="95.200788" y2="203.694806" id="svg_41" strokeLinejoin="null" strokeLinecap="null" strokeWidth="2" />
                            <line stroke="#ff0000" fill="none" fillOpacity="null" x1="75.785205" y1="231.551948" x2="101.057932" y2="209.876624" id="svg_42" strokeLinejoin="null" strokeLinecap="null" strokeWidth="2" />
                            <line stroke="#ff0000" fill="none" x1="84.486506" y1="234.59091" x2="102.746242" y2="220.448051" id="svg_43" strokeLinejoin="null" strokeLinecap="null" strokeWidth="2" />
                        </g>
                        <g id="portador-mutacion-responsable-male">
                            <rect fill="#fff" stroke="#000" strokeWidth="1.5" strokeOpacity="null" fillOpacity="null" x="28" y="203.5" width="30" height="30" id="svg_11" />
                            <line stroke="#ff0000" fill="none" fillOpacity="null" x1="28.044944" y1="213.954545" x2="40.590397" y2="203.707798" id="svg_32" strokeLinejoin="null" strokeLinecap="null" strokeWidth="2" />
                            <line stroke="#ff0000" fill="none" fillOpacity="null" x1="28.10988" y1="224.590909" x2="52.083904" y2="203.694806" id="svg_33" strokeLinejoin="null" strokeLinecap="null" strokeWidth="2" />
                            <line stroke="#ff0000" fill="none" fillOpacity="null" x1="30.850139" y1="233.37013" x2="57.941049" y2="209.876625" id="svg_34" strokeLinejoin="null" strokeLinecap="null" strokeWidth="2" />
                            <line stroke="#ff0000" fill="none" x1="45.265725" y1="233.032468" x2="57.551437" y2="222.785714" id="svg_35" strokeLinejoin="null" strokeLinecap="null" strokeWidth="2" />
                        </g>
                        <g id="sin-manifestacion-fenotipica-female">
                            <ellipse fill="#fff" stroke="#000" strokeWidth="1.5" cx="86" cy="261.749962" id="svg_18" rx="17" ry="17" />
                        </g>
                        <g id="sin-manifestacion-fenotipica-male">
                            <rect fill="#fff" stroke="#000" strokeWidth="1.5" strokeOpacity="null" fillOpacity="null" x="28" y="247.249962" width="30" height="30" id="svg_19" />
                        </g>
                        <g id="no-portador-de-mutacion-responsable-female">
                            <ellipse fill="#fff" stroke="#000" strokeWidth="1.5" cx="86" cy="305.499925" id="svg_20" rx="17" ry="17" />
                            <line fill="none" stroke="#000" strokeWidth="2" strokeOpacity="null" fillOpacity="null" x1="80.312663" y1="306.249907" x2="90.937654" y2="306.249907" id="svg_24" strokeLinejoin="null" strokeLinecap="null" />
                        </g>
                        <g id="no-portador-de-mutacion-responsable-male">
                            <rect fill="#fff" stroke="#000" strokeWidth="1.5" strokeOpacity="null" fillOpacity="null" x="28" y="290.999925" width="30" height="30" id="svg_21" />
                            <line fill="none" stroke="#000" strokeWidth="2" strokeOpacity="null" fillOpacity="null" x1="37.1877" y1="306.249907" x2="47.812691" y2="306.249907" id="svg_22" strokeLinejoin="null" strokeLinecap="null" />
                        </g>
                        <g id="no-estudiado-female">
                            <ellipse fill="#fff" stroke="#000" strokeWidth="1.5" cx="86" cy="347.999888" id="svg_25" rx="17" ry="17" />
                            <text fill="#000000" stroke="#000" strokeWidth="0" strokeOpacity="null" fillOpacity="null" x="78.437664" y="357.499866" id="svg_28" fontSize="24" fontFamily="Helvetica, Arial, sans-serif" textAnchor="start" space="preserve">?</text>
                        </g>
                        <g id="no-estudiado-male">
                            <rect fill="#fff" stroke="#000" strokeWidth="1.5" strokeOpacity="null" fillOpacity="null" x="28" y="333.499888" width="30" height="30" id="svg_26" />
                            <text fill="#000000" stroke="#000" strokeWidth="0" strokeOpacity="null" fillOpacity="null" x="35.9377" y="357.499866" id="svg_27" fontSize="24" fontFamily="Helvetica, Arial, sans-serif" textAnchor="start" space="preserve">?</text>
                        </g>
                        <g id="portador-obligado-female">
                            <ellipse fill="#b2b2b2" stroke="#000" strokeWidth="1.5" cx="86" cy="391.999888" id="svg_23" rx="17" ry="17" />
                        </g>
                        <g id="portador-obligado-male">
                            <rect fill="#b2b2b2" stroke="#000" strokeWidth="1.5" strokeOpacity="null" x="28" y="377.499888" width="30" height="30" id="svg_29" />
                        </g>
                        <g id="probando-female">
                            <ellipse fill="#ffffff" stroke="#56aaff" strokeWidth="1.5" cx="86" cy="437.999888" id="svg_30" rx="17" ry="17" />
                        </g>
                        <g id="probando-male">
                            <rect fill="#ffffff" stroke="#56aaff" strokeWidth="1.5" x="28" y="423.499888" width="30" height="30" id="svg_31" />
                        </g>
                        <g id="nuevo-miembro-familia-female">
                            <ellipse fill="#ffaa56" stroke="#000" strokeWidth="1.5" cx="86" cy="482.285602" id="svg_59" rx="17" ry="17" />
                            <text fill="#000000" stroke="#000" strokeWidth="0" strokeOpacity="null" fillOpacity="null" x="79.009093" y="488.928437" id="svg_62" fontSize="24" fontFamily="Helvetica, Arial, sans-serif" textAnchor="start" space="preserve">+</text>
                        </g>
                        <g id="nuevo-miembro-familia-male">
                            <rect fill="#ffaa56" stroke="#000" strokeWidth="1.5" strokeOpacity="null" x="28" y="467.785602" width="30" height="30" id="svg_60" />
                            <text fill="#000000" stroke="#000" strokeWidth="0" strokeOpacity="null" fillOpacity="null" x="35.9377" y="488.928437" id="svg_61" fontSize="24" fontFamily="Helvetica, Arial, sans-serif" textAnchor="start" space="preserve">+</text>
                        </g>
                        <g>
                            <text fill="#ffffff" stroke="#000" strokeWidth="0" strokeOpacity="null" x="118.480519" y="93.396102" id="svg_46" fontSize="24" fontFamily="Helvetica, Arial, sans-serif" textAnchor="start" space="preserve">Muerte subita</text>
                            <text fill="#ffffff" stroke="#ffffff" strokeWidth="0" x="119" y="49.5" id="svg_12" fontSize="24" fontFamily="Helvetica, Arial, sans-serif" textAnchor="start" space="preserve">Muerte por otras causas</text>
                            <text fill="#ffffff" stroke="#000" strokeWidth="0" strokeOpacity="null" x="118.480519" y="137.032466" id="svg_47" fontSize="24" fontFamily="Helvetica, Arial, sans-serif" textAnchor="start" space="preserve">MS o FV recuperada</text>
                            <text fill="#ffffff" stroke="#000" strokeWidth="0" strokeOpacity="null" x="118.480519" y="180.928571" id="svg_48" fontSize="24" fontFamily="Helvetica, Arial, sans-serif" textAnchor="start" space="preserve">Manifestación responsable</text>
                            <text fill="#ffffff" stroke="#000" strokeWidth="0" strokeOpacity="null" x="118.480519" y="224.564935" id="svg_49" fontSize="24" fontFamily="Helvetica, Arial, sans-serif" textAnchor="start" space="preserve">Portador de mutación responsable</text>
                            <text fill="#ffffff" stroke="#000" strokeWidth="0" strokeOpacity="null" x="118.480519" y="269.24026" id="svg_50" fontSize="24" fontFamily="Helvetica, Arial, sans-serif" textAnchor="start" space="preserve">Sin manifestación fenotípica</text>
                            <text fill="#ffffff" stroke="#000" strokeWidth="0" strokeOpacity="null" x="118.480519" y="312.668834" id="svg_51" fontSize="24" fontFamily="Helvetica, Arial, sans-serif" textAnchor="start" space="preserve">No portador de mutación responsable</text>
                            <text fill="#ffffff" stroke="#000" strokeWidth="0" strokeOpacity="null" x="118.480519" y="355.525979" id="svg_52" fontSize="24" fontFamily="Helvetica, Arial, sans-serif" textAnchor="start" space="preserve">No estudiado</text>
                            <text fill="#ffffff" stroke="#000" strokeWidth="0" strokeOpacity="null" x="118.480519" y="400.097409" id="svg_53" fontSize="24" fontFamily="Helvetica, Arial, sans-serif" textAnchor="start" space="preserve">Portador obligado</text>
                            <text fill="#ffffff" stroke="#000" strokeWidth="0" strokeOpacity="null" x="119.051948" y="447.525983" id="svg_54" fontSize="24" fontFamily="Helvetica, Arial, sans-serif" textAnchor="start" space="preserve">Probando</text>
                            <text fill="#ffffff" stroke="#000" strokeWidth="0" strokeOpacity="null" x="119.051948" y="491.525985" id="svg_63" fontSize="24" fontFamily="Helvetica, Arial, sans-serif" textAnchor="start" space="preserve">Nuevo miembro de la familia</text>
                        </g>
                    </g>
                </svg> */}

                <svg width="340" height="310" xmlns="http://www.w3.org/2000/svg" className="pl_component_legend" viewBox="0 0 680 610">
                    <g>
                        <title>background</title>
                        <rect x="-1" y="-1" width="582" height="644" id="canvas_background" fill="#4c4c4c" className="main_rect" />
                        <g id="canvasGrid" display="none">
                            <rect id="svg_14" width="100%" height="100%" x="0" y="0" strokeWidth="0" fill="url(#gridpattern)" />
                        </g>
                    </g>
                    <g>
                        <title>Layer 1</title>
                        <g id="death-from-other-causes-female">
                            <ellipse fill="#fff" stroke="#000" strokeWidth="1.5" cx="86" cy="85" id="svg_1" rx="17" ry="17" />
                            <line fill="none" stroke="#000" strokeOpacity="null" fillOpacity="null" x1="64.538451" y1="102.374964" x2="102.538451" y2="65.374964" id="svg_15" strokeLinejoin="null" strokeLinecap="null" strokeWidth="2" />
                        </g>
                        <g id="death-from-other-causes-male">
                            <rect fill="#fff" stroke="#000" strokeWidth="1.5" strokeOpacity="null" fillOpacity="null" x="28" y="70.5" width="30" height="30" id="svg_2" />
                            <line fill="none" stroke="#000" strokeOpacity="null" fillOpacity="null" x1="23" y1="103.624963" x2="61" y2="66.624963" id="svg_13" strokeLinejoin="null" strokeLinecap="null" strokeWidth="2" />
                        </g>
                        <g id="sudden-cardiac-death-female">
                            <ellipse fill="#000000" stroke="#000" strokeWidth="1.5" cx="85" cy="129" id="svg_4" rx="17" ry="17" />
                            <line fill="none" stroke="#000" strokeOpacity="null" fillOpacity="null" x1="64.538451" y1="146.374964" x2="102.538451" y2="109.374964" id="svg_16" strokeLinejoin="null" strokeLinecap="null" strokeWidth="2" />
                        </g>
                        <g id="sudden-cardiac-death-male">
                            <rect fill="#000000" stroke="#000" strokeWidth="1.5" strokeOpacity="null" x="27" y="114.5" width="30" height="30" id="svg_5" />
                            <line fill="none" stroke="#000" strokeOpacity="null" fillOpacity="null" x1="23" y1="147.624963" x2="61" y2="110.624963" id="svg_17" strokeLinejoin="null" strokeLinecap="null" strokeWidth="2" />
                        </g>
                        <g id="ressucitated-scd-or-vf-female">
                            <ellipse fill="#000000" stroke="#000" strokeWidth="1.5" cx="85" cy="173" id="svg_6" rx="17" ry="17" />
                        </g>
                        <g id="ressucitated-scd-or-vf-male">
                            <rect fill="#000000" stroke="#000" strokeWidth="1.5" strokeOpacity="null" x="27" y="158.5" width="30" height="30" id="svg_7" />
                        </g>
                        <g id="phenotypic-manifestation-female">
                            <ellipse fill="#b2b2b2" stroke="#000" strokeWidth="1.5" cx="86" cy="217" id="svg_1" rx="17" ry="17" />
                        </g>
                        <g id="phenotypic-manifestation-male">
                            <rect fill="#b2b2b2" stroke="#000" strokeWidth="1.5" strokeOpacity="null" fillOpacity="null" x="28" y="202.5" width="30" height="30" id="svg_2" />
                           </g>
                        <g id="no-phenotypic-manifestation-female">
                            <ellipse fill="#fff" stroke="#000" strokeWidth="1.5" cx="86" cy="261" id="svg_1" rx="17" ry="17" />
                          </g>
                        <g id="no-phenotypic-manifestation-male">
                            <rect fill="#fff" stroke="#000" strokeWidth="1.5" strokeOpacity="null" fillOpacity="null" x="28" y="246.5" width="30" height="30" id="svg_2" />
                        </g>
                        <g>
                            <text fill="#ffffff" stroke="#ffffff" strokeWidth="0" x="27" y="44" id="svg_12" fontSize="24" fontFamily="Helvetica, Arial, sans-serif" textAnchor="start" space="preserve">PHENOTYPE</text>
                            <text fill="#ffffff" stroke="#ffffff" strokeWidth="0" x="118.480519" y="96.5" id="svg_12" fontSize="24" fontFamily="Helvetica, Arial, sans-serif" textAnchor="start" space="preserve">Death from other causes</text>
                            <text fill="#ffffff" stroke="#000" strokeWidth="0" strokeOpacity="null" x="118.480519" y="140.396102" id="svg_46" fontSize="24" fontFamily="Helvetica, Arial, sans-serif" textAnchor="start" space="preserve">Sudden cardiac death</text>
                            <text fill="#ffffff" stroke="#000" strokeWidth="0" strokeOpacity="null" x="118.480519" y="184.032466" id="svg_47" fontSize="24" fontFamily="Helvetica, Arial, sans-serif" textAnchor="start" space="preserve">Ressucitated SCF or VF</text>
                            <text fill="#ffffff" stroke="#000" strokeWidth="0" strokeOpacity="null" x="118.480519" y="228.032466" id="svg_47" fontSize="24" fontFamily="Helvetica, Arial, sans-serif" textAnchor="start" space="preserve">Phenotypic manifestation</text>
                            <text fill="#ffffff" stroke="#000" strokeWidth="0" strokeOpacity="null" x="118.480519" y="272.032466" id="svg_47" fontSize="24" fontFamily="Helvetica, Arial, sans-serif" textAnchor="start" space="preserve">No phenotypic manifestation</text>
                        </g>
                    </g>
                    <g>
                        <g id="mutation-carrier-female">
                            <ellipse fill="#fff" stroke="#000" strokeWidth="1.5" cx="86" cy="382" id="svg_59" rx="17" ry="17" />
                            <text fill="#000000" stroke="#000" strokeWidth="0" strokeOpacity="null" fillOpacity="null" x="79.009093" y="388.928437" id="svg_62" fontSize="24" fontFamily="Helvetica, Arial, sans-serif" textAnchor="start" space="preserve">+</text>
                        </g>
                        <g id="mutation-carrier-male">
                            <rect fill="#fff" stroke="#000" strokeWidth="1.5" strokeOpacity="null" x="28" y="367.785602" width="30" height="30" id="svg_60" />
                            <text fill="#000000" stroke="#000" strokeWidth="0" strokeOpacity="null" fillOpacity="null" x="35.9377" y="388.928437" id="svg_61" fontSize="24" fontFamily="Helvetica, Arial, sans-serif" textAnchor="start" space="preserve">+</text>
                        </g>
                        <g id="no-mutation-carrier-female">
                            <ellipse fill="#fff" stroke="#000" strokeWidth="1.5" cx="86" cy="426.499925" id="svg_20" rx="17" ry="17" />
                            <line fill="none" stroke="#000" strokeWidth="2" strokeOpacity="null" fillOpacity="null" x1="80.312663" y1="426.249907" x2="90.937654" y2="426.249907" id="svg_24" strokeLinejoin="null" strokeLinecap="null" />
                        </g>
                        <g id="no-mutation-carrier-male">
                            <rect fill="#fff" stroke="#000" strokeWidth="1.5" strokeOpacity="null" fillOpacity="null" x="28" y="411.999925" width="30" height="30" id="svg_21" />
                            <line fill="none" stroke="#000" strokeWidth="2" strokeOpacity="null" fillOpacity="null" x1="37.1877" y1="426.249907" x2="47.812691" y2="426.249907" id="svg_22" strokeLinejoin="null" strokeLinecap="null" />
                        </g>
                        <g id="not-genotyped-female">
                            <ellipse fill="#fff" stroke="#000" strokeWidth="1.5" cx="86" cy="470.999888" id="svg_25" rx="17" ry="17" />
                            <text fill="#000000" stroke="#000" strokeWidth="0" strokeOpacity="null" fillOpacity="null" x="78.437664" y="478.499866" id="svg_28" fontSize="24" fontFamily="Helvetica, Arial, sans-serif" textAnchor="start" space="preserve">?</text>
                        </g>
                        <g id="not-genotyped-male">
                            <rect fill="#fff" stroke="#000" strokeWidth="1.5" strokeOpacity="null" fillOpacity="null" x="28" y="455.499888" width="30" height="30" id="svg_26" />
                            <text fill="#000000" stroke="#000" strokeWidth="0" strokeOpacity="null" fillOpacity="null" x="35.9377" y="478.499866" id="svg_27" fontSize="24" fontFamily="Helvetica, Arial, sans-serif" textAnchor="start" space="preserve">?</text>
                        </g>
                        <g id="obligate-carrier-female">
                            <ellipse fill="#fff" stroke="#000" strokeWidth="1.5" cx="86" cy="514" id="svg_59" rx="17" ry="17" />
                            <text fill="#565656" stroke="#000" strokeWidth="0" strokeOpacity="null" fillOpacity="null" x="79.009093" y="520.928437" id="svg_62" fontSize="24" fontFamily="Helvetica, Arial, sans-serif" textAnchor="start" space="preserve">+</text>
                        </g>
                        <g id="obligate-carrier-male">
                            <rect fill="#fff" stroke="#000" strokeWidth="1.5" strokeOpacity="null" x="28" y="499.785602" width="30" height="30" id="svg_60" />
                            <text fill="#565656" stroke="#000" strokeWidth="0" strokeOpacity="null" fillOpacity="null" x="35.9377" y="520.928437" id="svg_61" fontSize="24" fontFamily="Helvetica, Arial, sans-serif" textAnchor="start" space="preserve">+</text>
                        </g>
                        <g>
                            <text fill="#ffffff" stroke="#ffffff" strokeWidth="0" x="27" y="338" id="svg_12" fontSize="24" fontFamily="Helvetica, Arial, sans-serif" textAnchor="start" space="preserve">GENOTYPE</text>
                            <text fill="#ffffff" stroke="#000" strokeWidth="0" strokeOpacity="null" x="118.480519" y="390.928571" id="svg_48" fontSize="24" fontFamily="Helvetica, Arial, sans-serif" textAnchor="start" space="preserve">Mutation carrier</text>
                            <text fill="#ffffff" stroke="#000" strokeWidth="0" strokeOpacity="null" x="118.480519" y="434.564935" id="svg_49" fontSize="24" fontFamily="Helvetica, Arial, sans-serif" textAnchor="start" space="preserve">No mutation carrier</text>
                            <text fill="#ffffff" stroke="#000" strokeWidth="0" strokeOpacity="null" x="118.480519" y="478.24026" id="svg_50" fontSize="24" fontFamily="Helvetica, Arial, sans-serif" textAnchor="start" space="preserve">Not genotyped</text>
                            <text fill="#ffffff" stroke="#000" strokeWidth="0" strokeOpacity="null" x="118.480519" y="522.668834" id="svg_51" fontSize="24" fontFamily="Helvetica, Arial, sans-serif" textAnchor="start" space="preserve">Obligate carrier</text>
                        </g>
                    </g>
                    <g>
                        <g id="new-member-family-female">
                            <ellipse fill="#ffaa56" stroke="#000" strokeWidth="1.5" cx="86" cy="580.285602" id="svg_59" rx="17" ry="17" />
                        </g>
                        <g id="new-member-family-male">
                            <rect fill="#ffaa56" stroke="#000" strokeWidth="1.5" strokeOpacity="null" x="28" y="565.785602" width="30" height="30" id="svg_60" />
                        </g>
                        <g>
                            <text fill="#ffffff" stroke="#000" strokeWidth="0" strokeOpacity="null" x="118.480519" y="588.928571" id="svg_48" fontSize="24" fontFamily="Helvetica, Arial, sans-serif" textAnchor="start" space="preserve">New member of the family</text>
                        </g>
                    </g> 
                </svg>


            </div>

        );
    }
}