import React, {useState} from "react";
import { Paper, Typography, Grid, Stack, Accordion, AccordionSummary, AccordionDetails, Button } from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import ScheduleBackupTransfer from "../ScheduleBackupConfiguration/ScheduleBackupTransfer";
import ScheduleBackupTable from "./ScheduleBackupTable";

const ScheduleBackupDetails = ({schedulename,  Style, backupdate, setSelectedDevice, setFrequency, setdeviceStatus}) => {

  const [openPopup, setopenPopup] = useState(false);
  const [tabRightTransfer, settabRightTransfer] = React.useState([]);
  const [scheduleValue, setscheduleValue] = React.useState("");
  const [name, setName] = React.useState(schedulename);
  const [dateTime, setdateTime] = React.useState(backupdate);
  const handleOpen = () => setopenPopup(true);

  const handleDelete = () => {
    setscheduleValue("")
    setName("")
    setdateTime("")
    setSelectedDevice([])
  }
    
  const handleEdit = () => {
    setFrequency("")
    setdeviceStatus("")
  }
 
  let getScheduleValue;
  if(scheduleValue===""){
   getScheduleValue = [{"mac": "", "model": "", "ip": "", "status": ""}]
  }
  else{
  getScheduleValue = scheduleValue
  }
  
  return (
    <Paper>
    <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            Schedule Name: {name}
          </Typography>
          <Typography sx={{ width: '36%', flexShrink: 0 }}>
            Schedule Backup: {dateTime}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid item xs={8}>
          </Grid>
          <Grid display="flex" justifyContent="end">
          <Stack direction="row" spacing={2}>
            <Button color="success" onClick={handleOpen}>Edit Member</Button>
            <Button color="primary" onClick={handleEdit}>Edit</Button>
            <Button color="secondary" onClick={handleDelete}>Delete</Button>
          </Stack>
          </Grid>

        <ScheduleBackupTable 
            getScheduleValue={getScheduleValue} 
            setSelectedDevice={setSelectedDevice}
        />
        </AccordionDetails>
    </Accordion>
        
        <ScheduleBackupTransfer 
         openPopup={openPopup} 
         setopenPopup={setopenPopup} 
         Style={Style}
         schedulename={schedulename}
         setscheduleValue={setscheduleValue} 
         tabRightTransfer={tabRightTransfer} 
         settabRightTransfer={settabRightTransfer}
        />
    </Paper>
    
  );
};



export default ScheduleBackupDetails;