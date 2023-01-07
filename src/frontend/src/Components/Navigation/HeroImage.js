import React from "react";
import "../../styles/HeroImage.scss";
import HeroImg from '../../assets/images/hero-image.jpg';

export default function HeroImage() {

  return (
    <div className='hero-wrapper'>
      <img
        src={HeroImg}
        alt=""
      />
      <h1>SHUBHAM COMPUTERS</h1>
      <p>COMPUTER ACCESSORIES and more...</p>
    </div>
  );
}
