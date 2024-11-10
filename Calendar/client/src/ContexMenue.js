import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import moment from 'moment'
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function ContextMenu({contextComponent,i,day,setFromDate}) {
  let today = moment();
    const [contextMenu, setContextMenu] = React.useState(null);
    const handleContextMenu = (event) => {
      event.preventDefault();
      setContextMenu(
        contextMenu === null
          ? {
              mouseX: event.clientX + 2,
              mouseY: event.clientY - 6,
            }
          : 
            null,
      );
    };
  
    const navigate = useNavigate();

    const handleClose = async(e,msg) => {
      if(msg==="NewEvent")
      {
        await
        
        navigate("/event",{state:{day,i}})
      }
      else{
        setFromDate(today.startOf('week'));
      }

     
      setContextMenu(null);
    };
  
    const ContextComponent = contextComponent;
  
    return (
      <div onContextMenu={handleContextMenu} style={{ cursor: 'context-menu' }}>
        <ContextComponent></ContextComponent>
        <Menu
         color="secondary" focused
          open={contextMenu !== null}
          onClose={handleClose}
          anchorReference="anchorPosition"
          anchorPosition={
            contextMenu !== null
              ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
              : undefined
          }
        >
        <MenuItem  color="secondary" focused onClick={(e,msg)=>handleClose(e,"NewEvent")}>Add New Event</MenuItem>
        <MenuItem  color="secondary" focused onClick={(e,msg)=>handleClose(e,"Gototoday")}>Current Week</MenuItem>
    
        </Menu>
      </div>
    );
  }
  

