import React,{useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import MUITable from "../../components/common/EnhancedTable/MUITable";
import {inventoryDataMapping} from "../../utils/dataMapping"
import {
  inventoryDeviceSelector,
  GetData,
} from "../../features/InventoryDeviceSlice";
// import inventoryData1 from "../../utils/data/inventoryData1.json"

const column = [
  {  key: "deviceType", label: "Device Type", },
  {  key: "model", label: "Model", },
  {  key: "ipAddress", label: "IP Address",  },
  {  key: "macAddress", label: "MAC Address",  },
  {  key: "kernel",label:"Kernel",},
  {  key: "hostName", label: "Host Name",},
  {  key:"ap",label:"Ap",},
  // {  key:"firmwareVer",label:"Firmware Ver"},
  {  key:"createdAt",label:"Created At",type:"timeStamp",timeLable:"New Device" },
  {  key:"lastSeen",label:"Last Seen",type:"timeStamp",timeLable:"Available Device" },
  {  key:"lastMissing",label:"Last Missinng",type:"timeStamp",timeLable:"Missing Device"  },
  {  key:"lastRecovered",label:"Last Recovered",type:"timeStamp",timeLable:"Recovered Device"  },
 
];

export const InventoryDevice = () => {
 const dispatch = useDispatch();
 const  inventoryData  = useSelector(
    inventoryDeviceSelector
  );
 const newData=inventoryDataMapping( inventoryData)
 useEffect(() => {
  dispatch(GetData());
 },[dispatch]); // eslint-disable-line react-hooks/exhaustive-deps

 return (
   <>
    <MUITable 
    DataSource={newData}
    Columns={column}
    rowKey="id"
    title={`Inventory Management`}
    TotalRowCount={newData.length}
    currentPage={1}
    options={{ sortable: true, selectable: false, filtrable: true }}
    toolbarOptions={{
        exportData: true,
        dateSort:true,
        globalFilter: true,
        columnHindingEnable:true,
        tableRefresh:true,
    }}
    />
   </>
  )
}