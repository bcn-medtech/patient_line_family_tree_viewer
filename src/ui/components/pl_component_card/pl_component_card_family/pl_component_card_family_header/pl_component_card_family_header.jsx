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
import { PlComponentTextFieldEditable } from './../../../pl_component_text_field_editable/pl_component_text_field_editable';

//modules
import { isObjectAFunction, isObjectEmpty } from './../../../../../modules/rkt_module_object';
import { mapObject } from 'underscore';

export class PlComponentCardFamilyHeader extends Component {
    
    render() {

        var family = this.props.family;
        var mode_edit = this.props.mode_edit;
        var family_num_members;
        var family_id;
        var family_name;
        var family_description;
        var family_symptoms;


        family_num_members = family.num_family_members
        family_id = family.id;
        family_name = family.name;

        family_description = family.description;
        if (isObjectEmpty(family_description)) family_description = "Description";

        family_symptoms = family.symptoms;
        if (isObjectEmpty(family_symptoms)) family_symptoms = "Symptoms";

        return (

            <div className="grid-block pl-component-card-family-header">
                
                <div className="grid-block vertical card-item">

                    <div className="grid-block" style={{"alignItems":"center"}}>
                        <div className="grid-block shrink vertical card-row-family-members">
                            <div className="grid-block shrink align-center"><h4>{family_num_members}</h4></div>
                            <div className="grid-block shrink align-center text">{"family members"}</div>
                        </div>
                        <div className="grid-block vertical card-item">
                            <div className="grid-block shrink">
                                <h4>
                                    <PlComponentTextFieldEditable
                                        text={family_name}
                                        isEditionMode={mode_edit ? true : false}
                                        ref="family_name"
                                    />
                                </h4>
                            </div>
                            <div className="grid-block shrink">
                                <PlComponentTextFieldEditable
                                    text={family_id}
                                    isEditionMode={mode_edit ? true : false}
                                    ref="family_id" />
                            </div>
                        </div>
                    </div>

                    <div className="grid-block shrink" style={{ "paddingTop": "20px" }}>
                        <h4>
                            <PlComponentTextFieldEditable
                                text={family_description}
                                isEditionMode={mode_edit ? true : false}
                                ref="family_description" />
                        </h4>
                    </div>
                    <div className="grid-block shrink" style={{ "paddingBottom": "8px" }}>
                        <PlComponentTextFieldEditable
                            text={family_symptoms}
                            isEditionMode={mode_edit ? true : false}
                            ref="family_symptoms" />
                    </div>

                </div>

            </div>
        );

    }
}