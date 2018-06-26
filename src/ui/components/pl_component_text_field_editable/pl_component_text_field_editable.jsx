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

//components
import { PlComponentFormItemInputText } from './../pl_component_form/pl_component_form_item/pl_component_form_item_input_text/pl_component_form_item_input_text';
import { PlComponentFormItemInputTextSuggestion } from './../pl_component_form/pl_component_form_item/pl_component_form_item_input_text_suggestion/pl_component_form_item_input_text_suggestion';
import { PlComponentTextPlain } from './../pl_component_text/pl_component_text_plain/pl_component_text_plain';

export class PlComponentTextFieldEditable extends Component {

    constructor(props) {

        super(props)

        this.state = {
            isEditionMode: this.props.isEditionMode
        };

    }

    componentWillReceiveProps(nextProps) {

        if (nextProps !== this.props) {

            this.setState({
                isEditionMode: nextProps.isEditionMode
            });
        }

    }

    getEditedText() {

        if (this.refs.FormItemInputText) return this.refs.FormItemInputText.state.value;
        else return this.props.text;

    }

    renderTextField(text) {

        if (!this.state.isEditionMode) {

            return (
                <PlComponentTextPlain text={text} />
            );

        } else {
            
            if (!this.props.isSearchBox) {

                return (
                    <PlComponentFormItemInputText
                        ref="FormItemInputText"
                        value={text}
                        placeholder={text}
                        required_input={""}
                    />
                );

            } else if ((this.props.isSearchBox) && (this.props.suggestions)) {
                
                return (
                    <PlComponentFormItemInputTextSuggestion
                        ref="FormItemInputText"
                        suggestions={this.props.suggestions}
                        value={text}
                        placeholder={text}
                        required_input={""}
                    />
                );

            }
            

        }


    }

    render() {

        var text = this.props.text;

        return (

             <div className="grid-block shrink pl_component_text_field_editable">
                {this.renderTextField(text)}
            </div>

        );
    }
}