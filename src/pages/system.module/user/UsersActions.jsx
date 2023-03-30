import { Box, CircularProgress, Fab } from '@mui/material';
import { useEffect, useState } from 'react';
import { Check, Save } from '@mui/icons-material';
import { green } from '@mui/material/colors';
import { update } from './user.api';
import { useRecoilState } from 'recoil';
import { usersListRowDataState } from '../../atoms/dataGridAtom';
import { getSessionData, removeSessionData } from '../../utils/globalUtil';

const UsersActions = ({ params }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [rowData, setRowData] = useRecoilState(usersListRowDataState)

  const handleSaveData = () => {
    setLoading(true);
    requestAnimationFrame(() => {
      setTimeout(()=>{
        const editRow = getSessionData('editRow')
        if(editRow){
          update(editRow)
          .then(res => {
            setSuccess(true);
            setRowData({});
            removeSessionData('editRow')
          })
          .catch(error => {
            console.log('handleSaveData error:', error)
          })
        }
        setLoading(false);
      },150)
    })
  }

  useEffect(() => {
    if (rowData?.id === params?.id && success) setSuccess(false);
  }, [rowData?.id, params?.id, success]);

  return (
    <Box
      sx={{
        m: 1,
        position: 'relative',
      }}
    >
      {success ? (
        <Fab
          color="primary"
          sx={{
            width: 40,
            height: 40,
            bgcolor: green[500],
            '&:hover': { bgcolor: green[700] },
          }}
        >
          <Check />
        </Fab>
      ) : (
        <Fab
          color="primary"
          sx={{
            width: 40,
            height: 40,
          }}
          disabled={params?.id !== rowData?.id || loading}
          onClick={handleSaveData}
        >
          <Save />
        </Fab>
      )}
      {loading && (
        <CircularProgress
          size={52}
          sx={{
            color: green[500],
            position: 'absolute',
            top: -6,
            left: -6,
            zIndex: 1,
          }}
        />
      )}
    </Box>
  );
};

export default UsersActions;