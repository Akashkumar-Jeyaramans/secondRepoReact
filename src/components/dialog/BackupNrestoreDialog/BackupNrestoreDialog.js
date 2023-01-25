import React from "react";
import {Grid, Stack} from "@mui/material";
import BackupNrestoreTable from "./DeviceList/BackupNrestoreTable";
import BackupNrestoreList from "./BackupNrestoreConfiguration/BackupNrestoreList";

const BackupNrestoreDialog = ({selectedValue, messages, setSelectedDevice, selectedDevice, clicked}) => {

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={8}>
        <Stack spacing={3}>
        <BackupNrestoreTable 
          selectedDevice={selectedValue} 
          clicked={clicked}  
          setSelectedDevice={setSelectedDevice}
        />
        </Stack>
        </Grid>

        <Grid item xs={4}>
        <BackupNrestoreList 
          selectedDevice={selectedDevice} 
          messages={messages} 
        />
        </Grid>
      </Grid>
    </div>
  );
};

export default BackupNrestoreDialog;