import React from "react";
import PropTypes from "prop-types";

import { Link } from "@reach/router";

import gql from "graphql-tag";
import { Query } from "react-apollo";

import { withStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";

const GET_HERO = gql`
  query heroes($id: uuid!) {
    heroes(where: { id: { _eq: $id } }) {
      name
      description
    }
  }
`;

const styles = theme => ({
  header: {
    backgroundColor: theme.palette.primary.main
  },
  title: {
    color: theme.palette.secondary.main
  }
});

const HeroDetail = ({ classes, id }) => (
  <Query query={GET_HERO} variables={{ id }}>
    {({ loading, error, data }) => {
      if (loading) return "Loading...";
      if (error) return `Error! ${error.message}`;

      const hero = { ...data.heroes[0], id };

      return (
        <Card>
          <CardHeader
            classes={{ root: classes.header, title: classes.title }}
            title={hero.name}
          />
          <CardContent>
            <form>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="name">Name</InputLabel>
                <Input id="name" name="name" defaultValue={hero.name} />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="description">Description</InputLabel>
                <Input
                  name="description"
                  id="description"
                  defaultValue={hero.description}
                />
              </FormControl>
            </form>
          </CardContent>
          <CardActions>
            <Button size="small">
              <Link to="/heroes">Cancel</Link>
            </Button>
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
