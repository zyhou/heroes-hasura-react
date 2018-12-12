import React from "react";
import PropTypes from "prop-types";
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

const SimpleCard = ({ classes, id, title, subtitle }) => (
  <Card className={classes.card}>
    <CardContent>
      <Typography className={classes.title}>{title}</Typography>
      <Typography color="textSecondary">{subtitle}</Typography>
    </CardContent>
    <CardActions>
      <Button size="small">Delete</Button>
      <Button size="small">Edit</Button>
    </CardActions>
  </Card>
);

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired
};

export default withStyles(styles)(SimpleCard);
