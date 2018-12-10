import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";

const GET_HEROES = gql`
  {
    heroes {
      id
      name
      description
    }
  }
`;

const App = () => (
  <Query query={GET_HEROES}>
    {({ loading, error, data }) => {
      if (loading) return "Loading...";
      if (error) return `Error! ${error.message}`;

      return (
        <ul>
          {data.heroes.map(heroe => (
            <li key={heroe.id} value={heroe.name}>
              {heroe.name}
            </li>
          ))}
        </ul>
      );
    }}
  </Query>
);

export default App;
