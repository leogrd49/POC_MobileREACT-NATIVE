import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface CultivarBlockProps {
  columnIndex: number;
  onPress: (coord: string) => void;
}

const CultivarBlock: React.FC<CultivarBlockProps> = ({ columnIndex, onPress }) => {
  return (
    <TouchableOpacity 
      style={styles.block}
      onPress={() => onPress(`X${columnIndex + 1} Y`)}
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
  );
};

const styles = StyleSheet.create({
  block: {
    width: 280,
    backgroundColor: '#E5E7EB',
    padding: 16,
    borderRadius: 8,
    marginHorizontal: 4,
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
    flex: 1,
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
  },
  buttonText: {
    color: '#333',
  },
});

export default CultivarBlock;