import { Box } from '@mui/system';
import { destroyMany } from './flowDefineDetail.api';
import FlowDefineDetailForm from './FlowDefineDetailForm';
import { flowDefineDetailLocale as language } from './flowDefineDetail.locale';
import MaterialMasterTable from '../../../components/materialReactTable/MaterialMasterTable';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { localeState } from '../../../atoms/globalAtom';
import { 
  departmentOptionsSelector, 
  employeeOptionsSelector, 
  groupCategoriesSelector, 
} from '../../../atoms/optionsAtom';
import { handleShowCellContent } from '../../../components/materialReactTable/cell/cellUtil';
import IsCheck from '../../../components/materialReactTable/cell/IsCheck';

const FlowDefineDetailsTable = () => {
  const locale = useRecoilValue(localeState)
  const [lan, setLan] = useState(language[locale]) //語系資料
  useEffect(()=>{ //設定表單的語系文字
    setLan(language[locale])
  },[locale])

  const deptOptions = useRecoilValue(departmentOptionsSelector)//部門選單
  const empOptions = useRecoilValue(employeeOptionsSelector)//員工選單
  const groupUserCategories = useRecoilValue(groupCategoriesSelector)//使用類別選單

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
    { accessorKey:'code', header: lan?.code?.label, size: 100 },
    { accessorKey:'seqNo', header:lan?.seqNo?.label, size:100, },
    { accessorKey:'step', header:lan?.step?.label, size:100, },
    { accessorKey:'stepName', header:lan?.stepName?.label, size:100, },
    { accessorKey:'signType', header:lan?.signType?.label, size:100,    
    Cell: ({row})=>handleShowCellContent(row.original?.signType, groupUserCategories['SignType'])},
    { accessorKey:'signValue', header:lan?.signValue?.label, size:100, },
    { accessorKey:'isNecessary', header:lan?.isNecessary?.label, size:100,    
    Cell: ({row})=><IsCheck value={row.original?.isNecessary} />,},
    { accessorKey:'canDecided', header:lan?.canDecided?.label, size:100,    
    Cell: ({row})=><IsCheck value={row.original?.canDecided} />,},
    { accessorKey:'defaultSkip', header:lan?.defaultSkip?.label, size:100, },
    { accessorKey:'skipValue', header:lan?.skipValue?.label, size:100, },
    { accessorKey:'decidedValue', header:lan?.decidedValue?.label, size:100, },
    { accessorKey:'resetFlow', header:lan?.resetFlow?.label, size:100, },
    { accessorKey:'canEditField', header:lan?.canEditField?.label, size:100,    
    Cell: ({row})=><IsCheck value={row.original?.canEditField} />,},
    { accessorKey:'countersign', header:lan?.countersign?.label, size:100, },
    { accessorKey:'isSendMessage', header:lan?.isSendMessage?.label, size:100,    
    Cell: ({row})=><IsCheck value={row.original?.isSendMessage} />,},
    { accessorKey:'messageValue', header:lan?.messageValue?.label, size:100, },
  ]

  const enableRowSelection = true
  const disabledInsert = false

  return (
  <>
    <Box sx={{ mt: 10}}>
      <MaterialMasterTable
        lan={lan}
        queryApiUrl='flowDefineDetails'
        deleteApi={destroyMany}
        columnsDef={columns}
        ActionForm={FlowDefineDetailForm}
        enableRowSelection={enableRowSelection}
        disabledInsert={disabledInsert}
      />
    </Box>
  </>
  )
  
}

export default FlowDefineDetailsTable;