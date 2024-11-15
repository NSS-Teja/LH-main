import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons';
//import Icons from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MyCoursesScreen = ({navigation}) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Fetch the enrolled courses from the backend
  const fetchEnrolledCourses = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Error', 'No email found. Please log in again.');
        return;
      }
      const response = await axios.get(
        `http://10.0.2.2:5000/courses/enrolled`,
        {
          headers:{
            Authorization: `${token}`, // Assuming you use JWT token
          }, // Assuming you use studentid from token to fetch enrolled courses
        },
      );
      console.log(response.data);
      setCourses(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching courses:', error);
      setLoading(false);
      Alert.alert('Error', 'Failed to load courses.');
    }
  };

  useEffect(() => {
    fetchEnrolledCourses();
  }, []);

  if (loading) {
    return (
      <ActivityIndicator size="large" color="#007BFF" style={styles.loading} />
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Courses</Text>
      <ScrollView>
        {loading ? (
          <ActivityIndicator size="large" color="#007BFF" />
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : (
          <ScrollView>
            {courses.map(course => (
              <TouchableOpacity
                key={course._id}
                style={styles.courseCard}
                onPress={() =>
                  navigation.navigate('CourseDetails', {
                    courseId: course._id, // Pass course ID to CourseDetails
                  })
                }>
                <Icon
                  name="home"
                  size={24}
                  
                />
                <View style={styles.cardContent}>
                  <Text style={styles.courseTitle}>{course.title}</Text>
                  <Text style={styles.courseDescription}>
                    {course.description}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  courseCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  cardContent: {
    marginLeft: 10,
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  courseDescription: {
    fontSize: 14,
    color: '#555',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
});

export default MyCoursesScreen;
