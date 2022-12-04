import React from "react";
import { Helmet } from 'react-helmet-async';
import "../styles/Contact.scss";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';

const NavBar = React.lazy(() => import("./Navigation/NavBar"));
const Footer = React.lazy(() => import("./Navigation/Footer"));

export default function Contact() {
  return (
    <div>
      <Helmet>
        <title>Shubham Computers - Contact Us</title>
        <meta name="description" content="Shubham Computers - Contact Us" />
      </Helmet>
        <NavBar />
        <Box sx={{
          p: 4,
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
            my: 2
          }} className="map-wrapper">
            <Typography
                variant="h2"
                sx={{
                  fontSize: '1.5rem',
                  borderBottom: '2px solid #CCC',
                  mb: 1,
                  pb: 0.5
                }}
              >
                GOOGLE MAPS
              </Typography>
          </Box>
          <Box sx={{
            mt: 1
          }} className="contact-details-wrapper">
            <div className="contact-form-wrapper">
              <Typography
                variant="h2"
                sx={{
                  fontSize: '1.5rem',
                  borderBottom: '2px solid #CCC',
                  mb: 1,
                  pb: 0.5
                }}
              >
                SEND US A MESSAGE
              </Typography>
            </div>
            <div className="address-details-wrapper">
              <Typography
                variant="h2"
                sx={{
                  fontSize: '1.5rem',
                  borderBottom: '2px solid #CCC',
                  mb: 1,
                  pb: 0.5
                }}
              >
                SHOP ADDRESS
              </Typography>
              <address>
                A-04, 2nd floor, <br />
                Sidhachal Darshan <br />
                Seth Motishah Lane <br />
                Byculla East <br />
                Mumbai 400 027 <br />
                Maharashtra, India <br />
              </address>
              <a href="tel:9999999999">
                <CallIcon /> +91 9999999999
              </a>
              <a href="mailto:aaa@aaa.com">
                <EmailIcon /> aaa@aaa.com
              </a>
            </div>
          </Box>
        </Box>
        <Footer />
    </div>
  );
}