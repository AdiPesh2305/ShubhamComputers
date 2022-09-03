import * as React from 'react';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import icImage from '../assets/images/ic.jpg';

export default function MultiActionAreaCard() {
  return (
    <Container maxWidth="xl" sx={{
      flexDirection: {xs: 'column', md: 'row'},
      justifyContent: 'space-between',
      display: { xs: 'flex'},
      p: 4,
      backgroundColor: '#EDEDED',
    }}>
      <Card sx={{ maxWidth: 300 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={icImage}
            alt="green iguana"
          />
          <CardContent>
          <Typography gutterBottom variant="h5" component="div">
              IC
            </Typography>
            <Typography variant="body2" color="text.secondary">
              An integrated circuit (IC), sometimes called a chip, microchip or microelectronic circuit, is a semiconductor wafer on which thousands or millions of tiny resistors, capacitors, diodes and transistors are fabricated.
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Learn More
          </Button>
        </CardActions>
      </Card>
      <Card sx={{ maxWidth: 300 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={icImage}
            alt="green iguana"
          />
          <CardContent>
          <Typography gutterBottom variant="h5" component="div">
              IC
            </Typography>
            <Typography variant="body2" color="text.secondary">
              An integrated circuit (IC), sometimes called a chip, microchip or microelectronic circuit, is a semiconductor wafer on which thousands or millions of tiny resistors, capacitors, diodes and transistors are fabricated.
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Learn More
          </Button>
        </CardActions>
      </Card>
      <Card sx={{ maxWidth: 300 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={icImage}
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              IC
            </Typography>
            <Typography variant="body2" color="text.secondary">
              An integrated circuit (IC), sometimes called a chip, microchip or microelectronic circuit, is a semiconductor wafer on which thousands or millions of tiny resistors, capacitors, diodes and transistors are fabricated.
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Learn More
          </Button>
        </CardActions>
      </Card>
      <Card sx={{ maxWidth: 300 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={icImage}
            alt="green iguana"
          />
          <CardContent>
          <Typography gutterBottom variant="h5" component="div">
              IC
            </Typography>
            <Typography variant="body2" color="text.secondary">
              An integrated circuit (IC), sometimes called a chip, microchip or microelectronic circuit, is a semiconductor wafer on which thousands or millions of tiny resistors, capacitors, diodes and transistors are fabricated.
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Learn More
          </Button>
        </CardActions>
      </Card>

    </Container>
  );
}
