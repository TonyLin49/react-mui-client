import React from 'react'
import { 
  Box,
  Divider,
  Drawer, 
  IconButton,
  Tooltip,
} from '@mui/material'
import { styled } from '@mui/material/styles';
import { useRecoilState } from 'recoil';
import { leftTreeMenuExpandState, openLeftDrawerState } from '../../../atoms/globalAtom';
import LeftMenuTree from './LeftMenuTree';
import { ArrowCircleLeft, Pending, SwapVerticalCircle } from '@mui/icons-material';
import CompanyLogo from './CompanyLogo';

const LeftDrawer = ({drawerWidth}) => {

  const [open, setOpen] = useRecoilState(openLeftDrawerState)
  const [leftMenuExpand, setLeftMenuExpand] = useRecoilState(leftTreeMenuExpandState)

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'flex-start',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'start',
  }));

  return (
  <>
    <Drawer 
      id='leftDrawer'
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
        <DrawerHeader>
          <Box
            justifyContent='space-around' 
            display='flex'
          >
            <Tooltip 
              title={leftMenuExpand==='close' 
                    ? '展開菜單' : '收折菜單'}
              sx={{marginRight: 3, marginTop: 1}}
            >
              <IconButton 
                size='large'
                color='primary'
                onClick={() => {
                  if(leftMenuExpand==='close'){
                    setLeftMenuExpand('open')
                  } else {
                    setLeftMenuExpand('close')
                  }
                }}
              >
                {leftMenuExpand==='close' 
                ? <SwapVerticalCircle sx={{width: 32}}/>
                : <Pending sx={{width: 32}}/>}
              </IconButton>
            </Tooltip>
            <CompanyLogo/>
            <Tooltip 
              title='關閉菜單'
              sx={{marginLeft:3, marginTop: 1}}
            >
              <IconButton 
                size='large' 
                color='primary'
                onClick={handleDrawerClose}
                >
                <ArrowCircleLeft sx={{width: 32}}/>
              </IconButton>
            </Tooltip>
          </Box>
        </DrawerHeader>
        <Divider />
        <LeftMenuTree/>
      </Drawer>
    </>
  )
}

export default LeftDrawer