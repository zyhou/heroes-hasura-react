import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";

import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

import HeroCard from "./HeroCard";

const GET_HEROES = gql`
  {
    heroes {
      id
      name
      description
    }
  }
`;

const Heroes = () => (
  <React.Fragment>
    <Typography variant="h6">Heroes</Typography>
    <Divider />
    <Query query={GET_HEROES}>
      {({ loading, error, data }) => {
        if (loading) return "Loading...";
        if (error) return `Error! ${error.message}`;

        return data.heroes.map(heroe => <HeroCard key={heroe.id} {...heroe} />);
      }}
    </Query>
  </React.Fragment>
);

export default Heroes;
