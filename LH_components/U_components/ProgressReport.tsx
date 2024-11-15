// ProgressReportScreen.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const ProgressReportScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Progress Report</Text>
      <ScrollView>
        {/* Replace with dynamic progress data */}
        <View style={styles.progressCard}>
          <Text style={styles.progressDetails}>Completed Course 1</Text>
        </View>
        <View style={styles.progressCard}>
          <Text style={styles.progressDetails}>Completed Course 2</Text>
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
  progressCard: {
    backgroundColor: '#f4f4f4',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
  },
  progressDetails: {
    fontSize: 16,
  },
});

export default ProgressReportScreen;
