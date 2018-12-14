import React from "react";
import PropTypes from "prop-types";

import { Link } from "@reach/router";

import { Query } from "react-apollo";
import { GET_HEROES } from "./queries";

import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Icon from "@material-ui/core/Icon";

import HeroCard from "./HeroCard";

const styles = theme => ({
  header: {
    display: "flex",
    alignItems: "center"
  },
  icon: {
    margin: theme.spacing.unit * 2
  }
});

const Heroes = ({ classes }) => (
  <React.Fragment>
    <div className={classes.header}>
      <Typography variant="h6">Heroes</Typography>
      <Link to={`/heroes/new`}>
        <Icon className={classes.icon}>add_circle</Icon>
      </Link>
    </div>
    <Divider />
    <Query query={GET_HEROES}>
      {({ loading, error, data }) => {
        if (loading) return "Loading...";
        if (error) return `Error! ${error.message}`;

        return data.heroes.map(hero => <HeroCard key={hero.id} {...hero} />);
      }}
    </Query>
  </React.Fragment>
);

Heroes.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Heroes);
