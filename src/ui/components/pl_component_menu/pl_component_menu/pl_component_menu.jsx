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

        this.setState({
            show_menu: !this.state.show_menu
        })
    }

    render_menu() {

        console.log(this.props.menu_items);

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
                                    backgroundselectedcolor={"transparent"}
                                    fontcolor={"#5C4EE5"}
                                    fonthovercolor={"white"}
                                    fontselectedcolor={"red"}
                                    bordercolor={"#5C4EE5"}
                                    borderhovercolor={"#5C4EE5"}
                                    borderselectedcolor={"red"}
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
            icon = <svg width='10' height='10' viewBox='0 0 10 10' fill-rule='evenodd'><path d='M9.8 8.6L8.4 10 5 6.4 1.4 10 0 8.6 3.6 5 .1 1.4 1.5 0 5 3.6 8.6 0 10 1.4 6.4 5z'></path></svg>;
        } else {
            icon = <svg width='20' height='14' viewBox='0 0 20 14' fill-rule='evenodd'><path d='M0 0h20v2H0zm0 6h20v2H0zm0 6h20v2H0z'></path></svg>;
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