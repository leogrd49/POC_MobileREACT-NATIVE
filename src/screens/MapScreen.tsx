import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { useQuery, useMutation, gql } from '@apollo/client';

const GET_POLYGONS = gql`
  query GetPolygons {
    polygons {
      id
      name
      points
    }
  }
`;

const ADD_POLYGON = gql`
  mutation AddPolygon($name: String!, $points: String!) {
    addPolygon(name: $name, points: $points) {
      id
      name
      points
    }
  }
`;

const MapScreen = () => {
  const { data, loading, error, refetch } = useQuery(GET_POLYGONS);
  const [addPolygon] = useMutation(ADD_POLYGON);

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet.draw/1.0.4/leaflet.draw.css"/>
        <style>
          body { margin: 0; padding: 0; }
          #map { width: 100vw; height: 100vh; }
        </style>
      </head>
      <body>
        <div id="map"></div>
        <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet.draw/1.0.4/leaflet.draw.js"></script>
        <script>
          const map = L.map('map').setView([47.4784, -0.5632], 13);
          
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
          }).addTo(map);

          // Existing polygons
          ${data?.polygons?.map(p => `
            L.polygon(${p.points}, {
              color: '#3388ff',
              fillColor: '#3388ff',
              fillOpacity: 0.2,
              weight: 2
            }).addTo(map);
          `).join('\n') || ''}

          // Drawing controls
          var editableLayers = new L.FeatureGroup();
          map.addLayer(editableLayers);

          var drawControl = new L.Control.Draw({
            draw: {
              polygon: true,
              polyline: false,
              rectangle: false,
              circle: false,
              circlemarker: false,
              marker: false
            },
            edit: {
              featureGroup: editableLayers
            }
          });
          map.addControl(drawControl);

          map.on('draw:created', function(e) {
            var layer = e.layer;
            editableLayers.addLayer(layer);
            var coords = layer.getLatLngs()[0].map(function(p) {
              return {lat: p.lat, lng: p.lng};
            });
            window.ReactNativeWebView.postMessage(JSON.stringify({
              type: 'polygon',
              points: coords
            }));
          });
        </script>
      </body>
    </html>
  `;

  const handleMessage = async (event) => {
    const data = JSON.parse(event.nativeEvent.data);
    if (data.type === 'polygon') {
      try {
        await addPolygon({
          variables: {
            name: `Polygon ${Date.now()}`,
            points: JSON.stringify(data.points)
          }
        });
        refetch();
      } catch (error) {
        console.error('Error saving polygon:', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <WebView
        source={{ html: htmlContent }}
        style={styles.map}
        onMessage={handleMessage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 }
});

export default MapScreen;