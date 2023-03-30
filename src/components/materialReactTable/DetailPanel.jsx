import React, { useMemo } from 'react';
import MaterialReactTable from 'material-react-table';
import { MRT_Localization_ZH_HANT } from 'material-react-table/locales/zh-Hant';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';

const DetailPanel = ({
    panelTitle,
    data,
    columnDef
}) => {
    const columns = useMemo(() => columnDef,[columnDef],);
    const topToolbarCustomActions = ()=>(
        <Box>
        <Typography
        variant='subTitle' 
        color='primary'
        sx={{
          fontSize: 18, 
          fontWeight: 'bold',
          marginRight: 2,
        }}
        >
          {panelTitle || 'Detail Panel'}
        </Typography>
        </Box>
    )

    return (
        <MaterialReactTable 
            columns={columns} 
            data={data} 
            localization={MRT_Localization_ZH_HANT}
            initialState={{
                density: 'compact',
            }}
            enableColumnActions={false}
            enableColumnFilters={false}
            enableDensityToggle={false}
            enableFullScreenToggle={false}
            enableRowSelection={false}
            enableGlobalFilter
            enablePagination={false}
            enableBottomToolbar={false}
            renderTopToolbarCustomActions={topToolbarCustomActions}
        />
    )
};

export default DetailPanel;