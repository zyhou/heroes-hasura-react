import React from "react";

import { navigate } from "@reach/router";

import { Mutation } from "react-apollo";
import { ADD_HEROES, refreshCache } from "./queries";

import HeroFrom from "./HeroForm";

const HeroNew = () => (
  <Mutation
    mutation={ADD_HEROES}
    update={refreshCache("add")}
    onCompleted={() => navigate("/heroes")}
  >
    {insert_heroes => (
      <HeroFrom
        onSave={hero => {
          insert_heroes({ variables: { hero } });
        }}
      />
    )}
  </Mutation>
);

export default HeroNew;
