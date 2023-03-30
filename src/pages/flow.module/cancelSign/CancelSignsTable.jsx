import { Box } from '@mui/system';
import { destroyMany } from './cancelSign.api';
import CancelSignForm from './CancelSignForm';
import { cancelSignLocale as language } from './cancelSign.locale';
import MaterialMasterTable from '../../../components/materialReactTable/MaterialMasterTable';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { localeState } from '../../../atoms/globalAtom';
import { 
  departmentOptionsSelector, 
  employeeOptionsSelector, 
  programStructureOptionsAtom, 
} from '../../../atoms/optionsAtom';
import { handleShowCellContent } from '../../../components/materialReactTable/cell/cellUtil';

const CancelSignsTable = () => {
  const locale = useRecoilValue(localeState)
  const [lan, setLan] = useState(language[locale]) //語系資料
  useEffect(()=>{ //設定表單的語系文字
    setLan(language[locale])
  },[locale])

  const deptOptions = useRecoilValue(departmentOptionsSelector)//部門選單
  const empOptions = useRecoilValue(employeeOptionsSelector)//員工選單
  const programStructureOptions = useRecoilValue(programStructureOptionsAtom)

  const columns = [
    // { accessorKey:'id', header:lan?.id?.label, size:100, },
    // { accessorKey:'sysNo', header:lan?.sysNo?.label, size:100, },
    { accessorKey: 'code', header: lan?.code?.label, size: 100 },
    { accessorKey:'createDept', header: lan?.createDept?.label, size: 100, 
    Cell: ({row})=>handleShowCellContent(row.original.createDept,deptOptions)},
    { accessorKey:'applicant', header:lan?.applicant?.label,size: 100, 
    Cell: ({row})=>handleShowCellContent(row.original.applicant,empOptions)},
    { accessorKey:'formName', header:lan?.formName?.label, size:100, 
    Cell: ({row})=>handleShowCellContent(row.original.formName, programStructureOptions)},
    { accessorKey:'srcFlowKey', header:lan?.srcFlowKey?.label, size:100, },
    { accessorKey:'srcFlowName', header:lan?.srcFlowName?.label, size:300, },
    { accessorKey:'reason', header:lan?.reason?.label, size:160, },
  ]

  const enableRowSelection = true
  const disabledInsert = false

  return (
  <>
    <Box sx={{ mt: 10}}>
      <MaterialMasterTable
        lan={lan}
        queryApiUrl='cancelSigns'
        deleteApi={destroyMany}
        columnsDef={columns}
        ActionForm={CancelSignForm}
        enableRowSelection={enableRowSelection}
        disabledInsert={disabledInsert}
      />
    </Box>
  </>
  )
  
}

export default CancelSignsTable;