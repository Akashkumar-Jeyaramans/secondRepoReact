import React from "react";
import SyslogSettingDialog from "./SyslogSettingDialog/SyslogSettingDialog";
import TrapSettingDialog from "./TrapSettingDialog/TrapSettingDialog";
import FirmwareSettingDialog from "./FirmwareSettingDialog/FirmwareSettingDialog";
import ResetToDefaultSettingDialog from "./ResetToDefaultSettingDialog/ResetToDefaultSettingDialog";
import NetworkSettingDialog from "./NetworkSettingDialog/NetworkSettingDialog";
import ScheduleBackupDialog from "./ScheduleBackupDialog/ScheduleBackupDialog";
import EnableSNMPDialog from "./EnableSNMPDialog/EnableSNMPDialog";
import BackupDeviceDialog from "./BackupDeviceDialog/BackupDeviceDialog";
import RestoreDeviceDialog from "./RestoreDeviceDialog/RestoreDeviceDialog";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  dialogWraper: {
    padding: theme.spacing(0),
    position: "absolute",
    top: theme.spacing(5),
  },
}));

const DialogPage = ({messages, selectedValue}) => {

  const Style = useStyles();
  
  return (
    <div>
     {
        {
          syslogSetting: <SyslogSettingDialog selectedValue={selectedValue} Style={Style}/>,
          trapSetting: <TrapSettingDialog selectedValue={selectedValue} Style={Style}/>,
          fwUpload: <FirmwareSettingDialog selectedValue={selectedValue} Style={Style}/>,
          Backup: <BackupDeviceDialog selectedValue={selectedValue} Style={Style} messages={messages}/>,
          Restore: <RestoreDeviceDialog selectedValue={selectedValue} Style={Style} messages={messages}/>,
          resetToDefault: <ResetToDefaultSettingDialog selectedValue={selectedValue} Style={Style}/>,
          networkSetting: <NetworkSettingDialog selectedValue={selectedValue} Style={Style}/>,
          scheduleBackup: <ScheduleBackupDialog selectedValue={selectedValue} Style={Style}/>,
          enableSnmp: <EnableSNMPDialog selectedValue={selectedValue} Style={Style}/>, 
        }[messages]
      }
    </div>
  );
};

export default DialogPage;