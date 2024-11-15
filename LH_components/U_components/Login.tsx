import React, {useState} from 'react';
import {View, TextInput, Button, Text, StyleSheet, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // To handle loading state

  const validateEmail = email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = password => {
    return password.length >= 1;
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    if (!validatePassword(password)) {
      Alert.alert('Error', 'Password must be at least 8 characters long');
      return;
    }

    setLoading(true);

    try {
      // Make a POST request to the backend login route using axios
      const response = await axios.post(
        'http://10.0.2.2:5000/api/users/login',
        {
          email,
          password,
        },
      );

      if (response.status === 200) {
        // Login successful
        const token = response.data.token;
        console.log('Login successful:', token);

        // You can now store the token locally if needed (using AsyncStorage)
        await AsyncStorage.setItem('token', token);
        if (response.data.user.role === 'instructor') {
          navigation.navigate('InstructorHome');
        }
        // Navigate to the home screen after login
        else {
          navigation.navigate('Home');
        }
      } else {
        // Handle login failure (e.g., invalid credentials)
        Alert.alert('Login Failed', 'Invalid email or password');
      }
    } catch (error) {
      // Handle network or server errors
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        Alert.alert(
          'Login Failed',
          error.response.data.message || 'Invalid email or password',
        );
      } else {
        // Something happened in setting up the request that triggered an Error
        Alert.alert('Error', 'Network error. Please try again later.');
      }
      console.error('Login error:', error);
    } finally {
      setLoading(false); // Stop loading once request is done
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.header}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button
        title={loading ? 'Logging in...' : 'Login'}
        onPress={handleLogin}
        disabled={loading} // Disable the button when loading
      />
      <Text
        style={styles.registerText}
        onPress={() => navigation.navigate('Register')}>
        Don't have an account? Register
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
  registerText: {
    marginTop: 20,
    color: '#007BFF',
    textAlign: 'center',
  },
});

export default Login;
