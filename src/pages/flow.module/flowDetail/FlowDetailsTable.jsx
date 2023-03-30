import { Box } from '@mui/system';
import { destroyMany } from './flowDetail.api';
import FlowDetailForm from './FlowDetailForm';
import { flowDetailLocale as language } from './flowDetail.locale';
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

const FlowDetailsTable = () => {
  const locale = useRecoilValue(localeState)
  const [lan, setLan] = useState(language[locale]) //語系資料
  useEffect(()=>{ //設定表單的語系文字
    setLan(language[locale])
  },[locale])

  const deptOptions = useRecoilValue(departmentOptionsSelector)//部門選單
  const empOptions = useRecoilValue(employeeOptionsSelector)//員工選單
  const programStructureOptions = useRecoilValue(programStructureOptionsAtom)

  const columns = [
    { accessorKey:'formTableName', header:lan?.formTableName?.label, size:100, 
    Cell:({row})=>handleShowCellContent(row.original.formTableName, programStructureOptions)},
    { accessorKey:'code', header: lan?.code?.label, size: 120 },
    { accessorKey:'seqNo', header:lan?.seqNo?.label, size:60, },
    { accessorKey:'step', header:lan?.step?.label, size:60, },
    { accessorKey:'stepName', header:lan?.stepName?.label, size:100, },
    { accessorKey:'signerId', header:lan?.signerId?.label, size:100, 
    Cell: ({row})=>handleShowCellContent(row.original.signerId,empOptions)},
    { accessorKey:'signerDepartment', header:lan?.signerDepartment?.label, size:100, 
    Cell: ({row})=>handleShowCellContent(row.original.signerDepartment,deptOptions),},
    { accessorKey:'signedTime', header:lan?.signedTime?.label, size:140, },
    { accessorKey:'signedResult', header:lan?.signedResult?.label, size:100, },
    { accessorKey:'memo', header:lan?.memo?.label, size:100, },
  ]

  const enableRowSelection = true
  const disabledInsert = false

  return (
  <>
    <Box sx={{ mt: 10}}>
      <MaterialMasterTable
        lan={lan}
        queryApiUrl='flowDetails'
        deleteApi={destroyMany}
        columnsDef={columns}
        ActionForm={FlowDetailForm}
        enableRowSelection={enableRowSelection}
        disabledInsert={disabledInsert}
      />
    </Box>
  </>
  )
  
}

export default FlowDetailsTable;