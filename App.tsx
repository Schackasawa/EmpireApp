import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';

// Import types
import { Tower, Coordinates } from './types';

// Import screens
import MapScreen from './screens/MapScreen';
import TowersListScreen from './screens/TowersListScreen';
import FormsScreen from './screens/FormsScreen';

// Import constants
import { API_URL } from './constants/api';

const Tab = createBottomTabNavigator();

export default function App() {
  const [towers, setTowers] = useState<Tower[]>([]);
  const [currentLocation, setCurrentLocation] = useState<Coordinates | null>(null);

  const fetchTowers = () => {
    fetch(`${API_URL}/towers`)
      .then(response => response.json())
      .then((data: Tower[]) => {
        console.log('Towers fetched:', data);
        setTowers(data);
      })
      .catch(error => console.error('Error fetching towers:', error));
  };

  useEffect(() => {
    fetchTowers();

    let subscription: Location.LocationSubscription | undefined;
    (async () => {
      console.log('Requesting location permission...');
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Location permission denied');
        return;
      }
      console.log('Permission granted, starting watch...');

      subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          distanceInterval: 1,  // Update every 1 meter
          timeInterval: 500,    // Check every 0.5 seconds
        },
        (location) => {
          const newLocation = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          };
          console.log('Location update:', newLocation);
          setCurrentLocation(newLocation);
        }
      );
    })();

    return () => {
      if (subscription) {
        console.log('Cleaning up location subscription');
        subscription.remove();
      }
    };
  }, []);

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Map') {
              iconName = focused ? 'map' : 'map-outline';
            } else if (route.name === 'Towers') {
              iconName = focused ? 'list' : 'list-outline';
            } else if (route.name === 'Add') {
              iconName = focused ? 'add-circle' : 'add-circle-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Map">
          {(props) => <MapScreen {...props} towers={towers} currentLocation={currentLocation} refreshTowers={fetchTowers}/>}
        </Tab.Screen>
        <Tab.Screen name="Towers">
          {(props) => <TowersListScreen {...props} towers={towers} refreshTowers={fetchTowers} />}
        </Tab.Screen>
        <Tab.Screen name="Add">
          {(props) => <FormsScreen {...props} refreshTowers={fetchTowers} />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}