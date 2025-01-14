// App.tsx
import React, { useState } from 'react';
import { ApolloProvider } from '@apollo/client';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import client from './src/apollo/client';
import EspeceForm from './src/components/EspeceForm';
import EspeceList from './src/components/EspeceList';
import { Button } from './src/components/ui/button';

function App() {
  const [currentPage, setCurrentPage] = useState<'form' | 'list'>('form');

  return (
    <ApolloProvider client={client}>
      <SafeAreaView style={styles.container}>
        {/* Header with Navigation */}
        <View style={styles.header}>
          <Button 
            variant={currentPage === 'form' ? "default" : "outline"}
            onPress={() => setCurrentPage('form')}
            className="flex-1 mx-1"
          >
            Ajouter
          </Button>
          <Button 
            variant={currentPage === 'list' ? "default" : "outline"}
            onPress={() => setCurrentPage('list')}
            className="flex-1 mx-1"
          >
            Liste
          </Button>
        </View>

        {/* Content */}
        <View style={styles.content}>
          {currentPage === 'form' ? <EspeceForm /> : <EspeceList />}
        </View>
      </SafeAreaView>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  content: {
    flex: 1,
  }
});

export default App;