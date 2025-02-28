import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Tower, Coordinates } from '../types';

interface MapScreenProps {
  towers: Tower[];
  currentLocation: Coordinates | null;
}

const MapScreen = ({ towers, currentLocation }: MapScreenProps) => {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.fullScreenMap}
        initialRegion={{
          latitude: currentLocation?.latitude || 47.6768,
          longitude: currentLocation?.longitude || -122.2054,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        {towers.map(tower => (
          <Marker
            key={tower.id}
            coordinate={{ latitude: tower.latitude, longitude: tower.longitude }}
            title={`${tower.user.first_name} ${tower.user.last_name}'s Tower`}
            description={`Lat: ${tower.latitude}, Lon: ${tower.longitude}`}
          />
        ))}
        {currentLocation && (
          <Marker
            coordinate={currentLocation}
            title="You Are Here"
            description={`Lat: ${currentLocation.latitude}, Lon: ${currentLocation.longitude}`}
            pinColor="blue"
          />
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fullScreenMap: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});

export default MapScreen;