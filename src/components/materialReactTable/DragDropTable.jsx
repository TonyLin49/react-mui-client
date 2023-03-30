import React, { useEffect, useMemo, useRef, useState } from 'react';
import MaterialReactTable from 'material-react-table';
import { 
    Badge, 
    Box, 
    Button, 
    Dialog, 
    DialogActions, 
    DialogContent, 
    Grid, 
    IconButton, 
    Paper, 
    Tooltip, 
    Typography,
} from '@mui/material';
import { 
    Cancel, 
    PlaylistAddSharp, 
    PlaylistRemoveSharp, 
    Send, 
} from '@mui/icons-material';
import { useRecoilValue } from 'recoil';
import { windowDimensionsState } from '../../atoms/globalAtom';
import { MRT_Localization_ZH_HANT } from 'material-react-table/locales/zh-Hant';
import IsActive from './cell/IsActive';
import EditAutocomplete from './edit/EditAutocomplete';
import EditCheckBox from './edit/EditCheckBox';

const initData = [
    {
        firstName: 'John',
        lastName: 'Doe',
        address: '261 Erdman Ford',
        birthday: '1965-12-01',
        state: '',
        isActive: 'N'
    },
    {
        firstName: 'Jane',
        lastName: 'Doe',
        address: '769 Dominic Grove',
        birthday: '1960-12-26',
        state: '',
        isActive: 'Y'
    },
    {
        firstName: 'Joe',
        lastName: 'Doe',
        address: '566 Brakus Inlet',
        birthday: '1988-07-09',
        state: '',
        isActive: 'Y'
    },
    {
        firstName: 'Kevin',
        lastName: 'Vandy',
        address: '722 Emie Stream',
        birthday: '2000-09-19',
        state: '',
        isActive: 'Y'
    },
    {
        firstName: 'Joshua',
        lastName: 'Rolluffs',
        address: '32188 Larkin Turnpike',
        birthday: '1984-08-17',
        state: 'The Godfather',
        isActive: 'Y'
    },
];

