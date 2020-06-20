import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";
import PersonSelect from "../common/person-Search";

const PeopleList = ({ People, label, name, changePeople }) => {
  function removePeople(id) {
    const newList = People.filter((person) => person.id !== id);
    changePeople(name, newList);
  }

  const [addPerson, setAddPerson] = useState(null);
  const onSearchChange = (e, value) => {
    setAddPerson(value);
  };

  function addPersonToList() {
    const newList = People.concat(addPerson);
    changePeople(name, newList);
  }

  return (
    <Grid item container justify="flex-start" direction="column" spacing={1}>
      <Grid item>
        <Typography variant="caption" color="textSecondary">
          {label}
        </Typography>
      </Grid>

      {People.map((member) => (
        <Grid
          item
          container
          justify="space-between"
          direction="row"
          key={member.id}
        >
          <Grid item>
            <Typography variant="body1">{member.label}</Typography>
          </Grid>

          <Grid item xs={2}>
            <Button
              size="small"
              variant="contained"
              color="primary"
              onClick={() => removePeople(member.id)}
            >
              Remove
            </Button>
          </Grid>
        </Grid>
      ))}
      <Grid
        item
        container
        justify="space-between"
        direction="row"
        alignItems="center"
      >
        <Grid item>
          <PersonSelect onSearchChange={onSearchChange} />
        </Grid>
        <Grid item xs={2}>
          <Button
            size="small"
            variant="contained"
            onClick={() => addPersonToList()}
            disabled={addPerson === null ? true : false}
            color={addPerson === null ? "inherit" : "primary"}
          >
            Add
          </Button>
        </Grid>
      </Grid>
      <Grid item>
        <br />
      </Grid>
    </Grid>
  );
};

export default PeopleList;
