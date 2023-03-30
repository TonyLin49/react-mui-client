import { Box } from '@mui/system';
import { destroyMany } from './authority.api';
import AuthorityForm from './AuthorityForm';
import { authorityLocale as language } from './authority.locale';
import MaterialMasterTable from '../../../components/materialReactTable/MaterialMasterTable';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { localeState } from '../../../atoms/globalAtom';
// import { //自動完成選單引用範例
//   departmentOptionsAtom, //部門選單
//   employeeOptionsAtom, //員工選單
//   groupTypeOptionsAtom, //群組別選單
// } from '../../../atoms/optionsAtom';

const AuthoritysTable = () => {
  const locale = useRecoilValue(localeState)
  const [lan, setLan] = useState(language[locale]) //語系資料
  useEffect(()=>{ //設定表單的語系文字
    setLan(language[locale])
  },[locale])

  // 自動完成選單引用範例
  // const deptOptions = useRecoilValue(departmentOptionsAtom)
  // const empOptions = useRecoilValue(employeeOptionsAtom)
  // const groupTypeOptions = useRecoilValue(groupTypeOptionsAtom)

  const columns = [
    { accessorKey: 'id', header: lan?.id?.label, size: 100, },
    // { // 自定元件範例
    //   accessorKey: 'isHeads', header: lan?.isHeads?.label, size: 80,
    //   Cell: ({row}) => <IsCheck value={row.original.isHeads}/>,
    // },
    // { // 自動完成選單對映範例
    // accessorKey: 'deptId', header: lan?.deptId?.label, size: 100, 
    // Cell: ({row}) => {
    //   const data = deptOptions.find(
    //     (option)=> option.value === row.original.deptId
    //   )
    //   if(data && data.label.split('-')[1]) 
    //     return data.label.split('-')[1]
    //   return row.original.deptId
    // },
    { accessorKey: 'sysNo', header: lan?.sysNo?.label, size: 100 },
    { accessorKey: 'code', header: lan?.code?.label, size: 100 },
    { accessorKey: 'applicant', header: lan?.applicant?.label, size: 100 },
    { accessorKey: 'createDept', header: lan?.createDept?.label, size: 100 },
    { accessorKey: 'names', header: lan?.names?.label, size: 100 },
    { accessorKey: 'authorityType', header: lan?.authorityType?.label, size: 100 },
    { accessorKey: 'typeValue', header: lan?.typeValue?.label, size: 100 },
    { accessorKey: 'extendsValue', header: lan?.extendsValue?.label, size: 100 },
  ]

  const enableRowSelection = true

  return (
  <>
    <Box sx={{ mt: 10}}>
      <MaterialMasterTable
        lan={lan}
        queryApiUrl='authoritys'
        deleteApi={destroyMany}
        columnsDef={columns}
        ActionForm={AuthorityForm}
        enableRowSelection={enableRowSelection}
      />
    </Box>
  </>
  )
  
}

export default AuthoritysTable;