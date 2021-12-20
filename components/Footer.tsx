import React from 'react';
import Box, { BoxProps } from '@mui/material/Box';
import { Typography } from '@mui/material';

const Footer = () => {
    return (
        <Box sx={{
            width: { xs: `100%` },
            display: 'flex',
            height: '30px',
            position: 'fixed',
            bottom: 0,
            right: 0,
            alignItems: 'center',
            padding: '0 10px',
            backgroundColor: 'darkgrey', 
            justifyContent: 'space-around'
          }}
          >
            <Typography variant="body2" sx={{fontSize: 10, textAlign: 'center'}}>
                Аутентифицируясь, вы соглашаетесь с использованием cookies для авторизации на этом сайте.
            </Typography>
        </Box>
    );
};

export default Footer;