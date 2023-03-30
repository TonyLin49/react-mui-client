import * as React from 'react';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Logout from '@mui/icons-material/Logout';
import UserAvatar from './UserAvatar';
import { useSetRecoilState } from 'recoil'
import { 
  currentUserState, 
  openLeftDrawerState, 
  openLoginState, 
  openUserMenuState,
  goToPathState
} from '../../../atoms/globalAtom'
import { Typography } from '@mui/material';
import { clearSessionData } from '../../../utils/globalUtil';

export default function AccountMenu() {
  const setCurrentUser = useSetRecoilState(currentUserState)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const setOpenUserMenu = useSetRecoilState(openUserMenuState)
  const setOpenLogin = useSetRecoilState(openLoginState)
  const setOpenLeftDrawer = useSetRecoilState(openLeftDrawerState)
  const setGoToPath = useSetRecoilState(goToPathState)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null);
  }
  const handleLogout = () => {
    clearSessionData()
    setCurrentUser(null)
    setOpenUserMenu(false)
    setOpenLogin(true)
    setOpenLeftDrawer(false)
  }
  return (
    <React.Fragment>
      <Box 
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          textAlign: 'center'
        }}
      >
        <IconButton onClick={handleClick}>
          <UserAvatar/>
        </IconButton>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem
        onClick={()=>{
          setGoToPath('/uploadAvatar')
          setOpenLeftDrawer(false)
        }}
        >
          <UserAvatar/>
          <Typography variant='subtitle2'>換照片</Typography>
        </MenuItem>
        <MenuItem onClick={handleLogout}>
            <IconButton color='primary'>
              <Logout />
            </IconButton>
          <Typography variant='subtitle1'>登出</Typography>
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}