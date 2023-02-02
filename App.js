import 'react-native-gesture-handler';
import { StyleSheet } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Overview from "./components/Overview";
import Speakers from './components/Speakers';
import Sponsors from './components/Sponsors';
import Schedule from './components/Schedule';
import MyTimeline from './components/My-timeline';
import CodeOfConduct from './components/Code-of-Conduct';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer theme={MyTheme}>
        <Drawer.Navigator screenOptions={{headerTintColor: '#FFFFFF'}}>
          <Drawer.Screen name="Overview" component={Overview} />
          <Drawer.Screen name="Speakers" component={Speakers} />
          <Drawer.Screen name="Sponsors" component={Sponsors} />
          <Drawer.Screen name="Schedule" component={Schedule} />
          <Drawer.Screen name="My Timeline" component={MyTimeline} />
          <Drawer.Screen name="Code of Conduct" component={CodeOfConduct} />
        </Drawer.Navigator>
    </NavigationContainer>
  );
}

const MyTheme = {
  dark: true,
  colors: {
    primary: '#00FFFF',
    background: "black",
    card: 'black',
    text: 'white',
    border: 'black',
    notification: '#00FFFF',
  },
};
