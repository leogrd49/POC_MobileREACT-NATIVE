// App.tsx
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ApolloProvider } from '@apollo/client';
import client from './src/apollo/client';
import { AppNavigator } from './src/navigation/AppNavigator';

function App() {
  return (
    <SafeAreaProvider>
      <ApolloProvider client={client}>
        <AppNavigator />
      </ApolloProvider>
    </SafeAreaProvider>
  );
}

export default App;