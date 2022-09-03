import React from "react";
import PageNotFoundImage from "../assets/images/error-1349562_1280.png";

import NavBar from "./Navigation/NavBar";
import "../styles/pagenotfound.scss";
import Footer from "./Navigation/Footer";
import HeroImage from "./Navigation/HeroImage";
import TopBanner from "./Navigation/TopBanner";

export default function PageNotFound() {
  return (
    <div>
    <TopBanner/>
    <HeroImage/>

      <NavBar />
        <div className="container-page-not_found">
        
          <img src={PageNotFoundImage} alt="NotFound" />
        </div>
      <Footer/>
    </div>
  );
}
