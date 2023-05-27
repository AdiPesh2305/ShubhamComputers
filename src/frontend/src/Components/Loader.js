import React from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

const Loader = ({message}) => {
    return (
        <Box sx={{
            display:'flex',
            height: message ? 'auto' : '100vh',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column'
        }}>
            <CircularProgress size={50} color="inherit" />
            <Typography
                variant="h2"
                noWrap
                sx={{
                    fontSize: { xs: '1.5em', sm: '2em', md: '3.75em' },
                    mt: 2
                }}
            >
                {message || 'Loading Shubham Computers...'}
            </Typography>
        </Box>
    );
}

export default React.memo(Loader);