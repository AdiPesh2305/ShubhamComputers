import React from "react";
import { Helmet } from 'react-helmet-async';
import "../styles/Contact.scss";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';

const GoogleMaps = React.lazy(() => import("./GoogleMaps"));

const Contact = () => {
  return (
    <div>
      <Helmet>
        <title>Shubham Computers - Contact Us</title>
        <meta name="description" content="Shubham Computers - Contact Us" />
      </Helmet>
      <Box sx={{
        px: { xs: 2, md: 4 },
        py: 2,
        backgroundColor: '#FAFAFA'
      }}
      >
        <Box sx={{
          mt: 1
        }} className="contact-details-wrapper">
          <div className="map-wrapper">
            <Typography
              variant="h2"
              sx={{
                fontSize: '1.5em',
                borderBottom: '2px solid #CCC',
                letterSpacing: 1,
                mb: '0.75em',
                pb: 0.5
              }}
            >
              FIND US ON GOOGLE MAPS
            </Typography>
            <GoogleMaps />
          </div>
          <div className="address-details-wrapper">
            <Typography
              variant="h2"
              sx={{
                fontSize: '1.5em',
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
            <Typography
              variant="h2"
              sx={{
                fontSize: '1.5em',
                borderBottom: '2px solid #CCC',
                letterSpacing: 1,
                mb: 1,
                mt: 3,
                pb: 0.5
              }}
            >
              CONTACT DETAILS
            </Typography>
            <a href="tel:9322249976">
              <CallIcon /> +91 9322249976
            </a>
            <a href="tel:9222785781">
              <CallIcon /> +91 9222785781
            </a>
            <a href="mailto:shubhamcomputers@hotmail.com?subject=Inquiry%20about%20Shubham%20Computers%20Products%20&body=Hi, %0D%0A%0D%0A">
              <EmailIcon /> shubhamcomputers@hotmail.com
            </a>
            <Typography
              variant="h2"
              sx={{
                fontSize: '1.5em',
                borderBottom: '2px solid #CCC',
                letterSpacing: 1,
                mb: 1,
                mt: 3,
                pb: 0.5
              }}
            >
              OPERATING HOURS
            </Typography>
            <div>
              Monday - Saturday: 9am - 9:30pm
            </div>
            <div style={{ marginTop: '8px' }}>
              Sunday & Public Holidays: Closed
            </div>
          </div>
        </Box>
      </Box>
    </div>
  );
}

export default React.memo(Contact);