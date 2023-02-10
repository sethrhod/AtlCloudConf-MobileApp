import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  SectionList,
  TouchableOpacity,
} from "react-native";
import React, { useState, useContext } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { SessionizeContext } from "../App.js";

function Session(props) {
  const [selected, setSelected] = useState(false);

  const onClick = () => {
    setSelected(!selected);
  };

  var bg = selected ? "#0099CC" : "#FFFFFF";
  var text_color = selected ? "white" : "black";

  const speakers = props.session.speakers.map((speaker, index) => (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <Image
        key={index}
        style={styles.logo}
        source={{ uri: speaker.profilePicture }}
      />
      <Text style={styles.name}>{speaker.fullName}</Text>
    </View>
  ));

  return (
    <TouchableOpacity
      style={[styles.session, { backgroundColor: bg }]}
      onPressOut={() => onClick()}
    >
      {/* // session title */}

      <Text style={[styles.title, { color: text_color }]}>
        {props.session.title}
      </Text>

      <View
        style={{
          flex: 1,
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        {/* // check if there are speakers */}
        {props.session.speakers.length > 0 ? (
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {/* // loop through speakers ids and return their profile pics */}
            {speakers}

            {/* // session room */}
            <Text style={[styles.speaker_room, { color: text_color }]}>
              {props.session.room}
            </Text>
          </View>
        ) : (
          // main-event session room
          <View
            style={{
              flex: 1,
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={[styles.main_room, { color: text_color }]}>
              {props.session.room}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

export default function Schedule() {
  const sectionListRef = React.useRef(null);

  const { sessions } = useContext(SessionizeContext);

  const getNewTime = (time) => {
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
  };

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

  const Times = (props) => {
    return (
      <View style={{ margin: 10, flex: 0.15 }}>
        <Text style={styles.times}>{getNewTime(props.starts)}</Text>
        <Text style={styles.times}>-</Text>
        <Text style={styles.times}>{getNewTime(props.ends)}</Text>
      </View>
    );
  };

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
      // push the object to the data array
      data.push(obj);
    });
    // return the data array
    return data;
  };

  const TimeScroll = (sectionListData) => {
    return sectionListData.map((time, index) => (
      <View style={styles.time_scroll}>
        <TouchableOpacity
          onPress={() => {
            sectionListRef.current.scrollToLocation({
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
  };

  return (
    <LinearGradient
      Background
      Linear
      Gradient
      colors={["rgba(0,0,0,1)", "rgba(0,47,63,1)"]}
      style={styles.container}
    >
      <SectionList
        sections={constructSectionListData(sessions)}
        ref={sectionListRef}
        style={{ width: "100%", flex: 1 }}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.list_item}>
            <Times starts={item.startsAt} ends={item.endsAt} />
            <Session session={item} />
          </View>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <View style={styles.timeblock}>
            <Text style={styles.timeblock_text}>{title}</Text>
          </View>
        )}
      />
      <View style={styles.time_scroll_container}>
        {TimeScroll(constructSectionListData(sessions))}
      </View>
    </LinearGradient>
  );
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
    backgroundColor: "#0f4c5c",
    alignItems: "center",
    maxHeight: 60,
    margin: 10,
    justifyContent: "center",
    borderRadius: 10,
    shadowColor: "#d2f7f7",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.4,
    shadowRadius: 1,
    elevation: 5,
  },
  list_item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  session: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    borderRadius: 10,
    width: "75%",
    height: 100,
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
    color: "white",
  },
  time_scroll: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  time_scroll_button: {
    backgroundColor: "#0f4c5c",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    shadowColor: "#d2f7f7",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.4,
    shadowRadius: 1,
    elevation: 5,
    margin: 5,
    padding: 5,
  },
  time_scroll_container: {
    flex: 0.1,
    margin: 10,
    borderRadius: 50,
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255,0.2)",
  },
  time_scroll_text: {
    color: "white",
    fontSize: 10,
    textAlign: "center",
  },
});
