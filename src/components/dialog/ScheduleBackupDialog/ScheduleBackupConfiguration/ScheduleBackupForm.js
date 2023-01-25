import React from "react";
import { Form, useForm } from "../../../common/form/useForm";
import { Grid, Stack, TextField } from "@mui/material";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import Controls from "../../../common/form/controls/Controls";

const initialFValues = {
  id: "0",
  schedulename: "",
};

const none = [
  { id: "None", title: "None" },
  { id: "Daily", title: "Daily" },
  { id: "Weekly", title: "Weekly" },
];

const weekly = [
  { id: "Sunday", title: "Sunday" },
  { id: "Monday", title: "Monday" },
  { id: "Tuesday", title: "Tuesday" },
  { id: "Wednesday", title: "Wednesday" },
  { id: "Thursday", title: "Thursday" },
  { id: "Friday", title: "Friday" },
  { id: "Saturday", title: "Saturday" },
];

const ScheduleBackupForm = 
  ({  AddorEdit, 
      times, 
      setTimes, 
      setValuedate, 
      valuedate, 
      frequency, 
      setFrequency,
      deviceStatus
  }) => {
  const handleChange = (e) => {
    setFrequency(e.target.value);
  };

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("schedulename" in fieldValues)
      temp.schedulename = fieldValues.schedulename ? "" : "This field is required";

    seterrors({ ...temp });

    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  };

  const { values, errors, seterrors, handleInputChange, resetForm } =
    useForm(initialFValues, true, validate);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      AddorEdit(values, resetForm);
    }
  };

  const handleTime = (newValue) => {
    setTimes(newValue);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container columnSpacing={2}>
        <Grid item sm={6}>
          <Controls.Input
            required
            name="schedulename"
            label="Schedule Name"
            value={values.schedulename}
            onChange={handleInputChange}
            error={errors.schedulename}
          />
        </Grid>
        
        <Grid item sm={6}>
          <Controls.Select
            name="frequency"
            label="Frequency"
            value={frequency}
            onChange={handleChange}
            options={none}
            displayEmpty
          />
        </Grid>

        {frequency === 'None'? 
        <Grid item sm={6}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack spacing={3}>
            <DesktopDatePicker
              label="Schedule Date"
              value={valuedate}
              minDate={new Date('2017-01-01')}
              onChange={(newValue) => {
                setValuedate(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
          />
            </Stack>
          </LocalizationProvider>
        </Grid>
        : null }

        {frequency === 'Weekly'? 
        <Grid item sm={6}>
          <Controls.Select
            required
            name="weekdays"
            label="Week Day"
            value={values.weekdays}
            onChange={handleInputChange}
            error={errors.weekdays}
            options={weekly}
          />
        </Grid>
        : null }

        <Grid item sm={6}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Stack spacing={3}>
          <TimePicker
            label="Time"
            value={times}
            onChange={handleTime}
            renderInput={(params) => <TextField {...params} />}
          />
          </Stack>
        </LocalizationProvider>
        </Grid>

        <Grid item sm={6} pt={1}>
          <Stack direction="row" spacing={2}>
            {deviceStatus ==="" ?
            <Controls.Button type="submit" text="Create Schedule" />
            : <Controls.Button type="submit" text="Create Schedule" disabled/> }
            <Controls.Button
              color="secondary"
              varient="outlined"
              text="Cancel"
              onClick={resetForm}
            />
          </Stack>
        </Grid>
      </Grid>
    </Form>
  );
};

export default ScheduleBackupForm;