import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {Dialog, DialogContent, DialogTitle, Typography} from "@mui/material";
import { Close, DeviceHub } from "@mui/icons-material";
import {
  closeNetworkSettingDialog,
  networkSettingSelector,
} from "../../../features/NetworkSetting";
import Controls from "../../common/form/controls/Controls";

const NetworkSettingDialog = ({Style}) => {

  const dispatch = useDispatch();
  const { visible } = useSelector(networkSettingSelector);

  const handleCancleClick = () => {
    dispatch(closeNetworkSettingDialog());
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

    <DeviceHub color="action"/>
        
    <Typography variant="h6" component="div" sx={{ ml: 2, flex: 1 }} >
        Network Setting
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

export default NetworkSettingDialog;