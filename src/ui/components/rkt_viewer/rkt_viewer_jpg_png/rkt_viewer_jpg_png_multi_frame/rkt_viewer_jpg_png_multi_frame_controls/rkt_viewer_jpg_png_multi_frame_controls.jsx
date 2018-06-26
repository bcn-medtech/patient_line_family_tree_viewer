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
//Components

//actions
//import { loadvideo } from './rkt_viewer_jpg_png_multi_frame_actions';
//objects
import { isObjectEmpty } from '../../../../../../modules/rkt_module_object';

export default class RktViewerJPGPNGMultiFrameControls extends Component {

    constructor() {
        super();

        this.state = {};
        this.timer = false;
    }

    //Life cycle methods
    componentDidMount() {

        this.setState({
            mode: "pause",
            current_frame: 0
        });
    }

    shouldComponentUpdate(nextProps, nextState) {

        if (this.props.number_frames !== nextProps.number_frames || this.state.current_frame !== nextState.current_frame || this.state.mode !== nextState.mode) {
            return true;
        } else {
            return false;
        }

    }

    componentWillReceiveProps(nextProps) {

        this.onUserIsNotPlayingWithTheViewer(nextProps);

    }

    //Viewer controls
    viewer_play() {

        this.setState({
            mode: "play"
        });

        var myComponent = this;

        this.timer = setInterval(function () {

            var current_frame = myComponent.state.current_frame;
            var next_frame = current_frame + 1;
            var num_frames = myComponent.props.number_frames;

            if (next_frame < num_frames) {

                myComponent.setState({
                    current_frame: next_frame
                });

                myComponent.props.onNavigate(next_frame);

            } else {

                myComponent.setState({
                    current_frame: 0
                });

                myComponent.props.onNavigate(0);
            }

        }, 50);

    }

    viewer_stop() {

        this.setState({
            mode: "pause"
        });

        clearInterval(this.timer);

    }

    viewer_setFrame(frame_index) {

        this.props.onNavigate(frame_index);

        this.setState({
            current_frame: frame_index
        });
    }


    //Events

    onUserIsNotPlayingWithTheViewer(nextProps) {

        if(nextProps.user_is_playing_with_the_viewer === false){

            if(this.state.mode === "play"){

                this.viewer_stop();

            }
        }
    }

    //User interface events
    onChangeSlider(event) {

        var current_image_index = parseInt(event.currentTarget.value, 10);
        var number_frames = this.props.number_frames;

        if (current_image_index < number_frames) {

            this.viewer_setFrame(current_image_index);

        }

    }

    onClickPlayButton() {

        if (this.state.mode === "pause") {

            this.viewer_play();

        } else if (this.state.mode === "play") {

            this.viewer_stop();

        }
    }

    render_play_button() {

        if (this.state.mode === "pause") {

            return (
                <div className="grid-block shrink play" onClick={this.onClickPlayButton.bind(this)}>
                    <a><i className="fi-play"></i></a>
                </div>
            );

        } else if (this.state.mode === "play") {

            return (
                <div className="grid-block shrink play" onClick={this.onClickPlayButton.bind(this)}>
                    <a><i className="fi-pause"></i></a>
                </div>
            );
        }
    }

    render_slider() {

        var num_frames = this.props.number_frames;
        var num_frame = this.state.current_frame;

        if (num_frame !== undefined && num_frames !== undefined) {

            return (

                <div className="grid-block ">
                    <div className="grid-block">
                        <input type="range" className="slider-controler" onInput={this.onChangeSlider.bind(this)} value={num_frame} max={num_frames - 1} />
                    </div>
                    <div className="grid-block slider-label">
                        {num_frame}/{num_frames - 1}
                    </div>
                </div>
            )
        }
    }

    render() {

        return (

            <div className="grid-block rkt_viewer_jpg_png_multi_frame_controls">
                {this.render_play_button()}
                {this.render_slider()}
            </div>

        )
    }

}

RktViewerJPGPNGMultiFrameControls.defaultProps = {

};