import React from "react";
import logo from "./logo.png";
import { Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import SelectPerson from "./person-select";
import ViewSelect from "./view-select";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Menu from "@material-ui/core/Menu";
import { getFirebase } from "react-redux-firebase";
import { ViewMode } from "../../redux/actions/actionTypes";
import { connect } from "react-redux";
import { setViewMode } from "../../redux/actions/viewActions";

function Header(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const firebase = getFirebase();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event, index, value) => {
    setAnchorEl(null);
  };

  function handleProfile() {
    setAnchorEl(null);
    props.setViewMode(ViewMode.SHOW_PROFILE);
  }

  return (
    <AppBar position="sticky" color="inherit">
      <Toolbar>
        <Grid
          container
          spacing={2}
          direction="row"
          justify="flex-start"
          alignItems="center"
        >
          <Grid item>
            <Grid
              container
              spacing={1}
              direction="row"
              justify="space-between"
              alignItems="center"
            >
              <Grid item>
                <img src={logo} height="40" className="logo" alt="logo" />
              </Grid>
              <Grid item>
                <Typography variant="h4">{props.subtitle}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <SelectPerson />
          </Grid>
          <Grid item>
            <ViewSelect />
          </Grid>
          <Grid item>
            {firebase.auth && (
              <div>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={open}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleProfile}>Profile</MenuItem>
                  <MenuItem onClick={() => firebase.logout()}>Logout</MenuItem>
                </Menu>
              </div>
            )}
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

const mapDispatchToProps = {
  setViewMode,
};

export default connect(null, mapDispatchToProps)(Header);
