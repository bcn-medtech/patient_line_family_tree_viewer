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

import family_diagnostics_suggestions_json from './pl_component_card_family_header_jsons/pl_component_card_family_header_jsons_diagnostics.json';
import family_genes_suggestions_json from './pl_component_card_family_header_jsons/pl_component_card_family_header_jsons_genes.json';

export class PlComponentCardFamilyHeader extends Component {

    render() {

        var family = this.props.family;
        var mode_edit = this.props.mode_edit;

        var family_id;
        var family_name;
        var family_description;
        var family_symptoms;
        var family_diagnostic;
        var family_genes;
        var family_mutations;
        
        family_id = family.id;
        family_name = family.name;

        family_description = family.description;
        if (isObjectEmpty(family_description)) family_description = "Description";

        family_symptoms = family.symptoms;
        if (isObjectEmpty(family_symptoms)) family_symptoms = "Symptoms";

        family_diagnostic = family.diagnostic;
        if (isObjectEmpty(family_diagnostic)) family_diagnostic = "Diagnostic";

        family_genes = family.genes;
        if (isObjectEmpty(family_genes)) family_genes = "Genes";

        family_mutations = family.mutations;
        if (isObjectEmpty(family_mutations)) family_mutations = "Mutations";

        return (
            <div className="grid-block pl-component-card-family-header">
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
                    <div className="grid-block shrink" style={{ "paddingTop": "20px", "paddingBottom": "8px" }}>
                        {/* <h4> */}
                            <PlComponentTextFieldEditable
                                text={family_diagnostic}
                                isEditionMode={mode_edit ? true : false}
                                isSearchBox={true}
                                suggestions={family_diagnostics_suggestions_json}
                                ref="family_diagnostic" />
                        {/* </h4> */}
                    </div>
                    <div className="grid-block shrink" style={{ "paddingTop": "20px" }}>
                        {/* <h4> */}
                            <PlComponentTextFieldEditable
                                text={family_genes}
                                isEditionMode={mode_edit ? true : false}
                                isSearchBox={true}
                                suggestions={family_genes_suggestions_json}
                                ref="family_genes" />
                        {/* </h4> */}
                    </div>
                    <div className="grid-block shrink" style={{ "paddingBottom": "8px" }}>
                        {/* <h4> */}
                            <PlComponentTextFieldEditable
                                text={family_mutations}
                                isEditionMode={mode_edit ? true : false}
                                ref="family_mutations" />
                        {/* </h4> */}
                    </div>
                </div>
            </div>
        );

    }
}