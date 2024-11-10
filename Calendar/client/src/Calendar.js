import { React, useState, useEffect } from "react"
import moment from 'moment'
import Day from "./Day";
import ContextMenu from "./ContexMenue";
import { getEvent } from "./axios/eventsAPI";
import { userEvent } from "./axios/eventsAPI";
import { saveEvent } from "./axios/eventsAPI";
import { CreateEventPage } from "./Event";
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import ButtonGroup from '@mui/material/ButtonGroup';

const Calendar = (props) => {
  let today = moment();
  let s = "";
  const userId = localStorage.getItem("userId");
  const [fromDate, setFromDate] = useState(today.startOf('week'));
  const [toDate, setToDate] = useState(today.endOf('week'));
  const [userEvents, setUserEvents] = useState([])
  const [count, setCount] = useState(0)
  const navigate = useNavigate();
  console.log({
    fromDate: fromDate.toString(),
    today: moment().toString(),
    toDate: toDate.toString(),
  });

  const GoToPrev = () => {
    setCount(count - 1)
    setFromDate(fromDate.clone().subtract(1, 'week').startOf('week'));
  }

  const GoToNext = () => {
    setCount(count + 1)
    setFromDate(fromDate.clone().add(1, 'week').startOf('week'));
  }

  const GoToToday = () => {
    setCount(0)
    setFromDate(today.startOf('week'));
  }


  const loadEvents = async () => {
    await userEvent(userId).then((response) => {
      console.log(response.data['value']);
      setUserEvents(response.data['value'])
    })

  }


  useEffect(() => {

    loadEvents()

  }, [fromDate])

  const AddEvent = async () => {
    navigate("/event")
  }


  return (<div className='center' >
    <br></br>
     <Box 
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
    <ButtonGroup variant="contained" aria-label="outlined primary button group" display= "flex" flexDirection= "column" alignItems= "center">
      <Button variant="outlined" color="secondary" focused onClick={GoToPrev}>Previous Week</Button>
      <Button variant="outlined" color="secondary" focused onClick={GoToToday}>Current Week</Button>
      <Button variant="outlined" color="secondary" focused onClick={GoToNext}>Next Week</Button>
      <Button variant="outlined" color="secondary" focused onClick={AddEvent}>Add new event</Button></ButtonGroup></Box>
    <Box sx={{ flexGrow: 1, textAlign: 'center',color:"secondary" , borderRadius:'50px', justifyContent: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', top: '100%', marginTop: '5%' }}>
      <Grid container spacing={2}>
        {new Array(7).fill('').map((a, index) => (<>
          <Grid>
            <Day
              events={userEvents}
              setFromDate={setFromDate}
              key={index}
              day={fromDate.day(index).format('dddd')}
              month={fromDate.day(index).format('DD.MM.YYYY')}
              index={index}
              event={userEvents}
              funcGoToToday={GoToToday}
              loadEvents={loadEvents}
              setUserEvents={setUserEvents}
              fullDate={fromDate.day(index).format('MM-DD-yyyy')} />
          </Grid>
        </>
        ))}  </Grid></Box>
  </div>
  )
};
export default Calendar




