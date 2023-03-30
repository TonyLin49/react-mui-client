import { Badge, Box, Step, StepLabel, Stepper, Typography } from '@mui/material';
import React from 'react'
import { useQuery } from 'react-query';
import { sequelizeApiBaseURL } from '../../../apis/data.api';

const FlowStepStepper = ({
    flowData
}) => {

    const parentId = flowData.id

    const query = useQuery({
        queryKey: `FlowDetailStepperPanel.steps-${parentId}`,
        queryFn: async () => {
            const fetchURL = new URL(
                `flowsteps/all?parentId=${parentId}`,
                sequelizeApiBaseURL,
            );
            const response = await fetch(fetchURL.href);
            const json = await response.json();
            return json;
        },
        keepPreviousData: true,
    });

    const data = query?.data ?? []
    const stepWidth = data.length * 210

    return (
        <Box sx={{ width: `${stepWidth}px` }}>
            <Stepper activeStep={flowData?.finishedSteps} >
                {data.map(({step, stepName, signerName}) => (
                <Step key={step}>
                    <StepLabel>
                        {step<=flowData?.finishedSteps && 
                        <Badge badgeContent={step} color='primary'/>}
                        <div  style={{textAlign: 'center'}}>
                        <Typography variant='body2' sx={{margin:0}}>{stepName}</Typography>
                        <Typography variant='body2' sx={{margin:0}}>{signerName}</Typography>
                        </div>
                    </StepLabel>
                </Step>
                ))}
            </Stepper>
        </Box>
    )
}

export default FlowStepStepper