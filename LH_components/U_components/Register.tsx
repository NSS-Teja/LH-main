import React, {useState} from 'react';
import {View, TextInput, Button, Text, StyleSheet, Alert} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import axios from 'axios';

const Register = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isInstructor, setIsInstructor] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    // Validate fields before making the request
    if (!name || !email || !phone || !password) {
      Alert.alert('Error', 'Please fill all the fields');
      return;
    }

    // Prepare data to be sent
    const data = {
      name,
      email,
      phone,
      password,
      isInstructor,
    };

    setLoading(true); // Start loading

    try {
      console.log(1);
      const response = await axios.post(
        'http://192.168.1.17:5000/api/users/register',
        data,
      );
      console.log(2);
      Alert.alert('Success', 'Registration successful!');
      navigation.navigate('Login');
    } catch (error) {
      console.log(3);
      Alert.alert('Error', 'Network error. Please try again later.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };




  //   try {
  //     console.warn(1);
  //     // Send data to backend
  //     const response = await fetch('http://10.0.2.2:5000/api/users/register', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(data),
  //     });
  //     console.log(data);
  //     // console.log(response.body);
  //     console.warn(2);
  //     const result = await response.data;
  //     console.log(3);
  //     console.log(result);
    
  //     // const result = await response.json();
  //     console.warn(4);
  //     if (response.ok) {
  //       // Handle successful registration
  //       Alert.alert('Success', 'Registration successful!');
  //       navigation.navigate('Login'); // Redirect to login page
  //     } else {
  //       // Handle server errors or validation issues
  //       Alert.alert('Error', result.message || 'Something went wrong');
  //     }
  //   } catch (error) {
  //     // Handle network errors
  //     Alert.alert('Error', 'Network error. Please try again later.');
  //     console.warn(0)
  //     console.error(error);
  //   } finally {
  //     setLoading(false); // Stop loading
  //   }
  // };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Register</Text>
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
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Phone"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <View style={styles.checkboxContainer}>
        <CheckBox value={isInstructor} onValueChange={setIsInstructor} />
        <Text style={styles.checkboxLabel}>Instructor</Text>
      </View>
      <Button
        title={loading ? 'Registering...' : 'Register'}
        onPress={handleRegister}
        disabled={loading}
      />
      <Text
        style={styles.loginText}
        onPress={() => navigation.navigate('Login')}>
        Already have an account? Login
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 16,
  },
  loginText: {
    marginTop: 20,
    color: '#007BFF',
    textAlign: 'center',
  },
});

export default Register;
