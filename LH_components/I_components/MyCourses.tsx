import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MyCoursesScreen = ({navigation}) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await axios.get('http://10.0.2.2:5000/courses/created', {
          headers: {
            Authorization: `${token}`,
          },
        });
        setCourses(response.data); // Assuming the backend returns an array of courses
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return (
      <ActivityIndicator
        size="large"
        color="#0000ff"
        style={styles.loadingIndicator}
      />
    );
  }

  const renderCourse = ({item}) => (
    <TouchableOpacity
      style={styles.courseCard}
      onPress={() => navigation.navigate('iCourseDetails', {courseId: item._id})} // Navigate to CourseDetails with courseId
    >
      <Text style={styles.courseTitle}>{item.title}</Text>
      <Text style={styles.courseCategory}>{item.category}</Text>
      <Text style={styles.courseInstructor}>
        Instructor: {item.instructor.name}
      </Text>
      <Text style={styles.coursePrice}>Price: ${item.price}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Courses</Text>
      <FlatList
        data={courses}
        renderItem={renderCourse}
        keyExtractor={item => item._id} // Use MongoDB _id as key
        ListEmptyComponent={<Text>No courses available</Text>} // Fallback in case of empty list
      />
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
  courseCard: {
    padding: 20,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  courseCategory: {
    fontSize: 14,
    color: '#666',
  },
  courseInstructor: {
    fontSize: 14,
    color: '#333',
    marginTop: 5,
  },
  coursePrice: {
    fontSize: 14,
    color: '#009900',
    marginTop: 5,
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MyCoursesScreen;
