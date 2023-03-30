import { Box } from '@mui/system';
import { optionsViewLocale as language } from './optionsView.locale';
import MaterialMasterTable from '../../../components/materialReactTable/MaterialMasterTable';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { localeState } from '../../../atoms/globalAtom';
import OptionsViewForm from './OptionsViewForm';

const OptionsViewsTable = () => {
  const locale = useRecoilValue(localeState)
  const [lan, setLan] = useState(language[locale]) //語系資料

  useEffect(()=>{ //設定表單的語系文字
    setLan(language[locale])
  },[locale])

  const columns = [
    { accessorKey: 'tableName', header: lan?.tableName?.label, size: 100 },
    { accessorKey: 'groups', header: lan?.groups?.label, size: 100 },
    { accessorKey: 'value', header: lan?.value?.label, size: 100 },
    { accessorKey: 'label', header: lan?.label?.label, size: 180 },
    { accessorKey: 'effectDateFrom', header: lan?.effectDateFrom?.label, size: 100 },
    { accessorKey: 'effectDateTo', header: lan?.effectDateTo?.label, size: 100 },
  ]

  const enableRowSelection = false

  return (
  <>
    <Box sx={{ mt: 10}}>
      <MaterialMasterTable
        lan={lan}
        queryApiUrl='optionsViews'
        ActionForm={OptionsViewForm}
        columnsDef={columns}
        enableRowSelection={enableRowSelection}
        disabledInsert={true}
      />
    </Box>
  </>
  )
  
}

export default OptionsViewsTable;