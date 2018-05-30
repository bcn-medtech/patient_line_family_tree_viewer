import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import D3TreeCreator from './pl_component_family_tree_viewer_d3_creator/pl_component_family_tree_viewer_d3_creator';
import { isObjectEmpty, isObjectAFunction } from './../../../modules/rkt_module_object';

export class PlComponentFamilyTreeViewer extends Component {

    constructor() {

        super();
        this.d3TreeCreator = false;
    }

    drawTree(root, patient_id, siblings) {

        if (!isObjectEmpty(root) && !isObjectEmpty(siblings)) {

            this.d3TreeCreator = new D3TreeCreator();

            var el = ReactDOM.findDOMNode(this);
            var height = el.clientHeight;
            var width = el.clientWidth;
            var size = { width: width, height: height };

            this.d3TreeCreator.create(el, size, root, siblings, patient_id, this.set_patient.bind(this));

        }
    }

    componentDidMount() {

        var root = this.props.root;
        var patient_id = this.props.patient_id;
        var siblings = this.props.siblings;

        this.drawTree(root, patient_id, siblings);

    }

    componentWillReceiveProps(nextProps) {

        var root = nextProps.root;
        var patient_id = nextProps.patient_id;
        var siblings = nextProps.siblings;

        this.d3TreeCreator._drawTree(root, siblings, patient_id, this.set_patient.bind(this));
    }

    //Events
    set_patient(id) {

        if (isObjectAFunction(this.props.set_patient)) {
            this.props.set_patient(id);
        }
    }

    get_family_tree() {

        return document.getElementsByClassName("pl_component_family_tree_viewer")[0];
        // return document.getElementsByClassName("pl_component_family_tree_viewer")[0].children[0]; // svg element

    }

