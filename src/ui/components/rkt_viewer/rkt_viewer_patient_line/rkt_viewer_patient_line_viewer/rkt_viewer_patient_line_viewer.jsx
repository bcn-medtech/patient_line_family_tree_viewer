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
import RktViewerJPGPNGOneFrame from './../../rkt_viewer_jpg_png/rkt_viewer_jpg_png_one_frame/rkt_viewer_jpg_png_one_frame';
import RktViewerJPGPNGMultiFrame from './../../rkt_viewer_jpg_png/rkt_viewer_jpg_png_multi_frame/rkt_viewer_jpg_png_multi_frame';
import { isObjectEmpty } from '../../../../../modules/rkt_module_object';

export default class RktViewerPatientLineViewer extends Component {

    constructor() {
        super();

        this.state = {
            imageUrl: "",
            imageFile: [],
            isStack: false
        }
    }

    renderViewer() {

        if(!isObjectEmpty(this.props.resource)){
            
            var resource = this.props.resource;

            var url = {};
            
            var files;

            if("local_time_serie" in resource){

                if(!isObjectEmpty(resource.local_time_serie)){
                    
                    //files = pluck(resource.local_time_serie,"blob");
                    return (<RktViewerJPGPNGMultiFrame files={resource.local_time_serie} />);

                }else{
                    files = resource.image_blob;
                    return (<RktViewerJPGPNGOneFrame files={files} url={url} />);
                }

            }else{
                files = resource.image_blob;
                return (<RktViewerJPGPNGOneFrame files={files} url={url} />);
            }            
        }
        
    }

    render() {
        return (
            <div className="grid-block vertical rkt_viewer_patient_line_viewer">
                {this.renderViewer()}
            </div>
        );
    }
}