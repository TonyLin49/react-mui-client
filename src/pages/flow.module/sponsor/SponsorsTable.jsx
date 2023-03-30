import { Box } from '@mui/system';
import { destroyMany } from './sponsor.api';
import SponsorForm from './SponsorForm';
import { sponsorLocale as language } from './sponsor.locale';
import MaterialMasterTable from '../../../components/materialReactTable/MaterialMasterTable';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { localeState } from '../../../atoms/globalAtom';
import { 
  employeeOptionsSelector, 
} from '../../../atoms/optionsAtom';
import { handleShowCellContent } from '../../../components/materialReactTable/cell/cellUtil';

const SponsorsTable = () => {
  const locale = useRecoilValue(localeState)
  const [lan, setLan] = useState(language[locale]) //語系資料
  useEffect(()=>{ //設定表單的語系文字
    setLan(language[locale])
  },[locale])

  const empOptions = useRecoilValue(employeeOptionsSelector)//員工選單

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
    { accessorKey:'description', header:lan?.description?.label, size:120, },
    { accessorKey:'empId', header:lan?.empId?.label, size:120, 
    Cell:({row})=>handleShowCellContent(row.original.empId,empOptions)},
    { accessorKey:'memo', header:lan?.memo?.label, size:200, },
  ]

  const enableRowSelection = true
  const disabledInsert = false

  return (
  <>
    <Box sx={{ mt: 10}}>
      <MaterialMasterTable
        lan={lan}
        queryApiUrl='sponsors'
        deleteApi={destroyMany}
        columnsDef={columns}
        ActionForm={SponsorForm}
        enableRowSelection={enableRowSelection}
        disabledInsert={disabledInsert}
      />
    </Box>
  </>
  )
  
}

export default SponsorsTable;