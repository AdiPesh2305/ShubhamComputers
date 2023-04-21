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
  const {product} = props;

  const handleProductClick = () => {
    navigate(`/products/view/${product.name}`, {state: product});
  };

  return (
    <Card sx={{
      flexBasis: { xs: '48%', sm: '23%', md: '24%' },
      position: 'relative'
    }} key={product.id} className='product-list'>
      <CardActionArea onClick={handleProductClick}>
        <div className='card-media-wrapper'>
          <CardMedia
            component="img"
            image={`/images/products/${product?.mainImg?.src}.jpg`}
            alt={product.mainImg.alt}
          />
        </div>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" sx={{
            mb: 0,
            fontSize: {xs: '1.25rem', md: '1.5rem'},
            lineHeight: 1,
            textTransform: "uppercase"
          }}>
            {product.name}
          </Typography>
          <div className="product-price-wrapper">&#8377; {product.price}</div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}