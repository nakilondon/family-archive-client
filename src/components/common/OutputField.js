import React from "react";
import { Typography } from "@material-ui/core";

const OutputField = (label, data) => {
  return (
    <>
      <Typography className="title" color="textSecondary" gutterBottom>
        {label}
      </Typography>
      <Typography variant="h5" component="h2">
        {data}
      </Typography>
    </>
  );
};

export default OutputField;
