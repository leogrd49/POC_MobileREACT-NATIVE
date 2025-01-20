import React, { useState } from 'react';
import { ApolloProvider } from '@apollo/client';
import { 
  SafeAreaView, 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Modal,
  ScrollView,
  Animated,
  Dimensions,
  Alert
} from 'react-native';
import client from './src/apollo/client';
import EspeceForm from './src/components/EspeceForm';
import EspeceList from './src/components/EspeceList';
import { Button } from './src/components/ui/button';

const DRAWER_WIDTH = 280;
const SCREEN_WIDTH = Dimensions.get('window').width;

// Simple icon component using text symbols
const Icon = ({ name }: { name: string }) => {
  const getIconSymbol = (iconName: string) => {
    switch (iconName) {
      case 'menu': return '☰';
      case 'settings': return '⚙️';
      case 'close': return '✕';
      case 'person': return '👤';
      case 'help': return '❔';
      case 'logout': return '↪️';
      case 'notifications': return '🔔';
      case 'tune': return '⚡';
      default: return '•';
    }
  };

  return (
    <Text style={styles.icon}>{getIconSymbol(name)}</Text>
  );
};

function App() {
  const [currentPage, setCurrentPage] = useState<'form' | 'list'>('form');
  const [leftDrawerOpen, setLeftDrawerOpen] = useState(false);
  const [rightDrawerOpen, setRightDrawerOpen] = useState(false);
  const [settingsModalVisible, setSettingsModalVisible] = useState(false);
  const [notificationsModalVisible, setNotificationsModalVisible] = useState(false);
  const leftDrawerAnimation = useState(new Animated.Value(-DRAWER_WIDTH))[0];
  const rightDrawerAnimation = useState(new Animated.Value(SCREEN_WIDTH))[0];

  const animateDrawer = (drawer: Animated.Value, toValue: number) => {
    Animated.timing(drawer, {
      toValue,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };

  const toggleLeftDrawer = () => {
    if (leftDrawerOpen) {
      animateDrawer(leftDrawerAnimation, -DRAWER_WIDTH);
    } else {
      animateDrawer(leftDrawerAnimation, 0);
    }
    setLeftDrawerOpen(!leftDrawerOpen);
  };

  const toggleRightDrawer = () => {
    if (rightDrawerOpen) {
      animateDrawer(rightDrawerAnimation, SCREEN_WIDTH);
    } else {
      animateDrawer(rightDrawerAnimation, SCREEN_WIDTH - DRAWER_WIDTH);
    }
    setRightDrawerOpen(!rightDrawerOpen);
  };

  const MenuItem = ({ icon, title, onPress }: { icon: string, title: string, onPress: () => void }) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <Icon name={icon} />
      <Text style={styles.menuItemText}>{title}</Text>
    </TouchableOpacity>
  );

  const DrawerContent = ({ side }: { side: 'left' | 'right' }) => (
    <ScrollView style={styles.drawerContent}>
      <View style={styles.drawerHeader}>
        <Text style={styles.drawerTitle}>{side === 'left' ? 'Menu' : 'Quick Actions'}</Text>
        <TouchableOpacity 
          onPress={side === 'left' ? toggleLeftDrawer : toggleRightDrawer}
          style={styles.closeButton}
        >
          <Icon name="close" />
        </TouchableOpacity>
      </View>
      
      {side === 'left' ? (
        <>
          <MenuItem icon="person" title="Profile" onPress={() => Alert.alert('Profile', 'Profile page coming soon')} />
          <MenuItem icon="settings" title="Settings" onPress={() => setSettingsModalVisible(true)} />
          <MenuItem icon="help" title="Help" onPress={() => Alert.alert('Help', 'Help center coming soon')} />
          <MenuItem icon="logout" title="Logout" onPress={() => Alert.alert('Logout', 'Are you sure?')} />
        </>
      ) : (
        <>
          <MenuItem icon="notifications" title="Notifications" onPress={() => setNotificationsModalVisible(true)} />
          <MenuItem icon="tune" title="Quick Settings" onPress={() => Alert.alert('Quick Settings', 'Quick settings coming soon')} />
        </>
      )}
    </ScrollView>
  );

  return (
    <ApolloProvider client={client}>
      <SafeAreaView style={styles.container}>
        {/* Top Navigation Bar */}
        <View style={styles.navbar}>
          <TouchableOpacity onPress={toggleLeftDrawer} style={styles.navButton}>
            <Icon name="menu" />
          </TouchableOpacity>
          <Text style={styles.navTitle}>Gestion des Espèces</Text>
          <TouchableOpacity onPress={toggleRightDrawer} style={styles.navButton}>
            <Icon name="settings" />
          </TouchableOpacity>
        </View>

        {/* Main Navigation */}
        <View style={styles.header}>
          <Button 
            variant={currentPage === 'form' ? "default" : "outline"}
            onPress={() => setCurrentPage('form')}
            className="flex-1 mx-1"
          >
            Ajouter
          </Button>
          <Button 
            variant={currentPage === 'list' ? "default" : "outline"}
            onPress={() => setCurrentPage('list')}
            className="flex-1 mx-1"
          >
            Liste
          </Button>
        </View>

        {/* Main Content */}
        <View style={styles.content}>
          {currentPage === 'form' ? <EspeceForm /> : <EspeceList />}
        </View>

        {/* Left Drawer */}
        <Animated.View 
          style={[
            styles.drawer, 
            styles.leftDrawer,
            { transform: [{ translateX: leftDrawerAnimation }] }
          ]}
        >
          <DrawerContent side="left" />
        </Animated.View>

        {/* Settings Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={settingsModalVisible}
          onRequestClose={() => setSettingsModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Settings</Text>
                <TouchableOpacity onPress={() => setSettingsModalVisible(false)}>
                  <Icon name="close" />
                </TouchableOpacity>
              </View>
              <Text style={styles.modalText}>Settings content coming soon...</Text>
            </View>
          </View>
        </Modal>

        {/* Notifications Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={notificationsModalVisible}
          onRequestClose={() => setNotificationsModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Notifications</Text>
                <TouchableOpacity onPress={() => setNotificationsModalVisible(false)}>
                  <Icon name="close" />
                </TouchableOpacity>
              </View>
              <Text style={styles.modalText}>No new notifications</Text>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  navButton: {
    padding: 8,
  },
  navTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  header: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  content: {
    flex: 1,
  },
  drawer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: DRAWER_WIDTH,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 20,
  },
  leftDrawer: {
    left: 0,
  },
  rightDrawer: {
    right: 0,
  },
  drawerContent: {
    flex: 1,
  },
  drawerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  drawerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: '600',
  },
  closeButton: {
    padding: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuItemText: {
    marginLeft: 16,
    fontSize: 16,
    color: '#333',
  },
  icon: {
    fontSize: 24,
    color: '#666',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  modalText: {
    fontSize: 16,
    color: '#666',
  },
});

export default App;