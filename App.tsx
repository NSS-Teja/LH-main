// AppNavigator.js
import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from 'jwt-decode';

import Home from './LH_components/U_components/Home';
import Login from './LH_components/U_components/Login';
import Register from './LH_components/U_components/Register';
import Profile from './LH_components/U_components/Profile';
import CourseDetails from './LH_components/U_components/CourseDetails';
import MyCoursesScreen from './LH_components/U_components/MyCourses';
import CourseContent from './LH_components/U_components/CourseContent';
import DiscussionForum from './LH_components/U_components/DicusForum';
import QuizzesAssignments from './LH_components/U_components/QuizAssign';
import TransactionHistory from './LH_components/U_components/TransactionHistory';
import ProgressReport from './LH_components/U_components/ProgressReport';
import CourseList from './LH_components/U_components/CourseList';
import InstructorHomeScreen from './LH_components/I_components/Home';
import CourseManagementScreen from './LH_components/I_components/CourseCreate';
import iMyCoursesScreen from './LH_components/I_components/MyCourses';
import EditCourse from './LH_components/I_components/EditCourse';
import CourseDetailsScreen from './LH_components/I_components/CourseDetails';
import ContentManagementScreen from './LH_components/I_components/ContentManagement';
import ChangePasswordScreen from './LH_components/U_components/changePassword';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const [initialRoute, setInitialRoute] = useState(null); // Initialize with null to indicate loading state
 const [forumVisible, setForumVisible] = useState(false);


  useEffect(() => {
    const determineInitialRoute = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          const decoded = jwt_decode(token);
          const role = decoded.role;

          // Set the initial route based on the user's role
          if (role === 'instructor') {
            setInitialRoute('InstructorHome');
          } else {
            setInitialRoute('Home');
          }
        } else {
          setInitialRoute('Home'); // Redirect to Login if no token
        }
      } catch (error) {
        console.error('Error determining initial route:', error);
        setInitialRoute('Home'); // Fallback to Login if an error occurs
      }
    };

    determineInitialRoute();
  }, []);

  // Show nothing or a loading screen until initialRoute is determined
  if (!initialRoute) {
    return null; // Replace with a loading screen component if preferred
  }

  return (
    <NavigationContainer>
      {/* <Button title="Open Forum" onPress={() => setForumVisible(true)} />
      <ForumModal
        visible={forumVisible}
        onClose={() => setForumVisible(false)}
      /> */}
      <Stack.Navigator initialRouteName={initialRoute}>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="CourseList" component={CourseList} />
        <Stack.Screen name="CourseDetails" component={CourseDetails} />
        <Stack.Screen name="MyCoursesScreen" component={MyCoursesScreen} />
        <Stack.Screen name="CourseContent" component={CourseContent} />
        <Stack.Screen name="DiscussionForum" component={DiscussionForum} />
        <Stack.Screen
          name="QuizzesAssignments"
          component={QuizzesAssignments}
        />
        <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
        <Stack.Screen
          name="TransactionHistory"
          component={TransactionHistory}
        />
        <Stack.Screen name="ProgressReport" component={ProgressReport} />
        <Stack.Screen
          name="InstructorHome"
          component={InstructorHomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CourseManagement"
          component={CourseManagementScreen}
        />
        <Stack.Screen name="MyCourses" component={iMyCoursesScreen} />
        <Stack.Screen name="EditCourses" component={EditCourse} />
        <Stack.Screen name="iCourseDetails" component={CourseDetailsScreen} />
        <Stack.Screen
          name="iContentManagement"
          component={ContentManagementScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
