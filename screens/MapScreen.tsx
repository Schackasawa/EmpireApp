import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import MapView, { Marker, Circle } from 'react-native-maps';
import { API_URL } from '../constants/api';
import { Tower, Coordinates } from '../types';

interface MapScreenProps {
  towers: Tower[];
  currentLocation: Coordinates | null;
  refreshTowers: () => void;
}

const MapScreen = ({ towers, currentLocation, refreshTowers }: MapScreenProps) => {
    const addTower = async () => {
        if (!currentLocation) {
            Alert.alert('Error', 'Current location is not available');
            return;
        }
        
        const towerData = {
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
            userId: 1,
        };
        
        try {
            const response = await fetch(`${API_URL}/towers`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ latitude: towerData.latitude, longitude: towerData.longitude, user_id: towerData.userId })
            });
            
            if (response.ok) {
                Alert.alert('Success', 'Tower added successfully');
                refreshTowers();
            } else {
                Alert.alert('Error', 'Failed to add tower');
            }
        } catch (error) {
            Alert.alert('Error', 'An error occurred while adding the tower: ' + error);
        }
    };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.fullScreenMap}
        showsUserLocation={true}
        showsCompass={true}
        showsScale={true}
        showsBuildings={true}
        initialRegion={{
          latitude: currentLocation?.latitude || 47.6768,
          longitude: currentLocation?.longitude || -122.2054,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        {towers.map(tower => (
          <>
            <Circle
                key={`${tower.id}-outer`}
                center={{ latitude: tower.latitude, longitude: tower.longitude }}
                radius={2414.02} // 1.5 miles in meters
                strokeColor="rgba(255, 0, 0, 0.8)"
                fillColor="rgba(255, 0, 0, 0.4)"
            />
            <Circle
                key={`${tower.id}-inner`}
                center={{ latitude: tower.latitude, longitude: tower.longitude }}
                radius={1609.34} // 1 mile in meters
                strokeColor="rgba(255, 0, 0, 0.8)"
                fillColor="rgba(255, 255, 255, 0.5)"
            />
            <Marker
                key={tower.id}
                coordinate={{ latitude: tower.latitude, longitude: tower.longitude }}
                title={`${tower.user.first_name} ${tower.user.last_name}'s Tower`}
                description={`Lat: ${tower.latitude}, Lon: ${tower.longitude}`}
            />
          </>
        ))}
        
      </MapView>
      <TouchableOpacity style={styles.button}  onPress={addTower}>
        <Text style={styles.buttonText}>+ Tower</Text>
      </TouchableOpacity>
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
  button: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default MapScreen;