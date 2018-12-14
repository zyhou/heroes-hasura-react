import React from "react";
import PropTypes from "prop-types";

import { navigate } from "@reach/router";

import { Query, Mutation } from "react-apollo";
import { GET_HERO, UPDATE_HEROES } from "./queries";

import HeroFrom from "./HeroForm";

const HeroUpdate = ({ id }) => (
  <Query query={GET_HERO} variables={{ id }}>
    {({ loading, error, data }) => {
      if (loading) return "Loading...";
      if (error) return `Error! ${error.message}`;

      const hero = { ...data.heroes[0], id };
      return (
        <Mutation
          mutation={UPDATE_HEROES}
          onCompleted={() => navigate("/heroes")}
        >
          {update_heroes => (
            <HeroFrom
              {...hero}
              onSave={hero => {
                update_heroes({ variables: { hero, id } });
              }}
            />
          )}
        </Mutation>
      );
    }}
  </Query>
);

HeroUpdate.propTypes = {
  id: PropTypes.string.isRequired
};

export default HeroUpdate;
