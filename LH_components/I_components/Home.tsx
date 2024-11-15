import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  FlatList,
  ActivityIndicator,
  Button,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CourseCard from '../asset/courseCard'; // Import the CourseCard component
import axios from 'axios';

const InstructorHomeScreen = ({navigation}) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  // Fetch courses when the component mounts
  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      // Replace with your backend endpoint
     const response = await axios.get('http://10.0.2.2:5000/courses/created',{
      headers:{
        Authorization: `${await AsyncStorage.getItem('token')}`,
      }
     });
     setCourses(response.data.coursesList); // Assuming data is an array of course objects
    } catch (error) {
      console.error('Error fetching courses:', error);
      Alert.alert('Error', 'Failed to load courses.');
    } finally {
      setLoading(false);
    }
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      Alert.alert('Logged out', 'You have been logged out successfully.');
      navigation.navigate('Home');
    } catch (error) {
      console.error('Error during logout:', error);
      Alert.alert('Error', 'Failed to log out. Please try again.');
    }
  };

  const renderCourseCard = ({item}) => (
    <CourseCard
      image={item.imageUrl} // Adjust based on your data structure
      title={item.title}
      lessons={item.lessonsCount} // Adjust based on your data structure
      onPress={() => navigation.navigate('iCourseDetails', {courseId: item._id,})}
    />
  );

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.appName}>LearnHub Instructor</Text>
        <TouchableOpacity style={styles.userIcon} onPress={toggleDropdown}>
          <Icon name="account-circle" size={30} color="#fff" />
        </TouchableOpacity>
        {dropdownVisible && (
          <View style={styles.dropdownMenu}>
            <TouchableOpacity
              style={styles.dropdownItem}
              onPress={() => {
                toggleDropdown();
                navigation.navigate('Profile');
              }}>
              <Text style={styles.dropdownText}>Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.dropdownItem}
              onPress={() => {
                toggleDropdown();
                handleLogout();
              }}>
              <Text style={styles.dropdownText}>Logout</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Course List */}
      <View style={styles.mainContent}>
        <Text style={styles.title}>My Courses</Text>
        {loading ? (
          <ActivityIndicator size="large" color="#007BFF" />
        ) : (
          <FlatList
            data={courses.slice(2, 5)}
            renderItem={renderCourseCard}
            keyExtractor={item => item._id}
            numColumns={2}
            contentContainerStyle={styles.courseList}
          />
        )}
        <Button
          style={{borderBottom:100}}
          title="Create Course"
          onPress={() => navigation.navigate('CourseManagement')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  header: {
    height: '8.5%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#007BFF',
    paddingHorizontal: 20,
    elevation: 5,
    width: '100%',
  },
  mainContent: {
    flex: 1,
    padding: 10,
  },
  appName: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  courseList: {
    justifyContent: 'space-around',

  },
});

export default InstructorHomeScreen;
