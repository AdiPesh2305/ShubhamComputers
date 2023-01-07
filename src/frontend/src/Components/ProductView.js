import React from "react";
import { Helmet } from 'react-helmet-async';
import NavBar from "./Navigation/NavBar";
import Footer from "./Navigation/Footer";
import ProductDetails from "./ProductDetails";

export default function Catalog() {

  const product = JSON.parse(sessionStorage.getItem('product'));

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