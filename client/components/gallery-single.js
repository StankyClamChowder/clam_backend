import React, { Component } from 'react';
import { NavLink, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import store from '../store';

class SingleGallery extends Component{

  render(){
    console.log('SINGL GALLERY PROPS', this.props);
    const currentGalleryId = this.props.match.params.id;
    console.log(currentGalleryId);
    const galleries = this.props.galleryCollection;
    const currentGallery = galleries.length && galleries.filter(gallery => +gallery.id === +currentGalleryId)[0];

    console.log('CURRENT GALLERY', currentGallery);
    return (
            <div>
            <h1>{currentGallery.title}</h1>
                <Link to={`/vr/${currentGallery.id}`}><button className="btn btn-danger" style={{backgroundColor: 'red'}}>Enter VR</button></Link>
                <h3>map over images</h3>
                    <a href="https://tranquil-island-62126.herokuapp.com/canvas.html"><button className="btn btn-success">Create an Image</button></a>
            </div>
    );
  }

}

const mapState = (state, ownProps) => {
  return {
    galleryCollection: state.galleries.galleryCollection,
  };
};

export default connect(mapState)(SingleGallery);
