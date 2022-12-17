import React from "react";
import "../styles/ProductDetails.scss";
import Box from '@mui/material/Box';
import { useParams } from "react-router-dom";
import Typography from '@mui/material/Typography';

export default function ProductDetails(props) {
  console.log('useParams ', useParams(), props)

  let productDetails;
  let productFeatures = [];
  // console.log('props.product ', props)
  props.product.map((product) => (productDetails = product));
  productDetails.priceAfterDiscount = (productDetails.price - (productDetails.price * productDetails.discount / 100)).toFixed(2);

  productFeatures = productDetails.features;
  const features = productFeatures.map((desc, index) => (
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
            fontSize: '2.5rem',
            mb: 0
          }}>
            {productDetails.name}
          </Typography>
          <section className="product-price-wrapper">
            <div className="product-price-after-discount">
              &#8377;
              {
                (productDetails.price - (productDetails.price * productDetails.discount / 100)).toFixed(2)
              }
            </div>
            <div className="product-price-before-discount">
              &#8377; {productDetails.price.toFixed()}
            </div>
            <div className="product-discount-rate">
              {productDetails.discount}%
            </div>
          </section>
          {productDetails.description &&
            <div>
              <Typography gutterBottom variant="h3" sx={{
                fontSize: '1.25rem',
                m: 0
              }}>
                Product Description
              </Typography>
              <div className="product-description">{productDetails.description}</div>
            </div>
          }
          {productFeatures.length > 0 &&
            <div>
              <Typography gutterBottom variant="h3" sx={{
                fontSize: '1.25rem',
                m: 0
              }}>
                Product Features
              </Typography>
              <ul className="product-features-list">
                {features}
              </ul>
            </div>
          }
        </div>
      </div>
    </Box>
  );
}