import * as React from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import {
    GridRowModes,
    GridToolbarContainer,
    GridToolbar,
} from '@mui/x-data-grid';

import RandomPicker from './RandomPicker';
import Grouping from './Grouping';
import Calculate from './Calculate';

export default function Toolbar(props) {
    const { setRows, setRowModesModel, newID, handleRandom, rows, handleCalc } = props;

    const handleClick = () => {
        // hidden id for new student added
        const id = newID;
        setRows((oldRows) => [...oldRows, { id, name: '', age: '', isNew: true }]);
        setRowModesModel((oldModel) => ({
            ...oldModel,
            [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
        }));
    };

    return (
        <GridToolbarContainer sx={{ mt: 0.5 }}>
            <Button color="primary" startIcon={<AddIcon />} variant="outlined" onClick={handleClick}>
                Add record
            </Button>
            <RandomPicker handleRandom={handleRandom}/>
            <Grouping rows={rows}/>
            <Calculate handleCalc={handleCalc}/>
            <GridToolbar showQuickFilter={true} />
        </GridToolbarContainer>
    );
}