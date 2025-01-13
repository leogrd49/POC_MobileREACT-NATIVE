import { ApolloClient, ApolloLink, InMemoryCache, createHttpLink, from } from '@apollo/client';
import { onError } from '@apollo/client/link/error';

// Logging middleware amélioré
const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.log(
        '[GraphQL error]: ',
        'Message:', message,
        'Location:', locations,
        'Path:', path
      );
    });
  }
  if (networkError) {
    console.log('[Network error]:', {
      name: networkError.name,
      message: networkError.message,
      stack: networkError.stack,
      statusCode: networkError.statusCode,
    });
  }
});

const loggerLink = new ApolloLink((operation, forward) => {
  // Log de l'opération avant envoi
  console.log('GraphQL Request:', {
    query: operation.query.loc?.source.body, // Le texte réel de la requête
    variables: operation.variables,
    operationName: operation.operationName,
  });

  return forward(operation).map(response => {
    // Log de la réponse
    console.log('GraphQL Response:', response);
    return response;
  });
});

// Utilisons https au lieu de http puisque le serveur est configuré en HTTPS
const httpLink = createHttpLink({
  uri: 'http://172.16.10.64:5220/graphql',
  credentials: 'include'
});

const client = new ApolloClient({
  link: from([errorLink, httpLink]),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
    mutate: {
      errorPolicy: 'all',
    },
  },
});

export default client;