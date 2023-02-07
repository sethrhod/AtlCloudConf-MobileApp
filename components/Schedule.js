import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";

function Timeblock(props) {
  const [selected, setSelected] = useState(false);

  const onClick = () => {
    setSelected(!selected);
  };

  var bg = selected ? "#0099CC" : "#000000";

  var text_color = selected ? "black" : "white";

  return (
    <TouchableOpacity style={[styles.timeblock, { backgroundColor: bg }]} onPressOut={() => onClick()}>
      <Text style={[styles.timeblock_text, { color: text_color }]}>
        {props.time}
      </Text>
    </TouchableOpacity>
  );
}

function Room(props) {
  const [selected, setSelected] = useState(false);

  const onClick = () => {
    setSelected(!selected);
  };

  var bg = selected ? "#0099CC" : "#FFFFFF";

  var text_color = selected ? "white" : "black";

  return (
    <TouchableOpacity style={[styles.room, { backgroundColor: bg }]} onPressOut={() => onClick()}>
      <Text style={[styles.room_text, { color: text_color }]}>
        {props.room}
      </Text>
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

  const rooms = ["Room 1", "Room 2", "Room 3", "Room 4", "Room 5"];

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
        contentContainerStyle={styles.timesarray}
        style={{ width: "100%", height: 40, padding: 10 }}
        keyExtractor={(item) => item.id}
      />
      <FlatList
        data={rooms}
        style={{ width: "100%", padding: 10 }}
        renderItem={({ item }) => (
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.left_text}>{item}</Text>
            <Room room={item} />
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
    color: "white",
    fontSize: 20,
  },
  timesarray: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  timeblock: {
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
    width: 70,
    height: 80,
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
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
    alignItems: "center",
    justifyContent: "center",
  },
  room_text: {
    color: "white",
    fontSize: 20,
  },
  left_text: {
    flex: 1,
    color: "white",
    fontSize: 20,
    textAlign: "center",
    textAlignVertical: "center",
  },
});