const DragDropTable = ({
    detailTitle,
    allDetails,
    columnsDef,
    canInsert,
    canEdit,
    canDetete,
    enableRowDragging
}) => {

    const [editingState, setEditingState] = useState(null)
    const [editingChecked, setEditingChecked] = useState(null)

    const top100Films = [
        { label: 'The Shawshank Redemption', value: 1994 },
        { label: 'The Godfather', value: 1972 },
        { label: 'The Godfather: Part II', value: 1974 },
        { label: 'The Dark Knight', value: 2008 },
        { label: '12 Angry Men', value: 1957 },
        { label: "Schindler's List", value: 1993 },
        { label: 'Pulp Fiction', value: 1992 },
        { label: 'The Lord of the Rings: The Return of the King', value: 2000, },
        { label: 'The Good, the Bad and the Ugly', value: 1966 },
        { label: 'Fight Club', value: 1999 },
        { label: 'The Lord of the Rings: The Fellowship of the Ring', value: 2001,},  
    ]
    
    //canInsert = true
    //canEdit = true
    //canDetete = true
    if(!detailTitle) detailTitle = 'DragDropTable'
    if(!allDetails) allDetails = initData
    if(!columnsDef) columnsDef = [
        {
            accessorKey: 'firstName',
            header: 'First Name',
            size: 80,
        },
        {
            accessorKey: 'lastName',
            header: 'Last Name',
            size: 80,
        },
        {
            accessorKey: 'address',
            header: 'Address',
            size: 180,
        },
        {
            accessorKey: 'birthday',
            header: 'Birthday',
            size: 100,
            muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
                type: 'date',
            }),
        },
        {
            accessorKey: 'isActive',
            header: '啟用',
            size: 60,
            Cell: ({row}) => <IsActive value={row.original.isActive}/>,
            Edit: ({ cell, column }) => 
                <EditCheckBox 
                cell={cell}
                column={column}
                editingChecked={editingChecked}
                setEditingCheckedFC={setEditingChecked}
                />
        },
        {
            accessorKey: 'state',
            header: 'State',
            size: 150,
            Edit: ({ cell, column }) => 
                <EditAutocomplete
                cell={cell}
                column={column}
                setEditingValueFC={setEditingState}
                options={top100Films}
                />
        },
    ]
    const columns = useMemo(
        () => columnsDef,[columnsDef],
    );

    const windowDimensions = useRecoilValue(windowDimensionsState)
    const [data, setData] = useState(allDetails);
    const [rowSelection, setRowSelection] = useState({});
    const [rowSelectedNum, setRowSelectionNum] = useState(0)
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
    const tableInstanceRef = useRef(null)

    useEffect(()=>{
        let idxNum = 0;
        var idxs = Object.keys(rowSelection)
        idxs.forEach(idx=>{
            if(rowSelection[idx]) ++idxNum
        })
        setRowSelectionNum(idxNum)
    },[rowSelection])

    const handleCloseDeleteDialog = () => {
        setOpenDeleteDialog(false)
    }

    const handleClickedDeleteBtn = () => {
        setOpenDeleteDialog(false)
        var idxs = Object.keys(rowSelection).sort((a, b) => b - a)
        for (let i = 0; i < idxs.length; i++) {
            if(rowSelection[idxs[i]]===true)
                data.splice(idxs[i], 1); // remove item at index
        }
        setData([...data])
        setRowSelection({})
    }

    const handleSaveRow = async ({ exitEditingMode, row, values }) => {
        if(editingState) values.state = editingState
        values.isActive = editingChecked
        data[row.index] = values;
        setData([...data]);
        setEditingState(null)
        exitEditingMode(); //required to exit editing mode
    };

    const handleAddItem = () => {
        const defaultItemValues = {
            firstName: '',
            lastName: '',
            address: '',
            birthday: '',
            state: '',
            isActive: 'N'
        }
        setData([defaultItemValues, ...data])
    }

    const muiTablePaginationProps = {
        rowsPerPageOptions: [5, 10, 20],
        showFirstButton: false,
        showLastButton: false,
    }

    const muiTableBodyRowDragHandleProps = ({ table }) => ({
        onDragEnd: () => {
            const { draggingRow, hoveredRow } = table.getState();
            if (hoveredRow && draggingRow) {
                data.splice(
                    hoveredRow.index,
                    0,
                    data.splice(draggingRow.index, 1)[0],
                );
                setData([...data]);
            }
        },
    })

    const muiTableBodyRowProps = ({ row }) => ({
        //implement row selection click events manually
        onClick: () =>
        setRowSelection((prev) => ({
            ...prev,
            [row.id]: !prev[row.id],
        })),
        selected: rowSelection[row.id],
        sx: {
        cursor: 'pointer',
        },
    })

    const initialState = {
        density: 'compact',
        columnVisibility: {id: false},
    }

    const displayColumnDefOptions={
        'mrt-row-actions': {
          muiTableHeadCellProps: {
            align: 'center',
          },
          size: 100,
        },
    }

    const topToolbarCustomActions = () => (
        <Box>
            <Typography 
            variant='subTitle' 
            color='primary'
            sx={{
            fontSize: 18, 
            fontWeight: 'bold',
            marginRight: 2
            }}
            >
            {detailTitle}
            </Typography>
            {canInsert && <Tooltip arrow title="新增明細資料">
            <span>
            <IconButton 
                color='primary'
                onClick={handleAddItem}
            >
                <PlaylistAddSharp/>
            </IconButton>
            </span>
            </Tooltip>}
            {canDetete && 
                <Tooltip arrow title="刪除明細資料">
                    <span>
                    <IconButton 
                        color='error'
                        disabled={rowSelectedNum===0}
                        onClick={()=>{
                            setOpenDeleteDialog(true)
                        }}
                        >
                        <Badge 
                            color='error' 
                            badgeContent={rowSelectedNum}
                        >
                            <PlaylistRemoveSharp/>
                        </Badge>
                    </IconButton>
                    </span>
                </Tooltip>
            }
            {canDetete && 
            <Dialog
            open={openDeleteDialog}
            onClose={handleCloseDeleteDialog}
            >
                <Paper>
                    <DialogContent>
                        <Typography 
                        variant='title1'
                        color='error'
                        >
                        {`確定要刪除所選 ${rowSelectedNum} 筆資料`}
                        </Typography>
                    </DialogContent>
                    <DialogActions sx={{marginBottom:2}}>
                        <Grid container spacing={1} justifyContent='space-around'>
                            <Grid item>
                                <Button 
                                variant='outlined'
                                size='small'
                                color='error'
                                sx={{width:'100%'}}
                                onClick={handleCloseDeleteDialog}
                                startIcon={<Cancel/>}
                                >取消</Button>
                            </Grid>
                            <Grid item>
                                <Button 
                                variant='contained'
                                size='small'
                                color='error'
                                sx={{width:'100%'}}
                                onClick={handleClickedDeleteBtn}
                                startIcon={<Send/>}
                                >確定</Button>
                            </Grid>
                        </Grid>
                    </DialogActions>
                </Paper>
            </Dialog>
            }
        </Box>
    )

    return (
        <MaterialReactTable
        tableInstanceRef={tableInstanceRef}
        //autoResetPageIndex={false}
        columns={columns}
        data={data}
        localization={MRT_Localization_ZH_HANT}
        editingMode="row"
        enableEditing={canEdit}
        onEditingRowSave={handleSaveRow}
        enableRowOrdering={windowDimensions.width>960 && enableRowDragging}
        muiTableBodyRowDragHandleProps={muiTableBodyRowDragHandleProps}
        muiTablePaginationProps={muiTablePaginationProps}
        renderTopToolbarCustomActions={topToolbarCustomActions}
        enableSorting={false}
        enablePagination={false}
        enableColumnActions={false}
        enableColumnFilters={false}
        enableDensityToggle={false}
        enableFullScreenToggle={false}
        enableBottomToolbar={false}
        enableColumnResizing
        enableColumnVirtualization
        enablePinning
        positionToolbarAlertBanner={'none'}
        initialState={initialState}
        state={{rowSelection}}
        muiTableBodyRowProps={muiTableBodyRowProps}
        displayColumnDefOptions={displayColumnDefOptions}
        />
    );
};

export default DragDropTable;