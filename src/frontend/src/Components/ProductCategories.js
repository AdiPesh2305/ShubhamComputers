import React, { useState, useEffect } from "react";
import axios from "../services";
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { Link } from 'react-router-dom';

export default function ProductCategories() {

  const [productCategories, setProductCategories] = useState([]);

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
          "routeTo": category[4],
          'btnText': 'Learn More',
        }
      });

      setProductCategories(allCategories);
    }
    catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchProductCategories();
  }, []);

  return (
    <Container maxWidth="xl" sx={{
      flexDirection: { xs: 'column', sm: 'row' },
      gap: { sm: '15px', lg: '2rem' },
      display: 'flex',
      flexWrap: { sm: 'wrap' },
      p: { xs: 2, md: 4 },
      pb: { xs: 0, md: 4 },
      backgroundColor: '#EDEDED',
    }}>
      {productCategories.map((product) => (
        <Card sx={{
          flexBasis: { sm: '49%', md: '23%' },
          mb: { xs: 2, md: 0 }
        }} key={product.heading}>
          <CardActionArea>
            <div className='card-media-wrapper'>
              <CardMedia
                component="img"
                // image={product.imgSrc}
                image={`/images/homePageProducts/${product?.imgSrc}`}
                alt={product.imgAlt}
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