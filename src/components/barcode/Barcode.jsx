import Barcode from 'react-barcode';
import { useRecoilValue } from 'recoil';
import { currentUserState } from '../../atoms/globalAtom';
import { now } from '../../utils/dayUtil';

const BarCode = ({
    data,
    showData,
    sizeX,
    sizeY
}) => {
    const currentUser = useRecoilValue(currentUserState)
    const width = sizeX || 200
    const height = sizeY || 50
    return (
        <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
        }}>
            <Barcode 
            displayValue={showData}
            value={data || `${currentUser?.code}@${now()}`} 
            style={{width, height}} 
            />
        </div>
    );
  }

  export default BarCode
  