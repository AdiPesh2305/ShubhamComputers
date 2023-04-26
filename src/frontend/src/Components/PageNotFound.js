import React from "react";
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import Button from '@mui/material/Button';

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
        variant="h5"
        noWrap
        sx={{
          fontSize: { xs: '1.5em', sm: '2em', md: '3em' },
          textAlign: 'center'
        }}
      >
        <ReportGmailerrorredIcon sx={{ fontSize: '5em' }} />
        <div>Oops! Page not found</div>
      </Typography>
      <Typography
        variant="body1"
        noWrap
        sx={{
          fontSize: { xs: '1.5em', sm: '1.5em', md: '1.5em' },
          mb: 2,
          mt: 1
        }}
      >
        Could not find the page you are looking for!
      </Typography>
      <Button variant="contained" size="large" component={Link} to='/'>
        Go to home page
      </Button>
    </Box>
  );
}