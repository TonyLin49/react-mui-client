import { 
  Grading, 
  DriveFileRenameOutline,
  EventNote, 
  Home, 
  QrCode 
} from '@mui/icons-material'
import { Badge, Box, IconButton } from '@mui/material'
import React from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { currentUserState, goToPathState } from '../../../atoms/globalAtom'
import { Icon } from '@iconify/react';

const UserIcons = ({setOpenLeftDrawer}) => {
  const currentUser = useRecoilValue(currentUserState)
  const setGoToPath = useSetRecoilState(goToPathState)
  return (
    <>
    {currentUser && (
      <Box sx={{display: 'flex'}}>
        <IconButton 
        size='large' 
        color='inherit'
        onClick={()=>{
          setGoToPath('/')
          setOpenLeftDrawer(false)
        }}
        >
          <Home/>
        </IconButton>
        <IconButton 
        size='large' 
        color='inherit'
        onClick={()=>{
          setGoToPath('/qrcode')
          setOpenLeftDrawer(false)
        }}
        >
          {/* <Badge color='error' badgeContent={2}>
            <PendingActions/>
          </Badge> */}
          <QrCode/>
        </IconButton>
        <IconButton 
        size='large' 
        color='inherit'
        onClick={()=>{
          setGoToPath('/signature')
          setOpenLeftDrawer(false)
        }}
        >
          <Badge color='error' badgeContent={2}>
            <DriveFileRenameOutline/>
          </Badge>
        </IconButton>
        <IconButton size='large' color='inherit'>
          <Badge color='error' badgeContent={25}>
            <Grading/>
          </Badge>
        </IconButton>
        <IconButton 
        size='large' 
        color='inherit'
        onClick={()=>{
          setGoToPath('/barcode')
          setOpenLeftDrawer(false)
        }}
        >
          {/* <Badge color='error' badgeContent={3}>
            <Notifications/>
          </Badge> */}
          <Icon icon="mdi:barcode" />
        </IconButton>
        <IconButton 
        size='large' 
        color='inherit'
        onClick={()=>{
          setGoToPath('/calendar')
          setOpenLeftDrawer(false)
        }}
        >
          <EventNote />
        </IconButton>
        
      </Box>
    )}
    </>
  )
}

export default UserIcons