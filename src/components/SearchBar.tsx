import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const SearchBar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const animatedHeight = useState(new Animated.Value(0))[0];

  const toggleFilters = () => {
    setIsExpanded(!isExpanded);
    Animated.timing(animatedHeight, {
      toValue: isExpanded ? 0 : 220,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchRow}>
        <TextInput
          style={styles.input}
          placeholder="Rechercher..."
          placeholderTextColor="#666"
        />
        <TouchableOpacity onPress={toggleFilters} style={styles.filterButton}>
          <Icon name={isExpanded ? 'expand-less' : 'expand-more'} size={24} color="#666" />
        </TouchableOpacity>
      </View>

      <Animated.View style={[styles.filtersContainer, { height: animatedHeight }]}>
        <View style={styles.filterContent}>
          <View style={styles.coordContainer}>
            <View style={styles.coordGroup}>
              <Text style={styles.label}>X:</Text>
              <View style={styles.inputGroup}>
                <TextInput 
                  placeholder="De" 
                  style={styles.coordInput}
                  placeholderTextColor="#666"
                  color="#000"
                />
                <TextInput 
                  placeholder="A" 
                  style={styles.coordInput}
                  placeholderTextColor="#666"
                  color="#000"
                />
              </View>
            </View>
            <View style={styles.coordGroup}>
              <Text style={styles.label}>Y:</Text>
              <View style={styles.inputGroup}>
                <TextInput 
                  placeholder="De" 
                  style={styles.coordInput}
                  placeholderTextColor="#666"
                  color="#000"
                />
                <TextInput 
                  placeholder="A" 
                  style={styles.coordInput}
                  placeholderTextColor="#666"
                  color="#000"
                />
              </View>
            </View>
          </View>

          <View style={styles.blockInputs}>
            <View style={styles.blockGroup}>
              <Text style={styles.label}>BLOC:</Text>
              <TextInput 
                style={styles.blockInput}
                placeholderTextColor="#666"
                color="#000"
              />
            </View>
            <View style={styles.blockGroup}>
              <Text style={styles.label}>COL:</Text>
              <TextInput 
                style={styles.blockInput}
                placeholderTextColor="#666"
                color="#000"
              />
            </View>
          </View>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 16,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginRight: 8,
    color: '#000',
  },
  filterButton: {
    padding: 8,
  },
  filtersContainer: {
    overflow: 'hidden',
  },
  filterContent: {
    padding: 16,
    gap: 16,
  },
  coordContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  coordGroup: {
    flex: 1,
  },
  inputGroup: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 4,
  },
  coordInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
  },
  blockInputs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  blockGroup: {
    flex: 1,
  },
  blockInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginTop: 4,
  },
  label: {
    color: '#000',
  },
});

export default SearchBar;