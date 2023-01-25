import { Grid, Stack} from "@mui/material";
import React from "react";
import Controls from "../../../common/form/controls/Controls";

const  BackupNrestore = ({setRestoreButton, setBackupButton, clicked}) => {

  const handleBackupClick = () => {
    setBackupButton(true)
    setRestoreButton(false)
  };
  
  const handleRestoreClick = () => {
    setBackupButton(false)
    setRestoreButton(true)
  };

  return (
    <div>
      <Grid container columnSpacing={2}>
        <Grid item sm={6}>
        {
            {
            false : 
            <Stack direction="row" spacing={2}>
            <Controls.Button type="submit" text="Backup" onClick={handleBackupClick}/>
            <Controls.Button type="submit" text="Restore" onClick={handleRestoreClick}/> 
            </Stack>,
            true: 
            <Stack direction="row" spacing={2}>
            <Controls.Button type="submit" text="Backup" disabled/> 
            <Controls.Button type="submit" text="Restore" disabled/>
            </Stack>
            }[clicked]
        }
        </Grid>
      </Grid>
    </div>
  );
};

export default BackupNrestore;
