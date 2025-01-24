import NetInfo from '@react-native-community/netinfo';

export class NetworkManager {
  static async checkConnection(): Promise<boolean> {
    try {
      const netInfo = await NetInfo.fetch();
      return netInfo?.isConnected ?? false;
    } catch {
      return false;
    }
  }
}