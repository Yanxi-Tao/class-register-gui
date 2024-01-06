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

export default function Calculate(props) {
    const {handleCalc} = props
    const calc = handleCalc()
    const {avg, min, max} = calc
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <React.Fragment>
            <Button variant="outlined" onClick={handleOpen}>Calculate</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {calc ? "Calculations" : "Enter Data First"}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {calc ? "Avg: "+avg : ""}<br />
                        {calc ? "Min: "+min : ""}<br />
                        {calc ? "Max: "+max : ""}
                    </Typography>
                </Box>
            </Modal>
        </React.Fragment>
    )
}