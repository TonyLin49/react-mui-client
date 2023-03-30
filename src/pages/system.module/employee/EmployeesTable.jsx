import { Box } from '@mui/system';
import { destoryMany } from './employee.api';
import EmployeeForm from './EmployeeForm';
import { employeeLocale as language } from './employee.locale';
import MaterialMasterTable from '../../../components/materialReactTable/MaterialMasterTable';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { localeState } from '../../../atoms/globalAtom';
import { 
  departmentOptionsSelector, 
  employeeOptionsSelector, 
  groupUserCategoriesSelector, 
} from '../../../atoms/optionsAtom';
import { handleShowCellContent } from '../../../components/materialReactTable/cell/cellUtil';

const EmployeesTable = () => {
  const locale = useRecoilValue(localeState)
  const [lan, setLan] = useState(language[locale]) //語系資料
  useEffect(()=>{ //設定表單的語系文字
    setLan(language[locale])
  },[locale])

  const deptOptions = useRecoilValue(departmentOptionsSelector)
  const empOptions = useRecoilValue(employeeOptionsSelector)
  const groupUserCategories = useRecoilValue(groupUserCategoriesSelector)
  const groupTypeOptions = groupUserCategories['GroupType']
  const idTypeOptions = groupUserCategories['IdType']
  const jobTitleOptions = groupUserCategories['JobTitle']
  
  const columns = [
    { accessorKey: 'code', header: lan?.code?.label, size: 100 },
    { accessorKey: 'empName', header: lan?.empName?.label, size:100 },
    { accessorKey: 'groupType', header: lan?.groupType?.label, size: 100,
    Cell: ({row}) => handleShowCellContent(row.original.groupType, groupTypeOptions)},
    { accessorKey: 'jobTitle', header: lan?.jobTitle?.label, size: 80,
    Cell: ({row}) => handleShowCellContent(row.original.jobTitle, jobTitleOptions)},
    { accessorKey: 'idType', header: lan?.idType?.label, size: 120,
    Cell: ({row}) => handleShowCellContent(row.original.idType, idTypeOptions)},
    { accessorKey: 'idNo', header: lan?.idNo?.label, size: 100,
    Cell: ({row}) => {
      if(row.original.idNo.length>8) 
        return row.original.idNo.substring(0, 4) + "***" + row.original.idNo.substring(7)
    }},
    { accessorKey: 'deptId', header: lan?.deptId?.label, size: 100, 
    Cell: ({row}) => handleShowCellContent(row.original.deptId, deptOptions)},
    { accessorKey: 'agent', header: lan?.agent?.label, size: 100,
    Cell: ({row}) => handleShowCellContent(row.original.agent, empOptions)},
    // { accessorKey: 'tel', header: lan?.tel?.label, size: 120 },
    { accessorKey: 'mobile', header: lan?.mobile?.label, size: 100 },
    { accessorKey: 'email', header: lan?.email?.label, size: 120 },
    { accessorKey: 'address', header: lan?.address?.label, size: 120 },
    { accessorKey: 'onBoardDate', header: lan?.onBoardDate?.label, size: 100 },
    { accessorKey: 'leavesDate', header: lan?.leavesDate?.label, size: 100 },
    { accessorKey: 'birthday', header: lan?.birthday?.label, size: 100 },
    // { accessorKey: 'jobDegree', header: lan?.jobDegree?.label, size: 120 },
    // { accessorKey: 'salaryLevel', header: lan?.salaryLevel?.label, size: 120 },
    // { accessorKey: 'sysNo', header: lan?.sysNo?.label, size: 120 },
    { accessorKey: 'hourlyWage', header: lan?.hourlyWage?.label, size: 80 },
    // { accessorKey: 'leader', header: lan?.leader?.label, size: 120 },
    // { accessorKey: 'isHeads', header: lan?.isHeads?.label, size: 120,
    //   Cell: ({row}) => <IsCheck value={row.original.isHeads}/>,},
    // { accessorKey: 'agentDept', header: lan?.agentDept?.label, size: 120 },
  ]

  const enableRowSelection = true

  return (
  <>
    <Box sx={{ mt: 10}}>
      <MaterialMasterTable
        lan={lan}
        queryApiUrl='employees'
        deleteApi={destoryMany}
        columnsDef={columns}
        ActionForm={EmployeeForm}
        enableRowSelection={enableRowSelection}
      />
    </Box>
  </>
  )
  
}

export default EmployeesTable;