import { Box } from '@mui/system';
import { destroyMany } from './programStructure.api';
import ProgramStructureForm from './ProgramStructureForm';
import { programStructureLocale as language } from './programStructure.locale';
import MaterialMasterTable from '../../../components/materialReactTable/MaterialMasterTable';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { localeState } from '../../../atoms/globalAtom';
import IsCheck from '../../../components/materialReactTable/cell/IsCheck';
import { 
  flowDefineOptionsAtom, 
  groupUserCategoriesSelector, 
  programMenuOptionsAtom 
} from '../../../atoms/optionsAtom';
import { handleShowCellContent } from '../../../components/materialReactTable/cell/cellUtil';

const ProgramStructuresTable = () => {
  const groupUserCategories = useRecoilValue(groupUserCategoriesSelector)
  const programMenuOptions = useRecoilValue(programMenuOptionsAtom)
  const flowDefineOptions = useRecoilValue(flowDefineOptionsAtom)
  const locale = useRecoilValue(localeState)
  const [lan, setLan] = useState(language[locale]) //語系資料

  useEffect(()=>{ //設定表單的語系文字
    setLan(language[locale])
  },[locale])

  const columns = [
    // { accessorKey: 'id', header: lan?.id?.label, width: 100, hidden: true},
    // { accessorKey: 'sysNo', header: lan?.sysNo?.label, size: 120, },
    // { accessorKey: 'applicant', header: lan?.applicant?.label, size: 120, },
    // { accessorKey: 'createDept', header: lan?.createDept?.label, size: 120, },
    { accessorKey: 'code', header: lan?.code?.label, size: 100, },
    { accessorKey: 'programName', header: lan?.programName?.label, size: 100 },
    { accessorKey: 'parentId', header: lan?.parentId?.label, size: 100, 
    Cell: ({row}) => handleShowCellContent(row.original.parentId, programMenuOptions)},
    { accessorKey: 'orderKey', header: lan?.orderKey?.label, size: 80 },
    { accessorKey: 'isMenu', header: lan?.isMenu?.label, size: 80, 
    Cell: ({row}) => <IsCheck value={row.original.isMenu}/>,},
    { accessorKey: 'programUrl', header: lan?.programUrl?.label, size: 100 },
    { accessorKey: 'bindFlow', header: lan?.bindFlow?.label, size: 100, 
    Cell: ({row}) => <IsCheck value={row.original.bindFlow}/>,},
    { accessorKey: 'flowId', header: lan?.flowId?.label, size: 100,
    Cell: ({row}) => handleShowCellContent(row.original.flowId, flowDefineOptions)},
    { accessorKey: 'systemEncode', header: lan?.systemEncode?.label, size: 100, 
    Cell: ({row}) => <IsCheck value={row.original.systemEncode}/>,},
    { accessorKey: 'encodeRule', header: lan?.encodeRule?.label, size: 100,
    Cell: ({row}) => handleShowCellContent(row.original.encodeRule, groupUserCategories['EncodeRule'])},
    { accessorKey: 'beginCode', header: lan?.beginCode?.label, size: 100 },
    { accessorKey: 'endNoLength', header: lan?.endNoLength?.label, size: 100 },
    { accessorKey: 'onlineHelp', header: lan?.onlineHelp?.label, size: 100 },
    { accessorKey: 'logInsert', header: lan?.logInsert?.label, size: 80 , 
    Cell: ({row}) => <IsCheck value={row.original.logInsert}/>,},
    { accessorKey: 'logUpdate', header: lan?.logUpdate?.label, size: 80 , 
    Cell: ({row}) => <IsCheck value={row.original.logUpdate}/>,},
    { accessorKey: 'logDelete', header: lan?.logDelete?.label, size: 80 , 
    Cell: ({row}) => <IsCheck value={row.original.logDelete}/>,},
  ]

  const enableRowSelection = true

  return (
  <>
    <Box sx={{ mt: 10}}>
      <MaterialMasterTable
        lan={lan}
        queryApiUrl='programStructures'
        deleteApi={destroyMany}
        columnsDef={columns}
        ActionForm={ProgramStructureForm}
        enableRowSelection={enableRowSelection}
      />
    </Box>
  </>
  )
  
}

export default ProgramStructuresTable;