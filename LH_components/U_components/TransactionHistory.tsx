// TransactionHistoryScreen.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const TransactionHistoryScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Transaction History</Text>
      <ScrollView>
        {/* Replace with dynamic transaction data */}
        <View style={styles.transactionCard}>
          <Text style={styles.transactionDetails}>Transaction 1 - $10.00 - 01/01/2024</Text>
        </View>
        <View style={styles.transactionCard}>
          <Text style={styles.transactionDetails}>Transaction 2 - $20.00 - 01/02/2024</Text>
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
  transactionCard: {
    backgroundColor: '#f4f4f4',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
  },
  transactionDetails: {
    fontSize: 16,
  },
});

export default TransactionHistoryScreen;
