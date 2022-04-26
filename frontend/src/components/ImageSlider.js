import React, { Component } from 'react';
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import '../App.scss';

export default class ImageSlider extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      galleryItems: [],
    };
  }
  
  responsive = {
    0: { items: 1 },
    1024: { items: 2 },
  }

  importAll(r) {
    return r.keys().map(r);
  }

  componentDidMount() {

    const listOfImages = this.importAll(require.context('../Images/image_slider', false, /\.(png|jpe?g|svg)$/));
    
    const img = listOfImages.map(
      (image, index) =>    <img  src={image}  alt=""></img>
    )

    this.setState({
      galleryItems: img
    });
  }

  render() {
    return (
      <div >
        <AliceCarousel
        items={this.state.galleryItems}
        responsive={this.responsive}
        autoPlay
        autoPlayInterval={3000}
        disableDotsControls
        disableButtonsControls
        // mouseTrackingEnabled={true}

        />
      </div>
    )
  }
}
