import NetInfo from '@react-native-community/netinfo';

export class NetworkManager {
  static async checkConnection() {
    const state = await NetInfo.fetch();
    return state.isConnected;
  }

  static subscribeToConnectionChanges(callback: (isConnected: boolean) => void) {
    return NetInfo.addEventListener(state => {
      callback(state.isConnected ?? false);
    });
  }
}