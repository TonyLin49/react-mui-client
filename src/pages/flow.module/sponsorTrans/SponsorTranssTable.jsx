import { Box } from '@mui/system';
import { destroyMany } from './sponsorTrans.api';
import SponsorTransForm from './SponsorTransForm';
import { sponsorTransLocale as language } from './sponsorTrans.locale';
import MaterialMasterTable from '../../../components/materialReactTable/MaterialMasterTable';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { localeState } from '../../../atoms/globalAtom';
import { 
  departmentOptionsSelector, 
  employeeOptionsSelector, 
} from '../../../atoms/optionsAtom';
import { handleShowCellContent } from '../../../components/materialReactTable/cell/cellUtil';
import IsCheck from '../../../components/materialReactTable/cell/IsCheck';

const SponsorTranssTable = () => {
  const locale = useRecoilValue(localeState)
  const [lan, setLan] = useState(language[locale]) //語系資料
  useEffect(()=>{ //設定表單的語系文字
    setLan(language[locale])
  },[locale])

  const deptOptions = useRecoilValue(departmentOptionsSelector)//部門選單
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
    { accessorKey: 'code', header: lan?.code?.label, size: 100 },
    { accessorKey:'deptId', header:lan?.deptId?.label, size:100,    
    Cell: ({row})=>handleShowCellContent(row.original?.deptId, deptOptions)},
    { accessorKey:'srcSponsor', header:lan?.srcSponsor?.label, size:100,    
    Cell: ({row})=>handleShowCellContent(row.original?.srcSponsor, empOptions)},
    { accessorKey:'newSponsor', header:lan?.newSponsor?.label, size:100,    
    Cell: ({row})=>handleShowCellContent(row.original?.newSponsor, empOptions)},
    { accessorKey:'waitToSign', header:lan?.waitToSign?.label, size:100, 
    Cell: ({row})=><IsCheck value={row.original.waitToSign}/>},
    { accessorKey:'waitToClose', header:lan?.waitToClose?.label, size:100, 
    Cell: ({row})=><IsCheck value={row.original.waitToClose}/>},
    // { accessorKey:'waitToPayGoodsApply', header:lan?.waitToPayGoodsApply?.label, size:100, },
    { accessorKey:'jobTrans', header:lan?.jobTrans?.label, size:100, 
    Cell: ({row})=><IsCheck value={row.original.jobTrans}/>},
    { accessorKey:'dateFrom', header:lan?.dateFrom?.label, size:100, },
    { accessorKey:'dateTo', header:lan?.dateTo?.label, size:100, },
    { accessorKey:'memo', header:lan?.memo?.label, size:100, },
  ]

  const enableRowSelection = true
  const disabledInsert = false

  return (
  <>
    <Box sx={{ mt: 10}}>
      <MaterialMasterTable
        lan={lan}
        queryApiUrl='sponsorTranss'
        deleteApi={destroyMany}
        columnsDef={columns}
        ActionForm={SponsorTransForm}
        enableRowSelection={enableRowSelection}
        disabledInsert={disabledInsert}
      />
    </Box>
  </>
  )
  
}

export default SponsorTranssTable;