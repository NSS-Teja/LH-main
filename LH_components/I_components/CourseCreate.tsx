import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {useState} from 'react';
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

const CourseManagementScreen = ({navigation}) => {
  const [courseTitle, setCourseTitle] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [courseImageUrl, setCourseImageUrl] = useState('');
  const [category, setCategory] = useState('');
  const [courseContent, setCourseContent] = useState([
    {title: '', videoUrl: ''},
  ]);
  const [loading, setLoading] = useState(false);

  const handleCreateCourse = async () => {
    // Validate input
    if (
      !courseTitle ||
      !courseDescription ||
      courseContent.some(section => !section.title) || !courseImageUrl
    ) {
      Alert.alert('Error', 'Please fill all fields in each content section');
      return;
    }

    setLoading(true);

    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.post('http://10.0.2.2:5000/courses/create', {
        title: courseTitle,
        description: courseDescription,
        image: courseImageUrl,
        content: courseContent,
      },
    { headers: { Authorization: `${token}` }    }
  );
      setLoading(false);
      Alert.alert('Success', 'Course Created!');
      navigation.navigate('iCourseDetails', {courseId: response.data.courseId});
    } catch (error) {
      setLoading(false);
      Alert.alert('Error', 'Failed to create course');
      console.error('Course creation error:', error);
    }
  };

  const addContentSection = () => {
    setCourseContent([...courseContent, {title: '', videoUrl: ''}]);
  };

  const removeContentSection = index => {
    const newContent = courseContent.filter((_, i) => i !== index);
    setCourseContent(newContent);
  };

  const updateContentSection = (index, key, value) => {
    const newContent = [...courseContent];
    newContent[index][key] = value;
    setCourseContent(newContent);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Create a New Course</Text>
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
      />
      <TextInput
        style={styles.input}
        placeholder="Image URL "
        value={courseImageUrl}
        onChangeText={setCourseImageUrl}
      />
      {courseContent.map((section, index) => (
        <View key={index} style={styles.contentSection}>
          <Text style={styles.sectionHeader}>Content Section {index + 1}</Text>
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
          {courseContent.length > 1 && (
            <TouchableOpacity onPress={() => removeContentSection(index)}>
              <Text style={styles.removeButton}>Remove Section</Text>
            </TouchableOpacity>
          )}
        </View>
      ))}

      <Button title="Add Content Section" onPress={addContentSection} />
      <Button
        title="Create Course"
        onPress={handleCreateCourse}
        disabled={loading}
      />
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

export default CourseManagementScreen;
