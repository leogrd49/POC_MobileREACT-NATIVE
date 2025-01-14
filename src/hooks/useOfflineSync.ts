  import { useEffect } from 'react';
  import { NetworkManager } from '../utils/networkManager';
  import { SyncService } from '../services/syncService';
  
  export const useOfflineSync = () => {
    useEffect(() => {
      const unsubscribe = NetworkManager.subscribeToConnectionChanges(async (isConnected) => {
        if (isConnected) {
          await SyncService.syncPendingData();
        }
      });
  
      return () => {
        unsubscribe();
      };
    }, []);
  };