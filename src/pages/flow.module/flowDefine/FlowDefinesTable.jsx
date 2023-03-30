import { Box } from '@mui/system';
import { destroyMany } from './flowDefine.api';
import FlowDefineForm from './FlowDefineForm';
import { flowDefineLocale as language } from './flowDefine.locale';
import MaterialMasterTable from '../../../components/materialReactTable/MaterialMasterTable';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { localeState } from '../../../atoms/globalAtom';
import { 
  departmentOptionsSelector, 
  employeeOptionsSelector, 
  groupUserCategoriesSelector,
  sponsorOptionsAtom, 
} from '../../../atoms/optionsAtom';
import { handleShowCellContent } from '../../../components/materialReactTable/cell/cellUtil';
import IsCheck from '../../../components/materialReactTable/cell/IsCheck';

const FlowDefinesTable = () => {
  const locale = useRecoilValue(localeState)
  const [lan, setLan] = useState(language[locale]) //語系資料
  useEffect(()=>{ //設定表單的語系文字
    setLan(language[locale])
  },[locale])

  const deptOptions = useRecoilValue(departmentOptionsSelector)//部門選單
  const empOptions = useRecoilValue(employeeOptionsSelector)//員工選單
  const userCategoryOptions = useRecoilValue(groupUserCategoriesSelector)
  const sponsorOptions = useRecoilValue(sponsorOptionsAtom)

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
    { accessorKey: 'code', header: lan?.code?.label, size: 120 },
    { accessorKey:'flowName', header:lan?.flowName?.label, size:160, },
    // { accessorKey:'draftRight', header:lan?.draftRight?.label, size:100, },
    // { accessorKey:'draftRightValue', header:lan?.draftRightValue?.label, size:100, },
    // { accessorKey:'summary', header:lan?.summary?.label, size:100, },
    { accessorKey:'closerType', header:lan?.closerType?.label, size:120,    
    Cell: ({row})=>handleShowCellContent(row.original?.closerType, userCategoryOptions['CloserType'])},
    { accessorKey:'closerValue', header:lan?.closerValue?.label, size:120, 
    Cell: ({row})=>handleShowCellContent(row.original.closerValue, 
      row.original.closerType==='CT.Employee' ? empOptions
      : row.original.closerType==='CT.Department' ? deptOptions
      : row.original.closerType==='CT.Sponsor' ? sponsorOptions
      : []
    )},
    { accessorKey:'closeCanReject', header:lan?.closeCanReject?.label, size:80, 
    Cell: ({row})=><IsCheck value={row.original.closeCanReject}/>},
    { accessorKey:'closeCanEditFields', header:lan?.closeCanEditFields?.label, size:80, 
    Cell: ({row})=><IsCheck value={row.original.closeCanEditFields}/>},
    // { accessorKey:'closeStepName', header:lan?.closeStepName?.label, size:100, },
  ]

  const enableRowSelection = true
  const disabledInsert = false

  return (
  <>
    <Box sx={{ mt: 10}}>
      <MaterialMasterTable
        lan={lan}
        queryApiUrl='flowDefines'
        deleteApi={destroyMany}
        columnsDef={columns}
        ActionForm={FlowDefineForm}
        enableRowSelection={enableRowSelection}
        disabledInsert={disabledInsert}
      />
    </Box>
  </>
  )
  
}

export default FlowDefinesTable;