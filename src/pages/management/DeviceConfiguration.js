import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Grid, Paper } from "@mui/material";
import {
  Publish,
  Event,
  AcUnit,
  DeviceHub,
  Backup,
  SettingsBackupRestore,
  Schedule,
  Cached,
  RestorePage,
} from "@mui/icons-material";
import devicedata from "../../utils/data/deviceDataConfig.json";
import DeviceMUITable from "../../components/common/DeviceEnhancedTable/DeviceMUITable";
import EventTips from "../../components/eventTips/EventTips";
import { openSysylogServerDialog } from "../../features/SyslogServerSetting";
import { openTrapServerDialog } from "../../features/TrapServerSetting";
import { openFirmwareUploadSettingDialog } from "../../features/FirmwareUploadSetting";
import { openResetToDefaultSettingDialog } from "../../features/ResetToDefaultSetting";
import { openNetworkSettingDialog } from "../../features/NetworkSetting";
import { openBackupDeviceSettingDialog } from "../../features/BackupDeviceSetting";
import { openRestoreDeviceSettingDialog } from "../../features/RestoreDeviceSetting";
import { openScheduleBackupSettingDialog } from "../../features/ScheduleBackupSetting";
import { openEnableSNMPsettingDialog } from "../../features/EnableSNMPsetting";
import DialogPage from "../../components/dialog/Dialog";

