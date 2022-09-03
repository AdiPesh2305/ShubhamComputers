import React from "react";
import "../../styles/HeroImage.scss";

export default function HeroImage(props) {
  
  return (
    <div className='hero-container'>
      <video src='/videos/video-1.mp4' autoPlay loop muted />
      <h1>SHUBHAM COMPUTERS</h1>
      <p>COMPUTER & ACCESSORIES</p>
    </div>
  );
}
