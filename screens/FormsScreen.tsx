import React, { useState } from 'react';
import { SafeAreaView, ScrollView, Text, TextInput, Button, StyleSheet } from 'react-native';
import { API_URL } from '../constants/api';
import { User, Tower } from '../types';

interface FormsScreenProps {
  refreshTowers: () => void;
}

const FormsScreen = ({ refreshTowers }: FormsScreenProps) => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [latitude, setLatitude] = useState<string>('');
  const [longitude, setLongitude] = useState<string>('');
  const [userId, setUserId] = useState<string>('');

  const createUser = () => {
    fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ first_name: firstName, last_name: lastName, email })
    })
      .then(response => response.json())
      .then((data: User) => {
        console.log('User created:', data);
        setFirstName('');
        setLastName('');
        setEmail('');
      })
      .catch(error => console.error('Error creating user:', error));
  };

  const createTower = () => {
    const lat = parseFloat(latitude.trim());
    const lon = parseFloat(longitude.trim());
    const uid = parseInt(userId.trim());

    if (isNaN(lat) || isNaN(lon) || isNaN(uid)) {
      console.error('Invalid input: latitude, longitude, and userId must be numbers');
      return;
    }

    fetch(`${API_URL}/towers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ latitude: lat, longitude: lon, user_id: uid })
    })
      .then(response => response.json())
      .then((data: Tower) => {
        console.log('Tower created:', data);
        refreshTowers();
        setLatitude('');
        setLongitude('');
        setUserId('');
      })
      .catch(error => console.error('Error creating tower:', error));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.contentContainer}>
        <Text style={styles.subtitle}>Add a New User</Text>
        <TextInput
          style={styles.input}
          placeholder="First Name"
          value={firstName}
          onChangeText={setFirstName}
        />
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          value={lastName}
          onChangeText={setLastName}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <Button title="Add User" onPress={createUser} />

        <Text style={styles.subtitle}>Add a New Tower</Text>
        <TextInput
          style={styles.input}
          placeholder="Latitude (e.g., 47.6768)"
          value={latitude}
          onChangeText={setLatitude}
          keyboardType="numbers-and-punctuation"
        />
        <TextInput
          style={styles.input}
          placeholder="Longitude (e.g., -122.2054)"
          value={longitude}
          onChangeText={setLongitude}
          keyboardType="numbers-and-punctuation"
        />
        <TextInput
          style={styles.input}
          placeholder="User ID (e.g., 1)"
          value={userId}
          onChangeText={setUserId}
          keyboardType="numeric"
        />
        <Button title="Add Tower" onPress={createTower} />
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
  contentContainer: {
    padding: 20,
  },
  subtitle: {
    fontSize: 18,
    marginTop: 20,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    width: '100%',
  },
});

export default FormsScreen;