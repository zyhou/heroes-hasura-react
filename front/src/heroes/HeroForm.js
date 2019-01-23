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
  },
  button: {
    color: theme.palette.primary.main
  },
  link: {
    textDecoration: "none"
  }
});

class HeroForm extends React.Component {
  constructor(props) {
    super(props);
    const { name, description } = this.props;
    this.state = { name, description };
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    const { classes, name, description, onSave } = this.props;
    return (
      <Card>
        <CardHeader
          classes={{ root: classes.header, title: classes.title }}
          title={name || "New Hero"}
        />
        <CardContent>
          <form>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="name">Name</InputLabel>
              <Input
                id="name"
                name="name"
                defaultValue={name}
                onChange={this.onChange}
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="description">Description</InputLabel>
              <Input
                name="description"
                id="description"
                defaultValue={description}
                onChange={this.onChange}
              />
            </FormControl>
          </form>
        </CardContent>
        <CardActions>
          <Button size="small" className={classes.button}>
            <Link className={classes.link} to="/heroes">
              Cancel
            </Link>
          </Button>
          <Button
            size="small"
            className={classes.button}
            onClick={() => onSave({ ...this.state })}
          >
            Save
          </Button>
        </CardActions>
      </Card>
    );
  }
}

HeroForm.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string,
  description: PropTypes.string,
  onSave: PropTypes.func
};

export default withStyles(styles)(HeroForm);
