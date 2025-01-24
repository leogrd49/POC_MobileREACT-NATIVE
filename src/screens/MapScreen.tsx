import React, { useState, useCallback } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { LeafletView } from 'react-native-leaflet-view';
import { WebviewLeafletMessage, MapLayer, LatLng } from 'react-native-leaflet-view';

const MapScreen = () => {
  const [location, setLocation] = useState<LatLng>({
    lat: 47.4784,
    lng: -0.5632
  });

  const mapLayers: MapLayer[] = [{
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    baseLayerIsChecked: true,
    baseLayerName: 'OpenStreetMap.Mapnik',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  }];

  const handleMessage = useCallback((message: WebviewLeafletMessage) => {
    if (message.payload?.touchLatLng) {
      setLocation(message.payload.touchLatLng);
    }
  }, []);

  return (
    <View style={styles.container}>
      <LeafletView
        style={styles.map}
        mapCenterPosition={location}
        zoom={13}
        mapMarkers={[{
          position: location,
          icon: '📍',
          size: [32, 32],
          id: 'mainMarker',
        }]}
        mapLayers={mapLayers}
        onMessageReceived={handleMessage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default MapScreen;