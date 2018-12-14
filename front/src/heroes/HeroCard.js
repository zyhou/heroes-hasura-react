import React from "react";
import PropTypes from "prop-types";

import { Link } from "@reach/router";

import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

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
      <Button size="small">Delete</Button>
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
