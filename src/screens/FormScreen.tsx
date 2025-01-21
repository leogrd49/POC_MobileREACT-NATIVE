import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Button } from '../components/ui/button';

interface FormEntry {
  id: string;
  label: string;
  value: string;
  isValid: boolean;
  color?: string;
}

const FormScreen = () => {
  const [formEntries, setFormEntries] = useState<FormEntry[]>([
    {
      id: '1',
      label: 'Sol calcaire',
      value: 'Oui',
      isValid: true,
    },
    {
      id: '2',
      label: "Profondeur de travail du sol de l'année 1",
      value: 'Pas de travail du sol',
      isValid: true,
    },
    {
      id: '3',
      label: "Profondeur de travail du sol de l'année 2",
      value: 'Tous les ans',
      isValid: true,
    },
    {
      id: '4',
      label: 'Culture en place avant LTPDT',
      value: 'Vigne',
      isValid: true,
      color: '#4CAF50', // Green color for the left border
    },
    {
      id: '5',
      label: 'Gestion des résidus année avant LTPDT - année 1 LTPDT',
      value: 'Laissés',
      isValid: true,
      color: '#2196F3', // Blue color for the left border
    },
    {
      id: '6',
      label: "Culture en place de l'année 1 LTPDT",
      value: 'Vigne',
      isValid: true,
      color: '#2196F3',
    },
    {
      id: '7',
      label: 'Gestion des résidus année 1 LTPDT (Année 2 LTPDT)',
      value: 'Laissés',
      isValid: true,
      color: '#2196F3',
    },
  ]);

  const handleEntryPress = (id: string) => {
    // Handle entry press - could open a modal or navigate to details
    console.log('Entry pressed:', id);
  };

  const handleSave = () => {
    // Handle save logic
    console.log('Saving form data...');
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {formEntries.map(entry => (
          <TouchableOpacity
            key={entry.id}
            style={[
              styles.entryContainer,
              entry.color && { borderLeftColor: entry.color },
            ]}
            onPress={() => handleEntryPress(entry.id)}>
            <View style={styles.entryContent}>
              <Text style={styles.entryLabel}>{entry.label}</Text>
              <Text style={styles.entryValue}>{entry.value}</Text>
            </View>
            {entry.isValid ? (
              <Icon name="check-circle" size={24} color="#4CAF50" />
            ) : (
              <Icon name="error" size={24} color="#F44336" />
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
      
      <View style={styles.footer}>
        <Button
          onPress={handleSave}
          className="w-full">
          Enregistrer
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  entryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    marginVertical: 4,
    marginHorizontal: 8,
    padding: 16,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: 'transparent',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  entryContent: {
    flex: 1,
  },
  entryLabel: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  entryValue: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  footer: {
    padding: 16,
    backgroundColor: 'white',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
});

export default FormScreen;