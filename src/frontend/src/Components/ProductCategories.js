import React from "react";
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import PlaceholderImage from '../assets/images/logo.png';

const ProductCategories = ({categories}) => {
  return (
    <Container maxWidth="xl" sx={{
      flexDirection: { xs: 'column', sm: 'row' },
      gap: { xs: '1.5em', lg: '2em' },
      display: 'flex',
      flexWrap: { sm: 'wrap' },
      px: { xs: 2, md: 4 },
      py: 4,
      backgroundColor: '#FAFAFA',
    }}>
      {categories.map((product) => (
        <Card sx={{
          flexBasis: { sm: '48%', md: '23%' },
          border: '1.5px solid #ccc'
        }} key={product.heading}>
          <CardActionArea component={Link} to={product.routeTo}>
            <div className='card-media-wrapper'>
              <LazyLoadImage 
                src={`/images/homePageProducts/${product?.imgSrc}`}
                alt={product.imgAlt}
                placeholderSrc={PlaceholderImage}
                effect="blur"
              />
            </div>
            <CardContent>
              <Typography gutterBottom variant="h3" sx={{
                fontSize: { xs: '1.25em' },
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
              Explore {product.heading}
            </Button>
          </CardActions>
        </Card>
      ))}
    </Container>
  );
}

export default React.memo(ProductCategories);