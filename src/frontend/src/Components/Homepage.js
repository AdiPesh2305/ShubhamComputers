import React from "react";
import { Helmet } from 'react-helmet-async';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const ProductCategories = React.lazy(() => import("./ProductCategories"));
const HeroImage = React.lazy(() => import("./Navigation/HeroImage"));

const Homepage = ({productCategories}) => {
  return (
    <div>
      <Helmet>
        <title>Shubham Computers - Home</title>
        <meta name="description" content="Shubham Computers Mumbai is a leading supplier of electronic components including IC's , Programmers, Reballing Solutions, DC Jacks and much more." />
        <meta name="keywords" content="Shubham Computers, Shubham Computers Mumbai, Computer Accessories." />
      </Helmet>
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
            fontSize: {xs: '1.5em', sm: '2em', md: '3.75em' }
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
      <ProductCategories categories={productCategories} />
    </div>
  );
}

export default React.memo(Homepage);