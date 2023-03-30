import { Backdrop, CircularProgress } from '@mui/material';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { commonLoadingState } from '../../atoms/globalAtom';

const Loading = () => {
  const loadingState = useRecoilValue(commonLoadingState)
  return (
    <Backdrop open={loadingState} sx={{ zIndex: (theme) => theme.zIndex.modal + 1 }}>
      <CircularProgress sx={{ color: 'white' }} />
    </Backdrop>
  );
};

export default Loading;