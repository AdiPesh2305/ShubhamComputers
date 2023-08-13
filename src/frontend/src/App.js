import React, { Suspense, lazy, useState, useEffect } from "react";
import axios from "./api/services";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import "./styles/App.scss";
import 'react-lazy-load-image-component/src/effects/blur.css';
import Loader from "./Components/Loader";

const NavBar = lazy(() => import("./Components/Navigation/NavBar"));
const Footer = lazy(() => import("./Components/Navigation/Footer"));
const Homepage = lazy(() => import("./Components/Homepage"));
const About = lazy(() => import("./Components/About"));
const Contact = lazy(() => import("./Components/Contact"));
const Products = lazy(() => import("./Components/Products"));
const ProductView = lazy(() => import("./Components/ProductView"));
const PageNotFound = lazy(() => import("./Components/PageNotFound"));

function App() {
  const [productCategories, setProductCategories] = useState(JSON.parse(sessionStorage.getItem('productCategories')) || []);
  const fetchProductCategories = async () => {
    try {
      let allCategories = null;

      const response = await axios.get(`/${process.env.REACT_APP_GOOGLE_SHEET_ID}/values/categories`);
      response.data.values.shift(); //Remove first row which is column headers from data

      allCategories = response.data.values.map((category, index) => {
        return {
          "heading": category[0].toLowerCase(),
          "description": category[1],
          "imgSrc": category[2],
          "imgAlt": category[3],
          "routeTo": `/products/${category[4]}`,
          'btnText': 'Explore More',
        }
      });

      sessionStorage.setItem('productCategories', JSON.stringify(allCategories));
      initializeProductCategories(allCategories);
    }
    catch (error) {
      console.log(error);
    }
  }

  const initializeProductCategories = (allProductCategories) => {
    setProductCategories(allProductCategories);
  }

  // To check for session storage
  const storeProductCategories = async () => {
    const hours = 0; // to clear the sessionStorage after 1 hour
    // if someone want to clear after 8hrs simply change hours = 8

    const now = new Date().getTime();
    let productCategoriesSession = sessionStorage.getItem('productCategoriesSession');

    if (productCategoriesSession == null) {
      sessionStorage.setItem('productCategoriesSession', now);
      await fetchProductCategories();
      console.log('session set')
    }
    else {
      if (now - productCategoriesSession > hours * 60 * 60 * 1000) {
        sessionStorage.removeItem('productCategoriesSession');
        sessionStorage.setItem('productCategoriesSession', now);
        await fetchProductCategories();
        console.log('session refreshed')
      }
      else {
        console.log('session exists')
        console.log('productCategories from session ', productCategories)
        if (productCategories.length) {
          initializeProductCategories(productCategories);
        }
      }
    }
  }

  useEffect(() => {
    storeProductCategories();
  }, []);

  return (
    <Router>
      <Suspense
        fallback={
          <Loader />
        }
      >
        <NavBar categories={productCategories}/>
        <HelmetProvider>
          <Routes>
            <Route exact path="/" element={<Homepage productCategories={productCategories} />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/contact-us" element={<Contact />} />
            <Route exact path="/products" element={<Products />} />
            <Route exact path="/products/:route" element={<Products />} />
            <Route exact path="/products/view/:name" element={<ProductView />} />
            <Route path="/*" element={<PageNotFound />} />
          </Routes>
        </HelmetProvider>
        <Footer />
      </Suspense>
    </Router>
  );
}

export default App;