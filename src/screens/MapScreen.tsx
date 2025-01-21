// src/screens/HomeScreen.tsx
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from '../components/ui/button';
import EspeceForm from '../components/EspeceForm';
import EspeceList from '../components/EspeceList';

const HomeScreen = () => {
  const [currentView, setCurrentView] = useState<'form' | 'list'>('form');

  return (
    <View style={styles.container}>
      {/* Toggle Buttons */}
      <View style={styles.toggleContainer}>
        <Button
          variant={currentView === 'form' ? 'default' : 'outline'}
          onPress={() => setCurrentView('form')}
          style={styles.toggleButton}>
          Ajouter
        </Button>
        <Button
          variant={currentView === 'list' ? 'default' : 'outline'}
          onPress={() => setCurrentView('list')}
          style={styles.toggleButton}>
          Liste
        </Button>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {currentView === 'form' ? <EspeceForm /> : <EspeceList />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  toggleContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  toggleButton: {
    flex: 1,
    marginHorizontal: 4,
  },
  content: {
    flex: 1,
  },
});

export default HomeScreen;