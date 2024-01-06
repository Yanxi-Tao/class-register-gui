import * as React from 'react';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

export default function RandomPicker(props) {
    const {handleRandom} = props
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <React.Fragment>
            <Button variant="outlined" onClick={handleOpen}>Random</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {handleRandom() ? "Randomly Selected Student" : "Enter Data First"}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {handleRandom() ? "Name: " + handleRandom().name : ""}<br />
                        {handleRandom() ? "Age: " + handleRandom().age : ""}<br />
                        {handleRandom() ? "Grade: " + handleRandom().grade : ""}
                    </Typography>
                </Box>
            </Modal>
        </React.Fragment>
    )
}