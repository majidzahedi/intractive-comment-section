import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { relayStylePagination } from "@apollo/client/utilities";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: "http://localhost:3000/api/graphql",
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

export const client = new ApolloClient({
  uri: "http://localhost:3000/api/graphql",
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          links: relayStylePagination(),
        },
      },
    },
  }),
});
