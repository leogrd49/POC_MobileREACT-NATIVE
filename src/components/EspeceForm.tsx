// src/components/EspeceForm.tsx
import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { gql, useMutation } from '@apollo/client';
import { NetworkManager } from '../utils/networkManager';
import { dbService } from '../db/dbService';
import { useOfflineSync } from '../hooks/useOfflineSync';

const ADD_ESPECE = gql`
  mutation AddEspece($id: Int!, $nom: String!) {
    addEspece(id: $id, nom: $nom) {
      id
      nom
    }
  }
`;

const EspeceForm = () => {
  const [nom, setNom] = useState('');
  const [mutationError, setMutationError] = useState('');
  
  // Utilisation du hook de synchronisation
  useOfflineSync();

  const [addEspece, { loading }] = useMutation(ADD_ESPECE, {
    onError: (error) => {
      console.log('Mutation Error:', error);
      setMutationError(error.message);
    },
    onCompleted: (data) => {
      console.log('Mutation completed successfully:', data);
      setNom('');
      setMutationError('');
      Alert.alert('Succès', `Espèce "${data.addEspece.nom}" ajoutée avec succès`);
    },
  });

  const handleSubmit = async () => {
    if (!nom.trim()) {
      Alert.alert('Erreur', 'Le nom ne peut pas être vide');
      return;
    }

    setMutationError('');
    const especeId = Math.floor(Math.random() * 1000000);

    try {
      const isConnected = await NetworkManager.checkConnection();
      
      if (isConnected) {
        // Mode en ligne: envoi direct à l'API
        await addEspece({
          variables: {
            id: especeId,
            nom: nom.trim(),
          },
        });
      } else {
        // Mode hors ligne: sauvegarde en local
        await dbService.saveEspece({
          id: especeId,
          nom: nom.trim(),
        });
        
        setNom('');
        Alert.alert(
          'Sauvegarde locale',
          'Les données ont été sauvegardées localement et seront synchronisées lorsque la connexion sera rétablie'
        );
      }
    } catch (e) {
      console.error('Error during submission:', e);
      setMutationError('Une erreur est survenue lors de la sauvegarde');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ajouter une espèce</Text>
      
      {mutationError ? (
        <Text style={styles.errorText}>{mutationError}</Text>
      ) : null}
      
      <View style={styles.formGroup}>
        <Text style={styles.label}>Nom de l'espèce</Text>
        <TextInput
          style={styles.input}
          value={nom}
          onChangeText={setNom}
          placeholder="Entrez le nom de l'espèce"
          editable={!loading}
        />
      </View>

      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleSubmit}
        disabled={loading}>
        <Text style={styles.buttonText}>
          {loading ? 'Ajout en cours...' : "Ajouter l'espèce"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  formGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default EspeceForm;