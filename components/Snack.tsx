import Snackbar from '@material-ui/core/Snackbar';
import React from 'react';
import Alert from '@mui/material/Alert';

const Snack = ({isOpen, handleClose, message}) => {
    return (
        <Snackbar 
        open={isOpen}
        onClose={handleClose}
        autoHideDuration={4000}
        >
            <Alert 
            severity="success" 
            >
                {message}
            </Alert>
        </Snackbar>
    );
};

export default Snack;