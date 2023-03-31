import { Badge, Box, Step, StepLabel, Stepper, Typography } from '@mui/material';
import React from 'react'
import { useQuery } from 'react-query';
import { sequelizeApiBaseURL } from '../../../apis/data.api';

const FlowDetailStepper = ({
    flowData
}) => {
    
    const query = useQuery({
        queryKey: `FlowDetailStepperPanel.details-${flowData?.id}`,
        queryFn: async () => {
            const fetchURL = new URL(
                `flowdetails/all?code=${flowData?.id}`,
                sequelizeApiBaseURL,
            );
            const response = await fetch(fetchURL.href);
            const json = await response.json();
            return json;
        },
        keepPreviousData: true,
    });

    const data = query?.data ?? []
    const detailWidth = data.length * 220

    return (
        <Box sx={{ width: `${detailWidth}px` }}>
            <Stepper activeStep={data.length || 0} >
                {data.map(({
                    seqNo, 
                    step,
                    stepName, 
                    signerName, 
                    signedTime, 
                    signedResult,
                    memo
                }) => {
                    const labelProps = {};
                    let color = 'primary'
                    if (signedResult==='reject' || signedResult==='cancel') {
                        labelProps.error = true;
                        color='error'
                    }
                    return(
                        <Step key={seqNo}>
                            <StepLabel {...labelProps}>
                                <Badge 
                                badgeContent={
                                    signedResult!=='cancel' ? step : 0
                                } 
                                color={color}
                                />
                                <div  style={{textAlign: 'center'}}>
                                <Typography  variant='body2' sx={{margin:0}}>{stepName}  {signerName}</Typography>
                                <Typography  variant='body2' sx={{margin:0}}>{signedTime}</Typography>
                                {memo.trim().length>0 && <Typography variant='body2' sx={{margin:0}}>{memo}</Typography>}
                                </div>
                            </StepLabel>
                        </Step>
                    )
                })}
            </Stepper>
        </Box>
    )
}

export default FlowDetailStepper