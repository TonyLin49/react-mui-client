import React, { useMemo, useRef, useState } from 'react';
import MaterialReactTable from 'material-react-table';
import { MRT_Localization_ZH_HANT } from 'material-react-table/locales/zh-Hant';
import { useRecoilValue } from 'recoil';
import { windowDimensionsState } from '../../atoms/globalAtom';
import { 
    Badge,
    Button, 
    Dialog, 
    DialogActions, 
    DialogContent, 
    Grid, 
    IconButton, 
    Paper, 
    Tooltip, 
    Typography 
} from '@mui/material';
import { 
    Cancel, 
    DeleteSweep, 
    FindInPage, 
    PlaylistAddCircle, 
    SaveAs, 
    Send 
} from '@mui/icons-material';
import { Box } from '@mui/system';

const sampleData = [
  {
    name: {
      firstName: 'John',
      lastName: 'Doe',
    },
    address: '261 Erdman Ford',
    city: 'East Daphne',
    state: 'Kentucky',
  },
  {
    name: {
      firstName: 'Jane',
      lastName: 'Doe',
    },
    address: '769 Dominic Grove',
    city: 'Columbus',
    state: 'Ohio',
  },
  {
    name: {
      firstName: 'Joe',
      lastName: 'Doe',
    },
    address: '566 Brakus Inlet',
    city: 'South Linda',
    state: 'West Virginia',
  },
  {
    name: {
      firstName: 'Kevin',
      lastName: 'Vandy',
    },
    address: '722 Emie Stream',
    city: 'Lincoln',
    state: 'Nebraska',
  },
  {
    name: {
      firstName: 'Kevin',
      lastName: 'Vandy',
    },
    address: '722 Emie Stream',
    city: 'Lincoln',
    state: 'Nebraska',
  },
  {
    name: {
      firstName: 'Joshua',
      lastName: 'Rolluffs',
    },
    address: '32188 Larkin Turnpike',
    city: 'Charleston',
    state: 'South Carolina',
  },
];

const MaterialDetailTable = ({
    detailTitle,
    DetailForm
}) => {
    const windowDimensions = useRecoilValue(windowDimensionsState)
    const [data, setData] = useState(sampleData)
    const [currentRow, setCurrentRow] = useState(null)
    const [rowSelection, setRowSelection] = useState({});
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
    const [actionMode, setActionMode] = useState('view')
    const tableInstanceRef = useRef(null)
    const [openForm, setOpenForm] = useState(false)

    const handleCloseDeleteDialog = () => {
        setOpenDeleteDialog(false)
    }
    
    const handleCloseForm = () => {
        setOpenForm(false)
    }
    
    const handleOpenForm = (actionMode) => {
        setActionMode(actionMode)
        setOpenForm(true)
        const rowNum = Object.keys(rowSelection)[0]
        const rowData = tableInstanceRef.current.getRow(rowNum).original
        setCurrentRow(rowData.id)
    }

    const handleClickedDeleteBtn = () => {
        setOpenDeleteDialog(false)
        var ids = []
        Object.keys(rowSelection).forEach(rowNum=>{
          const id = tableInstanceRef.current.getRow(rowNum).original.id
          ids.push(id)
        })
        setRowSelection({})
    }
    
    const columns = useMemo(() => [
        {
            accessorKey: 'name.firstName', 
            header: 'First Name',
        },
        {
            accessorKey: 'name.lastName',
            header: 'Last Name',
        },
        {
            accessorKey: 'address', 
            header: 'Address',
        },
        {
            accessorKey: 'city',
            header: 'City',
        },
        {
            accessorKey: 'state',
            header: 'State',
        },
    ],[],);

    const muiTablePaginationProps = {
        rowsPerPageOptions: [5, 10, 20],
        showFirstButton: false,
        showLastButton: false,
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
            {detailTitle || '訂單明細'}
            </Typography>
            <Tooltip arrow title="新增明細資料">
            <IconButton 
                color='primary'
                onClick={()=>{
                    setActionMode('insert')
                    setOpenForm(true)
                    setCurrentRow(null)
                }}
            >
                <PlaylistAddCircle/>
            </IconButton>
            </Tooltip>
            <Tooltip arrow title="檢視明細資料">
            <span>
            <IconButton 
                color='success'
                disabled={Object.keys(rowSelection).length!==1}
                onClick={()=>handleOpenForm('view')}
            >
                <FindInPage/>
            </IconButton>
            </span>
            </Tooltip>
            <Tooltip arrow title="修改明細資料">
                <span>
                    <IconButton 
                        color='secondary'
                        disabled={Object.keys(rowSelection).length!==1}
                        onClick={()=>handleOpenForm('update')}
                    >
                        <SaveAs/>
                    </IconButton>
                </span>
            </Tooltip>
            <Tooltip arrow title="刪除明細資料">
                <span>
                    <IconButton 
                        color='error'
                        disabled={Object.keys(rowSelection).length===0}
                        onClick={()=>{
                        setOpenDeleteDialog(true)
                        }}
                    >
                        <Badge 
                            color='error' 
                            badgeContent={Object.keys(rowSelection).length}
                        >
                            <DeleteSweep/>
                        </Badge>
                    </IconButton>
                </span>
            </Tooltip>
            <Dialog 
            open={openForm}
            onClose={handleCloseForm}
            >
                <DetailForm 
                actionMode={actionMode}
                onCloseFC={handleCloseForm}
                objId={currentRow}
                handleCloseForm={handleCloseForm}
                />
            </Dialog>
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
                        {`確定要刪除所選 ${Object.keys(rowSelection).length} 筆資料`}
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
        </Box>
    )

    return (
        <MaterialReactTable 
            tableInstanceRef={tableInstanceRef}
            columns={columns} 
            data={data} 
            localization={MRT_Localization_ZH_HANT}
            initialState={{
                density: 'compact',
                columnVisibility: {id: false},
            }}
            enableColumnActions={false}
            enableColumnFilters={false}
            enableDensityToggle={false}
            enableFullScreenToggle={false}
            enableGlobalFilter={windowDimensions.width>640}
            enablePinning={windowDimensions.width>640}
            positionToolbarAlertBanner={windowDimensions.width>640?'bottom':'none'}
            enableRowSelection
            muiTablePaginationProps={muiTablePaginationProps}
            renderTopToolbarCustomActions={topToolbarCustomActions}
        />
    )
};

export default MaterialDetailTable;
