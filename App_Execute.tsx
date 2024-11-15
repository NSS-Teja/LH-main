import React, {useEffect, useState} from 'react';
import {View} from 'react-native';



// Import icons and screens
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Or use any secure storage library
import jwtDecode from 'jwt-decode'; // Make sure to install jwt-decode

// Import screens
import Home from './LH_components/U_components/Home';
import Login from './LH_components/U_components/Login';
import Register from './LH_components/U_components/Register';
import Profile from './LH_components/U_components/Profile';
import ChangePasswordScreen from './LH_components/U_components/changePassword';
import StudentHomeScreen from './LH_components/U_components/StudentHome';
import InstructorHomeScreen from './LH_components/I_components/InstructorHome';
import MyCoursesScreen from './LH_components/U_components/MyCourses';
import CourseList from './LH_components/U_components/CourseList';
import CourseDetails from './LH_components/U_components/CourseDetails';
import iCourseDetails from './LH_components/I_components/CourseDetails';
import InstructorCourseManagement from './LH_components/I_components/CourseCreate';

// Main Navigation Stack
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const App = () => {
  const [userRole, setUserRole] = useState(null); // Example: null, 'student', 'instructor'
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken'); // Get token from AsyncStorage
        if (token) {
          // Example: Decode token to get user role (use a JWT library if it's JWT)
          const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decoding JWT example
          setUserRole(decodedToken.role); // Assuming role is stored in the token
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Failed to retrieve token', error);
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isAuthenticated ? (
          <>
            {/* Role-based Home Screen */}
            {userRole === 'student' ? (
              <Stack.Screen name="StudentHome" component={StudentHomeScreen} />
            ) : (
              <Stack.Screen
                name="InstructorHome"
                component={InstructorHomeScreen}
              />
            )}

            {/* Role-based Screens */}
            <Tab.Navigator>
              <Tab.Screen name="Courses" component={CourseList} />
              <Tab.Screen name="MyCourses" component={MyCoursesScreen} />
            </Tab.Navigator>

            {/* Profile and ChangePassword Screens */}
            <Drawer.Navigator>
              <Drawer.Screen name="Profile" component={Profile} />
              <Drawer.Screen
                name="ChangePassword"
                component={ChangePasswordScreen}
              />
            </Drawer.Navigator>
          </>
        ) : (
          <>
            {/* Unauthenticated Screens */}
            <Stack.Screen
              name="Home"
              component={Home}
              options={{headerShown: false}}
            />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
