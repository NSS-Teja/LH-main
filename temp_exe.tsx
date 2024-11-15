import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';


// Import screens
import Home from './components/U_components/Home';
import Login from './components/U_components/Login';
import Register from './components/U_components/Register';
import CourseDetails from './components/U_components/CourseDetails';
import MyCoursesScreen from './components/U_components/MyCourses';
import CourseContent from './components/U_components/CourseContent';
import DiscussionForum from './components/U_components/DicusForum';
import QuizzesAssignments from './components/U_components/QuizAssign';
import TransactionHistory from './components/U_components/TransactionHistory';
import ProgressReport from './components/U_components/ProgressReport';
import CourseList from './components/U_components/CourseList';
import Profile from './components/U_components/Profile'; // Assuming there's a Profile component

// Instructor screen
import InstructorHomeScreen from './components/I_components/Home';
import CourseManagementScreen from './components/I_components/CourseCreate';
import iMyCoursesScreen from './components/I_components/MyCourses';
import EditCourse from './components/I_components/EditCourse';
import CourseDetailsScreen from './components/I_components/CourseDetails';
import ContentManagementScreen from './components/I_components/ContentManagement';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStackNavigator = () => {

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}} // Hide header for home
      />
      <Stack.Screen
        name="CourseDetails"
        component={CourseDetails}
        options={{headerTitle: 'Course Details'}} // Show header for CourseDetails
      />
      {/* Add other screens here if needed */}
    </Stack.Navigator>
  );
};

const MyCoursesStackNavigator = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MyCourses"
        component={MyCoursesScreen}
        options={{headerShown: false}} // Hide header for MyCourses
      />
      <Stack.Screen
        name="CourseDetails"
        component={CourseDetails}
        options={{headerTitle: 'Course Details'}}
      />
    </Stack.Navigator>
  );
};

const ProfileStackNavigator = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}} // Hide header for Profile
      />
      {/* Add more screens related to Profile here if needed */}
    </Stack.Navigator>
  );
};

// Tab Navigator for Authenticated Users
const HomeTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator} // Use the stack navigator for Home-related pages
        options={{
          tabBarIcon: () => <Entypo name="home" color={'#52be80'} size={28} />,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="My Courses"
        component={MyCoursesStackNavigator} // Use stack navigator for My Courses
        options={{
          tabBarIcon: () => (
            <FontAwesome name="search" color={'#52be80'} size={28} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStackNavigator} // Use stack navigator for Profile
        options={{
          tabBarIcon: () => (
            <Ionicons name="person" color={'#52be80'} size={28} />
          ),
        }}
      />
      <Tab.Screen
        name="Transaction"
        component={TransactionHistory}
        options={{
          tabBarIcon: () => (
            <Ionicons name="card" color={'#52be80'} size={28} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};






const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeTabs">
        {/* Tab Screens for Authenticated Users */}
        <Stack.Screen
          name="HomeTabs"
          component={HomeTabNavigator}
          options={{headerShown: false}}
        />

        {/* Public Screens */}
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};




// const AppNavigator = () => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Home">
//         <Stack.Screen name="InstructorHome" component={InstructorHomeScreen} />
//         <Stack.Screen
//           name="CourseManagement"
//           component={CourseManagementScreen}
//         />
//         <Stack.Screen name="MyCourses" component={iMyCoursesScreen} />
//         <Stack.Screen name="CourseDetails" component={CourseDetailsScreen} />
//         <Stack.Screen
//           name="ContentManagement"
//           component={ContentManagementScreen}
//         />

//         {/* <Stack.Screen name="Notifications" component={Notifications} /> */}
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

export default AppNavigator;
