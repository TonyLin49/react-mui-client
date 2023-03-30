import { Box } from '@mui/system';
import { destroyMany } from './notice.api';
import NoticeForm from './NoticeForm';
import { noticeLocale as language } from './notice.locale';
import MaterialMasterTable from '../../../components/materialReactTable/MaterialMasterTable';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { localeState } from '../../../atoms/globalAtom';

const NoticesTable = () => {
  const locale = useRecoilValue(localeState)
  const [lan, setLan] = useState(language[locale]) //語系資料
  useEffect(()=>{ //設定表單的語系文字
    setLan(language[locale])
  },[locale])

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
    // { accessorKey: 'code', header: lan?.code?.label, size: 100 },
    // { accessorKey:'summary', header:lan?.summary?.label, size:100, },
    { accessorKey:'content', header:lan?.content?.label, size:400, },
    { accessorKey:'appendix', header:lan?.appendix?.label, size:100, },
    { accessorKey:'linkUrl', header:lan?.linkUrl?.label, size:100, },
    { accessorKey:'dateFrom', header:lan?.dateFrom?.label, size:100, },
    { accessorKey:'dateTo', header:lan?.dateTo?.label, size:100, },
    // { accessorKey:'objectType', header:lan?.objectType?.label, size:100, 
    // Cell:({row})=>handleShowCellContent(row.original.objectType, groupUserCategoriesSelector['ObjectType'])},
    // { accessorKey:'objectValues', header:lan?.objectValues?.label, size:200, },
  ]

  const enableRowSelection = true
  const disabledInsert = false

  return (
  <>
    <Box sx={{ mt: 10}}>
      <MaterialMasterTable
        lan={lan}
        queryApiUrl='notices'
        deleteApi={destroyMany}
        columnsDef={columns}
        ActionForm={NoticeForm}
        enableRowSelection={enableRowSelection}
        disabledInsert={disabledInsert}
      />
    </Box>
  </>
  )
  
}

export default NoticesTable;