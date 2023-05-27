import React from "react";
import "../../styles/HeroImage.scss";
import HeroImg from '../../assets/images/hero-image.jpg';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const HeroImage = () => {
  return (
    <div className='hero-wrapper'>
      <LazyLoadImage
        src={HeroImg}
        alt=""
        effect="blur"
      />
      <h1>SHUBHAM COMPUTERS</h1>
      <p>COMPUTER ACCESSORIES and more...</p>
    </div>
  );
}

export default React.memo(HeroImage);