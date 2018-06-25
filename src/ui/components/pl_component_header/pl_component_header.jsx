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

//modules
import { isObjectEmpty } from './../../../modules/rkt_module_object';

export default class PlHeader extends Component {

    constructor(props) {

        super(props);

        this.state = {}

    }

    /*onLogout() {

        this.props.on_logout();

    }*/

    handleAuthenticationClick(action) {
        
        this.props.handle_authentication(action);
        //window.gapi.auth2.getAuthInstance().signIn();

    }

    // handleSignOutClick() {

    //     this.props.on_log_out();
    //     window.gapi.auth2.getAuthInstance().signOut();

    // }

    render_user_no_authenticated() {
        return (
            <div className="grid-block menu-options-label">
                <a onClick={this.handleAuthenticationClick.bind(this, "sign in")}>
                    <i className="fi-torso"></i>
                    Login
                </a>
            </div>
        );
    }

    render_user_authenticated(user_email) {

        return (<div className="grid-block">
            <div className="grid-block menu-options-label">Options</div>
            <div className="grid-block menu-options-button">
                <OverflowMenu className="some-class" floatingMenu>
                    <OverflowMenuItem onClick={this.handleAuthenticationClick.bind(this, "sign out")} className="some-class" itemText="Log out" />
                </OverflowMenu>
            </div>
            <div className="grid-block menu-options-label">{user_email}
            </div>
        </div>)
    }

    render() {

        var user_header;

        /*if (!this.props.isUserSignedIn) {

            user_header = this.render_user_no_authenticated(); 
            

        } else {

            user_header = this.render_user_authenticated(this.props.user_email);

        }*/


        return (
            <div className="grid-block shrink pl_header">
                <div className="grid-block vertical content">
                    <div className="grid-block shrink">
                        <svg className="grid-block shrink pl_header_logo" width="90" height="60" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                            <g>
                                <g transform="translate(-120,-35)">
                                    <line strokeWidth="5" strokeLinecap="null" strokeLinejoin="null" id="svg_13" y2="63.583315" x2="165.749137" y1="96.082784" x1="138.582915" strokeOpacity="1" stroke="white" fill="none" />
                                    <line strokeWidth="5" strokeLinecap="null" strokeLinejoin="null" id="svg_14" y2="63.583315" x2="219.75002" y1="96.082784" x1="192.583798" strokeOpacity="1" stroke="white" fill="none" />
                                    <ellipse fill="#e27030" strokeWidth="0" strokeOpacity="null" cx="220.000053" cy="62.999989" id="svg_8" rx="5.999946" ry="6.249968" stroke="#000" />
                                    <line transform="rotate(101 178.9170227050781,80.58304595947264) " strokeWidth="5" strokeLinecap="null" strokeLinejoin="null" id="svg_15" y2="64.333312" x2="192.500139" y1="96.832781" x1="165.333916" strokeOpacity="1" stroke="white" fill="none" />
                                    <ellipse fill="#e2b933" strokeWidth="0" strokeOpacity="null" cx="192" cy="96.25018" id="svg_5" rx="5.999946" ry="6.249968" stroke="#000" />
                                    <ellipse fill="#3ad840" strokeWidth="0" strokeOpacity="null" cx="166" cy="62.999989" id="svg_2" rx="5.999946" ry="6.249968" stroke="#000" />
                                    <ellipse fill="#3a99d8" strokeWidth="0" strokeOpacity="null" fillOpacity="null" cx="138" cy="96.25018" id="svg_6" rx="5.999946" ry="6.249968" stroke="#000" />
                                </g>
                            </g>
                        </svg>
                        <h4 className="grid-block shrink tittle">Patient line family tree viewer</h4>
                    </div>
                </div>
                {/* <div id="sign-in-button" className="grid-block shrink align-center text-center pl-signin-message">
                    <p>
                        <a onClick={this.handleSignInClick.bind(this)}>LOG IN</a> 
                    </p>
                </div> */}
                {/*user_header*/}
            </div>
        );
    }
}