import { Button } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import AvatarEditor from 'react-avatar-edit'
import { useRecoilState } from 'recoil'
import { currentUserState } from '../../atoms/globalAtom'

const UploadAvatar = ({
    sizeX,
    sizeY
}) => {
    const [currentUser, setCurrentUser] = useRecoilState(currentUserState)
    const width=sizeX || 400
    const height=sizeY || 300
    const [preview, setPreview]=useState(null)
    const onClose = () => setPreview(null)
    const onCrop = view => setPreview(view)

    const handleDownload = () => {
        const downloadLink = document.createElement('a');
        downloadLink.setAttribute('download', 'avatar.png');
        downloadLink.setAttribute('href', preview);
        downloadLink.click();
    };

    const handleUpload = () => {
        const formData = new FormData();
        formData.append(`${currentUser?.userName || 'avatar.png'}`, dataURLtoFile(preview, 'avatar.png'));

        fetch('http://192.168.68.111:5001/api/upload/avatar', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            setCurrentUser({...currentUser, photoUrl: `avatars/${currentUser.userName}.png`})
            console.log(response);
        })
        .catch(error => {
            console.error(error);
        });
    }

    const dataURLtoFile = (dataurl, filename) => {
        var arr = dataurl.split(','),
          mime = arr[0].match(/:(.*?);/)[1],
          bstr = atob(arr[1]),
          n = bstr.length,
          u8arr = new Uint8Array(n);
      
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
      
        return new File([u8arr], filename, { type: mime });
    }

    return (
        <div
        style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 10,
            flexDirection: 'column',
            borderRadius: 40,
        }}
        >
            <AvatarEditor
                width={width}
                height={height}
                //src={`../../../avartas/${currentUser?.uaerName}.png`}
                onClose={onClose}
                onCrop={onCrop}
            />
            {preview && (
                <div style={{ 
                    marginTop: 10,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 10,
                    flexDirection: 'column',
                }}>
                <img src={preview} alt="avatar preview" />
                <Box>
                    <Button 
                    sx={{margin: 2}}
                    variant='outlined' 
                    onClick={handleDownload}
                    >下載截圖</Button>
                    <Button 
                    variant='contained' 
                    onClick={handleUpload}
                    >上傳截圖</Button>
                </Box>
                </div>
            )}
        </div>
    )
}

export default UploadAvatar