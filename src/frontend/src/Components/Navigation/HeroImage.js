import React from "react";
import "../../styles/HeroImage.scss";
import HeroBkgImage from '../../assets/images/1.jpg';

export default function HeroImage() {

  return (
    <div className='hero-wrapper'>
      <img
        src={HeroBkgImage}
        alt="logo"
      />
      <h1>SHUBHAM COMPUTERS</h1>
      <p>COMPUTER ACCESSORIES and more...</p>
    </div>
  );
}
