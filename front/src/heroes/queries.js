import gql from "graphql-tag";

export const GET_HEROES = gql`
  {
    heroes {
      id
      name
      description
    }
  }
`;

export const GET_HERO = gql`
  query heroes($id: uuid!) {
    heroes(where: { id: { _eq: $id } }) {
      name
      description
    }
  }
`;

export const ADD_HEROES = gql`
  mutation Add_heroes($hero: [heroes_insert_input]!) {
    insert_heroes(objects: $hero) {
      returning {
        id
        name
        description
      }
    }
  }
`;

export const UPDATE_HEROES = gql`
  mutation Update_heroes($hero: villains_set_input, $id: uuid!) {
    update_heroes(_set: $hero, where: { id: { _eq: $id } }) {
      returning {
        id
        name
        description
      }
    }
  }
`;

export const DELETE_HEROES = gql`
  mutation Delete_heroes($id: uuid!) {
    delete_heroes(where: { id: { _eq: $id } }) {
      returning {
        id
      }
    }
  }
`;

const TYPE_ACTION = {
  delete: {
    mutation: "delete_heroes",
    action: (heroes, hero) => heroes.filter(h => h.id !== hero.id)
  },
  add: {
    mutation: "insert_heroes",
    action: (heroes, hero) => heroes.concat([hero])
  }
};

export const refreshCache = action => {
  const type = TYPE_ACTION[action];

  return (cache, { data }) => {
    const heroes = data[type.mutation];
    const hero = heroes.returning[0];
    if (hero) {
      const { heroes } = cache.readQuery({ query: GET_HEROES });
      cache.writeQuery({
        query: GET_HEROES,
        data: {
          heroes: type.action(heroes, hero)
        }
      });
    }
  };
};
