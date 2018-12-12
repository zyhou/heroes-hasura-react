import React from "react";
import PropTypes from "prop-types";

import { Switch, Redirect, Route, Link } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import Heroes from "./components/Heroes";
import Villains from "./components/Villains";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  mainGrid: {
    marginTop: theme.spacing.unit * 3
  },
  navBar: {
    marginLeft: theme.spacing.unit * 3
  },
  menuItem: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main
    }
  }
});

const App = ({ classes }) => (
  <div classes={classes.root}>
    <CssBaseline />
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" color="inherit">
          Tour of Heroes
        </Typography>
      </Toolbar>
    </AppBar>
    <Grid container spacing={16} className={classes.mainGrid}>
      <Grid item xs={3} className={classes.navBar}>
        <Typography variant="subtitle1" color="inherit">
          Menu
        </Typography>
        <MenuList>
          <MenuItem className={classes.menuItem}>
            <Link to="/heroes/">Heroes</Link>
          </MenuItem>
          <MenuItem className={classes.menuItem}>
            <Link to="/villains/">Villains</Link>
          </MenuItem>
          <MenuItem className={classes.menuItem}>
            <Link to="/about/">About</Link>
          </MenuItem>
        </MenuList>
      </Grid>
      <Grid item xs={8} className={classes.navBar}>
        <Switch>
          <Redirect from="/" exact to="/heroes" />
          <Route path="/heroes" component={Heroes} />
          <Route path="/villains" component={Villains} />
        </Switch>
      </Grid>
    </Grid>
  </div>
);

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(App);
