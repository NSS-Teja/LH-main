import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';

const CourseCard = ({image, title, lessons, onPress}) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{uri: image}} style={styles.cardImage} />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardLessons}>{lessons} Lessons</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 5,
    marginVertical: 10,
    marginHorizontal: 5,
    width: '48%', // Approximate width based on screenshot
    justifyContent: 'space-around',
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: 90,
    resizeMode: 'cover',
  },
  cardContent: {
    padding: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  cardLessons: {
    fontSize: 14,
    color: '#888',
  },
});

export default CourseCard;
