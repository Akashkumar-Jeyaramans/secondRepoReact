import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {Dialog, DialogContent, DialogTitle, Typography} from "@mui/material";
import { Close, Publish } from "@mui/icons-material";
import {
  closeFirmwareUploadSettingDialog,
  firmwareUploadSettingSelector,
} from "../../../features/FirmwareUploadSetting";
import Controls from "../../common/form/controls/Controls";

const FirmwareSettingDialog = ({Style}) => {

  const dispatch = useDispatch();
  const { visible } = useSelector(firmwareUploadSettingSelector);

  const handleCancleClick = () => {
    dispatch(closeFirmwareUploadSettingDialog());
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

    <Publish color="action"/>
        
    <Typography variant="h6" component="div" sx={{ ml: 2, flex: 1 }} >
        Firmware Upload
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
       in process
    </DialogContent>

    </Dialog>
  );
};

export default FirmwareSettingDialog;