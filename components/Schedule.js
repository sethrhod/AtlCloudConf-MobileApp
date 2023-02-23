import {
  StyleSheet,
  Text,
  View,
  SectionList,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import React, { useState, useContext } from "react";
import { LinearGradient } from "expo-linear-gradient";
import SessionizeContext from "../SessionizeContext.js";
import Session from "./Session.js";

export default function Schedule() {
  const sectionListRef = React.useRef(null);

  const { sessions } = useContext(SessionizeContext);
  const { bookmarks } = useContext(SessionizeContext);

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  // a function that costructs a list of session data thats compatible with the SectionList component
  const constructSectionListData = (sessions) => {
    // create an empty array to store the data
    let data = [];

    // loop through the sessions
    sessions.start_times.forEach((time) => {
      // create an empty object to store the data
      let obj = {};
      // set the title of the object to the start time of the session and add to the same hour sessions
      obj.title = getNewTime(time);
      // set the data of the object to the sessions that start at the same time
      obj.data = sessions.sessions.filter(
        (session) => session.startsAt == time
      );
      obj.data.forEach((session) => {
        //check if bookmarks array is empty and if it is, set the bookmarked state to false
        if (bookmarks.length === 0) {
          session.bookmarked = false;
        } else {
          // compare ids in sessions and bookmarks array, if id exists in both, set bookmarked state of the session to true
          bookmarks.forEach((bookmark) => {
            if (session.id === bookmark.id) {
              session.bookmarked = true;
            }
          });
        }
      });
      // push the object to the data array
      data.push(obj);
    });
    // return the data array
    return data;
  };

  return (
    <LinearGradient
      Background
      Linear
      Gradient
      colors={["#166088", "#166088"]}
      style={styles.container}
    >
      <SectionList
        sections={constructSectionListData(sessions)}
        ref={sectionListRef}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={{ height: "100%", flex: 1, margin: 10, marginRight: 0 }}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 50 }}
        renderItem={({ item }) => (
          <Session
            session={item}
            starts={getNewTime(item.startsAt)}
            ends={getNewTime(item.endsAt)}
          />
        )}
        renderSectionHeader={({ section: { title } }) => (
          <View style={styles.timeblock}>
            <Text style={styles.timeblock_text}>{title}</Text>
          </View>
        )}
      />
      <View style={styles.time_scroll_container}>
        <TimeScroll
          sectionListData={constructSectionListData(sessions)}
          sectionListRef={sectionListRef}
        />
      </View>
    </LinearGradient>
  );
}

function TimeScroll(props) {
  return props.sectionListData.map((time, index) => (
    <View style={styles.time_scroll}>
      <TouchableOpacity
        onPress={() => {
          props.sectionListRef.current.scrollToLocation({
            animated: true,
            itemIndex: 0,
            sectionIndex: index,
            viewOffset: 0,
            viewPosition: 0,
          });
        }}
      >
        <Text style={styles.time_scroll_text}>{time.title}</Text>
      </TouchableOpacity>
    </View>
  ));
}

export function getNewTime(time) {
  const getAmPm = (hours) => {
    if (hours > 12) {
      return "PM";
    } else {
      return "AM";
    }
  };

  const getNewHours = (hours) => {
    if (hours > 12) {
      return hours - 12;
    } else {
      return hours;
    }
  };

  const getNewMinutes = (minutes) => {
    if (minutes == 0) {
      return "00";
    } else {
      return minutes;
    }
  };

  const date_object = new Date(time);
  var hours = date_object.getHours();
  var minutes = date_object.getMinutes();
  var newTime =
    String(getNewHours(hours)) +
    ":" +
    String(getNewMinutes(minutes)) +
    " " +
    String(getAmPm(hours));
  return newTime;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
  timeblock_text: {
    padding: 10,
    color: "white",
    fontSize: 20,
  },
  timeblock: {
    backgroundColor: "#4F6D7A",
    alignItems: "center",
    maxHeight: 60,
    margin: 10,
    justifyContent: "center",
    borderRadius: 10,
  },
  session: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    borderRadius: 10,
    margin: 10,
  },
  title: {
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
  },
  name: {
    fontSize: 12,
    textAlign: "center",
  },
  speaker_room: {
    color: "black",
    textAlign: "center",
    fontSize: 15,
    fontWeight: "semi-bold",
  },
  logo: {
    width: 25,
    height: 25,
    borderRadius: 35,
    margin: 5,
  },
  times: {
    textAlign: "center",
    fontSize: 12,
  },
  time_scroll: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  time_scroll_container: {
    borderRadius: 30,
    maxWidth: 30,
    margin: 10,
    marginLeft: 0,
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
    shadowColor: "white",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.9,
    shadowRadius: 10,
    elevation: 5,
    backgroundColor: "rgba(255, 255, 255,0.2)",
  },
  time_scroll_text: {
    color: "white",
    fontSize: 10,
    textAlign: "center",
  },
});
