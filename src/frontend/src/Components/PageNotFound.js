import React from "react";
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function PageNotFound() {
  return (
    <Box sx={{
      display: 'flex',
      height: '100vh',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column'
    }}>
      <Typography
        variant="h2"
        noWrap
        sx={{
          fontSize: { xs: '1.5rem', sm: '2rem', md: '3.75rem' },
          my: 2
        }}
      >
        Could not find the page you are looking for!
      </Typography>
      <Typography
        variant="body2"
      >
        <Link to='/'>
          Take me to home page
        </Link>
      </Typography>
    </Box>
  );
}