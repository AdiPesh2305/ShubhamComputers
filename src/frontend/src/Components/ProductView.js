import React, { useState } from "react";
import { Helmet } from 'react-helmet-async';
import { useLocation, useParams } from 'react-router-dom';
import "../styles/ProductView.scss";
import NavBar from "./Navigation/NavBar";
import Footer from "./Navigation/Footer";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function Catalog() {

  const { name } = useParams();
  const location = useLocation();
  console.log('location ', location, name);

  const product = location.state || JSON.parse(sessionStorage.getItem('product'));

  const features = product.features.map((desc, index) => (
    <li key={desc + index}>
      {desc}
    </li>
  ));

  const [isActive, setIsActive] = useState(0);
  const [mainImg, setMainImg] = useState({
    src: product.mainImg.src,
    alt: product.mainImg.alt
  });

  const handleThumbClick = (thumbnail, index) => {
    setIsActive(index);
    setMainImg({
      src: thumbnail.src,
      alt: thumbnail.alt
    })
  };

  return (
    <div>
      <Helmet>
        <title>Shubham Computers - {product?.name}</title>
        <meta name="description" content="Shubham Computers - Product Details" />
      </Helmet>
      <NavBar />
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
            {product.thumbnails.length > 0 &&
              <div className="product-thumb-images-wrapper">
                {product.thumbnails.map((thumb, index) => (
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
              {product.name.toUpperCase()}
            </Typography>
            <div className="product-price-wrapper">
              &#8377; {product.price}
            </div>
            {product.description &&
              <>
                <Typography gutterBottom variant="h3" sx={{
                  fontSize: '1.25rem',
                  m: 0
                }}>
                  Product Description
                </Typography>
                <div className="product-description">{product.description}</div>
              </>
            }
            {product.features.length > 0 &&
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
      <Footer />
    </div>
  );
}