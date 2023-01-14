import React from "react";
import { Helmet } from 'react-helmet-async';
import { useLocation, useParams } from 'react-router-dom';

import NavBar from "./Navigation/NavBar";
import Footer from "./Navigation/Footer";
import ProductDetails from "./ProductDetails";

export default function Catalog() {

  const { name } = useParams();
  const location = useLocation();
  console.log('location ', location, name);
  
  const product = location.state || JSON.parse(sessionStorage.getItem('product'));

  return (
    <div>
      <Helmet>
        <title>Shubham Computers - {product.name}</title>
        <meta name="description" content="Shubham Computers - Product Details" />
      </Helmet>
      <NavBar />
      <ProductDetails product={product} />
      <Footer />
    </div>
  );
}