import { Box } from '@mui/system';
import { destroyMany } from './accounting.api';
import AccountingForm from './AccountingForm';
import { accountingLocale as language } from './accounting.locale';
import MaterialMasterTable from '../../../components/materialReactTable/MaterialMasterTable';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { localeState } from '../../../atoms/globalAtom';
import { 
  employeeOptionsSelector, 
  departmentOptionsSelector,
  groupCategoriesSelector, 
  groupUserCategoriesSelector,
} from '../../../atoms/optionsAtom';
import { handleShowCellContent } from '../../../components/materialReactTable/cell/cellUtil';
import IsCheck from '../../../components/materialReactTable/cell/IsCheck';

const AccountingsTable = () => {
  const locale = useRecoilValue(localeState)
  const [lan, setLan] = useState(language[locale]) //語系資料
  useEffect(()=>{ //設定表單的語系文字
    setLan(language[locale])
  },[locale])

  // 自動完成選單引用範例
  const empOptions = useRecoilValue(employeeOptionsSelector)//員工選單
  const departmentOptions = useRecoilValue(departmentOptionsSelector)//部門選單
  const groupUserCategories = useRecoilValue(groupUserCategoriesSelector)//使用類別選單
  const groupSystemCategories = useRecoilValue(groupCategoriesSelector)//系統類別選單
  console.log('groupUserCategories', groupUserCategories)
  console.log('AccType', groupUserCategories['AccType'])
  console.log('ReportCode', groupSystemCategories['ReportCode'])

  const columns = [
    // { accessorKey: 'id', header: lan?.id?.label, size: 100, },
    // { accessorKey: 'sysNo', header: lan?.sysNo?.label, size: 100 },
    { accessorKey: 'createDept', header: lan?.createDept?.label, size: 100, 
    Cell: ({row}) => 
    handleShowCellContent(row.original.createDept,departmentOptions)
    },
    { accessorKey: 'applicant', header: lan?.applicant?.label, size: 100, 
    Cell: ({row}) => 
    handleShowCellContent(row.original.applicant,empOptions)
    },
    { accessorKey: 'code', header: lan?.code?.label, size: 100 },
    { accessorKey: 'names', header: lan?.names?.label, size: 100 },
    { accessorKey: 'budgetCode', header: lan?.budgetCode?.label, size: 100 },
    { accessorKey: 'parentId', header: lan?.parentId?.label, size: 100 },
    { accessorKey: 'dorC', header: lan?.dorC?.label, size: 100, 
    Cell: ({row}) => 
    handleShowCellContent(row.original.dorC,groupSystemCategories['DorC'])
    },
    { accessorKey: 'accProperty', header: lan?.accProperty?.label, size: 100, 
    Cell: ({row}) => 
    handleShowCellContent(row.original.accProperty,groupSystemCategories['AccProperty'])
    },
    { accessorKey: 'isSumCode', header: lan?.isSumCode?.label, size: 100 , 
    Cell: ({row}) => <IsCheck value={row.original.isSumCode}/>,
    },
    { accessorKey: 'isAccCode', header: lan?.isAccCode?.label, size: 100, 
    Cell: ({row}) => <IsCheck value={row.original.isAccCode}/>,
    },
    { accessorKey: 'accSponsor', header: lan?.accSponsor?.label, size: 100, 
    Cell: ({row}) => 
    handleShowCellContent(row.original.accSponsor,empOptions)
    },
    { accessorKey: 'program', header: lan?.program?.label, size: 100 },
    { accessorKey: 'isReceipt', header: lan?.isReceipt?.label, size: 100, 
    Cell: ({row}) => <IsCheck value={row.original.isReceipt}/>,
    },
    { accessorKey: 'accType', header: lan?.accType?.label, size: 100, 
    Cell: ({row}) => 
    handleShowCellContent(row.original.accType,groupUserCategories['AccType'])
    },
    { accessorKey: 'accUserType', header: lan?.accUserType?.label, size: 100, 
    Cell: ({row}) => 
    handleShowCellContent(row.original.accUserType,groupUserCategories['AccUserType'])
    },
    { accessorKey: 'reportCode', header: lan?.reportCode?.label, size: 100, 
    Cell: ({row}) => 
    handleShowCellContent(row.original.reportCode,groupSystemCategories['ReportCode'])
    },
    { accessorKey: 'orderKey', header: lan?.orderKey?.label, size: 100 },
  ]

  const enableRowSelection = true
  const disabledInsert = false

  return (
  <>
    <Box sx={{ mt: 10}}>
      <MaterialMasterTable
        lan={lan}
        queryApiUrl='accountings'
        deleteApi={destroyMany}
        columnsDef={columns}
        ActionForm={AccountingForm}
        enableRowSelection={enableRowSelection}
        disabledInsert={disabledInsert}
      />
    </Box>
  </>
  )
  
}

export default AccountingsTable;