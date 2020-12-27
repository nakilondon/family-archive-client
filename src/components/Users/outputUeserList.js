import React from "react";
import Spinner from "../common/Spinner";
import { Grid } from "@material-ui/core";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function OutputUserList({
  userList,
  setAdmin,
  setEdit,
  setVerified,
  removeUser,
  saveUser,
}) {
  const classes = useStyles();
  const content =
    userList?.length > 0 ? (
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell>Email</StyledTableCell>
            <StyledTableCell>UID</StyledTableCell>
            <StyledTableCell>Roles</StyledTableCell>
            <StyledTableCell>Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userList
            .sort((a, b) => (a.email > b.email ? 1 : -1))
            .map((user, idx) => (
              <StyledTableRow key={user.uid}>
                <StyledTableCell component="th" scope="row">
                  {user.displayName}
                </StyledTableCell>
                <StyledTableCell>{user.email}</StyledTableCell>
                <StyledTableCell>{user.uid}</StyledTableCell>
                <StyledTableCell>
                  <FormControlLabel
                    control={<Switch size="small" checked={user.verified} />}
                    label="Verified"
                    onClick={() => {
                      setVerified(idx);
                    }}
                  />
                  <br />
                  <FormControlLabel
                    control={<Switch size="small" checked={user.edit} />}
                    label="Edit"
                    onClick={() => {
                      setEdit(idx);
                    }}
                  />
                  <br />
                  <FormControlLabel
                    control={<Switch size="small" checked={user.admin} />}
                    label="Admin"
                    onClick={() => {
                      setAdmin(idx);
                    }}
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <Grid item xs={1} container direction="column" spacing={1}>
                    <Grid item container justify="flex-start">
                      <Button
                        size="small"
                        variant="contained"
                        color="primary"
                        disabled={!user.update}
                        onClick={() => saveUser(user, idx)}
                      >
                        Update
                      </Button>
                    </Grid>
                    <Grid item container justify="flex-start">
                      <Button
                        size="small"
                        variant="contained"
                        color="primary"
                        onClick={() => removeUser(user.uid)}
                      >
                        Delete
                      </Button>
                    </Grid>
                  </Grid>
                </StyledTableCell>
              </StyledTableRow>
            ))}
        </TableBody>
      </Table>
    ) : (
      <Spinner />
    );

  return (
    <Grid container align="center">
      {content}
    </Grid>
  );
}
