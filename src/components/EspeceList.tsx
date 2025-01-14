// src/components/EspeceList.tsx
import React from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import {gql, useQuery} from '@apollo/client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';
import {Alert, AlertTitle, AlertDescription} from './ui/alert';

const GET_ESPECES = gql`
  query GetEspeces {
    especes {
      items {
        id
        nom
      }
    }
  }
`;

interface Espece {
  id: number;
  nom: string;
}

interface EspecesData {
  especes: {
    items: Espece[];
  };
}

const EspeceList = () => {
  const {loading, error, data} = useQuery<EspecesData>(GET_ESPECES);

  if (loading) {
    return (
      <View style={styles.container}>
        <Alert>
          <AlertTitle>Chargement...</AlertTitle>
          <AlertDescription>
            Récupération de la liste des espèces en cours
          </AlertDescription>
        </Alert>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Alert variant="destructive">
          <AlertTitle>Erreur</AlertTitle>
          <AlertDescription>{error.message}</AlertDescription>
        </Alert>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <CardHeader>
          <CardTitle>Liste des Espèces</CardTitle>
          <CardDescription>
            {data?.especes?.items?.length || 0} espèces trouvées
          </CardDescription>
        </CardHeader>
        <CardContent>
          {data?.especes?.items?.map((espece) => (
            <View key={espece.id} style={styles.especeItem}>
              <Text style={styles.especeText}>{espece.nom}</Text>
            </View>
          ))}
        </CardContent>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  especeItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  especeText: {
    fontSize: 16,
    color: '#333',
  },
  card: {
    marginHorizontal: 16,
    marginVertical: 16,
  },
});

export default EspeceList;