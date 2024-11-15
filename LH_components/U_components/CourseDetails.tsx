import React, {useState} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import axios from 'axios';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ForumModal from '../../ForumModal'; // Import ForumModal

const StudentCourseDetailsScreen = ({navigation, route}) => {
  const {courseId} = route.params;
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enrolled, setEnrolled] = useState(false);
  const [forumVisible, setForumVisible] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      const fetchCourseDetails = async () => {
        try {
          const token = await AsyncStorage.getItem('token');
          const response = await axios.get(
            `http://10.0.2.2:5000/courses/${courseId}`,
            {
              headers: {Authorization: `${token}`},
            },
          );

          setCourse(response.data.course);
          setEnrolled(response.data?.isEnrolled);
          console.log("response",response.data);
        } catch (error) {
          console.error('Error fetching course details:', error);
          Alert.alert('Error', 'Unable to fetch course details.');
        } finally {
          setLoading(false);
        }
      };

      fetchCourseDetails();
    }, [courseId]),
  );

  const handleEnroll = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Error', 'You are not logged in.');
        return;
      }
      await axios.post(
        `http://10.0.2.2:5000/courses/${courseId}/enroll`,
        {},
        {
          headers: {
            Authorization: `${token}`,
          },
        },
      );
      Alert.alert('Success', 'You have successfully enrolled in the course!');
      setEnrolled(true);
    } catch (error) {
      console.error('Error during enrollment:', error);
      Alert.alert('Error', 'Unable to enroll in the course.');
    }
  };

  const handleViewContent = () => {
    if (enrolled) {
      navigation.navigate('CourseContent', {
        videoUrl: course.content[0]?.videoUrl,
      });
    } else {
      Alert.alert('Not Enrolled', 'You must be enrolled to view the content.');
    }
  };

  const openForum = async () => {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      Alert.alert(
        'You must be logged in to view and participate in the forum.',
      );
      return;
    }
    setForumVisible(true);
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#007BFF" />;
  }

  if (!course) {
    return <Text>No course found.</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{course.title}</Text>
      <Text style={styles.description}>{course.description}</Text>
      <Text style={styles.category}>Category: {course.category}</Text>
      <Text style={styles.price}>Price: ${course.price}</Text>
      <Text style={styles.instructor}>
        Instructor: {course.instructor.name}
      </Text>

      {!enrolled ? (
        <Button title="Enroll in Course" onPress={handleEnroll} />
      ) : (
        <Button title="Go to Course Content" onPress={handleViewContent} />
      )}

      <Button title="Open Forum" onPress={openForum} />

      {/* Render Forum Modal */}
      <ForumModal
        courseId={courseId}
        courseTitle={course.title} // Pass course title here
        visible={forumVisible}
        onClose={() => setForumVisible(false)}
      />
    </ScrollView>
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
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    lineHeight: 24,
  },
  category: {
    fontSize: 14,
    marginBottom: 10,
    color: '#555',
  },
  price: {
    fontSize: 16,
    marginBottom: 10,
    color: '#007BFF',
  },
  instructor: {
    fontSize: 16,
    marginBottom: 20,
    fontStyle: 'italic',
  },
});

export default StudentCourseDetailsScreen;
