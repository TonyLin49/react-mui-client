import { Box } from '@mui/system';
import { destroyMany } from './logInfo.api';
import LogInfoForm from './LogInfoForm';
import { logInfoLocale as language } from './logInfo.locale';
import MaterialMasterTable from '../../../components/materialReactTable/MaterialMasterTable';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { localeState } from '../../../atoms/globalAtom';
import { programStructureOptionsAtom } from '../../../atoms/optionsAtom';
import { handleShowCellContent } from '../../../components/materialReactTable/cell/cellUtil';

const LogInfosTable = () => {
  const locale = useRecoilValue(localeState)
  const [lan, setLan] = useState(language[locale]) //語系資料
  useEffect(()=>{ //設定表單的語系文字
    setLan(language[locale])
  },[locale])

  const programStructureOptions = useRecoilValue(programStructureOptionsAtom)
  const actionOptions = [
    {value: 'InsertLog', label: 'InsertLog-新增'},
    {value: 'UpdateLog', label: 'UpdateLog-修改'},
    {value: 'DeleteLog', label: 'DeleteLog-刪除'},
  ]

  const columns = [
    // { accessorKey:'id', header:lan?.id?.label, size:100, },
    // { accessorKey:'sysNo', header:lan?.sysNo?.label, size:100, },
    // { 
    // accessorKey:'createDept', header: lan?.createDept?.label, size: 100, 
    // Cell: ({row})=>handleShowCellContent(row.original.createDept,deptOptions),
    // },
    // { 
    // accessorKey:'applicant', header:lan?.applicant?.label,size: 100, 
    // Cell: ({row})=>handleShowCellContent(row.original.applicant,empOptions)
    // },
    // { accessorKey: 'code', header: lan?.code?.label, size: 100 },
    { accessorKey:'action', header:lan?.action?.label, size:80,
    Cell: ({row})=>handleShowCellContent(row.original.action, actionOptions)},
    { accessorKey:'updateTime', header:lan?.updateTime?.label, size:100, },
    { accessorKey:'srcTable', header:lan?.srcTable?.label, size:120, 
    Cell: ({row})=>handleShowCellContent(row.original.srcTable, programStructureOptions)},
    { accessorKey:'srcFlowKey', header:lan?.srcFlowKey?.label, size:120, },
    { accessorKey:'updateAccount', header:lan?.updateAccount?.label, size:100, },
    { accessorKey:'updateUserName', header:lan?.updateUserName?.label, size:80, },
    { accessorKey:'actionInfo', header:lan?.actionInfo?.label, size:300, },
  ]

  const enableRowSelection = true
  const disabledInsert = false

  return (
  <>
    <Box sx={{ mt: 10}}>
      <MaterialMasterTable
        lan={lan}
        queryApiUrl='logInfos'
        deleteApi={destroyMany}
        columnsDef={columns}
        ActionForm={LogInfoForm}
        enableRowSelection={enableRowSelection}
        disabledInsert={disabledInsert}
      />
    </Box>
  </>
  )
  
}

export default LogInfosTable;