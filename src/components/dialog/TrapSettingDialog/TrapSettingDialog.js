import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  Stack,
} from "@mui/material";
import { Close, AcUnit } from "@mui/icons-material";
import {
  closeTrapServerDialog,
  trapServerSettingSelector,
} from "../../../features/TrapServerSetting";
import Controls from "../../common/form/controls/Controls";
import TrapServerForm from "./TrapConfiguration/TrapServerForm";
import TrapServerTable from "./DeviceList/TrapServerTable";


const TrapSettingDialog = ({selectedValue, Style}) => {
  
  const dispatch = useDispatch();
  const { visible } = useSelector(trapServerSettingSelector);

  const handleCancleClick = () => {
    dispatch(closeTrapServerDialog());
  };

  const [deviceStatus, setdeviceStatus] = useState("")
  const [setdeviceValue] = useState("")

  const AddorEdit = (device, resetForm) => {
    if (device.id === "0") console.log("Insert Record", device);
    else console.log("update Record", device);
    resetForm();
    setdeviceStatus(device);
    setdeviceValue(device);
  };

  var statusValue;
  if (deviceStatus === "" && visible === true) {
    statusValue = "WAITING";
  } else if (deviceStatus !== "" && visible === false) {
    statusValue = "WAITING";
    setdeviceStatus("");
  } else {
    statusValue = "SUCCESS";
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
          <AcUnit color="action" />

          <Typography variant="h6" component="div" sx={{ ml: 2, flex: 1 }}>
            Trap Server Setting
          </Typography>

          <Controls.ActionButtons color="secondary" onClick={handleCancleClick}>
            <Close></Close>
          </Controls.ActionButtons>
        </div>
      </DialogTitle>

      <DialogContent dividers>
        <Stack spacing={3}>
          <TrapServerForm AddorEdit={AddorEdit} />
          <TrapServerTable
            selectedDevice={selectedValue}
            statusValue={statusValue}
          />
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default TrapSettingDialog;
