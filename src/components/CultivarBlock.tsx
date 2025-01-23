import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface CultivarBlockProps {
  numColumns?: number;
}

const CultivarBlock: React.FC<CultivarBlockProps> = ({ numColumns = 6 }) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [selectedCoord, setSelectedCoord] = React.useState('');

  const handlePress = (coord: string) => {
    setSelectedCoord(coord);
    setModalVisible(true);
  };

  return (
    <>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        decelerationRate="normal"
        style={styles.scrollView}
      >
        {[...Array(numColumns)].map((_, columnIndex) => (
          <TouchableOpacity 
            key={columnIndex} 
            style={styles.block}
            onPress={() => handlePress(`X${columnIndex + 1} Y`)}
          >
            <Text style={styles.coordText}>Coord: X{columnIndex + 1} Y</Text>
            <Text style={styles.text}>Rep 1    Fact 2</Text>
            <Text style={styles.text}>Remarque</Text>
            <View style={styles.buttons}>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Texte 1</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Texte 2</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Coord {selectedCoord}</Text>
              <Text>Rep 1    Fact 2</Text>
              <Text>Remarque</Text>
            </View>

            <View style={styles.photoSection}>
              <View style={styles.photoPlaceholder}>
                <Icon name="add-a-photo" size={24} color="#666" />
              </View>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.modalButton} />
              <TouchableOpacity style={styles.modalButton} />
            </View>

            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Fermer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    width: '100%',
  },
  block: {
    backgroundColor: '#E5E7EB',
    padding: 16,
    borderRadius: 8,
    width: 280,
    marginRight: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  coordText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  text: {
    fontSize: 14,
    marginBottom: 8,
  },
  buttons: {
    flexDirection: 'row',
    gap: 8,
  },
  button: {
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  buttonText: {
    color: '#333',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
    width: '90%',
    maxWidth: 400,
  },
  modalHeader: {
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  photoSection: {
    marginBottom: 20,
  },
  photoPlaceholder: {
    height: 200,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 20,
  },
  modalButton: {
    width: 50,
    height: 50,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
  },
  closeButton: {
    backgroundColor: '#2196F3',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default CultivarBlock;