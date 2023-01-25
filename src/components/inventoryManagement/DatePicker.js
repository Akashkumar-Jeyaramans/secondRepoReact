import React from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ForwardIcon from '@mui/icons-material/Forward';
import { FormControl, InputLabel, Select, MenuItem, Box, Stack, TextField } from "@mui/material";

export const DatePickers=(props)=>{
    const {modVal,setOpenPopup,setInputDate,setDeviceMode,setStartDate,setEndDate,Columns,initiateValue}=props
    const[startVal,setStartVal] =React.useState(new Date());
    const [endVal,setEndVal] = React.useState(new Date())
    const [open, setOpen] = React.useState(false);

    function handleChange(event) {
        setDeviceMode(event.target.value)
      }
    const handleDateChange=(newValue)=>{
      setInputDate(newValue.toLocaleDateString())    
         setOpenPopup(false)
    }
   
   
   const values= Columns.filter((col)=>{
        return col.type === "timeStamp" ? (col):null
    })
 
  return (
  <>
    <FormControl sx={{marginBottom:2, width:200}}>
      <InputLabel htmlFor="agent-simple">Events</InputLabel>
      <Select
        defaultValue={initiateValue}
        onChange={handleChange}
        inputProps={{
          name: "Events",
          id: "events-simple",
        }}
      >
      {values.map((value, index)=>{
          return (
            <MenuItem key={index} value={value.key}>
              {value.timeLable}
            </MenuItem>
          );
      })}
      </Select>
    </FormControl>
    <br/>
    {modVal==="DatePicker"? (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack spacing={3}>
        <DesktopDatePicker
          sx={{width:300}}
          label="For desktop"
          minDate={new Date('2017-01-01')}
          onChange={(newValue) => handleDateChange(newValue) 
          }
          renderInput={(params) => <TextField {...params} />}
        />
      </Stack>
    </LocalizationProvider>
      ):(
    <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          sx={{display:'inline'}}
          label="start "
          value={startVal}
          onChange={(newValue) => {
             setStartVal(newValue);
            setStartDate(newValue.toLocaleDateString())
          }}
          renderInput={(startProps) => <TextField {...startProps} />}
          onClose={(e) => setOpen(true)}
        />
        <Box sx={{ mx: 2,display:'inline',  }}> <ForwardIcon sx={{width:'1cm',height:'1.5cm'}}/> </Box>
        <DatePicker
          sx={{display:'inline'}}
          open={open}
          label="end"
          value={endVal}
          minDate={startVal}
          onChange={(newVal1) => {
             setEndVal(newVal1);
            setEndDate(newVal1.toLocaleDateString())
          }}
          renderInput={(endProps) => (
            <React.Fragment>
              <TextField {...endProps} />
            </React.Fragment>
          )}
          onClose={(e) => setOpen(false)}
        />
    </LocalizationProvider>
        )}
</>
  )
}
