import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from 'react-helmet-async';
import axios from "../services";
import Typography from '@mui/material/Typography';
// import allProducts from "../allProducts/Allproducts.json";
import "../styles/Products.scss";
import Product from "./Product";
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import TextField from "@mui/material/TextField";
import Select from '@mui/material/Select';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const NavBar = React.lazy(() => import("./Navigation/NavBar"));
const Footer = React.lazy(() => import("./Navigation/Footer"));

export default function Products() {
  const { collectionname } = useParams();
  const [products, setProducts] = useState([]);
  const [productCategoryHeader, setProductCategoryHeader] = useState('');
  const [sortProductsBy, setSortProductsBy] = useState('nameAsc');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [noResultsFound, setNoResultsFound] = React.useState('');
  const [page, setPage] = React.useState(1);

  // To check for session storage
  // useEffect(() => {
  //   console.log('component rendered')
  //   if(sessionStorage.getItem("kalpesh")){
  //     console.log(sessionStorage.getItem("kalpesh"))
  //     console.log(1)
  //   }
  //   else{
  //     sessionStorage.setItem("kalpesh", "jain");
  //     console.log(2)
  //   }
  // }, [])

  // useEffect(() => {


  //   fetchAllProducts();
  // }, []);

  const fetchAllProducts = async () => {
    try {
      let allProducts = null;
      const response = await axios.get(`/${process.env.REACT_APP_GOOGLE_SHEET_ID}/values/products`);
      response.data.values.shift(); //Remove first row which is column headers from data

      allProducts = response.data.values.map((product, index) => {
        let allFeatures = product[2].split('.');
        let allCategories = product[5].split('.');
        let allThumbnailsSrc = product[8].split('.');
        let allThumbnailsAlt = product[9].split('.');
        return {
          "name": product[0].toLowerCase(),
          "description": product[1],
          "features": allFeatures.map(feature => feature.trim()),
          "price": product[3],
          "discount": product[4],
          "categories": allCategories.map(category => category.trim().toLowerCase().replaceAll(' ', '-')),
          "mainImg": {
            "src": product[6],
            "alt": product[7],
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
        let results, productCategoryHeader;
        console.log('collectionname ', collectionname)
        if(collectionname){
          results = allProducts.filter((product) => product.categories.includes(collectionname));
          productCategoryHeader = collectionname.replaceAll('-', ' ');
        }
        else{
          results = allProducts;
          productCategoryHeader = 'All products';
        }

        results.map((product) => {
          product.priceAfterDiscount = (product.price - (product.price * product.discount / 100)).toFixed(2);
        });

        setProducts(results);
        setProductCategoryHeader(productCategoryHeader);
      }
    }
    catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchAllProducts();
  }, []);

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
          if (p1.priceAfterDiscount < p2.priceAfterDiscount) {
            return -1;
          }
        });
        break;
      case "priceDesc":
        results = products.sort((p1, p2) => {
          if (p1.priceAfterDiscount > p2.priceAfterDiscount) {
            return -1;
          }
        });
        break;
    }

    setSortProductsBy(sortBy);
    setProducts(results);
  };

  const handlePageSearch = (event) => {
    const searchInput = event.target.value;
    const results = products.filter((product) =>
      product.name.toLowerCase().includes(searchInput.toLowerCase())
    );

    setSearchQuery(searchInput);
    setProducts(results);

    if (results.length < 1) {
      setNoResultsFound(`Your search for ${searchInput} did not yield any results. Please refine your search and try again.`)
    }
  };

  const handlePageChange = async (event, value) => {
    setPage(value);
    const response = await axios.get(`/${process.env.REACT_APP_GOOGLE_SHEET_ID}/values/products!A${value}:J${value}`);
    console.log(response)
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
          px: { xs: 0, md: 1 },
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
                value={searchQuery}
                onChange={handlePageSearch}
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
            ? products.map((product) => (
              <Product data={product} key={product.name} />
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
        <Stack sx={{
          alignItems: 'center',
          my: 3
        }}>
          <Pagination
            size="large"
            color="primary"
            count={20}
            boundaryCount={0}
            shape="rounded"
            variant="outlined"
            showFirstButton
            showLastButton
            onChange={handlePageChange}
            className="pagination-wrapper"
          />
        </Stack>
      </Container>
      <Footer />
    </div>
  );
}
