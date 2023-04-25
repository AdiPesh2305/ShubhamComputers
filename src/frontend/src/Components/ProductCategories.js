import React, { useState, useEffect } from "react";
import axios from "../api/services";
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import PlaceholderImage from '../assets/images/logo.png';

export default function ProductCategories() {

  const [productCategories, setProductCategories] = useState(JSON.parse(sessionStorage.getItem('productCategories')) || []);

  const fetchProductCategories = async () => {
    try {
      let allCategories = null;

      const response = await axios.get(`/${process.env.REACT_APP_GOOGLE_SHEET_ID}/values/categories`);
      response.data.values.shift(); //Remove first row which is column headers from data

      allCategories = response.data.values.map((category, index) => {
        return {
          "heading": category[0].toLowerCase(),
          "description": category[1],
          "imgSrc": category[2],
          "imgAlt": category[3],
          "routeTo": `/products/${category[4]}`,
          'btnText': 'Learn More',
        }
      });

      sessionStorage.setItem('productCategories', JSON.stringify(allCategories));
      initializeProductCategories(allCategories);
    }
    catch (error) {
      console.log(error);
    }
  }

  const initializeProductCategories = (allProductCategories) => {
    setProductCategories(allProductCategories);
  }

  // To check for session storage
  const storeProductCategories = async () => {
    const hours = 0.01; // to clear the sessionStorage after 1 hour

    const now = new Date().getTime();
    let setupTime = sessionStorage.getItem('setupTime');

    if (setupTime == null) {
      sessionStorage.setItem('setupTime', now);
      await fetchProductCategories();
      console.log('session set')
    }
    else {
      if (now - setupTime > hours * 60 * 60 * 1000) {
        sessionStorage.removeItem('setupTime');
        sessionStorage.setItem('setupTime', now);
        await fetchProductCategories();
        console.log('session refreshed')
      }
      else {
        console.log('session exists')
        console.log('productCategories from session ', productCategories)
        if (productCategories.length) {
          initializeProductCategories(productCategories);
        }
      }
    }
  }

  useEffect(() => {
    storeProductCategories();
  }, []);

  return (
    <Container maxWidth="xl" sx={{
      flexDirection: { xs: 'column', sm: 'row' },
      gap: { sm: '15px', lg: '2rem' },
      display: 'flex',
      flexWrap: { sm: 'wrap' },
      p: { xs: 2, md: 4 },
      pb: { xs: 0, md: 4 },
      backgroundColor: '#FAFAFA',
    }}>
      {productCategories.map((product) => (
        <Card sx={{
          flexBasis: { sm: '49%', md: '23%' },
          mb: { xs: 2, md: 0 },
          border: '1.5px solid #ccc'
        }} key={product.heading}>
          <CardActionArea>
            <div className='card-media-wrapper'>
              <LazyLoadImage 
                src={`/images/homePageProducts/${product?.imgSrc}`}
                alt={product.imgAlt}
                placeholderSrc={PlaceholderImage}
                effect="blur"
              />
            </div>
            <CardContent>
              <Typography gutterBottom variant="h3" sx={{
                fontSize: { xs: '1.5rem' },
                textTransform: 'uppercase'
              }}>
                {product.heading}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {product.description}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions
            sx={{
              justifyContent: 'end',
              pr: 2,
            }}>
            <Button size="small" component={Link} to={product.routeTo}>
              {product.btnText}
            </Button>
          </CardActions>
        </Card>
      ))}
    </Container>
  );
}