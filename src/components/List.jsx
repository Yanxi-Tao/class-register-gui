import * as React from 'react';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
    GridRowModes,
    DataGrid,
    GridActionsCellItem,
    GridRowEditStopReasons,
} from '@mui/x-data-grid';

import Toolbar from "./Toolbar"

const initialRows = [
    {
        id: 0,
        name: "Sam",
        age: 25,
        grade: 5,
    },
];


export default function FullFeaturedCrudGrid() {
    const [rows, setRows] = React.useState(initialRows);
    const [rowModesModel, setRowModesModel] = React.useState({});
    const handleRowEditStop = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const handleEditClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const handleSaveClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };

    const handleDeleteClick = (id) => () => {
        setRows(rows.filter((row) => row.id !== id));
    };

    const handleCancelClick = (id) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });

        const editedRow = rows.find((row) => row.id === id);
        if (editedRow.isNew) {
            setRows(rows.filter((row) => row.id !== id));
        }
    };

    const processRowUpdate = (newRow) => {
        const updatedRow = { ...newRow, isNew: false };
        setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
        return updatedRow;
    };

    const handleRowModesModelChange = (newRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    const handleRandom = () => {
        return rows[Math.floor(Math.random() * rows.length)]
    }

    const handleCalc = () => {
        if (rows.length <= 0) return 0
        let sum = 0;
        let min = rows[0].grade
        let max = rows[0].grade
        rows.forEach((student) => {
            sum += student.grade
            if (student.grade > max) { max = student.grade }
            if (student.grade < min) { min = student.grade }
        })
        return (rows.length >= 1 ? { avg: sum / rows.length, min, max } : 0)
    }

    const columns = [
        {
            field: 'name',
            headerName: 'Name',
            width: 180,
            editable: true,
            preProcessEditCellProps: (params) => {
                let regex = /^[a-zA-Z]+$/;
                const hasError = !regex.test(params.props.value)
                return { ...params.props, error: hasError };
            },
        },
        {
            field: 'age',
            headerName: 'Age',
            type: 'number',
            width: 180,
            align: 'left',
            headerAlign: 'left',
            editable: true,
            preProcessEditCellProps: (params) => {
                const hasError = params.props.value <= 0
                console.log(hasError);
                return { ...params.props, error: hasError };
            },
        },
        {
            field: 'grade',
            headerName: 'Grade',
            type: 'number',
            width: 180,
            align: 'left',
            headerAlign: 'left',
            editable: true,
            preProcessEditCellProps: (params) => {
                const hasError = params.props.value <= 0 || params.props.value > 100
                console.log(hasError, params);
                return { ...params.props, error: hasError };
            },
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 100,
            cellClassName: 'actions',
            getActions: ({ id }) => {
                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={<SaveIcon />}
                            label="Save"
                            sx={{
                                color: 'primary.main',
                            }}
                            onClick={handleSaveClick(id)}
                        />,
                        <GridActionsCellItem
                            icon={<CancelIcon />}
                            label="Cancel"
                            className="textPrimary"
                            onClick={handleCancelClick(id)}
                            color="inherit"
                        />,
                    ];
                }

                return [
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={handleDeleteClick(id)}
                        color="inherit"
                    />,
                ];
            },
        },
    ];

    return (
        <Box
            sx={{
                height: 500,
                width: '100%',
                '& .actions': {
                    color: 'text.secondary',
                },
                '& .textPrimary': {
                    color: 'text.primary',
                },
            }}
        >
            <DataGrid
                rows={rows}
                columns={columns}
                editMode="row"
                rowModesModel={rowModesModel}
                onRowModesModelChange={handleRowModesModelChange}
                onRowEditStop={handleRowEditStop}
                processRowUpdate={processRowUpdate}
                disableColumnSelector
                disableDensitySelector
                slots={{
                    toolbar: Toolbar,
                }}
                slotProps={{
                    toolbar: { setRows, setRowModesModel, newID: rows.length + 1, handleRandom, rows, handleCalc },
                }}
            />
        </Box>
    );
}