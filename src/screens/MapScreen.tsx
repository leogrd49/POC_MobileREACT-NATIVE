import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { useQuery, gql } from '@apollo/client';

const GET_POLYGONS = gql`
  query GetPolygons {
    polygons {
      id
      name
      points
    }
  }
`;

const MapScreen = () => {
  const { data, loading, error } = useQuery(GET_POLYGONS);

  console.log('Query status:', { loading, error });
  console.log('Raw data:', data);

  if (data?.polygons) {
    data.polygons.forEach(polygon => {
      console.log('Polygon:', {
        id: polygon.id,
        name: polygon.name,
        points: JSON.parse(polygon.points)
      });
    });
  }

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
        <style>
          body { margin: 0; padding: 0; }
          #map { width: 100vw; height: 100vh; }
        </style>
      </head>
      <body>
        <div id="map"></div>
        <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
        <script>
          const map = L.map('map').setView([47.4784, -0.5632], 13);
          
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
          }).addTo(map);

          ${data?.polygons?.map(p => `
            console.log('Drawing polygon:', ${p.points});
            L.polygon(${p.points}, {
              color: '#3388ff',
              fillColor: '#3388ff',
              fillOpacity: 0.2,
              weight: 2
            }).addTo(map);
          `).join('\n') || ''}
        </script>
      </body>
    </html>
  `;

  return (
    <View style={styles.container}>
      <WebView
        source={{ html: htmlContent }}
        style={styles.map}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 }
});

export default MapScreen;