import React from "react";
import { Helmet } from 'react-helmet-async';
import "../styles/Homepage.scss";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const NavBar = React.lazy(() => import("./Navigation/NavBar"));
const Footer = React.lazy(() => import("./Navigation/Footer"));
const ProductCategories = React.lazy(() => import("./ProductCategories"));
const HeroImage = React.lazy(() => import("./Navigation/HeroImage"));

export default function Homepage() {
  return (
    <div>
      <Helmet>
        <title>Shubham Computers - Home</title>
        <meta name="description" content="Shubham Computers - Home" />
      </Helmet>
      <NavBar />
      <HeroImage />
      <Box sx={{
        px: { xs: 2, md: 4 },
        pt: 4,
        backgroundColor: '#FAFAFA'
      }}
      >
        <Typography
          variant="h2"
          noWrap
          sx={{
            textAlign: 'center',
            fontSize: {xs: '1.5rem', sm: '2rem', md: '3.75rem' }
          }}
        >
          Welcome to Shubham Computers
        </Typography>
        <Box sx={{
          mt: 1
        }}>
          Shubham Computers is a sole proprietorship in the computer business since 1996. We supply Reparing Accessories, Tools, IC Chipsets, COFS, TCON Cards, Logic Cards, Testing Equipment, DATA Recovery solutions, Machinery for repairing electronic/Microprocessor Based devices like TVs, Monitors, Motherboards (Desktop/Laptop/ Industrialetc), RAM, Hard Disk, Displays, PCI Cards, LCD repairing parts, etc. Pan India Delivery. All types of service center supplies under one roof.
        </Box>
      </Box>
      <ProductCategories />
      <Footer />
    </div>
  );
}