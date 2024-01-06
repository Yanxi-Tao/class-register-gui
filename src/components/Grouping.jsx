import * as React from 'react';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { DataGrid } from '@mui/x-data-grid';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    height: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

const columns = [
    { field: 'name', headerName: 'Name', width: 180, editable: false },
    {
        field: 'age',
        headerName: 'Age',
        type: 'number',
        width: 180,
        align: 'left',
        headerAlign: 'left',
        editable: false,
    },
    {
        field: 'grade',
        headerName: 'Grade',
        type: 'number',
        width: 180,
        align: 'left',
        headerAlign: 'left',
        editable: false,
    },
]

export default function Grouping(props) {
    const {rows} = props
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <React.Fragment>
            <Button variant="outlined" onClick={handleOpen}>Group</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ mb: 1 }}>
                        Select rows to group students
                    </Typography>
                    <Box sx={{ height: '100%', width: '100%' }}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            initialState={{
                                pagination: {
                                    paginationModel: {
                                        pageSize: 1,
                                    },
                                },
                            }}
                            pageSizeOptions={[1, 2, 3, 4, 5]}
                        />
                    </Box>
                </Box>
            </Modal>
        </React.Fragment>
    )
}