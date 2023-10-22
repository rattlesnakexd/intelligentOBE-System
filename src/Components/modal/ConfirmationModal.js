import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';

function ConfirmationModal(props) {
    const {open, setOpen, setDeleteData } = props;

    const handleClose = () => {
        setOpen(false);
    };
    const handleConfirm = () => {
        setDeleteData(true);
        setOpen(false);
    }
    const body = (
        <Box 
            sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: 'background.paper',
                border: '2px solid #000',
                boxShadow: 24,
                p: 4,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
            }}
        >
            <Typography variant="h6" id="modal-title">
                {"Are you sure ?"}
            </Typography>

            <Box 
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    gap: 2,
                }}
            >
                <Button 
                    variant="outlined" 
                    color="primary" 
                    onClick={handleClose}
                >
                    Cancel
                </Button>
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={handleConfirm}
                >
                    Confirm
                </Button>
            </Box>
        </Box>
    );

    return (
        <Modal
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="modal-title"
            aria-describedby="confirmation-modal-description"
        >
            {body}
        </Modal>
    );
}

export default ConfirmationModal;
