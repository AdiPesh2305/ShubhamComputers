import React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import "../styles/Product.scss";
import { useNavigate } from "react-router-dom";

export default function Product(props) {
  const navigate = useNavigate();
  const product = props.data;
  // const productMainImg = require("../assets/images/products/" + product?.mainImg?.src);
  // const productMainImg = "images/ic.jpg" /takes the path from images folder in public folder/;

  const handleProductClick = () => {
    sessionStorage.setItem("product", JSON.stringify(product));
    navigate(`/products/view/${product.name}`);
  };

  return (
    <Card sx={{
      flexBasis: { xs: '48%', sm: '23%', md: '24%' },
      position: 'relative'
    }} key={product.id} className='product-list'>
      <CardActionArea onClick={handleProductClick}>
        <CardMedia
          component="img"
          image={"/images/products/" + product?.mainImg?.src}
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
            {/* {product.discount > 0 && (
            <div className="product-price-before-discount">₹ {product.price.toFixed()}</div>
            )}
            {product.discount > 0 && (
            <div className="product-discount">{product.discount}% Off</div>
            )} */}
          </section>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}