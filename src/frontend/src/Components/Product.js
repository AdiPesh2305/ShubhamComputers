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

   // Single Product
    // const response = await axios.get(`https://docs.google.com/spreadsheets/d/1ZvGw6Rj62R7tGGzCXn8GdiRQKOe0TrEWBlQSm2EPnCc/gviz/tq?tqx=out:csv&range=A2:K&sheet=products&tq=SELECT%20*%20WHERE%20A%20=%20%27RAM%27`);

    // console.log(response)
    // const jain = response.data.replace(/(\r\n|\n|\r|")/gm, " ")
    
    // console.log(jain)
    // console.log(jain.split(' ,'))

  const handleProductClick = () => {
    sessionStorage.setItem("product", JSON.stringify(product));
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