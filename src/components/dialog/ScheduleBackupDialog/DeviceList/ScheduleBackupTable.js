import { Paper } from "@mui/material";
import React from "react";
import DeviceMUITable from "../../../common/DeviceEnhancedTable/DeviceMUITable";

const ScheduleBackupTable = ({getScheduleValue, setSelectedDevice}) => {

    const column = [
        { key: "model", label: "Model" },
        { key: "mac", label: "MAC Address"},
        { key: "ip", label: "IP Address"},
        { key: "status", label: "Status"}
  ];

  const handleDeviceSelect = (value) => {
    setSelectedDevice(value)
  };

  return (
    <Paper>
    <DeviceMUITable
              Columns={column}
              DataSource={getScheduleValue}
              rowKey="id"
              title="Devices List"
              TotalRowCount={getScheduleValue.length}
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

export default ScheduleBackupTable;
