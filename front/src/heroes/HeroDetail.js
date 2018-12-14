import React from "react";
import PropTypes from "prop-types";

import gql from "graphql-tag";
import { Query } from "react-apollo";

import HeroFrom from "./HeroForm";

const GET_HERO = gql`
  query heroes($id: uuid!) {
    heroes(where: { id: { _eq: $id } }) {
      name
      description
    }
  }
`;

const HeroDetail = ({ id }) => {
  if (id === "new") {
    return <HeroFrom />;
  }

  return (
    <Query query={GET_HERO} variables={{ id }}>
      {({ loading, error, data }) => {
        if (loading) return "Loading...";
        if (error) return `Error! ${error.message}`;

        const hero = { ...data.heroes[0], id };
        return <HeroFrom {...hero} />;
      }}
    </Query>
  );
};

HeroDetail.propTypes = {
  id: PropTypes.string
};

export default HeroDetail;
