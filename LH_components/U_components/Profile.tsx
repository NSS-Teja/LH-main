import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Button,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import axios from 'axios';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = ({navigation}) => {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false); // New state to toggle edit mode
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const [userData, setUserData] = useState('');

  const fetchUserProfile = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      console.log(token);
      if (!token) {
        Alert.alert('Error', 'No email found. Please log in again.');
        return;
      }
      const response = await axios
        .get('http://10.0.2.2:5000/api/users/profile', {headers:
          {
            Authorization: `${token}`,     
           },})
        .then(res => {
          console.log(res.data.Data);
          setUserData(res.data.Data);
          setName(res.data.Data.name);
          setEmail(res.data.Data.email);
          setPhone(res.data.Data.phone);
        });
    } catch (err) {
      console.error('Error fetching profile data:', err);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

// useEffect(() => {
//     fetchUserProfile();
//   }, []);

  useFocusEffect(
    React.useCallback(() => {
      setEmail('');
      setName('');
      setPhone('');      
      fetchUserProfile();
      // return () => {};
    }, []),
  );

  // const fetchUserProfile = async () => {
  //   try {
  //     const storedEmail = await AsyncStorage.getItem('eId');
  //     console.log(storedEmail);
  //     if (!storedEmail) {
  //       Alert.alert('Error', 'No email found. Please log in again.');
  //       return;
  //     }
  //     console.log(0);
  //     const response = await axios.get(
  //       `http://192.168.1.120:5000/api/users/profile/${storedEmail}`, // Email in the URL path
  //       {
  //         headers: {'Content-Type': 'application/json'},
  //       },
  //     );

  //     console.log(1);

  //     const profileData = response.data;
  //     setUserProfile(profileData);
  //     console.log(response.data, profileData);
  //     setName(profileData.name);
  //     setEmail(profileData.email);
  //     setPhone(profileData.phone);
  //     setLoading(false);
  //   } catch (err) {
  //     console.error('Error fetching profile data:', err);
  //     setLoading(false);
  //   }
  // };

  const handleSaveProfile = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('token');

      const response = await axios.put(
        `http://10.0.2.2:5000/api/users/profile`,
        {name, newEmail: email, phone}, // Data goes here as the second parameter
        {
          headers: {
            Authorization: `${token}`,
          },
        },
      );
      if (response.status === 200) {
        setUserProfile(response.data);
        setEditMode(false); // Exit edit mode after saving
        Alert.alert('Success', 'Profile updated successfully');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      Alert.alert('Error', 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <ActivityIndicator size="large" color="#007BFF" style={styles.loading} />
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Profile</Text>
      {editMode ? (
        <>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setPhone}
          />
          <TextInput
            style={styles.input}
            placeholder="Phone"
            value={phone}
            onChangeText={setPhone}
          />
          <Button title="Save" onPress={handleSaveProfile} />
          <Button
            title="Cancel"
            onPress={() => setEditMode(false)}
            color="red"
          />
        </>
      ) : (
        <>
          <Text style={styles.label}>Name: {name}</Text>
          <Text style={styles.label}>Email: {email}</Text>
          <Text style={styles.label}>Phone: {phone}</Text>
          <Button title="Edit Profile" onPress={() => setEditMode(true)} />
          <Button
            title="Change Password"
            onPress={() => navigation.navigate('ChangePassword')}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProfileScreen;
