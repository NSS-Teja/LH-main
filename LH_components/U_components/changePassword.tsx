import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet, Alert} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ChangePasswordScreen = ({navigation}) => {
  const [otp, setOtp] = useState('');
  const [userOtp, setUserOtp] = useState('');
  const [email,setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const sendOtp = async () => {
    try {
    const token = await AsyncStorage.getItem('token');
    console.log(token);
    if (!token) {
      Alert.alert('Error', 'No email found. Please log in again.');
      return;
    }
      const response = await axios.post(
        'http://10.0.2.2:5000/api/users/send-otp',
        {
          email, // payload data
        },
        {
          headers: {
            Authorization: `${token}`,
          },
        },
      );
      setOtp(response.data.emailOTP);
      Alert.alert(
        'OTP Sent',
        'An OTP has been sent to your registered email/phone.',
      );
    } catch (error) {
      console.error('Error sending OTP:', error);
      Alert.alert('Error', 'Failed to send OTP');
    }
  };

  const changePassword = async () => {
    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    console.log(otp,userOtp);
    console.log(typeof(otp),typeof(userOtp));
    if (otp.toString() !== userOtp.toString()) {
      Alert.alert('Error', 'Incorrect OTP');
      return;
    }
    try {
        const token = await AsyncStorage.getItem('token');
        console.log(token);
      const response = await axios.put(
        'http://10.0.2.2:5000/api/users/change-password',
        {
          newPassword,
        },
        {
          headers: {
            Authorization: `${token}`,
          },
        },
      );
      Alert.alert('Success', 'Password changed successfully');
      navigation.goBack();
    } catch (error) {
      console.error('Error changing password:', error);
      Alert.alert('Error', 'Failed to change password');
    }
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.header}>Change Password</Text> */}
      <TextInput
        style={styles.input}
        placeholder="Enter your Email"
        value={email}
        onChangeText={setEmail}
      />
      <Button title="Send OTP" onPress={sendOtp} />
      <TextInput
        style={styles.input}
        placeholder="Enter OTP"
        value={userOtp}
        onChangeText={setUserOtp}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="New Password"
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm New Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      <Button title="Change Password" onPress={changePassword} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 20},
  header: {fontSize: 24, fontWeight: 'bold', marginBottom: 20},
  input: {borderBottomWidth: 1, marginBottom: 10, padding: 10},
});

export default ChangePasswordScreen;
