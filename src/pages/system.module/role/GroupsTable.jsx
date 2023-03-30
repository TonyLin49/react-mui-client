import { Box } from '@mui/system';
import { destroyMany } from './group.api';
import GroupForm from './GroupForm';
import { groupLocale as language } from './group.locale';
import MaterialMasterTable from '../../../components/materialReactTable/MaterialMasterTable';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { localeState } from '../../../atoms/globalAtom';
import { 
  employeeOptionsSelector 
} from '../../../atoms/optionsAtom';
import PermissionDetailPanel from '../permission/PermissionDetailPanel';

const GroupsTable = () => {
  const locale = useRecoilValue(localeState)
  const [lan, setLan] = useState(language[locale]) //語系資料

  const empOptions = useRecoilValue(employeeOptionsSelector)

  useEffect(()=>{ //設定表單的語系文字
    setLan(language[locale])
  },[locale])

  const columns = [
    // { accessorKey: 'id', header: lan?.id?.label, width: 100, },
    // { accessorKey: 'sysNo', header: lan?.sysNo?.label, size: 120 },
    { accessorKey: 'code', header: lan?.code?.label, size: 120 },
    // { accessorKey: 'applicant', header: lan?.applicant?.label, size: 120 },
    // { accessorKey: 'createDept', header: lan?.createDept?.label, size: 120 },
    { accessorKey: 'names', header: lan?.names?.label, size: 120 },
    { accessorKey: 'leader', header: lan?.leader?.label, size: 120, 
    Cell: ({row}) => {
      const data = empOptions.find((option)=> option.value === row.original.leader)
      if(data && data.label.split('-')[1]) 
        return data.label.split('-')[1]
      return row.original.leader
    }},
  ]

  const enableRowSelection = true

  const renderDetailPanel = 
  ({row}) => 
  <PermissionDetailPanel
  parentTable='Role'
  parentId={row.original.code}
  />

  return (
  <>
    <Box sx={{ mt: 10}}>
      <MaterialMasterTable
        lan={lan}
        queryApiUrl='groups'
        deleteApi={destroyMany}
        columnsDef={columns}
        ActionForm={GroupForm}
        enableRowSelection={enableRowSelection}
        renderDetailPanel={renderDetailPanel}
      />
    </Box>
  </>
  )
  
}

export default GroupsTable;