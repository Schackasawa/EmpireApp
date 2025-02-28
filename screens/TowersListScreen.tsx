import React from 'react';
import { SafeAreaView, ScrollView, Text, FlatList, StyleSheet } from 'react-native';
import TowerItem from '../components/TowerItem';
import { Tower } from '../types';

interface TowersListScreenProps {
  towers: Tower[];
  refreshTowers: () => void;
}

const TowersListScreen = ({ towers, refreshTowers }: TowersListScreenProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <Text style={styles.title}>Towers List</Text>
        <FlatList
          data={towers}
          renderItem={({ item }) => <TowerItem tower={item} />}
          keyExtractor={(item) => item.id.toString()}
          style={styles.list}
          scrollEnabled={false}
          onRefresh={refreshTowers}
          refreshing={false}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    padding: 20,
  },
  list: {
    width: '100%',
  },
});

export default TowersListScreen;