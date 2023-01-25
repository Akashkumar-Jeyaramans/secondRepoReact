import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {Dialog, DialogContent, DialogTitle, Typography} from "@mui/material";
import { Close, Cached } from "@mui/icons-material";
import {
  closeEnableSNMPsettingDialog,
  enableSNMPsettingSelector,
} from "../../../features/EnableSNMPsetting";
import Controls from "../../common/form/controls/Controls";

const EnableSNMPDialog = ({Style}) => {

  const dispatch = useDispatch();
  const { visible } = useSelector(enableSNMPsettingSelector);

  const handleCancleClick = () => {
    dispatch(closeEnableSNMPsettingDialog());
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

    <Cached color="action"/>
        
    <Typography variant="h6" component="div" sx={{ ml: 2, flex: 1 }} >
        Enable SNMP
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

export default EnableSNMPDialog;