import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';
import { sequelizeApiBaseURL } from '../../../apis/data.api';
import { localeState } from '../../../atoms/globalAtom';
import { departmentOptionsSelector, programOptionsAtom } from '../../../atoms/optionsAtom';
import { handleShowCellContent } from '../../../components/materialReactTable/cell/cellUtil'
import IsCheck from '../../../components/materialReactTable/cell/IsCheck';
import DetailPanel from '../../../components/materialReactTable/DetailPanel'
import { permissionLocale as language } from './permission.locale';

const PermissionDetailPanel = ({
    parentTable,
    parentId
}) => {
    const locale = useRecoilValue(localeState)
    const [lan, setLan] = useState(language[locale]) //語系資料
    useEffect(()=>{ //設定表單的語系文字
        setLan(language[locale])
    },[locale])
    
    const { data } = useQuery({
        queryKey: `PermissionDetailPanel-${parentTable}-${parentId}`,
        queryFn: async () => {
            const fetchURL = new URL(
                `permissions/all?parentTable=${parentTable}&parentId=${parentId}`,
                sequelizeApiBaseURL,
            );
    
            const response = await fetch(fetchURL.href);
            const json = await response.json();
            return json;
        },
        keepPreviousData: true,
    });

    const deptOptions = useRecoilValue(departmentOptionsSelector)
    const programOptions = useRecoilValue(programOptionsAtom)

    const authOptions = [
        {value:'All', label:'All-全部'},
        {value:'Self', label:'Self-自己'},
        {value:'Department', label:'Department-部門'},
        {value:'Disabled', label:'Disabled-禁用'},
    ]

    const columns = [
        { accessorKey:'programId', header:lan?.programId?.label, size:100, 
        Cell: ({row})=>handleShowCellContent(row.original.programId, programOptions)},
        { accessorKey:'canInsert', header:lan?.canInsert?.label, size:100,    
        Cell: ({row})=><IsCheck value={row.original?.canInsert} />,},
        { accessorKey:'searchAuth', header:lan?.searchAuth?.label, size:100,
        Cell: ({row})=>handleShowCellContent(row.original.searchAuth,authOptions),},
        { accessorKey:'updateAuth', header:lan?.updateAuth?.label, size:100,    
        Cell: ({row})=>handleShowCellContent(row.original.updateAuth,authOptions),},
        { accessorKey:'deleteAuth', header:lan?.deleteAuth?.label, size:100,    
        Cell: ({row})=>handleShowCellContent(row.original.deleteAuth,authOptions),},
        { accessorKey:'multiDeptsAuth', header:lan?.multiDeptsAuth?.label, size:100,
        Cell: ({row})=>handleShowCellContent(row.original.multiDeptsAuth,deptOptions),},
    ]
    return (
        <DetailPanel
        panelTitle={lan?.title.label || '權限設定'}
        data={data ?? []}
        columnDef={columns}
        />
    )
}

export default PermissionDetailPanel