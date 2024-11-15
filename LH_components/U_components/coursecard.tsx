import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {CheckCircleIcon, BookOpenIcon} from 'react-native-heroicons/solid'; // Ensure you have these icons or suitable replacement"s
import StarRating from 'react-native-star-rating';

export default function CourseCard({ course, onPress }) {
  const [isEnrolled, setEnrolled] = useState(false);

  return (
    <View>
      <TouchableOpacity onPress={onPress} style={styles.container}>
        <View style={styles.overlay}>
          <View style={styles.iconContainer}>
            <TouchableOpacity
              onPress={() => setEnrolled(!isEnrolled)}
              style={styles.enrollmentButton}>
              <CheckCircleIcon
                size={25}
                color={isEnrolled ? 'green' : 'white'}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.title}>{course.title}</Text>
            <View style={styles.detailsContainer}>
              <BookOpenIcon size={18} color="lightgray" />
              <Text style={styles.detailsText}>{course.lessons} Lessons</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    marginRight: 16,
    position: 'relative',
  },
  image: {
    width: 320,
    height: 240,
    borderRadius: 24,
  },
  overlay: {
    position: 'absolute',
    padding: 16,
    height: '100%',
    width: '100%',
    borderRadius: 24,
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Subtle overlay for better readability
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  enrollmentButton: {
    padding: 12,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  infoContainer: {
    marginTop: 'auto',
  },
  starRatingContainer: {
    width: 90,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#D1D5DB',
  },
  detailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    color:'#45a5d1',
    marginTop: 8,
  },
  detailsText: {
    fontSize: 14,
    color: '#D1D5DB',
    fontWeight: '600',
    marginLeft: 8,
  },
});
