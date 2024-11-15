import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MultiSlider from '@ptomasroos/react-native-multi-slider'; // Import MultiSlider
import axios from 'axios';

const CourseList = ({navigation}) => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState([0, 500]); // Initial price range [min, max]
  const maxPrice = 2000;

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://10.0.2.2:5000/courses');
        const courses = response.data.coursesList;
        setCourses(courses);
        setFilteredCourses(courses);
      } catch (error) {
        setError('Error fetching courses');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    const handleSearchAndFilter = () => {
      let filtered = courses;
      if (searchQuery !== '') {
        filtered = filtered.filter(
          course =>
            course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            course.description
              .toLowerCase()
              .includes(searchQuery.toLowerCase()),
        );
      }
      filtered = filtered.filter(
        course =>
          course.price >= priceRange[0] && course.price <= priceRange[1],
      );
      setFilteredCourses(filtered);
    };

    handleSearchAndFilter();
  }, [searchQuery, priceRange, courses]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Courses</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Search courses..."
        value={searchQuery}
        onChangeText={text => setSearchQuery(text)}
      />
      <View style={styles.priceFilterContainer}>
        <Text style={styles.filterText}>
          Price Range: ${priceRange[0]} - ${priceRange[1]}
        </Text>
        <MultiSlider
          values={priceRange}
          min={0}
          max={2000}
          step={10}
          onValuesChange={values => setPriceRange(values)}
          selectedStyle={{backgroundColor: '#007BFF'}}
          unselectedStyle={{backgroundColor: '#ddd'}}
          containerStyle={{
            width: '100%',
            alignSelf: 'center',
            paddingHorizontal: 0, // Remove padding
            marginHorizontal: 0, // Remove margin
          }}
          sliderLength={Dimensions.get('window').width - 40} // Adjust the slider length to fit
          trackStyle={{height: 4}}
        />
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#007BFF" />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <ScrollView>
          {filteredCourses.map(course => (
            <TouchableOpacity
              key={course._id}
              style={styles.courseCard}
              onPress={() => (role === 'student')?(
                navigation.navigate('CourseDetails', {
                  courseId: course._id,
                })):(navigation.navigate('iCourseDetails', {
                  courseId: course._id,}))
              }>
              <Icon name="school" size={24} color="#007BFF" />
              <View style={styles.cardContent}>
                <Text style={styles.courseTitle}>{course.title}</Text>
                <Text style={styles.courseDescription}>
                  {course.description}
                </Text>
                <Text style={styles.coursePrice}>${course.price}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  searchInput: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  priceFilterContainer: {
    marginVertical: 10,
    width: '100%', // Ensure the container takes full width
  },
  slider: {
    width: '100%', // Ensure slider takes the full width of its container
    height: 40, // Adjust the height as needed
  },
  filterText: {
    fontSize: 16,
    marginBottom: 5,
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
  coursePrice: {
    fontSize: 14,
    color: '#333',
    marginTop: 5,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
});

export default CourseList;
