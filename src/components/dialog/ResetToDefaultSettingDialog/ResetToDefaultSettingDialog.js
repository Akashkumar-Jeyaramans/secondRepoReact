import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {Dialog, DialogContent, DialogTitle, Typography, Grid} from "@mui/material";
import { Close, SettingsBackupRestore } from "@mui/icons-material";
import {
  closeResetToDefaultSettingDialog,
  resetToDefaultSettingSelector,
} from "../../../features/ResetToDefaultSetting";
import Controls from "../../common/form/controls/Controls";
import ResetToDefaultTable from "./DeviceList/ResetToDefaultTable";

const ResetToDefaultSettingDialog = ({selectedValue, Style}) => {

  const dispatch = useDispatch();
  const { visible } = useSelector(resetToDefaultSettingSelector);

  const handleCancleClick = () => {
    dispatch(closeResetToDefaultSettingDialog());
  };

  const [clicked, setClicked] = React.useState(false)

  var statusValue;
  if(visible===true && clicked === false){
    statusValue="WAITING"
  }
  else if(visible === false && clicked === true){
    statusValue="WAITING"
    setClicked(false)
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

    <SettingsBackupRestore color="action"/>
        
    <Typography variant="h6" component="div" sx={{ ml: 2, flex: 1 }} >
        Reset To Default
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
      <ResetToDefaultTable selectedDevice={selectedValue}  statusValue={statusValue}/>
    
      <Grid item pt={2} display="flex" justifyContent="end">
      <Controls.Button type="submit" text="Start" onClick={() => setClicked(isClicked => !isClicked)}/>
      </Grid>
    </DialogContent>
    </Dialog>
  );
};

export default ResetToDefaultSettingDialog;