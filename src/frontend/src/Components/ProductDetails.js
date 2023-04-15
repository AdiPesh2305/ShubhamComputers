import React, { useState } from "react";
import "../styles/ProductDetails.scss";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function ProductDetails(props) {

  let productDetails = props.product;
  
  const features = productDetails.features.map((desc, index) => (
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
              src={`/images/products/${mainImg?.src}.jpg`}
              alt={mainImg.alt}
            />
          </div>
          {productDetails.thumbnails.length > 0 &&
            <div className="product-thumb-images-wrapper">
              {productDetails.thumbnails.map((thumb, index) => (
                <div className={isActive === index ? 'active' : ''} onClick={() => handleThumbClick(thumb, index)} key={index}>
                  <img 
                    src={`/images/products/${thumb?.src}.jpg`}
                    alt={thumb.alt} 
                  />
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
            {productDetails.name.toUpperCase()}
          </Typography>
          <div className="product-price-wrapper">
            &#8377; {productDetails.price}
          </div>
          {productDetails.description &&
            <>
              <Typography gutterBottom variant="h3" sx={{
                fontSize: '1.25rem',
                m: 0
              }}>
                Product Description
              </Typography>
              <div className="product-description">{productDetails.description}</div>
            </>
          }
          {productDetails.features.length > 0 &&
            <>
              <Typography gutterBottom variant="h3" sx={{
                fontSize: '1.25rem',
                m: 0
              }}>
                Product Features
              </Typography>
              <ul className="product-features-list">
                {features}
              </ul>
            </>
          }
        </div>
      </div>
    </Box>
  );
}