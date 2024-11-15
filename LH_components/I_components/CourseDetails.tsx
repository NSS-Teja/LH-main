import React, {useEffect, useState} from 'react';
import {View, Text, Button, StyleSheet, Alert, ScrollView} from 'react-native';
import axios from 'axios';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Video from 'react-native-video';

const CourseDetailsScreen = ({navigation, route}) => {
  const courseId = route.params.courseId;
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isCreatedBy, setIsCreatedBy] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      const fetchCourseDetails = async () => {
        try {
          const token = await AsyncStorage.getItem('token');
          if (!token) {
            Alert.alert('Error', 'You are not logged in.');
            return;
          }

          const response = await axios.get(
            `http://10.0.2.2:5000/courses/${courseId}`,
            {
              headers: {Authorization: `${token}`},
            },
          );

          if (response.data) {
            setCourse(response.data.course);
            setIsCreatedBy(response.data.isCreatedBy);
            console.log('Course fetched successfully:', response.data.course);
          }
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

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (!course) {
    return <Text>No course found.</Text>;
  }
  console.log(course.content[0]?.videoUrl);
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{course.title}</Text>
      <Text style={styles.description}>{course.description}</Text>

      {course.price ? (
        <Text style={styles.details}>Price: ${course.price}</Text>
      ) : null}

      {/* Video Player */}
      {course.content[0]?.videoUrl ? (
        <View style={styles.videoContainer}>
          <Video
            source={{uri: course.content[0].videoUrl}}
            style={styles.video}
            controls
            resizeMode="contain"
            onError={e => console.error('Video Error:', e)}
          />
        </View>
      ) : (
        <Text style={styles.placeholder}>Video content is unavailable</Text>
      )}

      {isCreatedBy && (
        <>
          <Button
            title="Manage Content"
            onPress={() =>
              navigation.navigate('iContentManagement', {courseId})
            }
          />
          <Button
            title="Edit Course"
            onPress={() => navigation.navigate('EditCourses', {courseId})}
          />
        </>
      )}
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
  },
  details: {
    fontSize: 14,
    marginBottom: 10,
  },
  videoContainer: {
    marginTop: 20,
    marginBottom: 20,
    height: 200,
  },
  video: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    marginVertical: 20,
  },
});

export default CourseDetailsScreen;
