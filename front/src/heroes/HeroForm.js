import React from "react";
import PropTypes from "prop-types";

import { Link } from "@reach/router";

import { withStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  header: {
    backgroundColor: theme.palette.primary.main
  },
  title: {
    color: theme.palette.secondary.main
  }
});

const HeroForm = ({ classes, name, description }) => (
  <Card>
    <CardHeader
      classes={{ root: classes.header, title: classes.title }}
      title={name || "New Hero"}
    />
    <CardContent>
      <form>
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="name">Name</InputLabel>
          <Input id="name" name="name" defaultValue={name} />
        </FormControl>
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="description">Description</InputLabel>
          <Input
            name="description"
            id="description"
            defaultValue={description}
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

HeroForm.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string,
  description: PropTypes.string
};

export default withStyles(styles)(HeroForm);
