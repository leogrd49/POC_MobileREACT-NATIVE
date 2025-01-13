import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './src/apollo/client';
import EspeceForm from './src/components/EspeceForm';
import { SafeAreaView } from 'react-native';

function App() {
  return (
    <ApolloProvider client={client}>
      <SafeAreaView>
        <EspeceForm />
      </SafeAreaView>
    </ApolloProvider>
  );
}

export default App;