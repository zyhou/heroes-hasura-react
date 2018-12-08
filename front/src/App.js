import React, { Component } from "react";
import buildGraphQLProvider from "ra-data-graphql";
import { Admin, Resource, ListGuesser } from "react-admin";
import { ApolloLink } from "apollo-link";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";

const client = new ApolloClient({
  link: new HttpLink({ uri: "http://localhost:8080/v1alpha1/graphql" }),
  cache: new InMemoryCache()
});

class App extends Component {
  constructor() {
    super();
    this.state = { dataProvider: null };
  }

  componentDidMount() {
    buildGraphQLProvider({ client }).then(dataProvider =>
      this.setState({ dataProvider })
    );
  }

  render() {
    const { dataProvider } = this.state;

    if (!dataProvider) {
      return <div>Loading</div>;
    }

    return (
      <Admin dataProvider={dataProvider}>
        <Resource name="heroes" list={ListGuesser} />
      </Admin>
    );
  }
}

export default App;
