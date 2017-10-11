import 'aframe';
import 'aframe-particle-system-component';
import {Entity, Scene} from 'aframe-react';
import React, {Component} from 'react';
import {connect} from 'react-redux';

function VRCity(props){
        const currentGalleryId = props.match.params.id;
        const galleries = props.galleriesCollection;
        const currentGallery = galleries.length && galleries.filter(gallery => +gallery.id === +currentGalleryId)[0];
        let paintings;   //current galleries will be async, we have to wait for it to come in before we can define paintings 
        if(currentGallery){
            paintings= currentGallery.paintings;
        }
        // DEFINE ALL YOUR IMAGE TEXTURES HERE AND SAVE THEM AS CONSTANTS 
        // EX.) const marbleTexture = 'https://ucarecdn.com/1b213dc4-386d-4978-8fe5-9b021b23c945/';
        // YOU WILL BE USING THEM ON YOU OBJECTS BELOW
        console.log('paintings', paintings);
        return(
            paintings?
            <Scene>
                <a-curvedimage 
                    position="0 3 -16" 
                    rotation="0 -27 0"
                    height="3.0"
                    radius="4.0"
                    theta-length="60" 
                    src={paintings[0].url}>
                </a-curvedimage>

                <a-curvedimage 
                    position="16 3 0" 
                    rotation="0 240 0"
                    height="3.0"
                    radius="4.0"
                    theta-length="60" 
                    src={paintings[1].url}>
                </a-curvedimage>          
            
                <a-curvedimage 
                    position="0 3 16" 
                    rotation="0 150 0"
                    height="3.0"
                    radius="4.0"
                    theta-length="60" 
                    src={paintings[2].url}>
                </a-curvedimage>

                <a-curvedimage 
                position="-15 3 3" 
                rotation="0 60 0"
                height="3.0"
                radius="4.0"
                theta-length="60" 
                src={paintings[3].url}>
            </a-curvedimage>  

            <a-entity environment="preset: starry"></a-entity>            
          </Scene>
            :
            null
        );
    
}

const mapState = function(state){
    return {
        galleriesCollection: state.galleries.galleryCollection,
    }
};

export default connect(mapState)(VRCity);

/*
           <Scene>
            <a-assets>
            <a-asset-item id="cityModel" src="https://cdn.aframe.io/test-models/models/virtualcity/VC.gltf"></a-asset-item>
            </a-assets>

            <a-gltf-model src="#cityModel"></a-gltf-model>
            </Scene>
*/