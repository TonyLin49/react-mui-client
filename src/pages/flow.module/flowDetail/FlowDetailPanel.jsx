import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';
import { sequelizeApiBaseURL } from '../../../apis/data.api';
import { localeState } from '../../../atoms/globalAtom';
import DetailPanel from '../../../components/materialReactTable/DetailPanel'
import { flowDetailLocale as language } from './flowDetail.locale';

const FlowDetailPanel = ({
    parentId
}) => {
    const locale = useRecoilValue(localeState)
    const [lan, setLan] = useState(language[locale]) //語系資料
    useEffect(()=>{ //設定表單的語系文字
        setLan(language[locale])
    },[locale])
    
    const { data } = useQuery({
        queryKey: `FlowDetailPanel-${parentId}`,
        queryFn: async () => {
            const fetchURL = new URL(
                `flowdetails/all?code=${parentId}`,
                sequelizeApiBaseURL,
            );
            const response = await fetch(fetchURL.href);
            const json = await response.json();
            return json;
        },
        keepPreviousData: true,
    });

    const columns = [
        { accessorKey:'step', header:lan?.step?.label, size:60, },
        { accessorKey:'stepName', header:lan?.stepName?.label, size:100, },
        { accessorKey:'signedTime', header:lan?.signedTime?.label, size:140, },
        { accessorKey:'signedResult', header:lan?.signedResult?.label, size:100, },
        { accessorKey:'memo', header:lan?.memo?.label, size:100, },
      ]
    return (
        <DetailPanel
        panelTitle={lan?.title.label || '簽核流程'}
        data={data ?? []}
        columnDef={columns}
        />
    )
}

export default FlowDetailPanel