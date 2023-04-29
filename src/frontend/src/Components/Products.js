import React, { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Helmet } from 'react-helmet-async';
import axios from "../api/services";
import { useNavigate } from "react-router-dom";
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
import Loader from "./Loader";

const NavBar = React.lazy(() => import("./Navigation/NavBar"));
const Footer = React.lazy(() => import("./Navigation/Footer"));

export default function Products({ productCategories }) {
  const navigate = useNavigate();
  const productsPerPage = 6;
  const { route } = useParams();
  const [searchParams] = useSearchParams();

  const [allProducts, setAllProducts] = useState(JSON.parse(sessionStorage.getItem('allProducts')) || []);
  const [products, setProducts] = useState([]);
  const [index, setIndex] = useState(productsPerPage);
  const [productCategoryHeader, setProductCategoryHeader] = useState('');
  const [allCategories, setAllCategories] = React.useState([]);
  const [category, setCategory] = React.useState('allProducts');
  const [subCategories, setSubCategories] = React.useState([]);
  const [subCategory, setSubCategory] = React.useState('all');
  const [sortProductsBy, setSortProductsBy] = useState('nameAsc');
  const [noResultsFound, setNoResultsFound] = React.useState('');
  const [isLoading, setLoading] = React.useState(true);

  const fetchAllProducts = async () => {
    try {
      let allProducts = null;
      const response = await axios(`/${process.env.REACT_APP_GOOGLE_SHEET_ID}/values/testing`);
      response.data.values.shift(); //Remove first row which is column headers from data

      allProducts = response.data.values.map((product, index) => {
        if (product.length) { //empty row check
          let allFeatures = product[4].split('.');
          let allCategories = product[0].split('.');
          let allSubCategories = product[1].split('.');
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
            "subCategories": allSubCategories.map(subCategory => subCategory.trim().toLowerCase()),
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
        }
        else {
          return null;
        }
      });

      const filteredProducts = allProducts.filter((product) => product != null); //filter null entries
      if (filteredProducts.length) {
        sessionStorage.setItem('allProducts', JSON.stringify(filteredProducts));
        setAllProducts(filteredProducts);
        initializeProducts(filteredProducts);
        initializeCategories(filteredProducts);
        initializeSubCategories(filteredProducts);
      }
    }
    catch (error) {
      console.log(error);
    }
  }

  const initializeCategories = (allProducts) => {
    let categories = [];

    allProducts.map(product => {
      categories.push(...product.categories);
    });

    setAllCategories([...new Set(categories)]);
  };

  const initializeSubCategories = (allProducts) => {
    let subCategories = [];

    allProducts.map(product => {
      subCategories.push(...product.subCategories);
    });

    setSubCategories([...new Set(subCategories)]);
  };

  const initializeProducts = (allProducts) => {
    let results = [];
    let productCategoryHeader = "All products";

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
    }

    setProducts(results);
    setProductCategoryHeader(productCategoryHeader);
    setLoading(false);
  }

  // To check for session storage
  const storeProducts = async () => {
    const hours = 0.01; // to clear the sessionStorage after 1 hour

    const currentTime = new Date().getTime();
    let productsSession = sessionStorage.getItem('productsSession');

    if (productsSession == null) {
      sessionStorage.setItem('productsSession', currentTime);
      await fetchAllProducts();
      console.log('session set')
    }
    else {
      if (currentTime - productsSession > hours * 60 * 60 * 1000) {
        sessionStorage.removeItem('productsSession');
        sessionStorage.setItem('productsSession', currentTime);
        await fetchAllProducts();
        console.log('session refreshed')
      }
      else {
        console.log('session exists')
        console.log('allProducts from session ', allProducts)
        if (allProducts.length) {
          initializeProducts(allProducts);
          initializeCategories(allProducts);
          initializeSubCategories(allProducts);
          route && setCategory(route.replaceAll('-', ' ')); //set the category on page refresh
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

  const handleProductFilter = (event, type) => {
    if (type == 'category') {
      let route = event.target.value == 'allProducts' ? '' : event.target.value.replaceAll(' ', '-');
      setCategory(event.target.value);
      setSubCategory('all'); //reset the sub-categories
      navigate(`/products/${route}`);
    }
    else {
      let results = allProducts.filter((product) => { //filter all products based on category
        return category == 'allProducts' ? product : product.categories.includes(category);
      });

      results = results.filter((product) => { //filter all products based on sub-category
        return event.target.value == 'all' ? product : product.subCategories.includes(event.target.value);
      });
      setSubCategory(event.target.value);
      setProducts(results);
    }
  }

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
      <NavBar categories={productCategories} />
      <Container maxWidth="xl" className="products-page">
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'start',
          flexDirection: { xs: 'column', sm: 'row' },
          pt: { xs: 2, sm: 2 },
          px: { xs: 0 },
          pb: 2
        }}>
          <Typography
            variant="h1"
            sx={{
              textAlign: { sm: 'left' },
              fontSize: { xs: '1.5em', md: '2em' },
              flexBasis: { md: '70%' },
              textTransform: 'uppercase'
            }}
          >
            {productCategoryHeader}
          </Typography>
          <FormControl size="small" sx={{
            flexBasis: { md: '30%' },
            display: { xs: 'none', md: 'flex' }
          }}>
            <TextField
              id="outlined-search"
              label='Search products on this page'
              type="search"
              size="small"
              onInput={handlePageSearch}
            />
          </FormControl>
        </Box>
        <Box sx={{
          display: 'flex',
          width: { xs: '100%', sm: '100%' },
          flexDirection: 'row',
          mt: { xs: 0, sm: 2 },
          mb: { xs: 2 },
          justifyContent: 'space-between',
        }}>
          <FormControl size="small" sx={{
            flexBasis: { xs: '48%', sm: '38%' },
            display: { xs: 'none', sm: 'flex' }
          }}>
            <InputLabel id="select-label">Filter products by category</InputLabel>
            <Select
              labelId="select-label"
              id="demo-select-small"
              value={category}
              onChange={(event) => handleProductFilter(event, 'category')}
              label="Filter products by category"
            >
              <MenuItem value='allProducts'>All Products</MenuItem>
              {allCategories.length > 0 &&
                allCategories.map((category, index) => (
                  <MenuItem value={category} key={index} sx={{ textTransform: 'capitalize' }}>{category}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
          <FormControl size="small" sx={{
            flexBasis: { xs: '48%', sm: '38%' },
          }}>
            <InputLabel id="select-label">Filter products by sub category</InputLabel>
            <Select
              labelId="select-label"
              id="demo-select-small"
              value={subCategory}
              onChange={(event) => handleProductFilter(event, 'subCategory')}
              label="Filter products by sub category"
            >
              <MenuItem value='all'>All sub categories</MenuItem>
              {subCategories.length > 0 &&
                subCategories.map((subCategory, index) => (
                  <MenuItem value={subCategory} key={index} sx={{ textTransform: 'capitalize' }}>{subCategory}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
          <FormControl size="small" sx={{
            flexBasis: { md: '20%' }
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
          display: 'flex',
          gap: { xs: '14px', sm: '25px', lg: '16px' },
          mb: 2,
          flexWrap: { xs: 'wrap' }
        }}>
          {
            isLoading ? <Loader message="Loading products..." /> :
              products.length > 0
                ? products.slice(0, index).map((product) => (
                  <Product product={product} key={product.name} />
                ))
                : (
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: { xs: '1em', md: '1.25em' },
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
