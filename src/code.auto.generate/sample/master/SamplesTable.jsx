import { Box } from '@mui/system';
import { destroyMany } from './sample.api';
import SampleForm from './SampleForm';
import { sampleLocale as language } from './sample.locale';
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

const SamplesTable = () => {
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
    { accessorKey: 'code', header: lan?.code?.label, size: 100 },
    {columnsDef: ''}
  ]

  const enableRowSelection = true
  const disabledInsert = false

  return (
  <>
    <Box sx={{ mt: 10}}>
      <MaterialMasterTable
        lan={lan}
        queryApiUrl='samples'
        deleteApi={destroyMany}
        columnsDef={columns}
        ActionForm={SampleForm}
        enableRowSelection={enableRowSelection}
        disabledInsert={disabledInsert}
      />
    </Box>
  </>
  )
  
}

export default SamplesTable;