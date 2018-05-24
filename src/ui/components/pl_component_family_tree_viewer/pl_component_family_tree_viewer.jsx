import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import D3TreeCreator from './pl_component_family_tree_viewer_d3_creator/pl_component_family_tree_viewer_d3_creator';
import {isObjectEmpty,isObjectAFunction} from './../../../modules/rkt_module_object';

export class PlComponentFamilyTreeViewer extends Component {

    constructor() {

        super();
        this.d3TreeCreator = false;
    }

    drawTree(root,patient_id,siblings){

        if(!isObjectEmpty(root) && !isObjectEmpty(siblings)){

            this.d3TreeCreator = new D3TreeCreator();
            
            var el = ReactDOM.findDOMNode(this);
            var height = el.clientHeight;
            var width = el.clientWidth;
            var size = { width: width, height: height };
            
            this.d3TreeCreator.create(el,size,root,siblings,patient_id,this.set_patient.bind(this));

        }
    }

    componentDidMount() {

        var root = this.props.root;
        var patient_id = this.props.patient_id;
        var siblings = this.props.siblings;
        
        this.drawTree(root,patient_id,siblings);
        
    }

    componentWillReceiveProps(nextProps){
        
            var root = nextProps.root;
            var patient_id = nextProps.patient_id;
            var siblings = nextProps.siblings;
    
            this.d3TreeCreator._drawTree(root,siblings,patient_id,this.set_patient.bind(this));
    }

    //Events
    set_patient(id){

        if(isObjectAFunction(this.props.set_patient)){
            this.props.set_patient(id);
        }
    }

    get_family_tree_svg() {
        
        return document.getElementsByClassName("pl_component_family_tree_viewer")[0].children[0];

    }

    render() {

        return (
            <div className="grid-block  pl_component_family_tree_viewer"></div>
        );
    }
}