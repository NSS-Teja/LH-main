// DiscussionForumScreen.js
import React from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';

const DiscussionForumScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Discussion Forum</Text>
      <ScrollView>
        {/* Replace with dynamic discussion data */}
        <View style={styles.threadCard}>
          <Text style={styles.threadTitle}>Discussion Thread 1</Text>
          <Button title="View Thread" onPress={() => { /* Handle View Thread */ }} />
        </View>
        <View style={styles.threadCard}>
          <Text style={styles.threadTitle}>Discussion Thread 2</Text>
          <Button title="View Thread" onPress={() => { /* Handle View Thread */ }} />
        </View>
      </ScrollView>
      <Button title="Create New Thread" onPress={() => { /* Handle Create New Thread */ }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  threadCard: {
    backgroundColor: '#f4f4f4',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
  },
  threadTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default DiscussionForumScreen;
