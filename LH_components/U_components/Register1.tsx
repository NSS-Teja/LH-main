import React, {useState} from 'react';
import {View, TextInput, Button, Text, StyleSheet, Alert} from 'react-native';
import CheckBox from '@react-native-community/checkbox';

const Register = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isInstructor, setIsInstructor] = useState(false);
  const [registrations, setRegistrations] = useState([]); // Array to store registrations

  const handleRegister = () => {
    // Prepare data to be stored
    const newRegistration = {
      name,
      email,
      phone,
      password,
      isInstructor,
      timestamp: new Date().toLocaleString(),
    };

    // Add the new registration to the array
    setRegistrations([...registrations, newRegistration]);

    // Clear inputs after storing
    setName('');
    setEmail('');
    setPhone('');
    setPassword('');
    setIsInstructor(false);

    console.log('Registrations:', registrations);
    Alert.alert('Success', 'Registration stored locally!');
  };

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
      />
      <TextInput
        style={styles.input}
        placeholder="Phone"
        value={phone}
        onChangeText={setPhone}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {/* <View style={styles.checkboxContainer}>
        <CheckBox value={isInstructor} onValueChange={setIsInstructor} />
        <Text style={styles.checkboxLabel}>Instructor</Text>
      </View> */}
      <Button title="Register" onPress={handleRegister} />
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
