import { useState, React, useEffect } from "react"
import moment from 'moment'
import ContextMenu from "./ContexMenue"
import { DeleteEvent } from "./axios/eventsAPI";
import DeleteIcon from '@mui/icons-material/Delete';
import MenuItem from '@mui/material/MenuItem';
import { userEvent } from "./axios/eventsAPI";
import { useNavigate } from 'react-router-dom';
import { CreateEventPage } from "./Event";
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';


const Day = (props) => {
    if (props.key) { console.log("props.key", props.key); }
    const navigate = useNavigate();

    const userId = localStorage.getItem("userId");
    const [todayEvents, setTodayEvents] = useState([]);
    useEffect(() => {
        console.log(props.fullDate);

        const a = props.events.filter(e => moment(e.startDate).format('DD.MM.YYYY') == props.month)
        setTodayEvents(a)
    }, [props.events])

    const loadEvents = async () => {
        await userEvent(userId).then((response) => {
            console.log(response.data['value']);
            props.setUserEvents(response.data['value'])
        })

    }

    const deleteEvent = async (eventId) => {
        await DeleteEvent(eventId).then(

            (res) => {
                console.log(res)
                loadEvents()
            }
        )
    }


    const editEvent = (eventToEdit) => {
        console.log("editEvent on day");
        navigate("/event", { state: { eventToEdit } }, { replace: false });
    }


    const componentToSetMenu = () => {
        return (<>
            <Paper elevation={3} square={false} style={{ display: 'inline-block'}}>
                <div className="day" style={{ borderStyle: 'groove', width: '250px', height: '600px' }} >
                    <h1>{`${props.day} ${props.month}`}</h1>

                    {todayEvents != undefined ? todayEvents.map((e) => <>
                        <h2>{e.title}</h2>
                        <Button variant="outlined" size="small" color="secondary" focused startIcon={<DeleteIcon />}
                            onClick={() => deleteEvent(e.eventId)}></Button>
                        <Button variant="outlined" size="small" color="secondary" focused startIcon={<EditIcon />}
                            onClick={() => editEvent(e)}></Button>

                    </>) : <></>}
                </div></Paper>
        </>
        )
    }
    return (<div>

        <ContextMenu day={props.fullDate} i={props.key} setFromDate={props.setFromDate} contextComponent={componentToSetMenu}></ContextMenu>
    </div>)
}
export default Day;







