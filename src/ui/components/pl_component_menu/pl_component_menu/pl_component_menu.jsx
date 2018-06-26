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
import { isObjectAFunction } from './../../../../modules/rkt_module_object';
import { PlComponentButtonCircle } from './../../pl_component_button/pl_component_button_circle/pl_component_button_circle';
import { PlComponentButtonCircleSelectable } from './../../pl_component_button/pl_component_button_circle_selectable/pl_component_button_circle_selectable';

export class PlComponentMenu extends Component {

    constructor() {

        super()

        this.state = {
            show_menu: false
        };

    }

    onClickButton(item){

        if (isObjectAFunction(this.props.on_click_button)) {
            this.props.on_click_button(item);
        }

    }

    onClickMenuButton(item) {

        if(this.state.show_menu){
            
            this.setState({
                show_menu: false
            })

            if (isObjectAFunction(this.props.on_click_button)) {
                this.props.on_click_button("close");
            }

        }else{
            
            this.setState({
                show_menu: true
            })
        }

    }

    render_menu() {

        var menu_items = this.props.menu_items;

        return (

                <div className="grid-block bottom-menu">

                    {
                        menu_items.map((item, index) => {

                            if("selected" in item){
                                return (
                                    <PlComponentButtonCircleSelectable
                                    text={""}
                                    icon={item.icon}
                                    backgroundcolor={"transparent"}
                                    backgroundhovercolor={"#5C4EE5"}
                                    backgroundselectedcolor={"#5C4EE5"}
                                    fontcolor={"#5C4EE5"}
                                    fonthovercolor={"white"}
                                    fontselectedcolor={"white"}
                                    bordercolor={"#5C4EE5"}
                                    borderhovercolor={"#5C4EE5"}
                                    borderselectedcolor={"#5C4EE5"}
                                    selected={item.selected}
                                    onclickelement={this.onClickButton.bind(this, item.name)} />
                                )
                            }else{
                                return(
                                    <PlComponentButtonCircle
                                    text={""}
                                    icon={item.icon}
                                    backgroundcolor={"transparent"}
                                    backgroundhovercolor={"#5C4EE5"}
                                    fontcolor={"#5C4EE5"}
                                    fonthovercolor={"white"}
                                    bordercolor={"#5C4EE5"}
                                    borderhovercolor={"#5C4EE5"}
                                    onclickelement={this.onClickButton.bind(this, item.name)} />
                                );
                            }
                            
                        })
                        
                    }

                </div>
            
        );
    }

    render() {

        var menu;
        var icon;

        if (this.state.show_menu) {
            menu = this.render_menu();
            icon = <svg width='10' height='10' viewBox='0 0 10 10' fillRule='evenodd'><path d='M9.8 8.6L8.4 10 5 6.4 1.4 10 0 8.6 3.6 5 .1 1.4 1.5 0 5 3.6 8.6 0 10 1.4 6.4 5z'></path></svg>;
        } else {
            icon = <svg width='20' height='14' viewBox='0 0 20 14' fillRule='evenodd'><path d='M0 0h20v2H0zm0 6h20v2H0zm0 6h20v2H0z'></path></svg>;
        }

        return (
            <div className="grid-block ">

                {menu}
                <div className="grid-block">
                    <PlComponentButtonCircle
                        text={""}
                        icon={icon}
                        backgroundcolor={"transparent"}
                        backgroundhovercolor={"#5C4EE5"}
                        fontcolor={"#5C4EE5"}
                        fonthovercolor={"white"}
                        bordercolor={"#5C4EE5"}
                        borderhovercolor={"#5C4EE5"}
                        onclickelement={this.onClickMenuButton.bind(this, "item")} />
                </div>

            </div>
        );
    }
}