const DeviceConfiguration = () => {
    const dispatch = useDispatch();
  const [selectedDevice, setSelectedDevice] = useState([]);
  const [selectedValue, setSelectedValue] = useState([]);
  const [selectableDevice, setSelectableDevice] = useState(false);
  const [configButtonClicked, setconfigButtonClicked] = useState("");
  const [ClickedValue, setClickedValue] = useState("");
  const column = [
    {
      key: "deviceType",
      label: "Device Type",
      disableSort: true,
    },
    {
      key: "model",
      label: "Model",
      disableSort: true,
    },
    {
      key: "ipAddress",
      label: "IP Address",
      disableSort: true,
    },
    {
      key: "macAddress",
      label: "MAC Address",
    },
    {
      key: "hostName",
      label: "Hostname",
    },
    {
      key: "kernel",
      label: "Kernel",
    },
    { key: "ap", label: "Firmware Ver" },
  ];

  const handleDeviceSelect = (value) => {
    setSelectedDevice(value);
    setSelectedValue(value)
  };

  const handleConfigButtonClicked = (value) => {
    setconfigButtonClicked(value);
    setClickedValue(value);
    setSelectableDevice(true);
  };

  const prepareData = () => {
    switch (configButtonClicked) {
      case "syslogSetting":
      case "trapSetting":
      case "Backup":
      case "Restore":
      case "resetToDefault":
        return devicedata.filter(
          (device) =>
            device.deviceType === "GWD/SNMP" || device.deviceType === "SNMP"
        );
      case "enableSnmp":
        return devicedata.filter((device) => device.deviceType === "GWD");
      case "":
        return [];

      default:
        return devicedata;
    }
  };

  const handleOkClick = () => {
    switch (configButtonClicked) {
      case "syslogSetting":
        return (
          setconfigButtonClicked(""),
          setSelectableDevice(false),
          setSelectedDevice([]),
          dispatch(openSysylogServerDialog())
          )
      
      case "trapSetting":
        return (
          setconfigButtonClicked(""),
          setSelectableDevice(false),
          setSelectedDevice([]),
          dispatch(openTrapServerDialog())
          )
      case "fwUpload":
        return (
          setconfigButtonClicked(""),
          setSelectableDevice(false),
          setSelectedDevice([]),
          dispatch(openFirmwareUploadSettingDialog())
          )
      case "networkSetting":
        return (
          setconfigButtonClicked(""),
          setSelectableDevice(false),
          setSelectedDevice([]),
          dispatch(openNetworkSettingDialog())
          )
      case "Backup":
        return (
          setconfigButtonClicked(""),
          setSelectableDevice(false),
          setSelectedDevice([]),
          dispatch(openBackupDeviceSettingDialog())
          )
      case "Restore":
        return (
          setconfigButtonClicked(""),
          setSelectableDevice(false),
          setSelectedDevice([]),
          dispatch(openRestoreDeviceSettingDialog())
          )
      case "resetToDefault":
        return (
          setconfigButtonClicked(""),
          setSelectableDevice(false),
          setSelectedDevice([]),
          dispatch(openResetToDefaultSettingDialog())
          )
      case "enableSnmp":
        return (
          setconfigButtonClicked(""),
          setSelectableDevice(false),
          setSelectedDevice([]),
          dispatch(openEnableSNMPsettingDialog())
          )
      default:
        return (
          setconfigButtonClicked(""),
          setSelectableDevice(false),
          setSelectedDevice([])
        )
    }
  };

  const handleCancelClick = () => {
    setconfigButtonClicked("");
    setSelectedDevice([]);
    setSelectableDevice(false);
  };

  const handleClickedSchedule = (value) => {
    setClickedValue(value);
  };

  const handleschedule = () => {
    setconfigButtonClicked("")
    setSelectableDevice(false)
    setSelectedDevice([])
    handleClickedSchedule("scheduleBackup")
    dispatch(openScheduleBackupSettingDialog())
  }

  return (
    <Paper sx={{ p: 2 }}>
      <EventTips
        selectedValue={selectedValue}
        selectedDevice={selectedDevice}
        configButtonClicked={configButtonClicked}
        handleCancelClick={handleCancelClick}
        handleOkClick={handleOkClick}
        ClickedValue={ClickedValue}
      />
      <DialogPage
      messages={ClickedValue}
      selectedDevice={selectedDevice}
      selectedValue={selectedValue}
      />

      <Grid container spacing={1}>
      <Grid container item spacing={3}>
        <Grid item xs={6} md={4}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            startIcon={<Publish />}
            onClick={() => handleConfigButtonClicked("fwUpload")}
          >
            Firmware Upload
          </Button>
        </Grid>
        <Grid item xs={6} md={4}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            startIcon={<Event />}
            onClick={() => handleConfigButtonClicked("syslogSetting")}
          >
            Syslog Server Settings
          </Button>
        </Grid>
        <Grid item xs={6} md={4}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            startIcon={<AcUnit />}
            onClick={() => handleConfigButtonClicked("trapSetting")}
          >
            Trap Server Settings
          </Button>
        </Grid>
        </Grid>

      <Grid container item spacing={3}>
        <Grid item xs={6} md={4}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            startIcon={<DeviceHub />}
            onClick={() => handleConfigButtonClicked("networkSetting")}
          >
            Network Settings
          </Button>
        </Grid>
         <Grid item xs={6} md={4}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            startIcon={<Backup />}
            onClick={() => handleConfigButtonClicked("Backup")}
          >
            Backup Device
          </Button>
        </Grid>
        <Grid item xs={6} md={4}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            startIcon={<RestorePage />}
            onClick={() => handleConfigButtonClicked("Restore")}
          >
            Restore Device
          </Button>
        </Grid>
        </Grid>

        <Grid container item spacing={3}>
        <Grid item xs={6} md={4}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            startIcon={<SettingsBackupRestore />}
            onClick={() => handleConfigButtonClicked("resetToDefault")}
          >
            Reset to default
          </Button>
        </Grid>
        <Grid item xs={6} md={4}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            startIcon={<Schedule />}
            onClick={handleschedule}
          >
            schedule backup
          </Button>
        </Grid>
        <Grid item xs={6} md={4}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            startIcon={<Cached />}
            onClick={() => handleConfigButtonClicked("enableSnmp")}
          >
            Enable SNMP
          </Button>
        </Grid>
      </Grid>
      </Grid>

      <Grid container>
        <Grid item xs={12} md={12} sx={{ pt: 2 }}>
          {prepareData().length > 0 && (
            <DeviceMUITable
              Columns={column}
              DataSource={prepareData()}
              rowKey="id"
              title="Select Device to Configure"
              TotalRowCount={prepareData().length}
              currentPage={1}
              handleOnSelect={(value) => {
                handleDeviceSelect(value);
              }}
              options={{
                sortable: true,
                selectable: selectableDevice,
                contextMenu: false,
              }}
              onContextMenuClick={(event, data, name) => {
                console.log("context menu clicked");
              }}
              toolbarOptions={{
                globalFilter: true,
              }}
            />
          )}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default DeviceConfiguration;