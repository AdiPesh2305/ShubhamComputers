import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from 'react-helmet-async';
import Typography from '@mui/material/Typography';
import data from "../data/Allproducts.json";
import "../styles/Products.scss";
import Product from "./Product";
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import TextField from "@mui/material/TextField";
import Select from '@mui/material/Select';

const NavBar = React.lazy(() => import("./Navigation/NavBar"));
const Footer = React.lazy(() => import("./Navigation/Footer"));

export default function Products() {
  const { collectionname } = useParams();
  let products = [];
  let productCategoryHeader;

  switch (collectionname) {
    case "ic":
      products = data.filter((product) => product.category === collectionname);
      productCategoryHeader = collectionname;
      break;
    case "stand":
      products = data.filter((product) => product.category === collectionname);
      productCategoryHeader = collectionname;
      break;
    case "connector":
      products = data.filter((product) => product.category === collectionname);
      productCategoryHeader = collectionname;
      break;
    case "charger":
      products = data.filter((product) => product.category === collectionname);
      productCategoryHeader = collectionname;
      break;
    default:
      products = data;
      productCategoryHeader = "All products";
  }

  products.map((product) => {
    product.priceAfterDiscount = (product.price - (product.price * product.discount / 100)).toFixed(2);
  });

  const [sortProductsBy, setSortProductsBy] = React.useState('nameAsc');
  const handleProductSorting = (event) => {
    const sortBy = event.target.value;
    setSortProductsBy(sortBy);

    switch (sortBy) {
      case "nameAsc":
        products = data.sort((p1, p2) => {
          if (p1.name < p2.name) {
            return -1;
          }
        });
        break;
      case "nameDesc":
        products = data.sort((p1, p2) => {
          if (p1.name > p2.name) {
            return -1;
          }
        });
        break;
      case "priceAsc":
        products = data.sort((p1, p2) => {
          if (p1.priceAfterDiscount < p2.priceAfterDiscount) {
            return -1;
          }
        });
        break;
      case "priceDesc":
        products = data.sort((p1, p2) => {
          if (p1.priceAfterDiscount > p2.priceAfterDiscount) {
            return -1;
          }
        });
        break;
    }
  };

  const [value, setValue] = React.useState('');
  const handleChanges = (event) => {
    setValue(event.target.value);
  };

  const data1 = [
    "Paris",
    "London",
    "New York",
    "Tokyo",
    "Berlin",
    "Buenos Aires",
    "Cairo",
    "Canberra",
    "Rio de Janeiro",
    "Dublin"
  ];

  const SearchBar = ({ setSearchQuery }) => (
    <div>
      <TextField
        id="search-bar"
        className="text"
        label="Enter a city name"
        variant="outlined"
        placeholder="Search..."
        size="small"
      />

    </div>
  );

  const filterData = (query, data) => {
    if (!query) {
      return data;
    } else {
      return data.filter((d) => d.toLowerCase().includes(query));
    }
  };

  const [searchQuery, setSearchQuery] = useState("");
  const dataFiltered = filterData(searchQuery, data1);

  return (
    <div>
      <Helmet>
        <title>Shubham Computers - Our Products</title>
        <meta name="description" content="Shubham Computers - Our Products" />
      </Helmet>
      <NavBar />
      <Container maxWidth="xl" className="products-wrapper">
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          pt: 4,
          px: 1,
          pb: 2
        }}>
          <Typography
            variant="h1"
            sx={{
              textAlign: 'left',
              fontSize: '2.5rem',
              flexBasis: { md: '50%' },
              textTransform: 'capitalize'
            }}
          >
            {productCategoryHeader}
          </Typography>
          <FormControl size="small" sx={{
            flexBasis: { md: '400px' },
            mr: 2
          }}>
            <TextField
              id="outlined-search"
              label='Search on this page'
              type="search"
              size="small"
              onChange={handleChanges}
            />
          </FormControl>
          <FormControl size="small" sx={{
            flexBasis: { md: '200px' }
          }}>
            <InputLabel id="select-label">Sort products by</InputLabel>
            <Select
              labelId="select-label"
              id="demo-select-small"
              value={sortProductsBy}
              onChange={handleProductSorting}
              label="Sort products by"
            >
              <MenuItem value={'nameAsc'}>Name - A to Z</MenuItem>
              <MenuItem value={'nameDesc'}>Name - Z to A</MenuItem>
              <MenuItem value={'priceAsc'}>Price - Low to High</MenuItem>
              <MenuItem value={'priceDesc'}>Price - High to Low</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box sx={{
          flexDirection: { xs: 'column', sm: 'row' },
          // justifyContent: { sm: 'space-between' },
          display: 'flex',
          flexWrap: { sm: 'wrap' },
          pb: { xs: 0 },
        }}>
          {products.map((product) => (
            <Product data={product} key={product.id} />
          ))}
        </Box>
      </Container>
      <Footer />
    </div>
  );
}
