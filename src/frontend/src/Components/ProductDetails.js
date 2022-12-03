import React from "react";
import "../styles/ProductDetails.scss";
import Box from '@mui/material/Box';
import { useParams } from "react-router-dom";

export default function ProductDetails(props) {
  console.log('useParams ', useParams(), props)

  let ProductDetails;
  let productDescription = [];
  console.log('props.product ', props)
  props.product.map((product) => (ProductDetails = product));
  productDescription = ProductDetails.product_details;

  const description = productDescription.map((desc, index) => (
    <li key={desc + index}>
      {desc}
    </li>
  ));

  return (
    <Box sx={{
      p: 4,
      backgroundColor: '#EDEDED'
    }}
    >
      <div className="product-details-wrapper">
        <div className="product-image-wrapper">
          <img
            className="product-image-main"
            src={require("../assets/images/" +
              ProductDetails.product_image)}
            alt={ProductDetails.product_image}
          />
        </div>
        <div className="product-details-wrapper">
          <h1>{ProductDetails.productname}</h1>
          <h2>
            <span className="product-price-after-discount">
              &#8377;
              {
                (ProductDetails.price - (ProductDetails.price * ProductDetails.discount / 100)).toFixed(2)
              }
            </span>
            <span className="product-price-before-discount">
              &#8377; {ProductDetails.price.toFixed()}
            </span>
            <span className="product-discount-rate">
              -{ProductDetails.discount}%
            </span>
          </h2>
          <h3>Product Details:</h3>
          <ul className="mb-4 mt-4">
            {description}
          </ul>
        </div>
      </div>
    </Box>
  );
}