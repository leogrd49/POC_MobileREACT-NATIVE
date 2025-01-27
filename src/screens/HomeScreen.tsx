import React, { useState } from 'react';
import { View, StyleSheet, Image, ScrollView, Text } from 'react-native';
import { Button } from '../components/ui/button';
import EspeceForm from '../components/EspeceForm';
import EspeceList from '../components/EspeceList';
import { useQuery, gql } from '@apollo/client';

const GET_IMAGES = gql`
  query GetImages {
    images {
      id
      path
    }
  }
`;

const HomeScreen = () => {
  const [currentView, setCurrentView] = useState<'form' | 'list' | 'images'>('form');
  const { data: imageData } = useQuery(GET_IMAGES);

  const renderContent = () => {
    switch (currentView) {
      case 'form':
        return <EspeceForm />;
      case 'list':
        return <EspeceList />;
      case 'images':
        return (
          <ScrollView contentContainerStyle={styles.imageGrid}>
            {imageData?.images?.map((img: any) => (
              <View key={img.id} style={styles.imageContainer}>
                <Image 
                  source={{ uri: `file://${img.path}` }}
                  style={styles.image}
                  resizeMode="cover"
                />
              </View>
            ))}
          </ScrollView>
        );
    }
  };

  return (
    <View style={styles.container}>
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
        <Button
          variant={currentView === 'images' ? 'default' : 'outline'}
          onPress={() => setCurrentView('images')}
          style={styles.toggleButton}>
          Images
        </Button>
      </View>

      <View style={styles.content}>
        {renderContent()}
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
  imageGrid: {
    padding: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  imageContainer: {
    width: '48%',
    aspectRatio: 1,
    margin: '1%',
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: 'white',
    elevation: 2,
  },
  image: {
    width: '100%',
    height: '100%',
  }
});

export default HomeScreen;