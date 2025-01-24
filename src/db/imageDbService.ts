import SQLite from 'react-native-sqlite-storage';
import client from '../apollo/client';
import { SYNC_IMAGE } from '../graphql/mutations/sync_images';

export class ImageDatabaseService {
  private static instance: ImageDatabaseService;
  private database: SQLite.SQLiteDatabase | null = null;

  static getInstance(): ImageDatabaseService {
    if (!ImageDatabaseService.instance) {
      ImageDatabaseService.instance = new ImageDatabaseService();
    }
    return ImageDatabaseService.instance;
  }

  async saveImage(path: string): Promise<void> {
    try {
      await client.mutate({
        mutation: SYNC_IMAGE,
        variables: { path }
      });
      console.log('Image synced successfully');
    } catch (error) {
      console.error('GraphQL sync error:', error);
      throw error;
    }
  }
}

export const imageDbService = ImageDatabaseService.getInstance();