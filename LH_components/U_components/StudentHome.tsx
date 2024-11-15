import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Home from './Home'; // Student version
import CourseList from './CourseList';
import MyCourses from './MyCourses';
import ProgressReport from './ProgressReport';
import Profile from './Profile'; // Role-based screen

const Tab = createBottomTabNavigator();

function StudentHomeTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} options={{headerShown: false}} />
      <Tab.Screen name="CourseList" component={CourseList} />
      <Tab.Screen name="MyCoursesScreen" component={MyCourses} />
      <Tab.Screen name="ProgressReport" component={ProgressReport} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

export default StudentHomeTabs;