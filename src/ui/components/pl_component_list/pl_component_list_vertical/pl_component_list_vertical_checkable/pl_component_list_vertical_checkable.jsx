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
import { isObjectAFunction, searchInArrayOfObjects } from './../../../../modules/pl_modules_object';

//components
import { PlComponentListVerticalCheckableItem } from './pl_component_list_vertical_checkable_item/pl_component_list_vertical_checkable_item';

export class PlComponentListVerticalCheckable extends Component {

    constructor(props) {
        super(props)

        var lastItemToRender, renderListMessage, listMessage;
        if (props.items.length <= 4) {
            lastItemToRender = props.items.length;
            renderListMessage = false;
        }

        else {
            lastItemToRender = 4;
            renderListMessage = true;
            listMessage = "Show more";
        }
        

        this.state = {
            lastItemToRender: lastItemToRender,
            renderListMessage: renderListMessage,
            listMessage: listMessage
        };

    }
    

    onClickListCheckableItem(index_item, item) {

        var items = this.props.items;
        items[index_item] = item;

        var at_least_one_item_checked= this.props.at_least_one_item_checked;
        var primary_item = this.props.primary_item;
        if ((at_least_one_item_checked === true) && (primary_item !== "none")) {

            if ((index_item === primary_item) && (item["checked"] === true)) { // if the primary item is checked
                // the rest of the items are unchecked
                items = this.uncheckSecondaryItems(items, primary_item);

            } else if ((index_item !== primary_item) && (item["checked"] === true)) { // if a secondary item is checked
                
                if (this.areAllSecondaryItemsChecked(items, primary_item)) { // if all secondary items have been checked
                    // they are unchecked
                    items = this.uncheckSecondaryItems(items, primary_item);
                    // and the primary item is checked
                    items[primary_item]["checked"] = true;

                } else {
                    // the primary item is unchecked
                    items[primary_item]["checked"] = false;
                }
 
                // the primary item is unchecked
                items[primary_item]["checked"] = false;
                
            }

            // there has to be at least one checked item: if with the new change there are no checked items, 
            var example_of_checked_item = searchInArrayOfObjects("checked", true, items);
            if (example_of_checked_item === undefined){
                
                // we check the primary item
                items[primary_item]["checked"] = true;
            }

        }

        if (isObjectAFunction(this.props.onclickelement)) {
            this.props.onclickelement(this.props.index_list, items);
        }

    }

    uncheckSecondaryItems(items, primary_item_index) {

        for (var i=0; i<items.length; i++) {
            if (i !== primary_item_index) items[i]["checked"] = false;
        }

        return items;
    }

    areAllSecondaryItemsChecked(items, primary_item_index) {
        
        for (var i=0; i<items.length; i++) {
            // if we find one secondary item that is not uncheck, 
            if ( (i !== primary_item_index) && (items[i]["checked"] === false) ) {
                // the condition we are looking for is false
                return false
            }
        }

        return true

    }

    renderListCheckable(items) {

        var lastItemToRender = this.state.lastItemToRender;
        var items_to_render = items.slice(0,lastItemToRender+1);

        return (
            <div className="grid-block vertical pl_component_list_vertical_checkable_content">
                {items_to_render.map((item, index) => {
                    return (
                        <PlComponentListVerticalCheckableItem
                            index_item={index}
                            key={index}
                            name={item.name}
                            checked={item.checked}
                            onclickelement={this.onClickListCheckableItem.bind(this)} />
                        );
                    })
                }
            </div>
        );
    }

    renderListMessage() {

        if (this.state.renderListMessage) {
            return (
                <a className="grid-block align-center pl_component_list_vertical_checkable_option" onClick={this.onClickMessage.bind(this)}>
                    {this.state.listMessage}
                </a>
            );
        }

    }

    onClickMessage(e) {

        var lastItemToRender, listMessage;

        if (this.state.listMessage === "Show more") {
            lastItemToRender = this.props.items.length;
            listMessage = "Show less";

        } else if (this.state.listMessage === "Show less") {
            lastItemToRender = 4;
            listMessage = "Show more";
        }

        this.setState({
            lastItemToRender: lastItemToRender,
            listMessage: listMessage
        })
    }

    render() {

        // the title of the list is displayed starting with a capittal letter
        var name = (this.props.name[0]).toUpperCase() + (this.props.name).slice(1);
        var items = this.props.items;

        return (
            <div className="grid-block shrink vertical">
                <div className="grid-block pl_component_list_vertical_checkable_title">{name}</div>
                {this.renderListCheckable(items)}
                {this.renderListMessage()}
            </div>
        );
    }
}