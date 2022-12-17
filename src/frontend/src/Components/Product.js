import React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { CardActionArea } from '@mui/material';
import "../styles/Product.scss";

export default function Product(props) {
  // console.log(111, props.data)
  const product = props.data;
  const productMainImg = require("../assets/images/products/" + product.mainImg.src);

  return (
    <Card sx={{
      flexBasis: { sm: '48%', md: '23%' },
      margin: { sm: '1%' },
      position: 'relative'
    }} key={product.id} className='product-list'>
      <CardActionArea component={Link} to={`/products/view/${product.id}`}>
        <CardMedia
          component="img"
          height="180"
          image={productMainImg}
          alt={product.mainImg.alt}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" sx={{
            mb: 0
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