import React, { useMemo, useState } from 'react';
import MaterialReactTable from 'material-react-table';
import { MRT_Localization_ZH_HANT } from 'material-react-table/locales/zh-Hant';
import { windowDimensionsState } from '../../atoms/globalAtom';
import { useRecoilValue } from 'recoil';

const RowEditingTable = () => {
    const windowDimensions = useRecoilValue(windowDimensionsState)
  
    const columns = useMemo(
        () => [
        //column definitions...
        {
            accessorKey: 'firstName',
            header: 'First Name',
        },
        {
            accessorKey: 'lastName',
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
        }, //end
        ],
        [],
    );

    const initData = [
        {
            firstName: 'John',
            lastName: 'Doe',
            address: '261 Erdman Ford',
            city: 'East Daphne',
            state: 'Kentucky',
        },
        {
            firstName: 'Jane',
            lastName: 'Doe',
            address: '769 Dominic Grove',
            city: 'Columbus',
            state: 'Ohio',
        },
        {
            firstName: 'Joe',
            lastName: 'Doe',
            address: '566 Brakus Inlet',
            city: 'South Linda',
            state: 'West Virginia',
        },
        {
            firstName: 'Kevin',
            lastName: 'Vandy',
            address: '722 Emie Stream',
            city: 'Lincoln',
            state: 'Nebraska',
        },
        {
            firstName: 'Joshua',
            lastName: 'Rolluffs',
            address: '32188 Larkin Turnpike',
            city: 'Charleston',
            state: 'South Carolina',
        },
    ];

    const [tableData, setTableData] = useState(() => initData);

    const handleSaveRow = async ({ exitEditingMode, row, values }) => {
        //if using flat data and simple accessorKeys/ids, you can just do a simple assignment here.
        tableData[row.index] = values;
        //send/receive api updates here
        setTableData([...tableData]);
        exitEditingMode(); //required to exit editing mode
    };

    return (
        <MaterialReactTable
        columns={columns}
        data={tableData}
        localization={MRT_Localization_ZH_HANT}
        editingMode="row"
        enableEditing={true}
        onEditingRowSave={handleSaveRow}
        enableRowSelection={true}
        enableRowOrdering={windowDimensions.width>960}
        enableSorting={false}
        enableColumnActions={false}
        enableColumnFilters={false}
        enableDensityToggle={false}
        enableFullScreenToggle={false}
        positionToolbarAlertBanner={windowDimensions.width>640?'bottom':'none'}
        initialState={{
            density: 'compact',
            columnVisibility: {id: false},
        }}
        muiTableBodyRowDragHandleProps={({ table }) => ({
            onDragEnd: () => {
                const { draggingRow, hoveredRow } = table.getState();
                if (hoveredRow && draggingRow) {
                    tableData.splice(
                        hoveredRow.index,
                        0,
                        tableData.splice(draggingRow.index, 1)[0],
                    );
                    setTableData([...tableData]);
                }
            },
        })}
        />
    );
};

export default RowEditingTable;