    render() {

        return (
            <div className="grid-block pl_component_family_tree_viewer">

                <svg style={{"display":"none"}}>
                    <g id="tree-muerte-por-otras-causas-female">
                        <ellipse id="svg_1" rx="20" ry="20" fill="#fff" stroke="#000" strokeWidth="3" />
                        <line id="svg_15" x1="-25" y1="25" x2="25" y2="-25" fill="none" fillOpacity="null" stroke="#000" strokeOpacity="null" strokeLinejoin="null" strokeLinecap="null" strokeWidth="2" />
                    </g>
                    <g id="tree-muerte-por-otras-causas-male">
                        <rect id="svg_2" width="40" height="40" x="-20" y="-20" fill="#fff" fillOpacity="null" stroke="#000" strokeWidth="3" strokeOpacity="null" />
                        <line id="svg_13" x1="-25" y1="25" x2="25" y2="-25" fill="none" stroke="#000" strokeOpacity="null" fillOpacity="null" strokeLinejoin="null" strokeLinecap="null" strokeWidth="2" />
                    </g>
                    <g id="tree-muerte-subita-female">
                        <ellipse id="svg_4" rx="20" ry="20" fill="#000000" stroke="#000" strokeWidth="3" />
                        <line id="svg_16" x1="-25" y1="25" x2="25" y2="-25" fill="none" fillOpacity="null" stroke="#000" strokeOpacity="null" strokeLinejoin="null" strokeLinecap="null" strokeWidth="2" />
                    </g>
                    <g id="tree-muerte-subita-male">
                        <rect id="svg_5" width="40" height="40" x="-20" y="-20" fill="#000000" stroke="#000" strokeWidth="3" strokeOpacity="null" />
                        <line id="svg_17" x1="-10" y1="50" x2="50" y2="-10" fill="none" fillOpacity="null" stroke="#000" strokeOpacity="null" strokeLinejoin="null" strokeLinecap="null" strokeWidth="2" />
                    </g>
                    <g id="tree-ms-o-fv-recuperada-female">
                        <ellipse id="svg_6" rx="20" ry="20" fill="#000000" stroke="#000" strokeWidth="3" />
                    </g>
                        <g id="tree-ms-o-fv-recuperada-male">
                        <rect id="svg_7" width="40" height="40" x="-20" y="-20" fill="#000000" stroke="#000" strokeWidth="3" strokeOpacity="null" />
                    </g>
                    <g id="tree-manifestacion-responsable-female">
                        <ellipse id="svg_8" rx="20" ry="20" fill="#ff0000" stroke="#000" strokeWidth="3" />
                    </g>
                    <g id="tree-manifestacion-responsable-male">
                        <rect width="40" height="40" id="svg_9" x="-20" y="-20" fill="#ff0000" stroke="#000" strokeWidth="3" strokeOpacity="null" />
                    </g>
                    <g id="tree-portador-mutacion-responsable-female">
                        <ellipse id="svg_10" rx="20" ry="20" fill="#fff" stroke="#000" strokeWidth="3" />
                        <line id="svg_40" x1="-18" y1="0" x2="0" y2="-18" fill="none" fillOpacity="null" stroke="#ff0000" strokeLinejoin="null" strokeLinecap="null" strokeWidth="2" />
                        <line id="svg_41" x1="-16" y1="9" x2="9" y2="-16" fill="none" fillOpacity="null" stroke="#ff0000" strokeLinejoin="null" strokeLinecap="null" strokeWidth="2" />
                        <line id="svg_42" x1="16" y1="-9" x2="-9" y2="16" fill="none" fillOpacity="null" stroke="#ff0000" strokeLinejoin="null" strokeLinecap="null" strokeWidth="2" />
                        <line id="svg_43" x1="18" y1="0" x2="0" y2="18" fill="none" stroke="#ff0000" strokeLinejoin="null" strokeLinecap="null" strokeWidth="2" />
                    </g>
                    <g id="tree-portador-mutacion-responsable-male">
                        <rect id="svg_11" width="40" height="40" x="-20" y="-20" fill="#fff" fillOpacity="null" stroke="#000" strokeOpacity="null" strokeWidth="3" />
                        <line id="svg_40" x1="-18" y1="-6" x2="-6" y2="-18" fill="none" fillOpacity="null" stroke="#ff0000" strokeLinejoin="null" strokeLinecap="null" strokeWidth="2" />
                        <line id="svg_41" x1="-18" y1="9" x2="9" y2="-18" fill="none" fillOpacity="null" stroke="#ff0000" strokeLinejoin="null" strokeLinecap="null" strokeWidth="2" />
                        <line id="svg_42" x1="18" y1="-9" x2="-9" y2="18" fill="none" fillOpacity="null" stroke="#ff0000" strokeLinejoin="null" strokeLinecap="null" strokeWidth="2" />
                        <line id="svg_43" x1="18" y1="6" x2="6" y2="18" fill="none" stroke="#ff0000" strokeLinejoin="null" strokeLinecap="null" strokeWidth="2" />
                    </g>
                    <g id="tree-sin-manifestacion-fenotipica-female">
                        <ellipse id="svg_18" rx="20" ry="20" fill="#fff" stroke="#000" strokeWidth="3" />
                    </g>
                    <g id="tree-sin-manifestacion-fenotipica-male">
                        <rect width="40" height="40" id="svg_19" x="-20" y="-20" fill="#fff" fillOpacity="null" stroke="#000" strokeOpacity="null" strokeWidth="3" />
                    </g>
                    <g id="tree-no-portador-de-mutacion-responsable-female">
                        <ellipse id="svg_20" rx="20" ry="20" fill="#fff" stroke="#000" strokeWidth="3" />
                        <line id="svg_24" x1="-5" y1="0" x2="5" y2="0" fill="none" fillOpacity="null" stroke="#000" strokeLinejoin="null" strokeLinecap="null" strokeOpacity="null" strokeWidth="3" />
                    </g>
                    <g id="tree-no-portador-de-mutacion-responsable-male">
                        <rect id="svg_21" width="40" height="40" x="-20" y="-20" fill="#fff" fillOpacity="null" stroke="#000" strokeWidth="3" strokeOpacity="null"  />
                        <line id="svg_22" x1="-5" y1="0" x2="5" y2="0" fill="none" fillOpacity="null" stroke="#000" strokeWidth="3" strokeOpacity="null" strokeLinejoin="null" strokeLinecap="null" />
                    </g>
                    <g id="tree-no-estudiado-female">
                        <ellipse id="svg_25" rx="20" ry="20" fill="#fff" stroke="#000" strokeWidth="3" />
                        <text id="svg_28" x="-7" y="8" fill="#000000" fillOpacity="null" stroke="#000" strokeWidth="0" strokeOpacity="null" fontSize="24" fontFamily="Helvetica, Arial, sans-serif" textAnchor="start" space="preserve">?</text>
                    </g>
                    <g id="tree-no-estudiado-male">
                        <rect id="svg_26" width="40" height="40" x="-20" y="-20" fill="#fff" fillOpacity="null" stroke="#000" strokeWidth="3" strokeOpacity="null" />
                        <text id="svg_27" x="-7" y="8" fill="#000000" fillOpacity="null" stroke="#000" strokeWidth="0" strokeOpacity="null" fontSize="24" fontFamily="Helvetica, Arial, sans-serif" textAnchor="start" space="preserve">?</text>
                    </g>
                    <g id="tree-portador-obligado-female">
                        <ellipse id="svg_23" rx="20" ry="20" fill="#b2b2b2" stroke="#000" strokeWidth="3" />
                    </g>
                    <g id="tree-portador-obligado-male">
                        <rect id="svg_29" width="40" height="40" x="-20" y="-20" fill="#b2b2b2" stroke="#000" strokeWidth="3" strokeOpacity="null" />
                    </g>
                    <g id="tree-probando-female">
                        <ellipse id="svg_30" rx="20" ry="20" fill="#ffffff" stroke="#56aaff" strokeWidth="3" />
                    </g>
                    <g id="tree-probando-male">
                        <rect id="svg_31" width="40" height="40" x="-20" y="-20" fill="#ffffff" stroke="#56aaff" strokeWidth="3" />
                    </g>
                    <g id="tree-nuevo-miembro-familia-female">
                        <ellipse id="svg_59" rx="20" ry="20" fill="#ffaa56" stroke="#000" strokeWidth="3" />
                        <text x="-7" y="6" id="svg_62" fill="#000000" fillOpacity="null" stroke="#000" strokeWidth="0" strokeOpacity="null" fontSize="24" fontFamily="Helvetica, Arial, sans-serif" textAnchor="start" space="preserve">+</text>
                    </g>
                    <g id="tree-nuevo-miembro-familia-male">
                        <rect id="svg_60" width="40" height="40" x="-20" y="-20" fill="#ffaa56" stroke="#000" strokeWidth="3" strokeOpacity="null" />
                        <text id="svg_61" x="-6" y="7" fill="#000000" stroke="#000" strokeWidth="0" strokeOpacity="null" fillOpacity="null" fontSize="24" fontFamily="Helvetica, Arial, sans-serif" textAnchor="start" space="preserve">+</text>
                    </g>
                    <g id="tree-nuevo-miembro-familia-">
                        <rect id="svg_diamond" transform="rotate(45 20 20)" width="40" height="40" x="-28"/*x="-20" y="-20"*/ fill="#ffaa56" stroke="#000" strokeWidth="3" strokeOpacity="null" />
                        {/* <line id="svg_diamond_l1" x1="-30" y1="0" x2="0" y2="30" fill="none" fillOpacity="null" stroke="#000" strokeOpacity="null" strokeLinejoin="null" strokeLinecap="null" strokeWidth="2" />
                        <line id="svg_diamond_l2" x1="0" y1="30" x2="30" y2="0" fill="none" fillOpacity="null" stroke="#000" strokeOpacity="null" strokeLinejoin="null" strokeLinecap="null" strokeWidth="2" />
                        <line id="svg_diamond_l3" x1="-30" y1="0" x2="0" y2="-30" fill="none" fillOpacity="null" stroke="#000" strokeOpacity="null" strokeLinejoin="null" strokeLinecap="null" strokeWidth="2" />
                        <line id="svg_diamond_l4" x1="0" y1="-30" x2="30" y2="0" fill="none" fillOpacity="null" stroke="#000" strokeOpacity="null" strokeLinejoin="null" strokeLinecap="null" strokeWidth="2" /> */}
                        <text x="-7" y="6" id="svg_62" fill="#000000" fillOpacity="null" stroke="#000" strokeWidth="0" strokeOpacity="null" fontSize="24" fontFamily="Helvetica, Arial, sans-serif" textAnchor="start" space="preserve">+</text>
                    </g>
                </svg>

            </div>
            
        );
    }
}