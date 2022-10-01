import React from "react";
import { useParams } from "react-router-dom";
import data from "../data/Allproducts.json";
import "../styles/Products.scss";
import loadingIcon from "../assets/images/dashboardloader3.gif";
import Product from "./Product";
import Container from '@mui/material/Container';
const NavBar = React.lazy(() => import("./Navigation/NavBar"));
const Footer = React.lazy(() => import("./Navigation/Footer"));

export default function Products(props) {
  const { collectionname } = useParams();
  let products = [];
  let header_collection;

  switch (collectionname) {
    case "women":
      products = data.filter((product) => product.category === collectionname);
      header_collection = "Collection: " + collectionname.toUpperCase();
      break;
    case "kids":
      console.log('collectionname ', collectionname)
      products = data.filter((product) => product.category === collectionname);
      header_collection = "Collection: " + collectionname.toUpperCase();
      break;
    case "men":
      products = data.filter((product) => product.category === collectionname);
      header_collection = "Collection: " + collectionname.toUpperCase();
      break;
    case "Trending":
      products = data.filter(
        (product) => product.product_status === collectionname
      );
      header_collection = "Collection: " + collectionname.toUpperCase();
      break;
    case "New":
      products = data.filter(
        (product) => product.product_status === collectionname
      );
      header_collection = "Collection: " + collectionname.toUpperCase();
      break;
    default:
      console.log('collectionname ', collectionname)
      products = data;
      header_collection = "Products list";
  }

  return (
    <div>
      <NavBar />
      <div className="products-wrapper">
        <div className="products-category-heading">
          <h1>
            {/* {header_collection} */}
            All Products
          </h1>
        </div>

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
