import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import {Dialog, DialogContent, DialogTitle, Typography, Grid} from "@mui/material";
import { Close, Backup } from "@mui/icons-material";
import {
  closeBackupDeviceSettingDialog,
  backupDeviceSettingSelector,
} from "../../../features/BackupDeviceSetting";
import Controls from "../../common/form/controls/Controls";
import BackupNrestoreDialog from "../BackupNrestoreDialog/BackupNrestoreDialog";

const BackupDeviceDialog = ({selectedValue, Style, messages}) => {

  const [clicked, setClicked] = React.useState(false)
  const [selectedDevice, setSelectedDevice] = useState([]);

  const dispatch = useDispatch();
  const { visible } = useSelector(backupDeviceSettingSelector);

  const handleCancleClick = () => {
    dispatch(closeBackupDeviceSettingDialog());
    setClicked(false)
    setSelectedDevice([])
  };

  return (
    <Dialog
      open={visible}
      maxWidth="xl"
      fullWidth
      classes={{ paper: Style.dialogWraper }}
    >
      
    <DialogTitle>
    <div style={{ display: "flex", alignItems: "center" }}>

    <Backup color="action"/>
        
    <Typography variant="h6" component="div" sx={{ ml: 2, flex: 1 }} >
        Backup Device
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
      <BackupNrestoreDialog 
        selectedValue={selectedValue} 
        messages={messages} 
        setSelectedDevice={setSelectedDevice} 
        selectedDevice={selectedDevice} 
        clicked={clicked} 
      />

      <Grid item pt={2} display="flex" justifyContent="end">
      <Controls.Button type="submit" text="Start" onClick={() => setClicked(isClicked => !isClicked)}/>
      </Grid>
    </DialogContent>

    </Dialog>
  );
};

export default BackupDeviceDialog;