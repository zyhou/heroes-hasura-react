import React from "react";
import PropTypes from "prop-types";

import gql from "graphql-tag";
import { Query } from "react-apollo";

import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const GET_HERO = gql`
  query heroes($id: uuid!) {
    heroes(where: { id: { _eq: $id } }) {
      name
      description
    }
  }
`;

const styles = {
  card: {
    minWidth: 275,
    marginBottom: 10
  },
  title: {
    fontSize: 14
  }
};

const HeroDetail = ({ classes, id }) => (
  <Query query={GET_HERO} variables={{ id }}>
    {({ loading, error, data }) => {
      if (loading) return "Loading...";
      if (error) return `Error! ${error.message}`;

      const hero = { ...data.heroes[0], id };

      return (
        <Card className={classes.card}>
          <CardContent>
            <Typography className={classes.title}>{hero.name}</Typography>
            <Typography color="textSecondary">{hero.description}</Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Cancel</Button>
            <Button size="small">Save</Button>
          </CardActions>
        </Card>
      );
    }}
  </Query>
);

HeroDetail.propTypes = {
  classes: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired
};

export default withStyles(styles)(HeroDetail);
