import React from "react";
import {Stack, Dialog, DialogContent, DialogTitle, Typography, Grid, Button} from "@mui/material";
import Controls from "../../../common/form/controls/Controls";
import { Close, Schedule } from "@mui/icons-material";

const SchedulePopupTransfer = 
    ({
        openPopup, 
        setopenPopup, 
        Style, 
        rightChecked,
        tabRightTransfer,
        handleCheckedRight,
        leftChecked,
        tabLeftTransfer,
        handleCheckedLeft,
        handleButton,
        customList,
        schedulename,
    }) => {

  return (
        <div>
        <Dialog
        open={openPopup}
        maxWidth="xl"
        fullWidth
        classes={{ paper: Style.dialogWraper }}
        >
        
        <DialogTitle>
        <div style={{ display: "flex", alignItems: "center" }}>
        <Schedule color="action"/>
        
        <Typography variant="h6" component="div" sx={{ ml: 2, flex: 1 }} >
           {schedulename+" - Edit Schedule Member"}
        </Typography>
          
        <Controls.ActionButtons
            color="secondary"
            onClick={() => setopenPopup(false)}
        >
        <Close></Close>
        </Controls.ActionButtons>
        </div>
        </DialogTitle>

        <DialogContent dividers>
        <Stack spacing={2}>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item xs={5}>{customList('Non Member', tabLeftTransfer)}</Grid>
        <Grid item>
        <Grid container direction="column" alignItems="center">
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected right"
          >
            &gt;
            Add Member
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label="move selected left"
          >
            &lt;
            Remove Member
          </Button>
        </Grid>
        </Grid>
        <Grid item xs={5}>{customList('Member', tabRightTransfer)}</Grid>
        </Grid>

        <Grid pt={1}  display="flex" justifyContent="end">
            <Controls.Button
              color="primary"
              varient="outlined"
              text="Apply"
              onClick={handleButton}
              disabled={tabRightTransfer.length === 0}
            />
        </Grid>
        </Stack>
        </DialogContent>
        </Dialog>
        </div>
  );
};

export default SchedulePopupTransfer;