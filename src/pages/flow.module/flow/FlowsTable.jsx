import { Box } from '@mui/system';
import { destroyMany } from './flow.api';
import FlowForm from './FlowForm';
import { flowLocale as language } from './flow.locale';
import MaterialMasterTable from '../../../components/materialReactTable/MaterialMasterTable';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { localeState } from '../../../atoms/globalAtom';
import IsCheck from '../../../components/materialReactTable/cell/IsCheck';
import { 
  employeeOptionsSelector, 
  programStructureOptionsAtom 
} from '../../../atoms/optionsAtom';
import { handleShowCellContent } from '../../../components/materialReactTable/cell/cellUtil';
import FlowStatus from '../../../components/materialReactTable/cell/FlowStatus';
import FlowAccordions from './FlowAccordion';

const FlowsTable = () => {
  const locale = useRecoilValue(localeState)
  const empOptions = useRecoilValue(employeeOptionsSelector)
  const programStructureOptions = useRecoilValue(programStructureOptionsAtom)
  const [lan, setLan] = useState(language[locale]) //語系資料

  useEffect(()=>{ //設定表單的語系文字
    setLan(language[locale])
  },[locale])

  const columns = [
    // { accessorKey: 'id', header: lan?.id?.label, width: 100, },
    { accessorKey: 'status', header: lan?.status?.label, size: 65,
    Cell:({row})=><FlowStatus value={row.original.status}/> },
    { accessorKey: 'formTableName', header: lan?.formTableName?.label, size: 100,
    Cell:({row})=>handleShowCellContent(row.original.formTableName, programStructureOptions)},
    { accessorKey: 'code', header: lan?.code?.label, size: 120 },
    { accessorKey: 'applicant', header: lan?.applicant?.label, size: 100, 
    Cell:({row})=>handleShowCellContent(row.original.applicant, empOptions)},
    { accessorKey: 'createDept', header: lan?.createDept?.label, size: 100 },
    // { accessorKey: 'flowId', header: lan?.flowId?.label, size: 120 },
    { accessorKey: 'flowName', header: lan?.flowName?.label, size: 200 },
    { accessorKey: 'srcSignerId', header: lan?.srcSignerId?.label, size: 100,
    Cell:({row})=>handleShowCellContent(row.original.srcSignerId, empOptions)},
    { accessorKey: 'signerId', header: lan?.signerId?.label, size: 100,
    Cell:({row})=>handleShowCellContent(row.original.signerId, empOptions)},
    { accessorKey: 'closerId', header: lan?.closerId?.label, size: 100,
    Cell:({row})=>handleShowCellContent(row.original.closerId, empOptions)},
    { accessorKey: 'closedTime', header: lan?.closedTime?.label, size: 120 },
    { accessorKey: 'deciderId', header: lan?.deciderId?.label, size: 100,
    Cell:({row})=>handleShowCellContent(row.original.deciderId, empOptions)},
    { accessorKey: 'decideTime', header: lan?.decideTime?.label, size: 120 },
    { accessorKey: 'createTime', header: lan?.createTime?.label, size: 120 },
    { accessorKey: 'totalSteps', header: lan?.totalSteps?.label, size: 80 },
    { accessorKey: 'finishedSteps', header: lan?.finishedSteps?.label, size: 80 },
    { accessorKey: 'closeFlag', header: lan?.closeFlag?.label, size: 65,
    Cell:({row})=><IsCheck value={row.original.closeFlag}/>},
    { accessorKey: 'draftRight', header: lan?.draftRight?.label, size: 100,
    Cell:({row})=>handleShowCellContent(row.original.draftRight, empOptions)},
  ]

  const enableRowSelection = true

  const renderDetailPanel = 
  ({row}) => <>
    <FlowAccordions
    id={row.original.id}
    />
  </>

  return (
  <>
    <Box sx={{ mt: 10}}>
      <MaterialMasterTable
        lan={lan}
        queryApiUrl='flows'
        deleteApi={destroyMany}
        columnsDef={columns}
        ActionForm={FlowForm}
        enableRowSelection={enableRowSelection}
        renderDetailPanel={renderDetailPanel}
      />
    </Box>
  </>
  )
  
}

export default FlowsTable;