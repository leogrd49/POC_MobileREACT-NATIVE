import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import SearchBar from '../components/SearchBar';
import CultivarBlock from '../components/CultivarBlock';

const PlanScreen = () => {
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
          <CultivarBlock />
          <CultivarBlock />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});

export default PlanScreen;