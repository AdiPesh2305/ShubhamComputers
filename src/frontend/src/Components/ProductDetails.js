import React from "react";
import "../styles/ProductDetails.scss";
import Box from '@mui/material/Box';
import { useParams } from "react-router-dom";
import Typography from '@mui/material/Typography';

export default function ProductDetails(props) {
  console.log('useParams ', useParams(), props)

  let productDetails;
  let productDescription = [];
  console.log('props.product ', props)
  props.product.map((product) => (productDetails = product));
  productDescription = productDetails.details;

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
      <div className="product-wrapper">
        <div className="product-image-wrapper">
          <img
            className="product-image-main"
            src={require("../assets/images/products/" +
              productDetails.mainImg.src)}
            alt={productDetails.mainImg.alt}
          />
        </div>
        <div className="product-details-wrapper">
          <Typography gutterBottom variant="h1" sx={{
              fontSize: '2.5rem'
            }}>
            {productDetails.name}
          </Typography>
          <h2>
            <span className="product-price-after-discount">
              &#8377;
              {
                (productDetails.price - (productDetails.price * productDetails.discount / 100)).toFixed(2)
              }
            </span>
            <span className="product-price-before-discount">
              &#8377; {productDetails.price.toFixed()}
            </span>
            <span className="product-discount-rate">
              -{productDetails.discount}%
            </span>
          </h2>
          <Typography gutterBottom variant="h3" sx={{
              fontSize: '1.25rem'
            }}>
            Product Details
          </Typography>
          <ul className="mb-4 mt-4">
            {description}
          </ul>
        </div>
      </div>
    </Box>
  );
}