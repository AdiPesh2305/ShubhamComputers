import React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { CardActionArea } from '@mui/material';
import "../styles/Product.scss";

export default function Product(props) {
  const product = props.data;
  const productMainImg = require("../assets/images/products/" + product.mainImg.src);

  return (
    <Card sx={{
      flexBasis: { xs: '48%', sm: '23%', md: '23%' },
      my: {xs: '0.5rem', sm: '1rem'},
      position: 'relative'
    }} key={product.id} className='product-list'>
      <CardActionArea component={Link} to={`/products/view/${product.id}`}>
        <CardMedia
          component="img"
          image={productMainImg}
          alt={product.mainImg.alt}
          sx={{
            height: { xs: '100px', sm: '125px', md: '180px' },
          }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" sx={{
            mb: 0,
            fontSize: {xs: '1.25rem', md: '1.5rem'},
            lineHeight: 1
          }}>
            {product.name}
          </Typography>
          <section className="product-price-wrapper">
            <div className="product-price-after-discount">₹ {product.priceAfterDiscount}</div>
            <div className="product-price-before-discount">₹ {product.price.toFixed()}</div>
            <div className="product-discount">{product.discount}% Off</div>
          </section>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}