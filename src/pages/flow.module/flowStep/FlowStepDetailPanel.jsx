import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';
import { sequelizeApiBaseURL } from '../../../apis/data.api';
import { localeState } from '../../../atoms/globalAtom';
import { 
    departmentOptionsSelector, 
    employeeOptionsSelector, 
} from '../../../atoms/optionsAtom';
import { handleShowCellContent } from '../../../components/materialReactTable/cell/cellUtil'
import IsCheck from '../../../components/materialReactTable/cell/IsCheck';
import DetailPanel from '../../../components/materialReactTable/DetailPanel'
import { flowStepLocale as language } from './flowStep.locale';

const FlowStepDetailPanel = ({
    parentId
}) => {
    const locale = useRecoilValue(localeState)
    const [lan, setLan] = useState(language[locale]) //語系資料
    useEffect(()=>{ //設定表單的語系文字
        setLan(language[locale])
    },[locale])
    
    const { data } = useQuery({
        queryKey: `FlowStepDetailPanel-${parentId}`,
        queryFn: async () => {
            const fetchURL = new URL(
                `flowsteps/all?parentId=${parentId}`,
                sequelizeApiBaseURL,
            );
            const response = await fetch(fetchURL.href);
            const json = await response.json();
            return json;
        },
        keepPreviousData: true,
    });

    const deptOptions = useRecoilValue(departmentOptionsSelector)//部門選單
    const empOptions = useRecoilValue(employeeOptionsSelector)//員工選單

    const columns = [
        // { accessorKey:'id', header:lan?.id?.label, size:100, },
        // { accessorKey:'sysNo', header:lan?.sysNo?.label, size:100, },
        // // { accessorKey:'code', header: lan?.code?.label, size: 100 },
        // { accessorKey:'formTableName', header:lan?.formTableName?.label, size:100, 
        // Cell: ({row})=>handleShowCellContent(row.original.formTableName, programStructureOptions)},
        // { accessorKey:'parentId', header:lan?.parentId?.label, size:140, },
        { accessorKey:'step', header:lan?.step?.label, size:60, },
        { accessorKey:'stepName', header:lan?.stepName?.label, size:100, },
        { accessorKey:'createDept', header: lan?.createDept?.label, size: 100, 
        Cell: ({row})=>handleShowCellContent(row.original.createDept,deptOptions),},
        { accessorKey:'applicant', header:lan?.applicant?.label, size: 100, 
        Cell: ({row})=>handleShowCellContent(row.original.applicant,empOptions)},
        { accessorKey:'signerId', header:lan?.signerId?.label, size:100, 
        Cell: ({row})=>handleShowCellContent(row.original.signerId, empOptions)},
        { accessorKey:'resetFlow', header:lan?.resetFlow?.label, size:100, 
        Cell: ({row})=><IsCheck value={row.original?.resetFlow} />,},
        { accessorKey:'canDecided', header:lan?.canDecided?.label, size:100,    
        Cell: ({row})=><IsCheck value={row.original?.canDecided} />,},
        { accessorKey:'canEditField', header:lan?.canEditField?.label, size:100,    
        Cell: ({row})=><IsCheck value={row.original?.canEditField} />,},
        { accessorKey:'isSendMessage', header:lan?.isSendMessage?.label, size:100,    
        Cell: ({row})=><IsCheck value={row.original?.isSendMessage} />,},
        // { accessorKey:'messageValue', header:lan?.messageValue?.label, size:100, },
    ]
    return (
        <DetailPanel
        panelTitle={lan?.title.label || '簽核流程'}
        data={data ?? []}
        columnDef={columns}
        />
    )
}

export default FlowStepDetailPanel