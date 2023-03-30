import { destroyMany } from './permission.api';
import PermissionForm from './PermissionForm';
import { permissionLocale as language } from './permission.locale';
import MaterialMasterTable from '../../../components/materialReactTable/MaterialMasterTable';
import { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { localeState } from '../../../atoms/globalAtom';
import { 
  departmentOptionsSelector, 
  programOptionsAtom,
  roleOptionsAtom, 
} from '../../../atoms/optionsAtom';
import { handleShowCellContent } from '../../../components/materialReactTable/cell/cellUtil';
import IsCheck from '../../../components/materialReactTable/cell/IsCheck';
import { permissionDefaultValuesAtom } from '../../../atoms/permissionAtom';

const PermissionsTable = ({
  defaultFilters,
  columnVisibility,
  paperSize,
  disabledPrint
}) => {
  const locale = useRecoilValue(localeState)
  const [lan, setLan] = useState(language[locale]) //語系資料
  useEffect(()=>{ //設定表單的語系文字
    setLan(language[locale])
  },[locale])

  const deptOptions = useRecoilValue(departmentOptionsSelector)
  const roleOptions = useRecoilValue(roleOptionsAtom)
  const programOptions = useRecoilValue(programOptionsAtom)
  
  
  const setPremissionValues = useSetRecoilState(permissionDefaultValuesAtom)
  useEffect(()=>{
    let defaultValues = {
      id:'',
      sysNo:'',
      applicant:'',
      createDept:'',
      code:'',
      parentTable:'All',
      parentId:'',
      programId:'',
      canInsert:'Y',
      searchAuth:'Department',
      updateAuth:'Self',
      deleteAuth:'Self',
      multiDeptsAuth:''
    }
    const setPremissionValuesCallback = (values) => {
      setPremissionValues(values);
    };
    if(defaultFilters){
      defaultFilters.forEach(obj=>{
        defaultValues[obj.id]=obj.value
      })
      setPremissionValuesCallback(defaultValues);
    }
  },[defaultFilters,setPremissionValues])

  const authOptions = [
    {value:'All', label:'All-全部'},
    {value:'Self', label:'Self-自己'},
    {value:'Department', label:'Department-部門'},
    {value:'Disabled', label:'Disabled-禁用'},
  ]

  const authTypeOptions = [
    {value:'All', label:'All-所有人'},
    {value:'Role', label:'Role-角色'},
    {value:'Department', label:'Department-部門'},
  ]

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
    { accessorKey:'parentTable', header:lan?.parentTable?.label, size:100,
    Cell: ({row})=>handleShowCellContent(row.original.parentTable,authTypeOptions),},
    { accessorKey:'parentId', header:lan?.parentId?.label, size:100, 
    Cell: ({row})=>{
      let options = []
      if(row.original.parentTable==='Department') options=deptOptions
      if(row.original.parentTable==='Role') options=roleOptions
      return handleShowCellContent(row.original.parentId, options)}
    },
    { accessorKey:'programId', header:lan?.programId?.label, size:100, 
    Cell: ({row})=>handleShowCellContent(row.original.programId, programOptions)
    },
    { accessorKey:'canInsert', header:lan?.canInsert?.label, size:100,    
    Cell: ({row})=><IsCheck value={row.original?.canInsert} />,},
    { accessorKey:'searchAuth', header:lan?.searchAuth?.label, size:100,
    Cell: ({row})=>handleShowCellContent(row.original.searchAuth,authOptions),},
    { accessorKey:'updateAuth', header:lan?.updateAuth?.label, size:100,    
    Cell: ({row})=>handleShowCellContent(row.original.updateAuth,authOptions),},
    { accessorKey:'deleteAuth', header:lan?.deleteAuth?.label, size:100,    
    Cell: ({row})=>handleShowCellContent(row.original.deleteAuth,authOptions),},
    { accessorKey:'multiDeptsAuth', header:lan?.multiDeptsAuth?.label, size:100,
    Cell: ({row})=>handleShowCellContent(row.original.multiDeptsAuth,deptOptions),},
    // { accessorKey:'memo', header:lan?.memo?.label, size:100, },
  ]

  const enableRowSelection = true
  const disabledInsert = false

  return (
    <MaterialMasterTable
    lan={lan}
    queryApiUrl='permissions'
    deleteApi={destroyMany}
    columnsDef={columns}
    ActionForm={PermissionForm}
    enableRowSelection={enableRowSelection}
    disabledInsert={disabledInsert}
    defaultFilters={defaultFilters}
    paperSize={paperSize}
    columnVisibility={columnVisibility}
    disabledPrint={disabledPrint}
    />
  )
  
}

export default PermissionsTable;