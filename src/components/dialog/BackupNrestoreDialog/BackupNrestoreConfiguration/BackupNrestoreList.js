import { List, ListItem, ListItemText, Typography, ListItemIcon, Checkbox } from "@mui/material";
import React from "react";
import binary from "../../../../utils/data/binary.json"

const  BackupNrestoreList = ({messages, selectedDevice}) => {
let resultArr = selectedDevice.map(i => binary[i].binary)

  return (
        <div>
        <Typography variant="h6" component="div">
          Files
        </Typography>
        <List>
          {resultArr.map((value) => {
            return ( 
            <ListItem button key={resultArr}>
               { messages === "Restore" ?
            <ListItemIcon>
                <Checkbox  defaultChecked />
            </ListItemIcon>
                : null}
            <ListItemText primary={`${value}`} />
            </ListItem>
            );
          })}
        </List>
        </div>
  );
};

export default BackupNrestoreList;
