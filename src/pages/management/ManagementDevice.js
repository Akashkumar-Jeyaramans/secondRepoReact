import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DeviceMUITable from "../../components/common/DeviceEnhancedTable/DeviceMUITable";
import { openAdvancedSettingDrawer } from "../../features/DeviceAdvancedSetting";
import {
  GetInventoryDeviceData,
  inventoryDeviceDataSelector,
} from "../../features/DeviceInventorySlice";
import {
  locateDeviceSelector,
  RequestLocateDevice,
  clearData,
} from "../../features/SingleDeviceConfiguration/LocateDeviceSlice";
import { openNetworkSettingDrawer } from "../../features/SingleNetworkSetting";
import devicedata from "../../utils/data/deviceData.json";
import { useConfirm } from "material-ui-confirm";
import { Stack, Typography } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useSnackbar } from "notistack";

const ManagementDevice = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { resLocateState, errorLocate } = useSelector(locateDeviceSelector);
  const confirm = useConfirm();
  const { inventoryDeviceData } = useSelector(inventoryDeviceDataSelector);
  useEffect(() => {
    dispatch(GetInventoryDeviceData());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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

  const handleContextMenuClicked = (event, data, name) => {
    const { ipAddress, macAddress } = data;
    switch (name) {
      case "openWeb":
        window.open(`http://${ipAddress}`, "_blank");
        break;
      case "beep":
        confirm({
          dialogProps: { maxWidth: "xs" },
          content: (
            <Stack spacing={2} alignItems="center">
              <ErrorOutlineIcon sx={{ fontSize: "7rem" }} color="warning" />
              <Typography variant="h5" gutterBottom component="div">
                Confirm
              </Typography>
              <Typography variant="subtitle2" gutterBottom component="div">
                This will let device beep.
              </Typography>
            </Stack>
          ),
        })
          .then(() => {
            dispatch(RequestLocateDevice({ macAddress, ipAddress }));
          })
          .catch(() => {
            console.log("no clicked !");
          });

        break;
      case "networkSetting":
        dispatch(openNetworkSettingDrawer());
        break;
      case "deviceAdvancedSetting":
        dispatch(openAdvancedSettingDrawer());
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (resLocateState && resLocateState !== "running") {
      if (resLocateState === "success") {
        enqueueSnackbar("successfully beeped device", {
          variant: "success",
        });
        dispatch(clearData());
      } else {
        enqueueSnackbar(errorLocate, {
          variant: "error",
        });
        dispatch(clearData());
      }
    }
  }, [resLocateState]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <DeviceMUITable
      Columns={column}
      DataSource={inventoryDeviceData}
      rowKey="id"
      title="Device management"
      TotalRowCount={devicedata.length}
      currentPage={1}
      handleOnSelect={(value) => console.log(value)}
      options={{ sortable: true, selectable: false, contextMenu: true }}
      onContextMenuClick={(event, data, name) => {
        handleContextMenuClicked(event, data, name);
      }}
      toolbarOptions={{
        globalFilter: true,
      }}
    />
  );
};

export default ManagementDevice;
