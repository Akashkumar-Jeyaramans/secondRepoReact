import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Dialog, DialogContent, DialogTitle, Typography, Stack, Grid} from "@mui/material";
import { Close, Schedule } from "@mui/icons-material";
import {
  closeScheduleBackupSettingDialog,
  scheduleBackupSettingSelector,
} from "../../../features/ScheduleBackupSetting";
import Controls from "../../common/form/controls/Controls";
import ScheduleBackupForm from "./ScheduleBackupConfiguration/ScheduleBackupForm";
import ScheduleBackupDetails from "./DeviceList/ScheduleBackupDetails";
import ScheduleBackupList from "./DeviceList/ScheduleBackupList";

const ScheduleBackupDialog = ({Style}) => {

  const dispatch = useDispatch();
  const { visible } = useSelector(scheduleBackupSettingSelector);
  const [frequency, setFrequency] = React.useState('');
  const [times, setTimes] = React.useState(new Date());
  const [valuedate, setValuedate] = React.useState(new Date());
  const [selectedDevice, setSelectedDevice] = useState([]);
  const [deviceStatus, setdeviceStatus] = useState("")

  let timesValue =  valuedate.getFullYear()+'-'+(valuedate.getMonth()+1)+'-'+valuedate.getDate()+' '+('0' + times.getHours()).slice(-2)+':'+('0' + times.getMinutes()).slice(-2)

  const handleCancleClick = () => {
    dispatch(closeScheduleBackupSettingDialog());
    setSelectedDevice([])
  };

  const AddorEdit = (device, resetForm) => {
    if (device.id === "0") console.log("Insert Record", device);
    else console.log("update Record", device);
    resetForm();
    setdeviceStatus(device)
  };

  let statusValue;
  if(deviceStatus==="" && visible===true ){
    statusValue="WAITING"
  }
  else if(deviceStatus!=="" && visible === false){
    statusValue="WAITING"
    setdeviceStatus("")
  }
  else{
    statusValue="SUCCESS"
  }

  return (
    <Dialog
      open={visible}
      maxWidth="xl"
      fullWidth
      classes={{ paper: Style.dialogWraper }}
    >
      
    <DialogTitle>
    <div style={{ display: "flex", alignItems: "center" }}>

    <Schedule color="action"/>
        
    <Typography variant="h6" component="div" sx={{ ml: 2, flex: 1 }} >
        schedule backup
    </Typography>
          
    <Controls.ActionButtons
        color="secondary"
        onClick={handleCancleClick}
    >
    <Close></Close>
    </Controls.ActionButtons>

    </div>
    </DialogTitle>

    <DialogContent dividers>
      <Stack spacing={2}>
      <ScheduleBackupForm 
        AddorEdit={AddorEdit} 
        setTimes={setTimes} 
        times={times} 
        valuedate={valuedate} 
        setValuedate={setValuedate} 
        frequency={frequency}
        setFrequency={setFrequency}
        deviceStatus={deviceStatus}
      />
      <Grid container spacing={2}>
      <Grid item xs={7}>
        {statusValue === 'SUCCESS'?
        <ScheduleBackupDetails 
         schedulename={deviceStatus.schedulename} 
         backupdate={timesValue} 
         Style={Style}
         setSelectedDevice={setSelectedDevice}
         setFrequency={setFrequency}
         setdeviceStatus={setdeviceStatus}
        />
        : null }
      </Grid>
      <Grid item xs={4}>
        <ScheduleBackupList selectedDevice={selectedDevice}/>
      </Grid>
      </Grid>
      </Stack>
    </DialogContent>

    </Dialog>
  );
};

export default ScheduleBackupDialog;