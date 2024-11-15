import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Add this for icons
import CourseCard from './coursecard';

const Home = ({navigation}) => {
  const [courses, setCourses] = useState([]); // State to hold the course data
  const [loading, setLoading] = useState(true); // State for loading indicator

  // Sample course data
  const sampleCourses = [
    {course_id: 1, title: 'Introduction to React'},
    {course_id: 2, title: 'Advanced JavaScript'},
    {course_id: 3, title: 'Data Structures and Algorithms'},
    {course_id: 4, title: 'Web Development Bootcamp'},
    {course_id: 5, title: 'Mobile App Development'},
  ];

  // Simulate fetching courses
  useEffect(() => {
    const fetchCourses = () => {
      setTimeout(() => {
        setCourses(sampleCourses);
        setLoading(false);
      }, 1000); // Delay of 1 second
    };

    fetchCourses();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>LearnHub</Text>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#007BFF" />
      ) : (
        <ScrollView style={styles.scrollContainer}>
          <View style={styles.courseList}>
            <Text style={styles.sectionTitle}>Available Courses</Text>
            {courses.length > 0 ? (
              courses.map(course => (
                <TouchableOpacity
                  key={course.course_id}
                  style={styles.courseCard}
                  onPress={() =>
                    navigation.navigate('CourseDetails', {
                      courseId: course.course_id,
                    })
                  }>
                  <Icon name="school-outline" size={24} color="#007BFF" />
                  <Text style={styles.courseTitle}>{course.title}</Text>
                </TouchableOpacity>
              ))
            ) : (
              <Text>No courses available.</Text>
            )}
          </View>
        </ScrollView>
      )}
      <View style={styles.buttonsContainer}>
        <Button
          title="Courses"
          onPress={() => navigation.navigate('CourseList')}
        />
        <Button
          title="Progress"
          onPress={() => navigation.navigate('ProgressReport')}
        />
      </View>
      <View style={styles.authButtonsContainer}>
        <Button title="Login" onPress={() => navigation.navigate('Login')} />
        <Button
          title="Sign Up"
          onPress={() => navigation.navigate('Register')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  header: {
    padding: 20,
    backgroundColor: '#007BFF',
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
  },
  scrollContainer: {
    flex: 1,
    marginVertical: 10,
  },
  courseList: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  courseCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 2,
  },
  courseTitle: {
    marginLeft: 10,
    fontSize: 16,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  authButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});

export default Home;
