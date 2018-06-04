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
import { OverflowMenu, OverflowMenuItem } from 'carbon-components-react';

export default class PlHeader extends Component {

    constructor(props) {

        super(props);

        this.state = {}

    }

    /*onLogout() {

        this.props.on_logout();

    }*/

    render_user_authenticated(user_email) {

        return (<div className="grid-block">
            <div className="grid-block menu-options-label">Options</div>
            <div className="grid-block menu-options-button">
                <OverflowMenu className="some-class" floatingMenu>
                    <OverflowMenuItem onClick={this.onLogout.bind(this)} className="some-class" itemText="Logout"/>
                </OverflowMenu>
            </div>
            <div className="grid-block menu-options-label">{user_email}
            </div>
        </div>)
    }

    render_user_no_authenticated() {
        return (<div className="grid-block menu-options-label"> <a href="https://localhost:3000/auth/google"><i className="fi-torso"></i>Login</a> </div>);
    }

    render() {

        /*var user_header;

        if (isObjectEmpty(this.props.user_email)) {

            user_header = this.render_user_no_authenticated(); 
            

        } else {

            user_header = this.render_user_authenticated(this.props.user_email);

        }*/


        return (
            <div className="grid-block shrink pl_header">
                <div className="grid-block vertical content">
                    <h4 className="tittle">Patient line family tree viewer</h4>
                </div>
            </div>
        );
    }
}