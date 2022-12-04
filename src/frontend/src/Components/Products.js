import React from "react";
import { useParams } from "react-router-dom";
import { Helmet } from 'react-helmet-async';
import Typography from '@mui/material/Typography';
import data from "../data/Allproducts.json";
import "../styles/Products.scss";
import Product from "./Product";
import Container from '@mui/material/Container';
const NavBar = React.lazy(() => import("./Navigation/NavBar"));
const Footer = React.lazy(() => import("./Navigation/Footer"));

export default function Products() {
  const { collectionname } = useParams();
  let products = [];
  let productCategoryHeader;

  switch (collectionname) {
    case "ic":
      products = data.filter((product) => product.category === collectionname);
      productCategoryHeader = collectionname.toUpperCase();
      break;
    case "stand":
      console.log('collectionname ', collectionname)
      products = data.filter((product) => product.category === collectionname);
      productCategoryHeader = collectionname.toUpperCase();
      break;
    case "connector":
      products = data.filter((product) => product.category === collectionname);
      productCategoryHeader = collectionname.toUpperCase();
      break;
    case "charger":
      products = data.filter((product) => product.category === collectionname);
      productCategoryHeader = collectionname.toUpperCase();
      break;
    default:
      console.log('collectionname ', collectionname)
      products = data;
      productCategoryHeader = "All products".toUpperCase();
  }

  return (
    <div>
      <Helmet>
        <title>Shubham Computers - Our Products</title>
        <meta name="description" content="Shubham Computers - Our Products" />
      </Helmet>
      <NavBar />
      <div className="products-wrapper">
        <Typography
          variant="h2"
          sx={{
            textAlign: 'center',
            fontSize: '2.5rem'
          }}
        >
          {productCategoryHeader}
        </Typography>
        <Container maxWidth="xl" sx={{
          flexDirection: { xs: 'column', sm: 'row' },
          // justifyContent: { sm: 'space-between' },
          display: 'flex',
          flexWrap: { sm: 'wrap' },
          p: 4,
          pb: { xs: 0 },
        }}>
          {products.map((product) => (
            <Product data={product} key={product.id} />
          ))}
        </Container>
      </div>
      <Footer />
    </div>
  );
}
