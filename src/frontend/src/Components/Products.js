import React, { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Helmet } from 'react-helmet-async';
import axios from "../api/services";
import Typography from '@mui/material/Typography';
import "../styles/Products.scss";
import Product from "./Product";
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import TextField from "@mui/material/TextField";
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';

const NavBar = React.lazy(() => import("./Navigation/NavBar"));
const Footer = React.lazy(() => import("./Navigation/Footer"));

export default function Products() {
  const productsPerPage = 6;
  const { route } = useParams();
  const [searchParams] = useSearchParams();

  const [allProducts, setAllProducts] = useState(JSON.parse(sessionStorage.getItem('allProducts')) || []);
  const [products, setProducts] = useState([]);
  const [index, setIndex] = useState(productsPerPage);
  const [productCategoryHeader, setProductCategoryHeader] = useState('');
  const [sortProductsBy, setSortProductsBy] = useState('nameAsc');
  const [noResultsFound, setNoResultsFound] = React.useState('');

  const fetchAllProducts = async () => {
    try {
      let allProducts = null;
      const response = await axios(`/${process.env.REACT_APP_GOOGLE_SHEET_ID}/values/testing`);
      response.data.values.shift(); //Remove first row which is column headers from data

      allProducts = response.data.values.map((product, index) => {
        let allFeatures = product[4].split('.');
        let allCategories = product[0].split('.');
        let allThumbnailsSrc = product[10].split('.');
        let allThumbnailsAlt = product[11].split('.');
        return {
          "name": product[2].toLowerCase(),
          "description": product[3],
          "features": allFeatures.map(feature => feature.trim()),
          "price": product[6],
          "link": product[5],
          // "categories": allCategories.map(category => category.trim().toLowerCase().replaceAll(' ', '-')),
          "categories": allCategories.map(category => category.trim().toLowerCase()),
          "keywords": product[7].split(' '),
          "mainImg": {
            "src": product[8],
            "alt": product[9],
          },
          "thumbnails": allThumbnailsSrc.map((thumbnail, index) => {
            return {
              "src": thumbnail.trim(),
              "alt": allThumbnailsAlt[index].trim()
            }
          })
        }
      });

      if (allProducts.length) {
        // console.log('allProducts fetched ', allProducts)
        sessionStorage.setItem('allProducts', JSON.stringify(allProducts));
        setAllProducts(allProducts);
        initializeProducts(allProducts);
      }
    }
    catch (error) {
      console.log(error);
    }
  }

  const initializeProducts = (allProducts) => {
    // console.log('fn called');

    let results = [];
    let productCategoryHeader = "";

    if (route) {//filter allProducts by route
      let productCategory = route.replaceAll('-', ' ');
      results = allProducts.filter((product) => {
        return product.categories.includes(productCategory);
      });
      productCategoryHeader = productCategory;
    }
    else if (searchParams.get('search')) {//filter allProducts by search field in navbar
      let searchQuery = searchParams.get('search');
      results = allProducts.filter((product) => {
        return product.name.toLowerCase().includes(searchQuery.toLowerCase());
      });
      productCategoryHeader = searchQuery;
    }
    else {
      results = allProducts;
      productCategoryHeader = 'All products';
    }

    setProducts(results);
    setProductCategoryHeader(productCategoryHeader);
  }

  // To check for session storage
  const storeProducts = async () => {
    const hours = 0.01; // to clear the sessionStorage after 1 hour

    const currentTime = new Date().getTime();
    let setupTime = sessionStorage.getItem('setupTime');

    if (setupTime == null) {
      sessionStorage.setItem('setupTime', currentTime);
      await fetchAllProducts();
      console.log('session set')
    }
    else {
      if (currentTime - setupTime > hours * 60 * 60 * 1000) {
        sessionStorage.removeItem('setupTime');
        sessionStorage.setItem('setupTime', currentTime);
        await fetchAllProducts();
        console.log('session refreshed')
      }
      else {
        console.log('session exists')
        console.log('allProducts from session ', allProducts)
        if (allProducts.length) {
          initializeProducts(allProducts);
        }
      }
    }
  }

  useEffect(() => {
    storeProducts();
  }, []);

  useEffect(() => {
    if (allProducts.length) {
      initializeProducts(allProducts);
    }
  }, [route, searchParams]);

  const handleProductSorting = (event) => {
    const sortBy = event.target.value;
    let results;

    switch (sortBy) {
      case "nameAsc":
        results = products.sort((p1, p2) => {
          if (p1.name < p2.name) {
            return -1;
          }
        });
        break;
      case "nameDesc":
        results = products.sort((p1, p2) => {
          if (p1.name > p2.name) {
            return -1;
          }
        });
        break;
      case "priceAsc":
        results = products.sort((p1, p2) => {
          if (p1.price < p2.price) {
            return -1;
          }
        });
        break;
      case "priceDesc":
        results = products.sort((p1, p2) => {
          if (p1.price > p2.price) {
            return -1;
          }
        });
        break;
    }

    setSortProductsBy(sortBy);
    setProducts(results);
  };

  const handlePageSearch = (event) => {
    const results = (products.length ? products : allProducts).filter((product) => product.name.toLowerCase().includes(event.target.value.toLowerCase()));

    // console.log(searchQuery, results, products, event.target.value, allProducts)

    if (event.target.value === "") {
      initializeProducts(allProducts);
    }
    else if (results.length) {
      setProducts(results);
    }
    else {
      setProducts([]);
      setNoResultsFound(`No products were found for '${event.target.value}'. Please refine your search and try again.`);
    }
  };

  const handleLoadMore = () => {
    setIndex(index + productsPerPage);
  }

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
          flexDirection: { xs: 'column', sm: 'row' },
          pt: { xs: 2, sm: 4 },
          px: { xs: 0 },
          pb: 2
        }}>
          <Typography
            variant="h1"
            sx={{
              textAlign: { xs: 'center', sm: 'left' },
              fontSize: { xs: '2rem', sm: '2rem', md: '2.5rem' },
              flexBasis: { md: '50%' },
              textTransform: 'uppercase'
            }}
          >
            {productCategoryHeader}
          </Typography>
          <Box sx={{
            display: 'flex',
            width: { xs: '100%', sm: '50%' },
            mt: { xs: 2, sm: 0 },
            justifyContent: 'end',
          }}>
            <FormControl size="small" sx={{
              flexBasis: { md: '400px' },
              mr: 2
            }}>
              <TextField
                id="outlined-search"
                label='Search on this page'
                type="search"
                size="small"
                onInput={handlePageSearch}
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
        </Box>
        <Box sx={{
          display: 'flex',
          gap: { xs: '14px', sm: '20px', md: '15px', lg: '16px' },
          mb: 2,
          flexWrap: { xs: 'wrap' },
        }}>
          {products.length > 0
            ? products.slice(0, index).map((product) => (
              <Product product={product} key={product.name} />
            ))
            : (
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: '1rem', md: '1.25rem' },
                }}
              >
                {noResultsFound}
              </Typography>
            )}
        </Box>
        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          my: 3
        }}>
          {index < products?.length && (
            <Button variant="contained" size="large" onClick={handleLoadMore}>
              Show more products
            </Button>
          )}
        </Box>
      </Container>
      <Footer />
    </div>
  );
}
