import React from "react";
import { Helmet } from 'react-helmet-async';
import NavBar from "./Navigation/NavBar";
import Footer from "./Navigation/Footer";

import data from "../data/Allproducts.json";
import ProductDetails from "./ProductDetails";
import { useParams } from "react-router-dom";

export default function Catalog(props) {
  const { id } = useParams();

  let selectedProduct = "";

  if (id != null) {
    selectedProduct = data.filter((product) => product.id === id);
  }

  return (
    <div>
      <Helmet>
        <title>Shubham Computers - {selectedProduct[0].name}</title>
        <meta name="description" content="Shubham Computers - Product Details" />
      </Helmet>
      <NavBar />
      <ProductDetails product={selectedProduct} key={selectedProduct.id} />
      <Footer />
    </div>
  );
}