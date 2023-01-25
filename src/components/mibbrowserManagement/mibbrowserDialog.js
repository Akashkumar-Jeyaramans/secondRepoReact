import React from "react";
import {
    Grid,
    TextField,
    Select,
    MenuItem,
    Button,
    FormControl,
    InputLabel,
    Dialog, DialogContent, DialogTitle, Typography,
  } from "@mui/material";
import Controls from "../../components/common/form/controls/Controls";
import { Close } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";

  const useStyles = makeStyles((theme) => ({
    dialogWraper: {
      padding: theme.spacing(2),
      position: "absolute",
      top: theme.spacing(5),
    },
  }));
  
const MibbrowserDialog = ({address, setaddress, clickedMibDialog}) => {
    const [ setpopup] = React.useState(false)

    const handleClickOpen = () => {
        setpopup(true);
      };
    
      const handleClose = () => {
        setpopup(false);
      };

  return (
        <>
          {clickedMibDialog === 'false'? 
            <Dialog
            open={handleClickOpen}
            maxWidth="sm"
            fullWidth
            classes={{ paper: useStyles.dialogWraper }}
            >
            
            <DialogTitle>
            <div style={{ display: "flex", alignItems: "center" }}>
                
            <Typography variant="h6" component="div" sx={{ ml: 2, flex: 1 }} >
                Message
            </Typography>
                
            <Controls.ActionButtons
                color="secondary"
                onClick={handleClose}
            >
            <Close></Close>
            </Controls.ActionButtons>

            </div>
            </DialogTitle>

            <DialogContent dividers>
            Address is empty. Please input an IP addres or host name.
            </DialogContent>
            <Button onClick={handleClose}>OK</Button>
              
            </Dialog>
             : null}

        {clickedMibDialog === 'true'? 
             <Dialog
             open={handleClickOpen}
             maxWidth="sm"
             fullWidth
             classes={{ paper: useStyles.dialogWraper }}
             >
             
             <DialogTitle>
             <div style={{ display: "flex", alignItems: "center" }}>
 
                 
             <Typography variant="h6" component="div" sx={{ ml: 2, flex: 1 }} >
                 Advanced Properties of SNMP Agent
             </Typography>
                 
             <Controls.ActionButtons
                 color="secondary"
                 onClick={handleClose}
             >
             <Close></Close>
             </Controls.ActionButtons>
 
             </div>
             </DialogTitle>
 
             <DialogContent dividers>
             <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
             <Grid item xs={6}>
             <TextField
              label="Address"
              variant="outlined"
              value={address}
              onChange={(e) => setaddress(e.target.value)}
              size="small"
            />
            </Grid>

            <Grid item xs={6}>
             <TextField
              label="Port"
              variant="outlined"
              size="small"
            />
            </Grid>
            
            <Grid item xs={6}>
             <TextField
              label="Read Comunity"
              variant="outlined"
              size="small"
            />
            </Grid>

            <Grid item xs={6}>
             <TextField
              label="Write Comunity"
              variant="outlined"
              size="small"
            />
            </Grid>

            <Grid item xs={6}>
            <FormControl sx={{ minWidth:520 }} size="small">
            <InputLabel id="demo-select-small">SNMP Version</InputLabel>
            <Select
                labelId="demo-select-small"
                id="demo-select-small"
                label="SNMP Version"
            >
                <MenuItem value="">
                <em>None</em>
                </MenuItem>
                <MenuItem value={10}>1</MenuItem>
                <MenuItem value={20}>2</MenuItem>
                <MenuItem value={30}>3</MenuItem>
            </Select>
            </FormControl>
            </Grid>
            </Grid>
             </DialogContent>
             <Button onClick={handleClose}>OK</Button>
             </Dialog>:null}

             </>
  );
};

export default MibbrowserDialog;