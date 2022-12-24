import React, { Suspense, lazy } from "react";
import "./styles/App.scss";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';

const Homepage = lazy(() => import("./Components/Homepage"));
const About = lazy(() => import("./Components/About"));
const Contact = lazy(() => import("./Components/Contact"));
const Products = lazy(() => import("./Components/Products"));
const Catalog = lazy(() => import("./Components/Catalog"));

const SearchProducts = lazy(() => import("./Components/SearchProducts"));

function App() {
  return (
    <Router>
      <Suspense
        fallback={
          <h1>Loading Shubham Computers...</h1>
        }
      >
        <HelmetProvider>
          <Routes>
            <Route exact path="/" element={<Homepage />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/contact-us" element={<Contact />} />
            <Route exact path="/products" element={<Products />} />
            <Route exact path="/products/:collectionname" element={<Products />} />
            <Route exact path="/search" element={<SearchProducts />} />
            <Route
              exact
              path="/products/view/:id"
              element={<Catalog />}
            />
          </Routes>
        </HelmetProvider>
      </Suspense>
    </Router>
  );
}

export default App;
