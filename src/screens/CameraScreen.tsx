import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
  ActivityIndicator,
  Linking,
  LogBox,
  Modal,
  Image,
  Dimensions,
} from 'react-native';
import {
  Camera,
  useCameraDevices,
  PhotoFile,
  CameraPermissionStatus,
  CameraDevice,
  CameraRuntimeError,
} from 'react-native-vision-camera';
import { useIsFocused } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { imageDbService } from '../db/imageDbService';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

LogBox.ignoreLogs(['ViewPropTypes']);

const CameraScreen = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [flash, setFlash] = useState<'off' | 'on'>('off');
  const [photo, setPhoto] = useState<PhotoFile | null>(null);
  const [showModal, setShowModal] = useState(false);
  const cameraRef = useRef<Camera>(null);
  
  const devices = useCameraDevices();
  const device = devices.find((d) => d.position === 'back');
  const isFocused = useIsFocused();

  useEffect(() => {
    const getPermission = async () => {
      console.log('Checking camera permission...');
      const permission = await Camera.getCameraPermissionStatus();
      console.log('Initial permission status:', permission);
      
      if (permission !== 'granted') {
        console.log('Requesting camera permission...');
        const newPermission = await Camera.requestCameraPermission();
        console.log('New permission status:', newPermission);
        setHasPermission(newPermission === 'granted');
      } else {
        setHasPermission(true);
      }
    };

    getPermission();
  }, []);

  const onError = useCallback((error: CameraRuntimeError) => {
    console.error('Camera error:', {
      code: error.code,
      message: error.message,
      stack: error.stack
    });
    Alert.alert('Erreur', 'Une erreur est survenue avec la caméra: ' + error.message);
  }, []);

  const onInitialized = useCallback(() => {
    console.log('Camera initialized');
    setIsCameraReady(true);
  }, []);

  const toggleFlash = useCallback(() => {
    setFlash(current => (current === 'off' ? 'on' : 'off'));
  }, []);

  const takePicture = useCallback(async () => {
    try {
      console.log('Taking picture...');
      if (!cameraRef.current) {
        console.log('Camera ref not ready');
        return;
      }

      const photo = await cameraRef.current.takePhoto({
        flash: flash,
        enableShutterSound: false,
      });

      console.log('Photo taken successfully:', photo.path);
      setPhoto(photo);
      setShowModal(true);

    } catch (error) {
      console.error('Failed to take photo:', error);
      Alert.alert('Erreur', 'Impossible de prendre la photo');
    }
  }, [flash]);

  const closeModal = () => {
    setShowModal(false);
    setPhoto(null);
  };

  if (hasPermission === null) {
    return (
      <View style={styles.center}>
        <Text>Vérification des permissions...</Text>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.center}>
        <Text>Accès à la caméra refusé</Text>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => Linking.openSettings()}>
          <Text style={styles.buttonText}>Ouvrir les paramètres</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!device) {
    return (
      <View style={styles.center}>
        <Text>Recherche de la caméra...</Text>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        ref={cameraRef}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={isFocused && !showModal}
        photo={true}
        onError={onError}
        enableZoomGesture
        onInitialized={onInitialized}
        orientation="portrait"
      />

      <View style={styles.controls}>
        <TouchableOpacity 
          style={styles.controlButton} 
          onPress={toggleFlash}
        >
          <Icon 
            name={flash === 'on' ? 'flash-on' : 'flash-off'} 
            size={24} 
            color="white" 
          />
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.captureButton, !isCameraReady && styles.buttonDisabled]}
          onPress={takePicture}
          disabled={!isCameraReady}
        >
          <View style={styles.captureButtonInner} />
        </TouchableOpacity>

        <View style={styles.controlButton} />
      </View>

      <Modal
        visible={showModal}
        transparent={true}
        animationType="slide"
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {photo && (
              <Image
                source={{ uri: `file://${photo.path}` }}
                style={styles.previewImage}
                resizeMode="contain"
              />
            )}
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={closeModal}
              >
                <Icon name="close" size={24} color="white" />
                <Text style={styles.modalButtonText}>Fermer</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.saveButton]}
                onPress={() => {
                  if (photo) {
                    imageDbService.saveImage(photo.path);
                    closeModal();
                  }
                }}
              >
                <Icon name="save" size={24} color="white" />
                <Text style={styles.modalButtonText}>Sauvegarder</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    gap: 20,
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  controls: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  controlButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'white',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  previewImage: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT - 200,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingVertical: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    position: 'absolute',
    bottom: 0,
  },
  modalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    minWidth: 120,
    justifyContent: 'center',
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 8,
  },
  cancelButton: {
    backgroundColor: '#FF4444',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
  },
});

export default CameraScreen;