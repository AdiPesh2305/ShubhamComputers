import React from "react";
import { Helmet } from 'react-helmet-async';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const HeroImage = React.lazy(() => import("./Navigation/HeroImage"));

const About = () => {
  return (
    <div>
      <Helmet>
        <title>Shubham Computers - About Us</title>
        <meta name="description" content="Shubham Computers - About Us" />
      </Helmet>
      <HeroImage />
      <Box sx={{
        px: { xs: 2, md: 4 },
        py: 4,
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
          About Shubham Computers
        </Typography>
        <Box sx={{
          mt: 1
        }}>
          Shubham Computers is a sole proprietorship in the computer business since 1996. We supply Reparing Accessories, Tools, IC Chipsets, COFS, TCON Cards, Logic Cards, Testing Equipment, DATA Recovery solutions, Machinery for repairing electronic/Microprocessor Based devices like TVs, Monitors, Motherboards (Desktop/Laptop/ Industrialetc), RAM, Hard Disk, Displays, PCI Cards, LCD repairing parts, etc. Pan India Delivery. All types of service center supplies under one roof.
        </Box>
      </Box>
    </div>
  );
}

export default React.memo(About);