import { Box } from '@mui/system';
import { destroyMany } from './category.api';
import CategoryForm from './CategoryForm';
import { categoryLocale as language } from './category.locale';
import MaterialMasterTable from '../../../components/materialReactTable/MaterialMasterTable';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { localeState } from '../../../atoms/globalAtom';
import {
  employeeOptionsSelector,
} from '../../../atoms/optionsAtom';
import { handleShowCellContent } from '../../../components/materialReactTable/cell/cellUtil';

const CategorysTable = () => {
  const locale = useRecoilValue(localeState)
  const [lan, setLan] = useState(language[locale]) //語系資料

  const empOptions = useRecoilValue(employeeOptionsSelector)

  useEffect(() => { //設定表單的語系文字
    setLan(language[locale])
  }, [locale])

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
    { accessorKey: 'code', header: lan?.code?.label, size: 100, },
    { accessorKey: 'names', header: lan?.names?.label, size: 100, },
    { accessorKey: 'groupCode', header: lan?.groupCode?.label, size: 100, },
    { accessorKey: 'orderSeq', header: lan?.orderSeq?.label, size: 100, },
    // { accessorKey: 'groupControl', header: lan?.groupControl?.label, size:100, },
    {
      accessorKey: 'controler', header: lan?.controler?.label, size: 100,
      Cell: ({ row }) => handleShowCellContent(row.original.sponsor, empOptions)
    },
    {
      accessorKey: 'sponsor', header: lan?.sponsor?.label, size: 100,
      Cell: ({ row }) => handleShowCellContent(row.original.sponsor, empOptions)
    },
    // { accessorKey: 'accounts', header: lan?.accounts?.label, size:100, },
    // { accessorKey: 'crossFlag', header: lan?.crossFlag?.label, size:100, },
    { accessorKey: 'dateFrom', header: lan?.dateFrom?.label, size: 100, },
    { accessorKey: 'dateTo', header: lan?.dateTo?.label, size: 100, },
  ]

  const enableRowSelection = true

  return (
    <>
      <Box sx={{ mt: 10 }}>
        <MaterialMasterTable
          lan={lan}
          queryApiUrl='categorys'
          deleteApi={destroyMany}
          columnsDef={columns}
          ActionForm={CategoryForm}
          enableRowSelection={enableRowSelection}
        />
      </Box>
    </>
  )

}

export default CategorysTable;