import { NetworkManager } from '../utils/networkManager';
import { dbService } from '../db/dbService';
import client from '../apollo/client';
import { gql } from '@apollo/client';

const ADD_ESPECE = gql`
  mutation AddEspece($id: Int!, $nom: String!) {
    addEspece(id: $id, nom: $nom) {
      id
      nom
    }
  }
`;

export class SyncService {
  private static isSync = false;

  static async syncPendingData() {
    if (this.isSync) return;
    this.isSync = true;

    try {
      const isConnected = await NetworkManager.checkConnection();
      if (!isConnected) {
        this.isSync = false;
        return;
      }

      const pendingEspeces = await dbService.getPendingEspeces();
      
      for (const espece of pendingEspeces) {
        try {
          await client.mutate({
            mutation: ADD_ESPECE,
            variables: {
              id: espece.id,
              nom: espece.nom,
            },
          });
          
          await dbService.updateSyncStatus(espece.id, 'synced');
        } catch (error) {
          console.error(`Failed to sync espece ${espece.id}:`, error);
        }
      }
    } catch (error) {
      console.error('Sync error:', error);
    } finally {
      this.isSync = false;
    }
  }
}
