import React from 'react';
import {View, Text, Button, Alert, StyleSheet} from 'react-native';

const ContentManagementScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Content Management</Text>
      <Button title="Upload Video" onPress={() => Alert.alert('Upload Video')} />
      <Button title="Upload PDF" onPress={() => Alert.alert('Upload PDF')} />
      <Button title="Add Quiz" onPress={() => Alert.alert('Add Quiz')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default ContentManagementScreen;
