import { Box } from '@mui/system';
import { destroyMany } from './user.api';
import UserForm from './UserForm';
import MaterialMasterTable from '../../../components/materialReactTable/MaterialMasterTable';
import UserAvatar from '../../../components/layout/navbar/UserAvatar';
import { userLocale as language } from './user.locale';
import { useRecoilValue } from 'recoil';
import { localeState, currentUserState } from '../../../atoms/globalAtom';
import { useEffect, useState } from 'react';
import IsActive from '../../../components/materialReactTable/cell/IsActive';
import { employeeOptionsSelector, roleOptionsAtom } from '../../../atoms/optionsAtom';
import { handleShowCellContent } from '../../../components/materialReactTable/cell/cellUtil';

const UsersTable = () => {
  const currentUser = useRecoilValue(currentUserState)
  const locale = useRecoilValue(localeState)
  const [lan, setLan] = useState(language[locale]) //語系資料

  const roleOptions = useRecoilValue(roleOptionsAtom)
  const empOptions = useRecoilValue(employeeOptionsSelector)

  useEffect(()=>{ //設定表單的語系文字
    setLan(language[locale])
  },[locale])

  const columns = [
      // { accessorKey: 'id', header: 'ID', size: 100, },
      {
        accessorKey: 'photo', header: lan?.photo?.label, size: 90,
        enableSorting: false,
        enableColumnFilter: false,
        Cell: ({row}) => <UserAvatar user={row.original} />,
      },
      { accessorKey: 'code', header: lan?.code?.label, size: 100 },
      { accessorKey: 'displayName', header: lan?.displayName?.label, size: 100 },
      { accessorKey: 'email', header: lan?.email?.label, size: 120 },
      { accessorKey: 'mobile', header: lan?.mobile?.label, size: 120 },
      {
        accessorKey: 'role', header: lan?.role?.label, size: 120,
        Cell: ({row}) => handleShowCellContent(row.original.role, roleOptions)
      },
      {
        accessorKey: 'empCode', header: lan?.empCode?.label, size: 100,
        Cell: ({row}) => handleShowCellContent(row.original.empCode, empOptions)
      },
      {
        accessorKey: 'active', header: lan?.active?.label, size: 60,
        enableSorting: false,
        enableColumnFilter: false,
        Cell: ({row}) => <IsActive value={row.original.active}/>
      },
      { accessorKey: 'startDate', header: lan?.startDate?.label, size: 100 },
      { accessorKey: 'endDate', header: lan?.endDate?.label, size: 100 },
  ]

  const enableRowSelection = (row) => (
    currentUser.role==='SysAdmin' 
  )

  return (
  <>
    <Box sx={{ mt: 10}}>
      <MaterialMasterTable
        lan={lan}
        queryApiUrl='users'
        deleteApi={destroyMany}
        columnsDef={columns}
        ActionForm={UserForm}
        enableRowSelection={enableRowSelection}
      />
    </Box>
  </>
  )
  
}

export default UsersTable;