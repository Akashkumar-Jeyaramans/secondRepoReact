import React from "react";
import {
    TextField,
    Select,
    MenuItem,
    Button,
    FormControl,
    InputLabel,
  } from "@mui/material";
  
const MibbrowserForm = ({handleAdvanced, setaddress, address, Oid}) => {

  return (
        <>
            <TextField
              label="Address"
              variant="outlined"
              value={address}
              onChange={(e) => setaddress(e.target.value)}
              size="small"
            />
            <Button variant="text" onClick={handleAdvanced}>Advanced ...</Button>
            <TextField
              label="OID"
              variant="outlined"
              size="small"
              value={Oid}
            />
            <FormControl sx={{ m: 1, minWidth: 130 }} size="small">
            <InputLabel id="demo-select-small">Operations</InputLabel>
            <Select
                labelId="demo-select-small"
                id="demo-select-small"
                label="Operations"
            >
                <MenuItem value="">
                <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Get</MenuItem>
                <MenuItem value={20}>Set</MenuItem>
                <MenuItem value={30}>Walk</MenuItem>
            </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 130 }} size="small">
            <Button variant="contained">Go</Button>
            </FormControl>
        </>
  );
};

export default MibbrowserForm;