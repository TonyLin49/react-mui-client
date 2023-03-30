import { Box } from '@mui/system';
import { destroyMany } from './company.api';
import CompanyForm from './CompanyForm';
import { companyLocale as language } from './company.locale';
import MaterialMasterTable from '../../../components/materialReactTable/MaterialMasterTable';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { localeState } from '../../../atoms/globalAtom';
import IsCheck from '../../../components/materialReactTable/cell/IsCheck';

const CompanysTable = () => {
  const locale = useRecoilValue(localeState)
  const [lan, setLan] = useState(language[locale]) //語系資料

  useEffect(()=>{ //設定表單的語系文字
    setLan(language[locale])
  },[locale])

  const columns = [
    // { accessorKey: 'id', header: lan?.id?.label, width: 100, },
    // { accessorKey: 'sysNo', header: lan?.sysNo?.label, size: 100 },
    // { accessorKey: 'createDept', header: lan?.createDept?.label, size: 100 },
    // { accessorKey: 'applicant', header: lan?.applicant?.label, size: 100 },
    { accessorKey: 'code', header: lan?.code?.label, size: 100 },
    { accessorKey: 'names', header: lan?.names?.label, size: 120 },
    { accessorKey: 'vatNo', header: lan?.vatNo?.label, size: 100 },
    { accessorKey: 'taxNo', header: lan?.taxNo?.label, size: 100 },
    { accessorKey: 'invoiceAddress', header: lan?.invoiceAddress?.label, size: 120 },
    // { accessorKey: 'englishName', header: lan?.englishName?.label, size: 120 },
    // { accessorKey: 'englishAddress', header: lan?.englishAddress?.label, size: 120 },
    { accessorKey: 'responsiblePersons', header: lan?.responsiblePersons?.label, size: 100 },
    { accessorKey: 'tel', header: lan?.tel?.label, size: 100 },
    { accessorKey: 'fax', header: lan?.fax?.label, size: 100 },
    { accessorKey: 'isGeneralLedger', header: lan?.isGeneralLedger?.label, size: 100,
    Cell: ({row}) => <IsCheck value={row.original.isGeneralLedger}/>},
    { accessorKey: 'taxOrgNo', header: lan?.taxOrgNo?.label, size: 100 },
  ]

  const enableRowSelection = true

  return (
  <>
    <Box sx={{ mt: 10}}>
      <MaterialMasterTable
        lan={lan}
        queryApiUrl='companys'
        deleteApi={destroyMany}
        columnsDef={columns}
        ActionForm={CompanyForm}
        enableRowSelection={enableRowSelection}
      />
    </Box>
  </>
  )
  
}

export default CompanysTable;