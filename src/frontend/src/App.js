import React, { Suspense, lazy } from "react";
import "./styles/App.scss";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


import { GlobalCartContextProvider } from "./context/CartContext";
import loadingIcon from "./assets/images/dashboardloader3.gif";
const Homepage = lazy(() => import("./Components/Homepage"));
const About = lazy(() => import("./Components/About"));
const Products = lazy(() => import("./Components/Products"));
const Shopping = lazy(() => import("./Components/Shopping"));
const Cart = lazy(() => import("./Components/Cart/Cart"));
const Catalog = lazy(() => import("./Components/Catalog"));
const ProgressSpinner = lazy(() => import("./Components/ProgressSpinner"));

const SearchProducts = lazy(() => import("./Components/SearchProducts"));
const PageNotFound = lazy(() => import("./Components/PageNotFound"));

function App() {
  return (
    <GlobalCartContextProvider>
        <Router>
          <Suspense
            fallback={
              <ProgressSpinner />
            }
          >
            <Routes>
              <Route exact path="/" element={<Homepage/>} />
              <Route exact path="/about" element={<About/>} />
              <Route exact path="/products" element={<Products/>} />
              <Route exact path="/products/:collectionname" element={<Products/>} />
              <Route exact path="/shop" element={<Shopping/>} />
              <Route exact path="/search" element={<SearchProducts/>} />
              <Route exact path="/cart" element={<Cart/>} />
              <Route exact path="/trend/:collectionname" element={<Shopping/>} />
              <Route exact path="/collections" element={<Shopping/>} />
              <Route
                exact
                path="/collections/:collectionname"
                element={<Shopping/>}
              />
              <Route
                exact
                // path="/products/view/:id/:productname"
                path="/products/view/:id"
                element={<Catalog/>}
              />

              <Route element={<PageNotFound/>} />
            </Routes>
          </Suspense>
        </Router>
    </GlobalCartContextProvider>
  );
}

export default App;
