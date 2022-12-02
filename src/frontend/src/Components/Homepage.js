import React, { Suspense } from "react";
import "../styles/Homepage.scss";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

import loadingIcon from "../assets/images/dashboardloader3.gif";

const NavBar = React.lazy(() => import("./Navigation/NavBar"));
const Footer = React.lazy(() => import("./Navigation/Footer"));
const ProgressSpinner = React.lazy(() => import("./ProgressSpinner"));
// const SecondaryIntro = React.lazy(() => import("./Intro/SecondaryIntro"));
const ProductCategories = React.lazy(() => import("./ProductCategories"));
const HeroImage = React.lazy(() => import("./Navigation/HeroImage"));

export default function () {
  return (
    <div>
      <Suspense
        fallback={
          <CircularProgress />
        }
      >
        <NavBar />

        <HeroImage />

        {/* <SecondaryIntro /> */}
        <Box sx={{
          px: 4,
          pt:4,
          backgroundColor: '#EDEDED'
        }}
        >
          <Typography
            variant="h3"
            noWrap
            sx={{
              textAlign: 'center'
            }}
          >
            Welcome to Shubham Computers
          </Typography>
          <Box sx={{
            mt:1
          }}>
          Shubham Computers is a sole proprietorship in the computer business since 1996. We supply Reparing Accessories, Tools, IC Chipsets, COFS, TCON Cards, Logic Cards, Testing Equipment, DATA Recovery solutions, Machinery for repairing electronic/Microprocessor Based devices like TVs, Monitors, Motherboards (Desktop/Laptop/ Industrialetc), RAM, Hard Disk, Displays, PCI Cards, LCD repairing parts, etc. Pan India Delivery. All types of service center supplies under one roof.
          </Box>
        </Box>
        <ProductCategories />
        <Footer />
      </Suspense>
    </div>
  );
}
