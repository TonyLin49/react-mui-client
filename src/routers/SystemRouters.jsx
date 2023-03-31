import { Paper } from '@mui/material';
import React, { useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { goToPathState, openLeftDrawerState } from '../atoms/globalAtom';

const Qrcode = React.lazy(() => import('../components/barcode/Qrcode'));
const Signature = React.lazy(() => import('../components/signature/Signature'));
const BarCode = React.lazy(() => import('../components/barcode/Barcode'));
const UploadAvatar = React.lazy(() => import('../components/upload/UploadAvatar'));
const BaseCalendar = React.lazy(() => import('../components/bigCalendar/BaseCalendar'));

const NoticesTable = React.lazy(() => import('../pages/system.module/notice/NoticesTable'));
const LogInfosTable = React.lazy(() => import('../pages/system.module/logInfo/LogInfosTable'));
const PermissionsTable = React.lazy(() => import('../pages/system.module/permission/PermissionsTable'));
const CompanysTable = React.lazy(() => import('../pages/system.module/company/CompanysTable'));
const CategorysTable = React.lazy(() => import('../pages/system.module/category/CategorysTable'));
const DepartmentsTable = React.lazy(() => import('../pages/system.module/department/DepartmentsTable'));
const EmployeesTable = React.lazy(() => import('../pages/system.module/employee/EmployeesTable'));
const GroupsTable = React.lazy(() => import('../pages/system.module/role/GroupsTable'));
const UsersTable = React.lazy(() => import('../pages/system.module/user/UsersTable'));
const UserCategorysTable = React.lazy(() => import('../pages/system.module/userCategory/UserCategorysTable'));
const FlowsTable = React.lazy(() => import('../pages/flow.module/flow/FlowsTable'));
const ProgramStructuresTable = React.lazy(() => import('../pages/system.module/programStructure/ProgramStructuresTable'));
const AccountingsTable = React.lazy(() => import('../pages/accounting.module/accounting/AccountingsTable'));
const FlowDefinesTable = React.lazy(() => import('../pages/flow.module/flowDefine/FlowDefinesTable'));
const FlowStepsTable = React.lazy(() => import('../pages/flow.module/flowStep/FlowStepsTable'));
const FlowDetailsTable = React.lazy(() => import('../pages/flow.module/flowDetail/FlowDetailsTable'));
const SponsorsTable = React.lazy(() => import('../pages/flow.module/sponsor/SponsorsTable'))
const SponsorTranssTable = React.lazy(() => import('../pages/flow.module/sponsorTrans/SponsorTranssTable'))
const JobAgentsTable = React.lazy(() => import('../pages/flow.module/jobAgent/JobAgentsTable'))
const CancelSignsTable = React.lazy(() => import('../pages/flow.module/cancelSign/CancelSignsTable'))

const SystemRouters = () => {

    const navigate = useNavigate()
    const goToPath = useRecoilValue(goToPathState)
    const setOpenLeftDrawer = useSetRecoilState(openLeftDrawerState)

    useEffect(() => {
        navigate(goToPath)
    }, [goToPath, navigate])

    return (
        <Paper
            sx={{ marginTop: 10 }}
            onClick={() => setOpenLeftDrawer(false)}
        >
            <Routes>
                <Route path='/' element={<BaseCalendar />} />
                <Route path='/undertakers' element={<SponsorsTable />} />
                <Route path='/voidform' element={<CancelSignsTable />} />
                <Route path='/jobagent' element={<JobAgentsTable />} />
                <Route path='/jobtransfer' element={<SponsorTranssTable />} />
                <Route path='/flowdefines' element={<FlowDefinesTable />} />
                <Route path='/flowsteps' element={<FlowStepsTable />} />
                <Route path='/flowdetails' element={<FlowDetailsTable />} />
                <Route path='/authorizations' element={<PermissionsTable />} />
                <Route path='/qrcode' element={<Qrcode />} />
                <Route path='/barcode' element={<BarCode />} />
                <Route path='/uploadAvatar' element={<UploadAvatar />} />
                <Route path='/signature' element={<Signature />} />
                <Route path='/calendar' element={<BaseCalendar />} />
                <Route path='/users' element={<UsersTable />} />
                <Route path='/usercategories' element={<UserCategorysTable />} />
                <Route path='/employees' element={<EmployeesTable />} />
                <Route path='/departments' element={<DepartmentsTable />} />
                <Route path='/flows' element={<FlowsTable />} />
                <Route path='/companies' element={<CompanysTable />} />
                <Route path='/syscategories' element={<CategorysTable />} />
                <Route path='/groups' element={<GroupsTable />} />
                <Route path='/programstructures' element={<ProgramStructuresTable />} />
                <Route path='/accountings' element={<AccountingsTable />} />
                <Route path='/syslogs' element={<LogInfosTable />} />
                <Route path='/notices' element={<NoticesTable />} />
            </Routes>
        </Paper>
    )
}

export default SystemRouters