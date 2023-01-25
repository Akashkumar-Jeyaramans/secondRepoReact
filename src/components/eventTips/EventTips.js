import { Alert, AlertTitle, Button } from "@mui/material";
import React from "react";

const TIPS = "(This feature only for device with SNMP support.)";
const messages = {
  fwUpload: "Firmware Upload",
  networkSetting: "Network Setting",
  resetToDefault: "Reset To Default",
  Backup: "Backup Device",
  Restore: "Restore Device",
  syslogSetting: "Syslog Server Setting",
  trapSetting: "Trap Server Setting",
  scheduleBackup: "Schedule Backup",
  enableSnmp: "Enable SNMP",
};

const EventTips = ({
  selectedDevice,
  configButtonClicked,
  handleOkClick,
  handleCancelClick,
}) => {

  const prepareData = () => {
    
    switch (configButtonClicked) {
      case "syslogSetting":
      case "trapSetting":
      case "Backup":
      case "Restore":
      case "resetToDefault":
        return (
          TIPS
        );
      default:
        return "";
    }
  };

  return (
    <Alert
      severity="info"
      className={configButtonClicked === "" ? "alert hide" : "alert"}
    >
      <AlertTitle>{messages[configButtonClicked]}</AlertTitle>
      <div>
        <div>
          Select devices and press
          <Button
            variant="text"
            size="medium"
            sx={{ minWidth: 5 }}
            disabled={selectedDevice.length === 0}
            onClick={handleOkClick}
          >
            ok
          </Button>
          or
          <Button variant="text" size="medium" onClick={handleCancelClick}>
            cancel
          </Button>
          .
        </div>
        <div style={{ color: "red" }}>{prepareData()}</div>
      </div>
    </Alert>
  );
};

export default EventTips;