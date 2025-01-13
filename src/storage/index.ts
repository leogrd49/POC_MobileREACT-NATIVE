import AsyncStorage from '@react-native-async-storage/async-storage';
import SQLite from 'react-native-sqlite-storage';

// Configuration SQLite
export const db = SQLite.openDatabase(
  {
    name: 'myapp.db',
    location: 'default'
  },
  () => console.log('Database connected'),
  error => console.error('Database error', error)
);

// Classe pour gérer le stockage local
export class LocalStorage {
  // Méthode pour SQLite
  static async saveToSQL(key: string, value: any) {
    try {
      // Implémentez votre logique SQLite ici
    } catch (error) {
      console.error('SQL Storage Error:', error);
    }
  }

  // Méthode pour AsyncStorage
  static async saveToAsync(key: string, value: any) {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Async Storage Error:', error);
    }
  }
}