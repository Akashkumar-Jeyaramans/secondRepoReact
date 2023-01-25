import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Dialog, DialogContent, DialogTitle, Typography, Stack} from "@mui/material";
import { Close, Event } from "@mui/icons-material";
import {
  closeSysylogServerDialog,
  sysylogServerSettingSelector,
} from "../../../features/SyslogServerSetting";
import Controls from "../../common/form/controls/Controls";
import SystemLogForm from "./SyslogConfiguration/SystemLogForm";
import SystemLogTable from "./DeviceList/SystemLogTable";

const SyslogSettingDialog = ({selectedValue, Style}) => {

  const dispatch = useDispatch();
  const { visible } = useSelector(sysylogServerSettingSelector);

  const handleCancleClick = () => {
    dispatch(closeSysylogServerDialog());
  };

  const [deviceStatus, setdeviceStatus] = useState("")
  const [setdeviceValue] = useState("")
  const AddorEdit = (device, resetForm) => {
    if (device.id === "0") console.log("Insert Record", device);
    else console.log("update Record", device);
    resetForm();
    setdeviceStatus(device)
    setdeviceValue(device)
  };

  var statusValue;
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

    <Event color="action"/>
        
    <Typography variant="h6" component="div" sx={{ ml: 2, flex: 1 }} >
        Syslog Server Setting
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
        <Stack spacing={3}>
         <SystemLogForm AddorEdit={AddorEdit}/>
          <SystemLogTable selectedDevice={selectedValue} statusValue={statusValue}/> 
        </Stack>
    </DialogContent>

    </Dialog>
  );
};

export default SyslogSettingDialog;