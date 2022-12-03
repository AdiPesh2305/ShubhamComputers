import React from "react";
import "../../styles/HeroImage.scss";
import HeroBkgImage from '../../assets/images/1.jpg';

export default function HeroImage(props) {

  return (
    <div className='hero-wrapper'>
      {/* <video src='/videos/video-1.mp4' autoPlay loop muted /> */}
      <img
        src={HeroBkgImage}
        alt="logo"
      />
      <h1>SHUBHAM COMPUTERS</h1>
      <p>COMPUTER ACCESSORIES and more...</p>
    </div>
  );
}
