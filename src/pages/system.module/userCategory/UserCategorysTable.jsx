import { Box } from '@mui/system';
import { destroyMany } from './userCategory.api';
import UserCategoryForm from './UserCategoryForm';
import { userCategoryLocale as language } from './userCategory.locale';
import MaterialMasterTable from '../../../components/materialReactTable/MaterialMasterTable';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { localeState } from '../../../atoms/globalAtom';
import { 
  accountingOptionsSelector,
  employeeOptionsSelector, 
  groupCategoriesSelector, 
  groupUserCategoriesSelector 
} from '../../../atoms/optionsAtom';
import IsCheck from '../../../components/materialReactTable/cell/IsCheck';
import { handleShowCellContent } from '../../../components/materialReactTable/cell/cellUtil';

const UserCategorysTable = () => {
  const locale = useRecoilValue(localeState)
  const [lan, setLan] = useState(language[locale]) //語系資料

  const empOptions = useRecoilValue(employeeOptionsSelector)
  const groupUserCategories = useRecoilValue(groupUserCategoriesSelector);
  const accountingOptions = useRecoilValue(accountingOptionsSelector)
  const groupCategories = useRecoilValue(groupCategoriesSelector)

  useEffect(()=>{ //設定表單的語系文字
    setLan(language[locale])
  },[locale])

  const columns = [
    // { accessorKey: 'id', header: lan?.id?.label, width: 100, },
    // { accessorKey: 'sysNo', header: lan?.sysNo?.label, size: 120 },
    // { accessorKey: 'applicant', header: lan?.applicant?.label, size: 120 },
    // { accessorKey: 'createDept', header: lan?.createDept?.label, size: 120 },
    { accessorKey: 'code', header: lan?.code?.label, size: 100 },
    { accessorKey: 'names', header: lan?.names?.label, size: 100 },
    { accessorKey: 'groupCode', header: lan?.groupCode?.label, size: 100,
    Cell: ({row}) => handleShowCellContent(row.original.groupCode,groupCategories['UserCategory'])
    },
    { accessorKey: 'rate', header: lan?.rate?.label, size: 100 },
    { accessorKey: 'parentId', header: lan?.parentId?.label, size: 100,
    Cell: ({row}) => 
    handleShowCellContent(row.original.parentId, groupUserCategories[row.original.groupCode])
    },
    { accessorKey: 'dateFrom', header: lan?.dateFrom?.label, size: 100 },
    { accessorKey: 'dateTo', header: lan?.dateTo?.label, size: 100 },
    { accessorKey: 'assistants', header: lan?.assistants?.label, size: 100,
    Cell: ({row}) => handleShowCellContent(row.original.assistants, empOptions)
    },
    { accessorKey: 'sponsor', header: lan?.sponsor?.label, size: 100,
    Cell: ({row}) => handleShowCellContent(row.original.sponsor, empOptions)
    },
    { accessorKey: 'controler', header: lan?.controler?.label, size: 100,
    Cell: ({row}) => handleShowCellContent(row.original.controler, empOptions)
    },
    { accessorKey: 'groupControl', header: lan?.groupControl?.label, size: 100,
    Cell: ({row}) => <IsCheck value={row.original.groupControl}/>,
    },
    { accessorKey: 'accountsC', header: lan?.accountsC?.label, size: 100,
    Cell: ({row}) => handleShowCellContent(row.original.accountsC,accountingOptions)
    },
    { accessorKey: 'accountsD', header: lan?.accountsD?.label, size: 100,
    Cell: ({row}) => handleShowCellContent(row.original.accountD,accountingOptions)
    },
    { accessorKey: 'memo', header: lan?.memo?.label, size: 100 },
    // { accessorKey: 'crossFlag', header: lan?.crossFlag?.label, size: 100 },
    // { accessorKey: 'effectMonth', header: lan?.effectMonth?.label, size: 100 },
  ]

  const enableRowSelection = true
  const disabledInsert=false

  return (
  <>
    <Box sx={{ mt: 10}}>
      <MaterialMasterTable
        lan={lan}
        queryApiUrl='userCategorys'
        deleteApi={destroyMany}
        columnsDef={columns}
        ActionForm={UserCategoryForm}
        enableRowSelection={enableRowSelection}
        disabledInsert={disabledInsert}
      />
    </Box>
  </>
  )
  
}

export default UserCategorysTable;