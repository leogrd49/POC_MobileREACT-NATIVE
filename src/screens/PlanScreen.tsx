import React, { useState, useRef } from 'react';
import { View, Text, ScrollView, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import SearchBar from '../components/SearchBar';
import CultivarBlock from '../components/CultivarBlock';
import Icon from 'react-native-vector-icons/MaterialIcons';

const PlanScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCoord, setSelectedCoord] = useState('');
  const scrollViewRefs = useRef<ScrollView[]>([]);

  const info = {
    codeReseau: 'NDEF',
    numeroEssai: '9151',
    nomEssai: 'Plan N° 9151',
    espece: 'Mon Espèce',
    date: '23/01/25',
    commune: 'Beauouze',
    codePostal: '49600',
    nombreVarietes: '14',
    nombreRepetitions: '3'
  };

  const handleBlockPress = (coord: string) => {
    setSelectedCoord(coord);
    setModalVisible(true);
  };

  const handleScroll = (event: any, rowIndex: number) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    scrollViewRefs.current.forEach((ref, index) => {
      if (index !== rowIndex && ref) {
        ref.scrollTo({ x: offsetX, animated: false });
      }
    });
  };

  const renderRow = (rowIndex: number) => (
    <ScrollView
      key={rowIndex}
      horizontal
      ref={ref => {
        if (ref) {
          scrollViewRefs.current[rowIndex] = ref;
        }
      }}
      onScroll={(e) => handleScroll(e, rowIndex)}
      scrollEventThrottle={16}
      showsHorizontalScrollIndicator={false}
      decelerationRate="fast"
      style={styles.scrollRow}
      contentContainerStyle={styles.rowContent}
    >
      {[...Array(8)].map((_, columnIndex) => (
        <CultivarBlock
          key={columnIndex}
          columnIndex={columnIndex}
          onPress={handleBlockPress}
        />
      ))}
    </ScrollView>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Plan de l'essai: Dispositif</Text>
        
        <View style={styles.infoGrid}>
          <View>
            <Text>Code réseau : {info.codeReseau}</Text>
            <Text>N° Essai : {info.numeroEssai}</Text>
            <Text>Nom Essai : {info.nomEssai}</Text>
            <Text>Espèce : {info.espece}</Text>
            <Text>Date : {info.date}</Text>
          </View>
          <View>
            <Text>Commune : {info.commune}</Text>
            <Text>Code postal : {info.codePostal}</Text>
            <Text>Nombre de variétés : {info.nombreVarietes}</Text>
            <Text>Nombre de répétitions : {info.nombreRepetitions}</Text>
          </View>
        </View>

        <SearchBar />

        <View style={styles.textNumbers}>
          <Text>Texte 1: 16</Text>
          <Text>Texte 2: 64</Text>
        </View>

        <View style={styles.cultivarRows}>
          {[...Array(3)].map((_, index) => renderRow(index))}
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
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

            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalButton} />
              <TouchableOpacity style={styles.modalButton} />
            </View>

            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Fermer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  infoGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  textNumbers: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  cultivarRows: {
    gap: 16,
  },
  scrollRow: {
    marginBottom: 16,
  },
  rowContent: {
    paddingHorizontal: 12,
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
  modalButtons: {
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

export default PlanScreen;