import { useEffect } from 'react';
import { SyncService } from '../services/syncService';

export const useOfflineSync = () => {
  useEffect(() => {
    const syncData = async () => {
      await SyncService.syncPendingData();
    };
    
    syncData();
  }, []);
};