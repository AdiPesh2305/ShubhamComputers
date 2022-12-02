import React, { Suspense, lazy } from "react";
import "./styles/App.scss";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


import loadingIcon from "./assets/images/dashboardloader3.gif";
const Homepage = lazy(() => import("./Components/Homepage"));
const About = lazy(() => import("./Components/About"));
const Contact = lazy(() => import("./Components/Contact"));
const Products = lazy(() => import("./Components/Products"));
const Catalog = lazy(() => import("./Components/Catalog"));
const ProgressSpinner = lazy(() => import("./Components/ProgressSpinner"));

const SearchProducts = lazy(() => import("./Components/SearchProducts"));
const PageNotFound = lazy(() => import("./Components/PageNotFound"));

function App() {
  return (
    <Router>
      <Suspense
        fallback={
          <ProgressSpinner />
        }
      >
        <Routes>
          <Route exact path="/" element={<Homepage />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/contact-us" element={<Contact />} />
          <Route exact path="/products" element={<Products />} />
          <Route exact path="/products/:collectionname" element={<Products />} />
          <Route exact path="/search" element={<SearchProducts />} />
          <Route
            exact
            // path="/products/view/:id/:productname"
            path="/products/view/:id"
            element={<Catalog />}
          />

          <Route element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
