import React, { useState } from "react";
import "../styles/ProductDetails.scss";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function ProductDetails(props) {

  let productDetails;
  let productFeatures = [];

  productDetails = props.product[0];
  productDetails.priceAfterDiscount = (productDetails.price - (productDetails.price * productDetails.discount / 100)).toFixed(2);

  productFeatures = productDetails.features;
  const features = productFeatures.map((desc, index) => (
    <li key={desc + index}>
      {desc}
    </li>
  ));

  const [isActive, setIsActive] = useState(0);
  const [mainImg, setMainImg] = useState({
    src: productDetails.mainImg.src,
    alt: productDetails.mainImg.alt
  });

  const handleThumbClick = (thumbnail, index) => {
    setIsActive(index);
    setMainImg({
      src: thumbnail.src,
      alt: thumbnail.alt
    })
  };

  return (
    <Box sx={{
      p: { sm: 0, md: 4 },
      backgroundColor: '#EDEDED'
    }}
    >
      <div className="product-wrapper">
        <div className="product-image-wrapper">
          <div className="product-image-main">
            <img
              src={require("../assets/images/products/" +
                mainImg.src)}
              alt={mainImg.alt}
            />
          </div>
          {productDetails.thumbnails.length > 0 &&
            <div className="product-thumb-images-wrapper">
              {productDetails.thumbnails.map((thumb, index) => (
                <div className={isActive === index ? 'active' : ''} onClick={() => handleThumbClick(thumb, index)} key={index}>
                  <img src={require("../assets/images/products/" + thumb.src)}
                    alt={thumb.alt} />
                </div>
              ))}
            </div>
          }
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
              &#8377; {productDetails.priceAfterDiscount}
            </div>
            {/* {productDetails.discount > 0 && (
              <div className="product-price-before-discount">
                &#8377; {productDetails.price.toFixed()}
              </div>
            )}
            {productDetails.discount > 0 && (
              <div className="product-discount-rate">
                {productDetails.discount}%
              </div>
            )} */}
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