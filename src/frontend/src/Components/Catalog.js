import React from "react";
import NavBar from "./Navigation/NavBar";
import Footer from "./Navigation/Footer";

import data from "../data/Allproducts.json";
import ProductDetails from "./ProductDetails";
import { useParams } from "react-router-dom";

export default function Catalog(props) {
  const {id} = useParams();

  let selectedProduct = "";
 
  if (id != null) {
    selectedProduct = data.filter((product) => product.id === id);
  }

  console.log('selectedProduct ', selectedProduct)

  return (
    <div>
      <NavBar />
      <ProductDetails product={selectedProduct} key={selectedProduct.id} />
      <Footer />
    </div>
  );
}