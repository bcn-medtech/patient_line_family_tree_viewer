import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import D3TreeCreator from './pl_component_family_tree_viewer_d3_creator/pl_component_family_tree_viewer_d3_creator';
import {isObjectEmpty} from './../../../modules/rkt_module_object';

export class PlComponentFamilyTreeViewer extends Component {

    constructor() {

        super();

        this.state = {

        }

        this.d3TreeCreator = false;
        this.addSon = this.addSon.bind(this);
        this.addDaughter = this.addDaughter.bind(this);
        this.addWife = this.addWife.bind(this);
        this.addHusband = this.addHusband.bind(this);
        this.addSister = this.addSister.bind(this);
        this.addBrother = this.addBrother.bind(this);
        this.deleteMember = this.deleteMember.bind(this);
        this.changeStatus = this.changeStatus.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    componentDidMount() {

        var root = this.props.root;
        var siblings = this.props.siblings;

        if(!isObjectEmpty(root) && !isObjectEmpty(siblings)){

            this.d3TreeCreator = new D3TreeCreator();
            
            var el = ReactDOM.findDOMNode(this);
            var height = el.clientHeight;
            var width = el.clientWidth;
            var size = { width: width, height: height };
            
            this.d3TreeCreator.create(el,size,root,siblings,this.addDaughter, this.addSon, this.addWife, this.addHusband, this.addSister, this.addBrother, this.deleteMember, this.onClick, this.changeStatus);
        }
        
    }

    //Events
    addSon(){
        console.log("addSon");
    }

    addDaughter(){
        console.log("addDaughter");
    }

    addWife(){
        console.log("addWife");
    }

    addHusband(){
        console.log("addHusband");
    }

    addSister(){
        console.log("addSister");
    }

    addBrother(){
        console.log("addBrother");
    }

    deleteMember(){
        console.log("deleteMember");
    }

    changeStatus(){
        console.log("changeStatus");
    }

    onClick(){
        console.log("onClick");
    }

    render() {

        return (
            
            <div className="grid-block  pl_component_family_tree_viewer"></div>
        );
    }
}