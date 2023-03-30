import { Button, Paper } from '@mui/material'
import { Box } from '@mui/system'
import React, { Component } from 'react'
import SignaturePad from 'react-signature-canvas'
import {uploadSignatureImage} from '../../apis/file.api'
import './style.css'

class Signature extends Component {
  state = {trimmedDataURL: null}
  sigPad = {}
  clear = () => {
    this.sigPad.clear()
    this.setState({trimmedDataURL: null})
  }
  trim = () => {
    const canvas = this.sigPad.getCanvas()
    canvas.willReadFrequently = true
    this.setState({trimmedDataURL: canvas.toDataURL('image/png')})
  }
  uploadSignature = () => {
    const { trimmedDataURL } = this.state;
    const byteString = atob(trimmedDataURL.split(',')[1]);
    const mimeType = trimmedDataURL.match(/(:)([a-z/]+)(;)/)[2];
    const extension = mimeType.split('/')[1];
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uint8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      uint8Array[i] = byteString.charCodeAt(i);
    }
    const file = new File([uint8Array], `signature.${extension}`, { type: mimeType });
    console.log('convert file', file)
    // Create form data and append file
    const formData = new FormData();
    formData.append('signature', file);
    uploadSignatureImage(formData)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.error(error);
      });
  }
  render () {
    let {trimmedDataURL} = this.state
    return <Paper sx={{width: '100%', height: '100VH'}}>
      <SignaturePad 
      canvasProps={{className: 'sigPad'}}
      ref={ref => this.sigPad = ref }
      />
      <Box sx={{display: 'flex', justifyContent: 'space-around'}}>
        <Button 
        variant='contained' 
        size='large'
        onClick={this.clear}
        color='secondary'
        >
          清除簽名
        </Button>
        <Button 
        variant='contained'
        color='success'
        size='large'
        onClick={this.trim}
        >
          使用簽名
        </Button>
        <Button 
        variant="contained" 
        size="large" 
        onClick={this.uploadSignature}
        disabled={!this.state.trimmedDataURL}
        >
          上傳簽名
        </Button>
      </Box>
      {trimmedDataURL && 
        <Box 
        sx={{
          display: 'flex', 
          justifyContent: 'center',
          marginTop: 2
        }}>
          <a href={trimmedDataURL} download="signature.png">
            <img 
            src={trimmedDataURL} 
            className='sigImage'
            alt="download" 
            />
          </a>
        </Box>
      }
    </Paper>
  }
}
export default Signature