import React, { useEffect, useMemo, useRef, useState } from 'react';
import MaterialReactTable from 'material-react-table';
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
import { useQuery } from 'react-query';
import { 
  MRT_Localization_ZH_HANT 
} from 'material-react-table/locales/zh-Hant';
import { sequelizeApiBaseURL } from '../../apis/data.api';
import { 
  Cancel, 
  CloudSync, 
  DeleteSweep, 
  PlaylistAddCircle, 
  Print, 
  SaveAs, 
  Send 
} from '@mui/icons-material';
import { Box } from '@mui/system';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { notificationAlertState, windowDimensionsState } from '../../atoms/globalAtom';
import { getSessionData } from '../../utils/globalUtil';
import { SESSION_USER_OBJECT } from '../../constants/globalConstant';

const MaterialMasterTable = ({
  lan,
  queryApiUrl,
  deleteApi,
  columnsDef, 
  ActionForm,
  columnVisibility,
  enableRowSelection,
  disabledInsert,
  renderDetailPanel,
  defaultFilters,
  paperSize,
  disabledPrint
}) => {
  const windowDimensions = useRecoilValue(windowDimensionsState)
  const sessionUser = getSessionData(SESSION_USER_OBJECT)
  const setNotification = useSetRecoilState(notificationAlertState) 
  const tableInstanceRef = useRef(null)
  const [openForm, setOpenForm] = useState(false)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [actionMode, setActionMode] = useState('view')
  const [columnFilters, setColumnFilters] = useState(defaultFilters || []);
  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [currentRow, setCurrentRow] = useState(null)
  const [rowSelection, setRowSelection] = useState({});

  useEffect(() => {
    if(Object.keys(rowSelection).length>0)
      setCurrentRow(null)
  }, [rowSelection])
  
  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false)
  }

  const handleCloseForm = () => {
    setOpenForm(false)
  }

  const handleOpenForm = (actionMode) => {
    setActionMode(actionMode)
    setOpenForm(true)
  }

  const handleClickedDeleteBtn = () => {
    setOpenDeleteDialog(false)
    var ids = []
    Object.keys(rowSelection).forEach(rowNum=>{
      const id = tableInstanceRef.current.getRow(rowNum).original.id
      ids.push(id)
    })
    deleteApi(ids)
    setRowSelection({})
    setCurrentRow(null)
    setNotification({
      open: true, 
      message: '所選資料已刪除', 
      severity: 'success'
    })
    requestAnimationFrame(() => {
      setTimeout(() => {refetch()}, "1000")
    })
  }

  const { data, isError, isFetching, isLoading, refetch } = useQuery({
    queryKey: [
      `${queryApiUrl}-table-data`,
      columnFilters, //refetch when columnFilters changes
      pagination.pageIndex, //refetch when pagination.pageIndex changes
      pagination.pageSize, //refetch when pagination.pageSize changes
      sorting, //refetch when sorting changes
    ],
    queryFn: async () => {
      const fetchURL = new URL(
        queryApiUrl,
        sequelizeApiBaseURL,
      );
      fetchURL.searchParams.set('page',`${pagination.pageIndex}`,);
      fetchURL.searchParams.set('size', `${pagination.pageSize}`);
      fetchURL.searchParams.set('filters', JSON.stringify(columnFilters ?? []));
      fetchURL.searchParams.set('sorting', JSON.stringify(sorting ?? []));

      const response = await fetch(fetchURL.href);
      const json = await response.json();
      setCurrentRow(null)
      setRowSelection({})
      return json;
    },
    keepPreviousData: true,
  });

  const columns = useMemo(
    () => columnsDef,
    [columnsDef],
  );

  const topToolbarCustomActions = ()=>(
    <Box>
    <Typography 
    variant='subTitle' 
    color='primary'
    sx={{
      fontSize: 20, 
      fontWeight: 'bold',
      marginRight: 2
    }}
    >
      {lan?.title?.label || 'MastersTable'}
    </Typography>
    {windowDimensions.width>640 &&
    <Tooltip arrow title="同步資料">
      <IconButton 
          color='secondary'
          onClick={() => refetch()}
      >
        <CloudSync/>
      </IconButton>
    </Tooltip>}
    {/* <Tooltip arrow title="瑩幕列印"> */}
    {!disabledPrint && windowDimensions.width>640 &&
      <IconButton 
      color='success'
      onClick={() => window.print()}
      >
        <Print />
      </IconButton>
    }
    {/* </Tooltip> */}
    {!disabledInsert && sessionUser?.applicant 
      && sessionUser?.applicant.length>0 &&
    <Tooltip arrow title="新增資料">
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
    </Tooltip>}
    {enableRowSelection && 
    <>
    {/* <Tooltip arrow title="檢視資料">
      <span>
      <IconButton 
          color='success'
          disabled={!currentRow}
          onClick={()=>handleOpenForm('view')}
      >
        <FindInPage/>
      </IconButton>
      </span>
    </Tooltip> */}
    <Tooltip arrow title="修改資料">
      <span>
      <IconButton 
          color='secondary'
          disabled={!currentRow}
          onClick={()=>handleOpenForm('update')}
      >
        <SaveAs/>
      </IconButton>
      </span>
    </Tooltip>
    <Tooltip arrow title="刪除資料">
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
    </>}
      <Dialog 
        open={openForm}
        onClose={handleCloseForm}
      >
        <ActionForm 
          lan={lan}
          actionMode={actionMode}
          onCloseFC={handleCloseForm}
          syncDataFC={refetch}
          currentRow={currentRow}
          handleCloseForm={handleCloseForm}
          defaultValues={defaultFilters}
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

  const muiToolbarAlertBannerProps = (
    isError
    &&  {
          color: 'error',
          children: '獲取資料發生了錯誤',
        }
  )

  const muiTablePaginationProps = {
    rowsPerPageOptions: [5, 10],
    showFirstButton: true,
    showLastButton: true,
  }

  const muiTableState = {
    columnFilters,
    isLoading,
    pagination,
    rowSelection,
    showAlertBanner: isError,
    showProgressBars: isFetching,
    sorting,
  }

  if(!columnVisibility) columnVisibility = {
    id: false, 
    sysNo: false, 
    applicant: false, 
    createDept: false, 
  }

  const initState = {
    showColumnFilters: false,
    density: 'compact',
    columnVisibility,
  }

  const muiTableBodyRowProps = ({ row }) => {
    let color = ''
    if(JSON.stringify(row.original)===JSON.stringify(currentRow)){
      color = '#eee'
    }
    return ({
    onClick: () => {
      if(Object.keys(rowSelection).length===0)
        setCurrentRow(row.original)
      if(JSON.stringify(row.original)===JSON.stringify(currentRow)){
        setCurrentRow(null)
      }
    },
    sx: { cursor: 'pointer', backgroundColor: color}
  })}

  return (
    <MaterialReactTable 
      width={paperSize || '100%'}
      tableInstanceRef={tableInstanceRef}
      columns={columns}
      data={data?.rows ?? []} 
      rowCount={data?.count ?? 0}
      localization={MRT_Localization_ZH_HANT}
      initialState={initState}
      enableGlobalFilter={false}
      enableColumnActions={false}
      enableDensityToggle={false}
      enablePinning
      enableColumnResizing
      enableBottomToolbar={true}
      enableRowSelection={enableRowSelection}
      positionToolbarAlertBanner='none'
      positionPagination='bottom'
      manualFiltering
      manualPagination
      manualSorting
      muiToolbarAlertBannerProps={muiToolbarAlertBannerProps}
      muiTablePaginationProps={muiTablePaginationProps}
      onColumnFiltersChange={setColumnFilters}
      onPaginationChange={setPagination}
      onSortingChange={setSorting}
      onRowSelectionChange={setRowSelection}
      renderTopToolbarCustomActions={topToolbarCustomActions}
      state={muiTableState}
      muiTableBodyRowProps={muiTableBodyRowProps}
      renderDetailPanel={renderDetailPanel}
    />
  );
};

export default MaterialMasterTable;
