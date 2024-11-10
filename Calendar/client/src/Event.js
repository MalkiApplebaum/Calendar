
import { useState, React, useEffect } from "react"
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { saveEvent } from './axios/eventsAPI';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import moment from 'moment'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';

export const CreateEventPage = ({ children }) => {
  const location = useLocation();
  const [EventId, setEventId] = useState(!location.state?.eventToEdit?.eventId ? '' : location.state.eventToEdit?.eventId);
  const UserId = localStorage.getItem("userId")
  const [Title, setTitle] = useState(!location.state?.eventToEdit?.title ? '' : location.state?.eventToEdit?.title);
  const [day1, setDay1] = useState(new moment());
  const [Description, setDescription] = useState(!location.state?.eventToEdit?.description ? '' :
    location.state.eventToEdit?.description);
  const [StartDate, setStartDate] = useState((!location.state?.eventToEdit?.startDate) ? (!location.state?.day ? null :
    location.state.day) :
    location.state.eventToEdit.startDate);
  const [EndDate, setEndDate] = useState(!location.state?.eventToEdit?.endDate ? new moment() :
    moment(location.state.eventToEdit.endDate));

  const [eventState, setEventState] = useState();
  const navigate = useNavigate();
  const CreateEvent = () => {

    const event = {
      "EventId": !location.state?.eventToEdit?.eventId ? EventId : location.state.eventToEdit?.eventId,
      "UserId": UserId,
      "Title": Title,
      "Description": Description,
      "startDate": StartDate,
      "EndDate": EndDate
    }
    saveEvent(EventId, UserId, Title, Description, StartDate, EndDate)
    navigate("/calendar", { replace: false });
  }

  const cancel = async () => {
    await navigate("/calendar", { replace: false });
  }
  useEffect(() => {
    if (Title) {
      console.log(Title);
    }
  }, [Title]);



  return (<div className='center'>

    <h1 style={{ color: 'purple' }}>Event✍️</h1>
  
    <LocalizationProvider dateAdapter={AdapterMoment}>
      {children}

      <TextField
        color="secondary" focused
        size="small"
        id="outlined-number"
        label="eventId"
        type="number"
        InputLabelProps={{
          shrink: true,
        }}
        value={EventId}
        onChange={(e) => setEventId(e.target.value)}
      />
      <br></br>

      <TextField
        color="secondary" focused
        size="small"
        label="Event Title"
        value={Title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <br></br>

      <TextField
        color="secondary" focused
        id="outlined-multiline-static"
        label="Description"
        multiline
        rows={6}
        defaultValue="Default Value"
        value={Description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <br></br>

      <DatePicker color="secondary" focused defaultValue={StartDate ? moment(StartDate) : day1}
        onChange={s => setStartDate(s)}
      ></DatePicker>

      <br></br>

      <DatePicker color="secondary"
        focused
        defaultValue={EndDate ? moment(EndDate) : day1}
        onChange={s => setEndDate(s)}></DatePicker>
      <br></br>


      <Button variant="outlined" color="secondary" focused startIcon={<SaveIcon />} onClick={CreateEvent} >Create</Button>
      <br></br>
      <Button variant="outlined" color="secondary" focused startIcon={<DeleteIcon />} onClick={cancel}> Cancel </Button>

    </LocalizationProvider>


  </div>)
}