import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Alert,
  Button,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditCourseScreen = ({navigation, route}) => {
  const courseId = route.params.courseId;
  const [courseTitle, setCourseTitle] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [courseImageUrl,  setCourseImageUrl] = useState('');
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await axios.get(
          `http://10.0.2.2:5000/courses/${courseId}`,
          {
            headers: {Authorization: `${token}`},
          },
        );
        const course = response.data.course;
        setCourseTitle(course.title);
        setCourseDescription(course.description);
        setContent(course.content || []);
      } catch (error) {
        console.error('Error fetching course details:', error);
        Alert.alert('Error', 'Unable to fetch course details.');
      } finally {
        setLoading(false);
      }
    };
    fetchCourseDetails();
  }, [courseId]);

  const handleUpdateCourse = async () => {
    // Validate inputs
    if (!courseTitle || !courseDescription) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    // Check if any content section is empty
    const hasEmptyContent = content.some(section => !section.title);

    if (hasEmptyContent) {
      Alert.alert(
        'Error',
        'Some content sections are empty. Please remove or fill them out before updating.',
      );
      return;
    }

    try {
      const token = await AsyncStorage.getItem('token');
      await axios.put(
        `http://10.0.2.2:5000/courses/${courseId}`,
        {
          title: courseTitle,
          description: courseDescription,
          image : courseImageUrl ,
          content,
        },
        {
          headers: {Authorization: `${token}`},
        },
      );
      Alert.alert('Success', 'Course updated successfully!');
      navigation.navigate('iCourseDetails', {courseId});
    } catch (error) {
      console.error('Error updating course:', error);
      Alert.alert('Error', 'Unable to update course.');
    }
  };

  const addContentSection = () => {
    setContent([...content, {title: '', videoUrl: ''}]);
  };

  const removeContentSection = index => {
    const newContent = content.filter((_, i) => i !== index);
    setContent(newContent);
  };

  const updateContentSection = (index, field, value) => {
    const newContent = [...content];
    newContent[index][field] = value;
    setContent(newContent);
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Edit Course</Text>
      <TextInput
        style={styles.input}
        placeholder="Course Title"
        value={courseTitle}
        onChangeText={setCourseTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Course Description"
        value={courseDescription}
        onChangeText={setCourseDescription}
        multiline
      />
      <TextInput
        style={styles.input}
        placeholder="Image URL"
        value={courseImageUrl}
        onChangeText={setCourseImageUrl}
      />

      <Text style={styles.sectionTitle}>Content Sections</Text>
      {content.map((section, index) => (
        <View key={index} style={styles.contentSection}>
          <Text style={styles.sectionHeader}>Section {index + 1}</Text>
          <TextInput
            style={styles.input}
            placeholder="Content Title"
            value={section.title}
            onChangeText={text => updateContentSection(index, 'title', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Video URL (optional)"
            value={section.videoUrl}
            onChangeText={text => updateContentSection(index, 'videoUrl', text)}
          />
          <TouchableOpacity onPress={() => removeContentSection(index)}>
            <Text style={styles.removeButton}>Remove Section</Text>
          </TouchableOpacity>
        </View>
      ))}

      <Button title="Add Content Section" onPress={addContentSection} />
      <Button title="Update Course" onPress={handleUpdateCourse} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  contentSection: {
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  removeButton: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
  },
});

export default EditCourseScreen;
