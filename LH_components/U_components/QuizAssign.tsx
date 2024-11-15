// QuizzesAssignmentsScreen.js
import React from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';

const QuizzesAssignmentsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Quizzes & Assignments</Text>
      <ScrollView>
        {/* Replace with dynamic quiz/assignment data */}
        <View style={styles.itemCard}>
          <Text style={styles.itemTitle}>Quiz 1</Text>
          <Button title="Start Quiz" onPress={() => { /* Handle Start Quiz */ }} />
        </View>
        <View style={styles.itemCard}>
          <Text style={styles.itemTitle}>Assignment 1</Text>
          <Button title="Submit Assignment" onPress={() => { /* Handle Submit Assignment */ }} />
        </View>
      </ScrollView>
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
  itemCard: {
    backgroundColor: '#f4f4f4',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default QuizzesAssignmentsScreen;
