import { Avatar, Tooltip } from '@mui/material'
import React from 'react'
import { useRecoilValue } from 'recoil'
import { currentUserState} from '../../../atoms/globalAtom'

const UserAvatar = ({
    user,
    size
}) => {
    const currentUser = useRecoilValue(currentUserState)
    if(!user) user = currentUser
    const avatarSize = size || 40
    return (<>
        <Tooltip title={user?.displayName || user?.code}>
            <Avatar 
            sx={{ 
                border: '0.5px solid lightgray',
                margin: 0.5, 
                width: {avatarSize} 
            }}
            src={`avatars/${user?.code}.png`} 
            alt={user?.displayName}
            >
                {user?.displayName?.charAt(0).toUpperCase()
                || user?.code?.charAt(0).toUpperCase()} 
            </Avatar >
        </Tooltip>
    </>)
}

export default UserAvatar