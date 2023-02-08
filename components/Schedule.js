import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";

function Timeblock(props) {
  const [selected, setSelected] = useState(false);

  const onClick = () => {
    setSelected(!selected);
  };

  var bg = selected ? "#0099CC" : "#000000";

  var text_color = selected ? "black" : "white";

  return (
    <TouchableOpacity
      style={[styles.timeblock, { backgroundColor: bg }]}
      onPressOut={() => onClick()}
    >
      <Text style={[styles.timeblock_text, { color: text_color }]}>
        {props.time}
      </Text>
    </TouchableOpacity>
  );
}

function Session(props) {
  const [selected, setSelected] = useState(false);

  const onClick = () => {
    setSelected(!selected);
  };

  const getUri = (id) => {
    for (var i = 0; i < props.speakerWall.length; i++) {
      if (props.speakerWall[i].id == id) {
        return props.speakerWall[i].profilePicture;
      }
    }
  };

  var bg = selected ? "#0099CC" : "#FFFFFF";

  var text_color = selected ? "white" : "black";

  return (
    <TouchableOpacity
      style={[styles.room, { backgroundColor: bg }]}
      onPressOut={() => onClick()}
    >

      {/* // session title */}

      <Text style={[styles.title, { color: text_color, borderWidth: 1, borderColor: 'red' }]}>
        {props.session.title}
      </Text>

      {/* // loop through speakers ids and return their profile pics */}

      <View style={{ flex: 1, flexDirection: "row", alignItems: 'center', borderWidth: 1, borderColor: 'red' }}>
        {props.session.speakers.map((speaker, index) => {
          return (
            <>
              <Image
                key={index}
                style={styles.logo}
                source={{ uri: getUri(speaker.id) }}
              />
              <Text style={styles.name}>{speaker.name}</Text>
            </>
          );
        })}
      </View>
  
    </TouchableOpacity>
  );
}

export default function Schedule() {
  const times = [
    "7:45 AM",
    "8:45 AM",
    "10:00 AM",
    "11:15 AM",
    "12:15 PM",
    "1:15 PM",
    "2:30 PM",
    "3:45 PM",
    "5:00 PM",
  ];

  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    fetch("https://sessionize.com/api/v2/curiktb3/view/Sessions")
      .then((response) => response.json())
      .then((data) => {
        setSessions(data[0].sessions);
      });
  }, []);

  const [SpeakerWall, setSpeakerWall] = useState([]);

  useEffect(() => {
    fetch("https://sessionize.com/api/v2/curiktb3/view/SpeakerWall")
      .then((response) => response.json())
      .then((data) => {
        setSpeakerWall(data);
      });
  }, [sessions]);

  return (
    <LinearGradient
      Background
      Linear
      Gradient
      colors={["rgba(0,0,0,1)", "rgba(0,47,63,1)"]}
      style={styles.container}
    >
      <FlatList
        data={times}
        renderItem={({ item }) => <Timeblock time={item} />}
        horizontal={true}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ minheight: 100, padding: 10 }}
        style={{ height: 120 }}
      />
      <FlatList
        data={sessions}
        style={{ width: "100%" }}
        renderItem={({ item }) => (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.left_text}>{item.room}</Text>
            <Session session={item} speakerWall={SpeakerWall} />
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  timeblock_text: {
    padding: 10,
    color: "white",
    fontSize: 20,
  },
  timeblock: {
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
  room: {
    flex: 3,
    padding: 10,
    borderRadius: 10,
    shadowColor: "#d2f7f7",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.4,
    shadowRadius: 1,
    elevation: 5,
    width: "75%",
    height: 100,
    margin: 10,
  },
  title: {
    flex: 1,
    fontSize: 15,
    textAlign: "center",
    fontWeight: "semi-bold",
  },
  name: {
    fontSize: 12,
    textAlign: "center",
  },
  left_text: {
    flex: 1,
    color: "white",
    fontSize: 20,
    textAlign: "center",
  },
  logo: {
    width: 25,
    height: 25,
    borderRadius: 35,
    margin: 5,
  },
});
