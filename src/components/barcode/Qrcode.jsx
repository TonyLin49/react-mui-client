import QRCode from 'qrcode.react';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { currentUserState } from '../../atoms/globalAtom';
import { now } from '../../utils/dayUtil';

const Qrcode = ({
  data,
  showData,
  size
}) => {
    const baseUrl = 'http://192.168.68.111:5001/punchcard'
    const currentUser = useRecoilValue(currentUserState)
    const [qrCodeData, setQrCodeData] = useState(data || 
      `${baseUrl}?infos=${currentUser.userName}@${now()}`);
    const width = size || 200
    const height = size || 200

    useEffect(()=>{
      setQrCodeData(data || `${baseUrl}?infos=${currentUser.userName}@${now()}`)
    },[data, currentUser.userName])

    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        padding: 10
      }}>
        <QRCode 
        value={qrCodeData} 
        style={{width, height}} 
        />
        {showData && <p>{qrCodeData}</p>}
      </div>
    );
}
  
export default Qrcode