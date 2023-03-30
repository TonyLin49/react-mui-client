import { Box } from '@mui/system';
import { destroyMany } from './flowStep.api';
import FlowStepForm from './FlowStepForm';
import { flowStepLocale as language } from './flowStep.locale';
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
import IsCheck from '../../../components/materialReactTable/cell/IsCheck';

const FlowStepsTable = () => {
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
    // { accessorKey:'code', header: lan?.code?.label, size: 100 },
    { accessorKey:'formTableName', header:lan?.formTableName?.label, size:100, 
    Cell: ({row})=>handleShowCellContent(row.original.formTableName, programStructureOptions)},
    { accessorKey:'parentId', header:lan?.parentId?.label, size:140, },
    { accessorKey:'step', header:lan?.step?.label, size:60, },
    { accessorKey:'stepName', header:lan?.stepName?.label, size:100, },
    { accessorKey:'createDept', header: lan?.createDept?.label, size: 100, 
    Cell: ({row})=>handleShowCellContent(row.original.createDept,deptOptions),},
    { accessorKey:'applicant', header:lan?.applicant?.label,size: 100, 
    Cell: ({row})=>handleShowCellContent(row.original.applicant,empOptions)},
    { accessorKey:'signerId', header:lan?.signerId?.label, size:100, 
    Cell: ({row})=>handleShowCellContent(row.original.signerId, empOptions)},
    // { accessorKey:'signerName', header:lan?.signerName?.label, size:100,},
    { accessorKey:'resetFlow', header:lan?.resetFlow?.label, size:100, 
    Cell: ({row})=><IsCheck value={row.original?.resetFlow} />,},
    { accessorKey:'canDecided', header:lan?.canDecided?.label, size:100,    
    Cell: ({row})=><IsCheck value={row.original?.canDecided} />,},
    { accessorKey:'canEditField', header:lan?.canEditField?.label, size:100,    
    Cell: ({row})=><IsCheck value={row.original?.canEditField} />,},
    // { accessorKey:'countersign', header:lan?.countersign?.label, size:100, },
    { accessorKey:'isSendMessage', header:lan?.isSendMessage?.label, size:100,    
    Cell: ({row})=><IsCheck value={row.original?.isSendMessage} />,},
    // { accessorKey:'messageValue', header:lan?.messageValue?.label, size:100, },
  ]

  const enableRowSelection = true
  const disabledInsert = false

  return (
  <>
    <Box sx={{ mt: 10}}>
      <MaterialMasterTable
        lan={lan}
        queryApiUrl='flowSteps'
        deleteApi={destroyMany}
        columnsDef={columns}
        ActionForm={FlowStepForm}
        enableRowSelection={enableRowSelection}
        disabledInsert={disabledInsert}
      />
    </Box>
  </>
  )
  
}

export default FlowStepsTable;