import * as React from 'react';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { Link } from 'react-router-dom';

export default function MultiActionAreaCard() {
  const productCategories = [
    {
      'id': 'product1',
      'heading': 'IC',
      'imgSrc': 'ic.jpg',
      'imgAlt': 'IC image',
      'description': 'An integrated circuit (IC), sometimes called a chip, microchip or microelectronic circuit, is a semiconductor wafer on which thousands or millions of tiny resistors, capacitors, diodes and transistors are fabricated.',
      'btnText': 'Learn More',
      'routeTo': '/products/ic',
    },
    {
      'id': 'product2',
      'heading': 'IC',
      'imgSrc': 'stand.jpg',
      'imgAlt': 'IC image',
      'description': 'An integrated circuit (IC), sometimes called a chip, microchip or microelectronic circuit, is a semiconductor wafer on which thousands or millions of tiny resistors, capacitors, diodes and transistors are fabricated.',
      'btnText': 'Learn More',
      'routeTo': '/products/connector',
    },
    {
      'id': 'product3',
      'heading': 'IC',
      'imgSrc': 'charger.jpg',
      'imgAlt': 'IC image',
      'description': 'An integrated circuit (IC), sometimes called a chip, microchip or microelectronic circuit, is a semiconductor wafer on which thousands or millions of tiny resistors, capacitors, diodes and transistors are fabricated.',
      'btnText': 'Learn More',
      'routeTo': '/products/charger',
    },
    {
      'id': 'product4',
      'heading': 'IC',
      'imgSrc': 'connector.jpg',
      'imgAlt': 'IC image',
      'description': 'An integrated circuit (IC), sometimes called a chip, microchip or microelectronic circuit, is a semiconductor wafer on which thousands or millions of tiny resistors, capacitors, diodes and transistors are fabricated.',
      'btnText': 'Learn More',
      'routeTo': '/products/stand',
    }
  ];

  return (
    <Container maxWidth="xl" sx={{
      flexDirection: { xs: 'column', sm: 'row' },
      justifyContent: { sm: 'space-between' },
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
        }} key={product.id}>
          <CardActionArea>
            <CardMedia
              component="img"
              sx={{
                height: { xs: '225px', md: '180px' },
              }}
              // image={product.imgSrc}
              image={"/images/homePageProducts/" + product.imgSrc}
              alt={product.imgAlt}
            />
            <CardContent>
              <Typography gutterBottom variant="h3" sx={{
                fontSize: { xs: '2rem' }
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