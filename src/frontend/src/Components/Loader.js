import React from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

export default function Loader() {
    return (
        <Box sx={{
            display:'flex',
            height: '100vh',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column'
        }}>
            <CircularProgress size={50} />
            {/* <img src="images/loading.gif" alt="" />
            <img src="images/loading2.gif" alt="" />
            <img src="images/loading3.gif" alt="" /> */}
            <Typography
                variant="h2"
                noWrap
                sx={{
                    fontSize: { xs: '1.5rem', sm: '2rem', md: '3.75rem' },
                    mt: 2
                }}
            >
                Loading Shubham Computers...
            </Typography>
        </Box>
    );
}