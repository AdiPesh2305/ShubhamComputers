import React from "react";
import { Helmet } from 'react-helmet-async';
import "../styles/Contact.scss";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';

const NavBar = React.lazy(() => import("./Navigation/NavBar"));
const Footer = React.lazy(() => import("./Navigation/Footer"));
const GoogleMaps = React.lazy(() => import("./GoogleMaps"));

export default function Contact() {
  return (
    <div>
      <Helmet>
        <title>Shubham Computers - Contact Us</title>
        <meta name="description" content="Shubham Computers - Contact Us" />
      </Helmet>
        <NavBar />
        <Box sx={{
          px: { xs: 2, md: 4 },
          py: 2,
          backgroundColor: '#EDEDED'
        }}
        >
          <Typography
            variant="h1"
            sx={{
              textAlign: 'center',
              fontSize: '2.5rem'
            }}
          >
            Contact Us
          </Typography>
          <Box sx={{
            mt: 1
          }} className="contact-details-wrapper">
            <div className="map-wrapper">
              <Typography
                variant="h2"
                sx={{
                  fontSize: '1.5rem',
                  borderBottom: '2px solid #CCC',
                  letterSpacing: 1,
                  mb: 1,
                  pb: 0.5
                }}
              >
                FIND US ON GOOGLE MAPS
              </Typography>
              <GoogleMaps/>
            </div>
            <div className="address-details-wrapper">
              <Typography
                variant="h2"
                sx={{
                  fontSize: '1.5rem',
                  borderBottom: '2px solid #CCC',
                  letterSpacing: 1,
                  mb: 1,
                  pb: 0.5
                }}
              >
                SHOP ADDRESS
              </Typography>
              <address>
                Office #100, 3rd Floor, <br />
                Rajesh Building, <br />
                Opposite Lamington Road Police Station, <br />
                Grant Road (East), <br />
                Mumbai 400 007, <br />
                Maharashtra, India <br />
              </address>
              <a href="tel:9322249976">
                <CallIcon /> +91 9322249976
              </a>
              <a href="tel:9222785781">
                <CallIcon /> +91 9222785781
              </a>
              <a href="mailto:mailto:shubhamcomputers@hotmail.com?subject=Inquiry%20about%20Shubham%20Computers%20Products%20&body=Hi, %0D%0A%0D%0A">
                <EmailIcon /> shubhamcomputers@hotmail.com
              </a>
              <Typography
                variant="h2"
                sx={{
                  fontSize: '1.5rem',
                  borderBottom: '2px solid #CCC',
                  letterSpacing: 1,
                  mb: 1,
                  mt: 3,
                  pb: 0.5
                }}
              >
                OTHER WAYS TO REACH US
              </Typography>
            </div>
          </Box>
        </Box>
        <Footer />
    </div>
  );
}