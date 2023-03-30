import { Calendar, momentLocalizer, Views } from 'react-big-calendar'
import { IconButton, Paper, Typography } from '@mui/material'
import { useCallback } from 'react';
import { Box } from '@mui/system';
import { ArrowBackIosNew, ArrowForwardIos, Event } from '@mui/icons-material';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import './BaseCalendar.css';

import moment from 'moment'
import { zhTW } from '../../utils/moment_locale_zhTW';
import { useRecoilValue } from 'recoil';
import { windowDimensionsState } from '../../atoms/globalAtom';
moment.locale('zh-tw', zhTW);
const localizer = momentLocalizer(moment)

const sampleEvents = [
    {title: '開會', start: '2023-01-18T14:00', end: '2023-01-18', table: 'users', id: 'kkkk01', color: '#F0F'},
    {title: '上班', start: '2023-01-19T09:07', end: '2023-01-19T08:37', color: 'red'},
    {title: '下班', start: '2023-01-19T17:13', end: '2023-01-19T17:13', color: 'green'},
    {title: '加班1小時', start: '2023-01-19T17:30', end: '2023-01-19T17:30', color: 'indigo'},
    {title: '春節', start: '2023-01-20', end: '2023-01-29T23:59:59', color: 'orange'},
    {title: '春節最後一天，公司大掃除', start: '2023-01-29', end: '2023-01-29', color: 'green'},
    {title: '好市多採買', start: '2023-01-23T12:00', end: '2023-01-23T14:00', color: 'gray'},
    {title: '主委到訪', start: '2023-01-29T12:00', end: '2023-01-29T14:00', color: 'blue'},
    {title: '拜晚年', start: '2023-01-29T15:00', end: '2023-01-29T14:00'},
    {title: '吃晚餐', start: '2023-01-29T17:00', end: '2023-01-29T14:00', color: 'purple'}
]

const BaseCalendar = ({
  calendarTitle,
  events, 
  onSelectEventFC,
  monthEventView
}) => {

  if(!events) events = sampleEvents

  const windowDimensions = useRecoilValue(windowDimensionsState)

    const CustomToolbar = (toolbar) => {
      const goToBack = () => { toolbar.onNavigate('PREV') }
      const goToNext = () => { toolbar.onNavigate('NEXT') }
      const goToCurrent = () => { toolbar.onNavigate('TODAY') }
    
      const date = moment(toolbar.date)
    
      return (<>
        <Typography 
          variant='h6'
          color='primary'
          sx={{display: 'flex', alignItems: 'baseline'}}
        >
          {windowDimensions.width>420 && (calendarTitle || '行事曆')}
          <Box sx={{display: 'flex',marginLeft: 5}}>
            <Box sx={{width: 120}}>
              {date.format('YYYY')}年{date.format('MMMM')}
            </Box> 
          </Box >
            <Box sx={{marginTop: 0, marginLeft: 0}}>
              <IconButton onClick={goToBack} color='primary'>
                <ArrowBackIosNew/>
              </IconButton>
              <IconButton onClick={goToCurrent} color='primary' sx={{fontSize: 18,fontWeight: 'bold'}}>
                今天
              </IconButton>
              <IconButton onClick={goToNext} color='primary'><ArrowForwardIos/></IconButton>
            </Box>  
        </Typography>
      </>)
    }

    const MonthEvent = ({ event }) => (
        <Box>
          {windowDimensions.width>=800 && <Event sx={{height: 14}}/>}
          {event.start.split('T')[1]}{event.title}
        </Box>
    )

    const dayPropGetter = useCallback((date) => {
        return {
            ...((moment(date).day()===0 || moment(date).day()===6) 
                && { style: { backgroundColor: '#eee' }})
        }
    }, [])

    const eventPropGetter = useCallback((event)=>{
        const eventStyle = {fontSize:10,padding:1}
        return {
            ...(event?.color ? {style:{...eventStyle, backgroundColor:event.color}}
                             : {style:eventStyle})
        }
    }, [])

    return (
        <Paper sx={{marginTop: 9}}>
            <Calendar
                views={[Views.MONTH]}
                localizer={localizer}
                events={events}
                style={{ height: 580 }}
                components={{
                    toolbar: CustomToolbar,
                    month: { event: MonthEvent },
                }}
                onSelectEvent={(e)=>{
                    console.log('onSelectEvent', e)
                    if(onSelectEventFC) onSelectEventFC()
                }}
                showAllEvents
                dayPropGetter={dayPropGetter}
                eventPropGetter={eventPropGetter}
            />
        </Paper>
    )

}

export default BaseCalendar
