import React, { useContext } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { Button, CardActionArea, CardActions } from '@mui/material';
import icImage from '../assets/images/ic.jpg';
import { GlobalCartContext } from '../context/CartContext';
import { v4 as uuidv4 } from 'uuid';
import "../styles/Product.scss";

export default function Product(props) {
  // console.log(props)
  // const product = props.data;
  // console.log('product ', product)
  const product = {
    'id': 'product3',
    'heading': 'IC',
    'imgSrc': icImage,
    'imgAlt': 'IC image',
    'price': '999',
    'discountedPrice': '1,999',
    'routeTo': '/'
  }

  return (
    <Card sx={{
      flexBasis: { sm: '48%', md: '23%' },
      margin: { sm: '1%' },
      position: 'relative'
    }} key={product.id} className='product-list'>
      <CardActionArea component={Link} to={product.routeTo}>
        <CardMedia
          component="img"
          height="180"
          image={product.imgSrc}
          alt={product.imgAlt}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {product.heading}
          </Typography>
          <section className="product-price-wrapper">
            <div>₹ 999.00</div>
            <div>₹ 1,999.00</div>
            <span className="product-discount">50% OFF</span>
          </section>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
