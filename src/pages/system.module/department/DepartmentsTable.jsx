import { destroyMany } from './department.api';
import DepartmentForm from './DepartmentForm';
import { departmentLocale as language } from './department.locale';
import MaterialMasterTable from '../../../components/materialReactTable/MaterialMasterTable';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { localeState } from '../../../atoms/globalAtom';
import { 
  hasChildDeptOptionsAtom, 
  employeeOptionsSelector
} from '../../../atoms/optionsAtom';
import IsCheck from '../../../components/materialReactTable/cell/IsCheck';
import { handleShowCellContent } from '../../../components/materialReactTable/cell/cellUtil';
import PermissionDetailPanel from '../permission/PermissionDetailPanel';

const DepartmentsTable = () => {
  const locale = useRecoilValue(localeState)
  const [lan, setLan] = useState(language[locale]) //語系資料

  const empOptions = useRecoilValue(employeeOptionsSelector)
  const deptOptions = useRecoilValue(hasChildDeptOptionsAtom)

  useEffect(()=>{ //設定表單的語系文字
    setLan(language[locale])
  },[locale])

  const columns = [
    // { accessorKey: 'id', header: lan?.id?.label, width: 100, },
    // { accessorKey: 'createDept', header: lan?.createDept?.label, size: 100 },
    // { accessorKey: 'applicant', header: lan?.applicant?.label, size: 100 },
    // { accessorKey: 'sysNo', header: lan?.sysNo?.label, size: 120 },
    { accessorKey: 'code', header: lan?.code?.label, size: 100 },
    { accessorKey: 'deptName', header: lan?.deptName?.label, size: 100 },
    { accessorKey: 'parentId', header: lan?.parentId?.label, size: 100, 
    Cell: ({row}) => handleShowCellContent(row.original.parentId,deptOptions)},
    { accessorKey: 'orderKey', header: lan?.orderKey?.label, size: 80 },
    { accessorKey: 'heads', header: lan?.heads?.label, size: 100,
    Cell: ({row}) => handleShowCellContent(row.original.heads,empOptions)},
    { accessorKey: 'deptCode', header: lan?.deptCode?.label, size: 100 },
    { accessorKey: 'canApprove', header: lan?.canApprove?.label, size: 100,
    Cell: ({row}) => <IsCheck value={row.original.canApprove}/>,},
    { accessorKey: 'subDeptFlag', header: lan?.subDeptFlag?.label, size: 100,
    Cell: ({row}) => <IsCheck value={row.original.subDeptFlag}/>,},
    // { accessorKey: 'company', header: lan?.company?.label, size: 100 },
    { accessorKey: 'isBudgetControl', header: lan?.isBudgetControl?.label, size: 100,
    Cell: ({row}) => <IsCheck value={row.original.isBudgetControl}/>,},
    { accessorKey: 'budgetControler', header: lan?.budgetControler?.label, size: 100,
    Cell: ({row}) => handleShowCellContent(row.original.budgetControler,empOptions)},
  ]

  const enableRowSelection = true

  const renderDetailPanel = 
  ({row}) => 
  <PermissionDetailPanel 
  parentTable='Department'
  parentId={row.original.code}
  />

  return (
    <MaterialMasterTable
      lan={lan}
      queryApiUrl='departments'
      deleteApi={destroyMany}
      columnsDef={columns}
      ActionForm={DepartmentForm}
      enableRowSelection={enableRowSelection}
      renderDetailPanel={renderDetailPanel}
    />
  )
  
}

export default DepartmentsTable;