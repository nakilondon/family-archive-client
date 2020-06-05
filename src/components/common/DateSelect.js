import React from "react";
import Grid from "@material-ui/core/Grid";
import { TextField, Typography } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import Box from "@material-ui/core/Box";

const months = [
  { key: 0, label: "Unkown" },
  { key: 1, label: "January" },
  { key: 2, label: "Febuary" },
  { key: 3, label: "March" },
  { key: 4, label: "April" },
  { key: 5, label: "May" },
  { key: 6, label: "June" },
  { key: 7, label: "July" },
  { key: 8, label: "August" },
  { key: 9, label: "September" },
  { key: 10, label: "October" },
  { key: 11, label: "November" },
  { key: 12, label: "December" },
];

function SelectDate({ dateValue, id, onChange, label }) {
  function handleDateChange(field, value) {
    let newValue = field === "month" ? value.key : value;
    if (isNaN(newValue) || newValue === null || newValue === "") return;

    if (newValue !== null) {
      newValue = parseInt(newValue, 10);
      const fieldData = { [field]: newValue };
      const newDate = { ...dateValue, ...fieldData };
      onChange(id, newDate);
    }
  }

  return (
    <>
      <Grid item container justify="flex-start">
        <Typography variant="subtitle2" color="textSecondary">
          {label}
        </Typography>
      </Grid>
      <Grid
        item
        container
        align="row"
        justify="space-between"
        alignItems="baseline"
      >
        <Grid item>
          <TextField
            name="year"
            type="number"
            label="Year"
            defaultValue={dateValue.year}
            onChange={(e) => handleDateChange("year", e.target.value)}
            style={{ width: 100 }}
          />
        </Grid>
        <Grid item>
          <Box visibility={dateValue.year === 0 ? "hidden" : "visible"}>
            <TextField
              style={{ width: 100 }}
              name="month"
              select
              label="Month"
              defaultValue={dateValue.month}
              onChange={(e, newValue) => handleDateChange("month", newValue)}
            >
              {months.map((month) => (
                <MenuItem value={month.key} key={month.key}>
                  {month.label}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        </Grid>

        <Grid item>
          <Box visibility={dateValue.month === 0 ? "hidden" : "visible"}>
            <TextField
              name="day"
              type="number"
              label="Day"
              style={{ width: 100 }}
              defaultValue={dateValue.day}
              onChange={(e) => handleDateChange("day", e.target.value)}
            />
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default SelectDate;
