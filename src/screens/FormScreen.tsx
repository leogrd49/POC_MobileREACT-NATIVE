import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Modal,
  ScrollView,
  StyleSheet,
} from 'react-native';

interface FormField {
  id: string;
  label: string;
  value: string;
  type: 'text' | 'select';
  options?: { id: string; label: string }[];
}

export const FormScreen = () => {
  const [fields, setFields] = useState<FormField[]>([
    {
      id: 'soil',
      label: 'Sol calcaire',
      value: 'Oui',
      type: 'select',
      options: [
        { id: 'yes', label: 'Oui' },
        { id: 'no', label: 'Non' },
      ]
    },
    {
      id: 'depth1',
      label: 'Profondeur de travail du sol de l\'année 1',
      value: 'Pas de travail du sol',
      type: 'select',
      options: [
        { id: 'none', label: 'Pas de travail du sol' },
        { id: 'light', label: 'Travail superficiel' },
        { id: 'deep', label: 'Travail profond' },
      ]
    },
    {
      id: 'depth2', 
      label: 'Profondeur de travail du sol de l\'année 2',
      value: 'Tous les ans',
      type: 'select',
      options: [
        { id: 'yearly', label: 'Tous les ans' },
        { id: 'occasional', label: 'Occasionnel' },
      ]
    },
    {
      id: 'culture',
      label: 'Culture en place avant LTPDT',
      value: 'Vigne',
      type: 'select',
      options: [
        { id: 'vine', label: 'Vigne' },
        { id: 'wheat', label: 'Blé' },
        { id: 'corn', label: 'Maïs' },
      ]
    },
    {
      id: 'residues1',
      label: 'Gestion des résidus année avant LTPDT - année 1 LTPDT',
      value: 'Laissés',
      type: 'select',
      options: [
        { id: 'left', label: 'Laissés' },
        { id: 'removed', label: 'Enlevés' },
      ]
    },
    {
      id: 'culturey1',
      label: 'Culture en place de l\'année 1 LTPDT',
      value: 'Vigne',
      type: 'select',
      options: [
        { id: 'vine', label: 'Vigne' },
        { id: 'wheat', label: 'Blé' },
      ]
    },
    {
      id: 'residues2',
      label: 'Gestion des résidus année 1 LTPDT (Année 2 LTPDT)',
      value: 'Laissés',
      type: 'select',
      options: [
        { id: 'left', label: 'Laissés' },
        { id: 'removed', label: 'Enlevés' },
      ]
    },
  ]);

  const [selectedField, setSelectedField] = useState<FormField | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleFieldPress = (field: FormField) => {
    setSelectedField(field);
    setModalVisible(true);
  };

  const handleOptionSelect = (option: { id: string; label: string }) => {
    if (selectedField) {
      setFields(fields.map(field => 
        field.id === selectedField.id 
          ? { ...field, value: option.label }
          : field
      ));
    }
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {fields.map((field) => (
          <TouchableOpacity
            key={field.id}
            style={styles.fieldContainer}
            onPress={() => handleFieldPress(field)}
          >
            <Text style={styles.label}>{field.label}</Text>
            <View style={styles.valueContainer}>
              <Text style={styles.value}>{field.value}</Text>
              <Text style={styles.checkmark}>✓</Text>
            </View>
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Enregistrer</Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {selectedField?.label}
              </Text>
              <TouchableOpacity 
                onPress={() => setModalVisible(false)}
                style={styles.closeButton}
              >
                <Text style={styles.closeButtonText}>×</Text>
              </TouchableOpacity>
            </View>
            <ScrollView>
              {selectedField?.options?.map((option) => (
                <TouchableOpacity
                  key={option.id}
                  style={styles.optionContainer}
                  onPress={() => handleOptionSelect(option)}
                >
                  <Text style={styles.optionText}>{option.label}</Text>
                  {selectedField.value === option.label && (
                    <Text style={styles.selectedCheckmark}>✓</Text>
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  fieldContainer: {
    backgroundColor: 'white',
    padding: 16,
    marginVertical: 4,
    marginHorizontal: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  valueContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  value: {
    fontSize: 16,
    color: '#666',
  },
  checkmark: {
    color: '#4CAF50',
    fontSize: 18,
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    padding: 16,
    margin: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  closeButton: {
    padding: 8,
  },
  closeButtonText: {
    fontSize: 24,
    color: '#666',
  },
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  selectedCheckmark: {
    color: '#4CAF50',
    fontSize: 18,
  },
});

export default FormScreen;