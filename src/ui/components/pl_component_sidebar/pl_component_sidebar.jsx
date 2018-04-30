import React, { Component } from 'react';
import { isObjectAFunction } from './../../../modules/rkt_module_object';

//components
import { PlComponentDatabaseHeader } from './../../components/pl_component_database/pl_component_database_header/pl_component_database_header';

export class PlComponentSidebar extends Component {

    constructor() {
        super();

        this.state = {
            mode: "families"
        }
    }

    set_database_component_mode(mode){
        console.log(mode);
    }

    render() {

        return (
            <div className="grid-block vertical pl_component_sidebar">
                <div className="grid-block">
                    {/*<PlComponentDatabaseHeader mode={this.state.mode}
                        data={data}
                        set_database_component_mode={this.set_database_component_mode.bind(this)}>
        </PlComponentDatabaseHeader>*/}
                </div>
                <div className="grid-block"></div>
            </div>
        );
    }
}