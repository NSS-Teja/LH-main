import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Button,
  ActivityIndicator,
  Alert,
  TouchableWithoutFeedback,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'; // Add Axios for making API requests
import {useFocusEffect} from '@react-navigation/native';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import {faBookOpen} from '@fortawesome/free-solid-svg-icons/faBookOpen';

const Home = ({navigation}) => {
  const [courses, setCourses] = useState([]); // State to hold the course data
  const [loading, setLoading] = useState(false); // State for loading indicator
  const [dropdownVisible, setDropdownVisible] = useState(false); // State for drop-down visibility
  const [token, setToken] = useState(null);
  // Function to toggle drop-down visibility
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      setToken(null);
      Alert.alert('Logged out', 'You have been logged out successfully.');
      navigation.navigate('Home');
    } catch (error) {
      console.error('Error during logout:', error);
      Alert.alert('Error', 'Failed to log out. Please try again.');
    }
  };

  // Fetch courses from backend
  const fetchCourses = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://10.0.2.2:5000/courses');
      setCourses(response.data.coursesList);
    } catch (error) {
      console.error('Error fetching courses:', error);
      Alert.alert('Error', 'Failed to fetch courses.');
    } finally {
      setLoading(false);
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      const getToken = async () => {
        const storedToken = await AsyncStorage.getItem('token');
        setToken(storedToken);
      };
      getToken(); // Fetch the courses when the component mounts
    }, []),
  );

  useEffect(() => {
    fetchCourses(); // Fetch the courses when the component mounts
  }, []);

  return (
    <TouchableWithoutFeedback onPress={() => setDropdownVisible(false)}>
      <View style={styles.container}>
        {/* Header Section */}

        <View style={styles.header}>
          <Text style={styles.appName}>LearnHub</Text>
          <TouchableOpacity style={styles.userIcon} onPress={toggleDropdown}>
            <FontAwesomeIcon icon={faUser} size={36} color="#fff" />
          </TouchableOpacity>
          {dropdownVisible && (
            <View style={styles.dropdownMenu}>
              {!token ? (
                <>
                  <TouchableOpacity
                    style={styles.dropdownItem}
                    onPress={() => {
                      toggleDropdown();
                      navigation.navigate('Login');
                    }}>
                    <Text style={styles.dropdownText}>Login</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.dropdownItem}
                    onPress={() => {
                      toggleDropdown();
                      navigation.navigate('Register');
                    }}>
                    <Text style={styles.dropdownText}>Sign Up</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <TouchableOpacity
                    style={styles.dropdownItem}
                    onPress={() => {
                      toggleDropdown();
                      handleLogout();
                    }}>
                    <Text style={styles.dropdownText}>Logout</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.dropdownItem}
                    onPress={() => {
                      toggleDropdown();
                      navigation.navigate('Profile');
                    }}>
                    <Text style={styles.dropdownText}>Profile</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          )}
        </View>

        <View style={styles.maincontent}>
          {/* Main Content */}
          <View style={styles.body}>
            {loading ? (
              <ActivityIndicator size="large" color="#007BFF" />
            ) : (
              <ScrollView style={styles.scrollContainer}>
                <View style={styles.courseList}>
                  <Text style={styles.sectionTitle}>Available Courses</Text>
                  {courses.length > 0 ? (
                    courses.map(course => (
                      <TouchableOpacity
                        key={course._id}
                        style={styles.courseCard}
                        onPress={() =>
                          navigation.navigate('CourseDetails', {
                            courseId: course._id,
                          })
                        }>
                        <FontAwesomeIcon
                          icon={faBookOpen}
                          size={36}
                          color="#2175bf"
                        />
                        <View style={styles.cardContent}>
                          <Text style={styles.courseTitle}>{course.title}</Text>
                          <Text style={styles.courseDescription}>
                            {course.description}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    ))
                  ) : (
                    <Text>No courses available.</Text>
                  )}
                </View>
              </ScrollView>
            )}

            {token ? (
              <View style={styles.buttonsContainer}>
                <Button
                  title="MyCourses"
                  onPress={() => navigation.navigate('MyCoursesScreen')}
                />
                <Button
                  title="Courses"
                  onPress={() => navigation.navigate('CourseList')}
                />
                <Button
                  title="Progress"
                  onPress={() => navigation.navigate('ProgressReport')}
                />
              </View>
            ) : (
              <View style={styles.noTokenMessage}>
                <Text>Please log in to access these options.</Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 20,
    backgroundColor: '#f9f9f9',
  },
  header: {
    height: '8.5%', // 8.5% of the screen height
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#007BFF',
    paddingHorizontal: 20,
    elevation: 5,
    marginBottom: 20,
    width: '100%',
  },
  maincontent: {
    flex: 1,
    padding: 20,
  },
  appName: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  noTokenMessage: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 5,
  },
  userIcon: {
    padding: 5,
  },
  dropdownMenu: {
    position: 'absolute',
    top: 50,
    right: 20,
    backgroundColor: '#fff',
    borderRadius: 5,
    elevation: 5,
    width: 120,
    zIndex: 10,
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  dropdownText: {
    fontSize: 16,
    color: '#333',
  },
  body: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
    marginVertical: 10,
  },
  courseList: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  courseCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
  },
  cardContent: {
    marginLeft: 10,
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007BFF',
  },
  courseDescription: {
    fontSize: 14,
    color: '#555',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});

export default Home;
