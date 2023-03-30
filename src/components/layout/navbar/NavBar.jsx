import { 
  AppBar, 
  Button, 
  IconButton, 
  Toolbar, 
  Tooltip, 
  Typography,
} from '@mui/material'
import { Menu, Lock } from '@mui/icons-material'
import { alpha, Box, Container } from '@mui/system'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { 
  currentUserState, 
  openLeftDrawerState, 
  openLoginState, 
  windowDimensionsState
} from '../../../atoms/globalAtom'
import UserIcons from './UserIcons'
import { SESSION_USER_OBJECT } from '../../../constants/globalConstant.js'
import { removeSessionData } from '../../../utils/globalUtil'
import AccountMenu from './UserActionMenu'

const NavBar = () => {
  const windowDimensions = useRecoilValue(windowDimensionsState)

  const [openLeftDrawer, setOpenLeftDrawer] = useRecoilState(openLeftDrawerState)
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState)
  const setOpenLogin = useSetRecoilState(openLoginState)
  
  const handleLogin = () => {
    removeSessionData(SESSION_USER_OBJECT)
    setCurrentUser(null)
    setOpenLogin(true)
  }
  return (
    <AppBar
      open={openLeftDrawer}
      id='appBar'
      sx={(theme) => ({
        backgroundColor: alpha(theme.palette.primary.dark, .9)
      })}
    >
      <Container maxWidth='lg'>
        <Toolbar disableGutters sx={{height: 62}}>
          <Box>
            <Tooltip title='開啟菜單'>
              <IconButton 
                size='large' 
                color='inherit'
                onClick={()=>setOpenLeftDrawer(true)}
              >
                <Menu />
              </IconButton>
            </Tooltip>
          </Box>
          <Box sx={{flexGrow:1}}>
            <AccountMenu/>
          </Box>
          {windowDimensions.width>680 &&
          <Typography
            variant='h6'
            component='h1'
            noWrap
            sx={{flexGrow:1}}
          > 企業管理系統
          </Typography>}
          {!currentUser 
          ? <Button 
              color='inherit' 
              startIcon={<Lock/>} 
              onClick={handleLogin} 
            >
              登入
            </Button>
          : <UserIcons setOpenLeftDrawer={setOpenLeftDrawer}/>}
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default NavBar