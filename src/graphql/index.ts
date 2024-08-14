import {setContext} from '@apollo/client/link/context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ApolloClient, createHttpLink, InMemoryCache} from '@apollo/client';

async function createClient(uri: string) {
  // create link from uri
  const link = createHttpLink({
    uri,
  });

  const token = await AsyncStorage.getItem('token');
  const defaultHeaders = setContext((_, {headers}) => ({
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }));

  return new ApolloClient({
    link: defaultHeaders.concat(link),
    cache: new InMemoryCache(),
  });
}

const client = createClient('http://localhost:4000/graphql') as any;

export default client;
