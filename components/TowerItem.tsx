import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Tower } from '../types';

interface TowerItemProps {
  tower: Tower;
}

const TowerItem = ({ tower }: TowerItemProps) => {
  return (
    <View style={styles.towerItem}>
      <Text>Lat: {tower.latitude}, Lon: {tower.longitude}</Text>
      <Text>User: {tower.user.first_name} {tower.user.last_name}</Text>
      <Text>Email: {tower.user.email}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  towerItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
});

export default TowerItem;