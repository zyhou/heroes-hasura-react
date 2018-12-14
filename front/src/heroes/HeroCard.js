import React from "react";
import PropTypes from "prop-types";

import { Link } from "@reach/router";

import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { GET_HEROES } from "./Heroes";

import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const DELETE_HEROES = gql`
  mutation Delete_heroes($id: uuid!) {
    delete_heroes(where: { id: { _eq: $id } }) {
      returning {
        id
      }
    }
  }
`;

const updateCache = (cache, { data: { delete_heroes } }) => {
  const { heroes } = cache.readQuery({ query: GET_HEROES });
  const deleteHero = delete_heroes.returning[0];
  if (deleteHero) {
    cache.writeQuery({
      query: GET_HEROES,
      data: {
        heroes: heroes.filter(hero => hero.id !== deleteHero.id)
      }
    });
  }
};

const styles = {
  card: {
    minWidth: 275,
    marginBottom: 10
  },
  title: {
    fontSize: 14
  }
};

const HeroCard = ({ classes, id, name, description }) => (
  <Card className={classes.card}>
    <CardContent>
      <Typography className={classes.title}>{name}</Typography>
      <Typography color="textSecondary">{description}</Typography>
    </CardContent>
    <CardActions>
      <Mutation key={id} mutation={DELETE_HEROES} update={updateCache}>
        {delete_heroes => (
          <Button
            size="small"
            onClick={() => delete_heroes({ variables: { id } })}
          >
            Delete
          </Button>
        )}
      </Mutation>
      <Button size="small">
        <Link to={`/heroes/${id}`}>Edit</Link>
      </Button>
    </CardActions>
  </Card>
);

HeroCard.propTypes = {
  classes: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  children: PropTypes.object
};

export default withStyles(styles)(HeroCard);
