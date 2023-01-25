import { Paper } from "@mui/material";
import React from "react";
import DeviceMUITable from "../../../common/DeviceEnhancedTable/DeviceMUITable";
import devicedata from "../../../../utils/data/deviceData.json";

const BackupNrestoreTable = ({selectedDevice, clicked, setSelectedDevice}) => {
  const statusValue = () => {
    switch (clicked) {
      case true:
        return "SUCCESS"
      default:
        return "WAITING";
    }
  };

  let resultArr = selectedDevice.map(i => devicedata[i])
  resultArr.forEach(object => {
    object.status = statusValue();
  });

  const column = [
    { key: "model", label: "Model" },
    { key: "macAddress", label: "MAC Address" },
    { key: "ipAddress", label: "IP Address" },
    { key: "status", label: "Status" },
  ];

  const handleDeviceSelect = (value) => {
    setSelectedDevice(value)
  };
  return (
    <Paper>
            <DeviceMUITable
              Columns={column}
              DataSource={resultArr}
              rowKey="id"
              title="Devices List"
              TotalRowCount={resultArr.length}
              currentPage={1}
              handleOnSelect={(value) => {
                handleDeviceSelect(value);
              }}
              options={{
                sortable: true,
                selectable: true,
                contextMenu: false,
              }}
              onContextMenuClick={(event, data, name) => {
                console.log("context menu clicked");
              }}
              toolbarOptions={{
                globalFilter: false,
              }}
            />
    </Paper>
  );
};

export default BackupNrestoreTable;