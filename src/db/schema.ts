export interface Espece {
    id: number;
    nom: string;
    syncStatus: 'pending' | 'synced';
  }