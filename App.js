import "react-native-gesture-handler";
import React, { useState, useEffect, createContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Overview from "./components/Overview";
import Speakers from "./components/Speakers";
import Sponsors from "./components/Sponsors";
import Schedule from "./components/Schedule";
import MyTimeline from "./components/My-timeline";
import CodeOfConduct from "./components/Code-of-Conduct";
import Speaker from "./components/scripts/Speaker.js";
import Sessions from "./components/scripts/Sessions.js";

const Drawer = createDrawerNavigator();
export const SessionizeContext = createContext([]);

export default function App() {

  const [speakers, setSpeakers] = useState(null);
  const [sessions, setSessions] = useState(null);

  useEffect(() => {
    fetch("https://sessionize.com/api/v2/curiktb3/view/Speakers")
      .then((response) => response.json())
      .then((data) => {
        let newSpeakers = [];
        data.map((speaker) => {
          let classinstance = new Speaker(speaker);
          newSpeakers.push(classinstance);
          setSpeakers(newSpeakers);
          fetchSessions(newSpeakers);
        });
      });
  }, []);

  const fetchSessions = (speakers) => {
    fetch("https://sessionize.com/api/v2/curiktb3/view/Sessions")
      .then((response) => response.json())
      .then((data) => {
        let classinstance = new Sessions(data[0], speakers);
        setSessions(classinstance);
      });
  };

  return (
    <SessionizeContext.Provider value={{ speakers, sessions }}>
      <NavigationContainer theme={MyTheme}>
        <Drawer.Navigator screenOptions={{ headerTintColor: "#FFFFFF" }}>
          <Drawer.Screen name="Overview" component={Overview} />
          <Drawer.Screen name="Speakers" component={Speakers} />
          <Drawer.Screen name="Sponsors" component={Sponsors} />
          <Drawer.Screen name="Schedule" component={Schedule} />
          <Drawer.Screen name="My Timeline" component={MyTimeline} />
          <Drawer.Screen name="Code of Conduct" component={CodeOfConduct} />
        </Drawer.Navigator>
      </NavigationContainer>
    </SessionizeContext.Provider>
  );
}

const MyTheme = {
  dark: true,
  colors: {
    primary: "#00FFFF",
    background: "black",
    card: "black",
    text: "white",
    border: "black",
    notification: "#00FFFF",
  },
};
