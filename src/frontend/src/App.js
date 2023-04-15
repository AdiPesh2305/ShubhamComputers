import React, { Suspense, lazy } from "react";
import "./styles/App.scss";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import Loader from "./Components/Loader";

const Homepage = lazy(() => import("./Components/Homepage"));
const About = lazy(() => import("./Components/About"));
const Contact = lazy(() => import("./Components/Contact"));
const Products = lazy(() => import("./Components/Products"));
const ProductView = lazy(() => import("./Components/ProductView"));
const PageNotFound = lazy(() => import("./Components/PageNotFound"));

function App() {
  return (
    <Router>
      <Suspense
        fallback={
          <Loader />
        }
      >
        <HelmetProvider>
          <Routes>
            <Route exact path="/" element={<Homepage />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/contact-us" element={<Contact />} />
            <Route exact path="/products" element={<Products />} />
            <Route exact path="/products/:route" element={<Products />} />
            <Route exact path="/products/view/:name" element={<ProductView />} />
            <Route path="/*" element={<PageNotFound />} />
          </Routes>
        </HelmetProvider>
      </Suspense>
    </Router>
  );
}

export default App;