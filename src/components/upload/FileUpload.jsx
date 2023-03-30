import React, { useEffect, useState } from 'react'
import { FilePond, registerPlugin } from 'react-filepond'
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond/dist/filepond.min.css'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import {v4 as uuidv4} from 'uuid'
import { baseURL, dataServerPort } from '../../apis/data.api'

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)

const FileUpload = ({filename, uploadType}) => {
    const type = uploadType || 'images'
    const [_filename, setFileName] = useState(filename)
    useEffect(()=>{
        if(!_filename) setFileName(uuidv4())
        if(!filename) {
            requestAnimationFrame(() => {
                setTimeout(()=>{setFileName(uuidv4())},2000)
            })
        }
    },[_filename, filename])

    return (
        <FilePond
        allowMultiple={false}
        maxFiles={1}
        server={`${baseURL}:${dataServerPort}/api/upload/${type}`}
        name={_filename}//可指定要上傳的檔案名稱
        labelIdle='將檔案施放至此，或點擊以選擇檔案上傳'
        />
    )
}

export default FileUpload