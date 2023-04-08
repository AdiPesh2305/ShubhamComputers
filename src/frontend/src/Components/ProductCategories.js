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
      'heading': 'Motherboard testing & repairing',
      'imgSrc': 'image1.jpg',
      'imgAlt': 'image1',
      'description': 'Motherboard testing & repairing...',
      'btnText': 'Learn More',
      'routeTo': '/products/motherboard-testing-and-repairing',
    },
    {
      'heading': 'Hard disk testing & repairing',
      'imgSrc': 'image2.jpg',
      'imgAlt': 'image2',
      'description': 'Hard disk testing & repairing...',
      'btnText': 'Learn More',
      'routeTo': '/products/hard-disk-testing-and-repairing',
    },
    {
      'heading': 'LCD LED TV Monitor testing & repairing',
      'imgSrc': 'image3.jpg',
      'imgAlt': 'image3',
      'description': 'LCD LED TV Monitor testing & repairing...',
      'btnText': 'Learn More',
      'routeTo': '/products/lcd-led-tv-monitor-testing-and-repairing',
    },
    {
      'heading': 'Ram testing & repairing',
      'imgSrc': 'image4.jpg',
      'imgAlt': 'image4',
      'description': 'Ram testing & repairing...',
      'btnText': 'Learn More',
      'routeTo': '/products/ram-testing-and-repairing',
    },
    {
      'heading': 'Display card testing & repairing',
      'imgSrc': 'image5.jpg',
      'imgAlt': 'image5',
      'description': 'Display card testing & repairing...',
      'btnText': 'Learn More',
      'routeTo': '/products/display-card-testing-and-repairing',
    },
    {
      'heading': 'Battery testing & repairing',
      'imgSrc': 'image6.jpg',
      'imgAlt': 'image6',
      'description': 'Battery testing & repairing...',
      'btnText': 'Learn More',
      'routeTo': '/products/battery-testing-and-repairing',
    }
  ];

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