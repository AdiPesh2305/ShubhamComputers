import * as React from 'react';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import icImage from '../assets/images/ic.jpg';
import { Link } from 'react-router-dom';

export default function MultiActionAreaCard() {
  const productCategories = [
    {
      'id': 'product1',
      'heading': 'IC',
      'imgSrc': icImage,
      'imgAlt': 'IC image',
      'description': 'An integrated circuit (IC), sometimes called a chip, microchip or microelectronic circuit, is a semiconductor wafer on which thousands or millions of tiny resistors, capacitors, diodes and transistors are fabricated.',
      'btnText': 'Learn More',
      'routeTo': '/products/ic',
    },
    {
      'id': 'product2',
      'heading': 'IC',
      'imgSrc': icImage,
      'imgAlt': 'IC image',
      'description': 'An integrated circuit (IC), sometimes called a chip, microchip or microelectronic circuit, is a semiconductor wafer on which thousands or millions of tiny resistors, capacitors, diodes and transistors are fabricated.',
      'btnText': 'Learn More',
      'routeTo': '/products/chips',
    },
    {
      'id': 'product3',
      'heading': 'IC',
      'imgSrc': icImage,
      'imgAlt': 'IC image',
      'description': 'An integrated circuit (IC), sometimes called a chip, microchip or microelectronic circuit, is a semiconductor wafer on which thousands or millions of tiny resistors, capacitors, diodes and transistors are fabricated.',
      'btnText': 'Learn More',
      'routeTo': '/products/ic',
    },
    {
      'id': 'product4',
      'heading': 'IC',
      'imgSrc': icImage,
      'imgAlt': 'IC image',
      'description': 'An integrated circuit (IC), sometimes called a chip, microchip or microelectronic circuit, is a semiconductor wafer on which thousands or millions of tiny resistors, capacitors, diodes and transistors are fabricated.',
      'btnText': 'Learn More',
      'routeTo': '/products/chips',
    }
  ];

  return (
    <Container maxWidth="xl" sx={{
      flexDirection: { xs: 'column', sm: 'row' },
      justifyContent: { sm: 'space-between' },
      display: 'flex',
      flexWrap: { sm: 'wrap' },
      p: 4,
      pb: { xs: 0, sm: 0, md: 4 },
      backgroundColor: '#EDEDED',
    }}>
      {productCategories.map((product) => (
        <Card sx={{
          flexBasis: { sm: '48%', md: '23%' },
          mb: { xs: 4, sm: 4, md: 0 }
        }} key={product.id}>
          <CardActionArea>
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