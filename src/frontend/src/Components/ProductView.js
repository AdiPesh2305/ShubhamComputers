import React, { useState, useEffect } from "react";
import { Helmet } from 'react-helmet-async';
import { useLocation, useParams } from 'react-router-dom';
import "../styles/ProductView.scss";
import NavBar from "./Navigation/NavBar";
import Footer from "./Navigation/Footer";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import axios from "../api/services";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import PlaceholderImage from '../assets/images/logo.png';

export default function Catalog({productCategories}) {
  const { name } = useParams();
  const location = useLocation();
  console.log('location ', location, name);

  const [product, setProduct] = useState(location.state || null);
  const [features, setFeatures] = useState(location.state ? location.state.features.map((desc, index) => <li key={index}>{desc}</li>) : []);
  const [mainImg, setMainImg] = useState(location.state ? {
    src: location.state.mainImg.src,
    alt: location.state.mainImg.alt
  } : {});
  const [isActive, setIsActive] = useState(0);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`https://docs.google.com/spreadsheets/d/1ZvGw6Rj62R7tGGzCXn8GdiRQKOe0TrEWBlQSm2EPnCc/gviz/tq?tqx=out:csv&range=A2:L&sheet=testing&tq=SELECT%20*%20WHERE%20C%20=%20%27${name}%27`);

      const formattedResponse = response.data.replace(/(\r\n|\n|\r|")/gm, " ").split(' ,');
      console.log('formattedResponse ', formattedResponse)

      let allFeatures = formattedResponse[4].split('.');
      let allCategories = formattedResponse[0].split('.');
      let allThumbnailsSrc = formattedResponse[10].split('.');
      let allThumbnailsAlt = formattedResponse[11].split('.');

      let fetchedProduct = {
        "name": formattedResponse[2].toLowerCase().trim(),
        "description": formattedResponse[3].trim(),
        "features": allFeatures.map(feature => feature.trim()),
        "price": formattedResponse[6].trim(),
        "link": formattedResponse[5],
        // "categories": allCategories.map(category => category.trim().toLowerCase().replaceAll(' ', '-')),
        "categories": allCategories.map(category => category.trim().toLowerCase()),
        "keywords": formattedResponse[7].split(' '),
        "mainImg": {
          "src": formattedResponse[8].trim(),
          "alt": formattedResponse[9].trim(),
        },
        "thumbnails": allThumbnailsSrc.map((thumbnail, index) => {
          return {
            "src": thumbnail.trim(),
            "alt": allThumbnailsAlt[index].trim()
          }
        })
      }

      console.log('fetchedProduct ', fetchedProduct)
      setProduct(fetchedProduct);
      setFeatures(fetchedProduct.features.map((desc, index) => <li key={index}>{desc}</li>))
      setMainImg(fetchedProduct.mainImg);
    }
    catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (location.state == null) {
      fetchProduct();
    }
  }, []);

  const handleThumbClick = async (thumbnail, index) => {
    setIsActive(index);
    setMainImg({
      src: thumbnail.src,
      alt: thumbnail.alt
    })
  };

  return (
    product && <div>
      <Helmet>
        <title>Shubham Computers - {product.name}</title>
        <meta name="description" content="Shubham Computers - Product Details" />
      </Helmet>
      <NavBar categories={productCategories}/>
      <Box sx={{
        p: { sm: 0, md: 4 },
        backgroundColor: '#FAFAFA'
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
                    {/* <img
                      src={`/images/products/${thumb?.src}.jpg`}
                      alt={thumb.alt}
                    /> */}
                     <LazyLoadImage 
                      src={`/images/products/${thumb?.src}.jpg`}
                      alt={thumb.alt}
                      placeholderSrc={PlaceholderImage}
                      effect="blur"
                    />
                  </div>
                ))}
              </div>
            }
          </div>
          <div className="product-details-wrapper">
            <Typography gutterBottom variant="h1" sx={{
              fontSize: '2.5em',
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
                  fontSize: '1.25em',
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
                  fontSize: '1.25em',
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