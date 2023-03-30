import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import { EditRoad, Subtitles, ViewList } from '@mui/icons-material';
import DepartmentsTable from '../../../pages/system.module/department/DepartmentsTable';
import PermissionsTable from '../../../pages/system.module/permission/PermissionsTable';
import FlowsTable from '../../../pages/flow.module/flow/FlowsTable';
import { alpha } from '@mui/material';

const demoComponents = [
  {component: <DepartmentsTable/>, label: '部門資料', icon: <Subtitles />},
  {component: <PermissionsTable/>, label: '權限設定', icon: <ViewList />},
  {component: <FlowsTable/>, label: '流程資料', icon: <EditRoad />},
]

export default function FixedBottomNavigation({
  components
}) {
  if(!components) components = demoComponents
  const [value, setValue] = React.useState(0);
  return (<>
    <div>
      {components[value].component}
    </div>
    <Paper
    sx={{
        position: 'fixed', 
        bottom: 0, 
        left: 0, 
        right: 0, 
        zIndex: 10,
    }}
    elevation={0}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        sx={(theme) => ({
          backgroundColor: alpha(theme.palette.primary.dark, .4)
        })}
      >
        {components.map((item, index) => (
            <BottomNavigationAction
              key={index}
              sx={{color: '#fff',}}
              label={item.label}
              icon={item.icon}
            />
          ))}
      </BottomNavigation>
    </Paper>
  </>);
}