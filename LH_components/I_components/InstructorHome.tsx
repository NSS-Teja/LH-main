import {createDrawerNavigator} from '@react-navigation/drawer';

import InstructorHome from './Home';
import CourseManagementScreen from './CourseCreate';
import ContentManagementScreen from './ContentManagement';
import EditCourse from './EditCourse';
import MyCoursesScreen from './MyCourses';
import Profile from '../U_components/Profile'; // Role-based screen

const Drawer = createDrawerNavigator();

function InstructorHomeDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="InstructorHome" component={InstructorHome} />
      <Drawer.Screen
        name="CourseManagement"
        component={CourseManagementScreen}
      />
      <Drawer.Screen name="MyCourses" component={MyCoursesScreen} />
      <Drawer.Screen
        name="ContentManagement"
        component={ContentManagementScreen}
      />
      <Drawer.Screen name="EditCourse" component={EditCourse} />
      <Drawer.Screen name="Profile" component={Profile} />
    </Drawer.Navigator>
  );
}

export default InstructorHomeDrawer;