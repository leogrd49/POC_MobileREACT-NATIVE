// src/db/dbService.ts
import SQLite from 'react-native-sqlite-storage';

// Activer les promesses pour SQLite
SQLite.enablePromise(true);

export class DatabaseService {
  private static instance: DatabaseService;
  private database: SQLite.SQLiteDatabase | null = null;

  static getInstance(): DatabaseService {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService();
    }
    return DatabaseService.instance;
  }

  async getDatabase(): Promise<SQLite.SQLiteDatabase> {
    if (this.database) {
      return this.database;
    }

    this.database = await SQLite.openDatabase({
      name: 'myapp.db',
      location: 'default'
    });

    await this.initTables();
    return this.database;
  }

  private async initTables() {
    if (!this.database) return;

    const query = `
      CREATE TABLE IF NOT EXISTS especes (
        id INTEGER PRIMARY KEY,
        nom TEXT NOT NULL,
        syncStatus TEXT DEFAULT 'pending'
      );
    `;
    
    try {
      await this.database.executeSql(query);
    } catch (error) {
      console.error('Error creating tables:', error);
    }
  }

  async saveEspece(espece: { id: number; nom: string }): Promise<void> {
    const db = await this.getDatabase();
    const query = 'INSERT INTO especes (id, nom, syncStatus) VALUES (?, ?, ?)';
    
    try {
      await db.executeSql(query, [espece.id, espece.nom, 'pending']);
    } catch (error) {
      console.error('Error saving espece:', error);
      throw error;
    }
  }

  async getPendingEspeces(): Promise<Array<{ id: number; nom: string; syncStatus: string }>> {
    const db = await this.getDatabase();
    const query = 'SELECT * FROM especes WHERE syncStatus = ?';
    
    try {
      const [results] = await db.executeSql(query, ['pending']);
      return results.rows.raw();
    } catch (error) {
      console.error('Error getting pending especes:', error);
      return [];
    }
  }

  async updateSyncStatus(id: number, status: 'pending' | 'synced'): Promise<void> {
    const db = await this.getDatabase();
    const query = 'UPDATE especes SET syncStatus = ? WHERE id = ?';
    
    try {
      await db.executeSql(query, [status, id]);
    } catch (error) {
      console.error('Error updating sync status:', error);
      throw error;
    }
  }
}

export const dbService = DatabaseService.getInstance();