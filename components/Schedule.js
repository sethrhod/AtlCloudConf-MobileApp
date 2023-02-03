import { StyleSheet, Text, View, FlatList } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

function Timeblock(props) {
  return (
    <View style={styles.timeblock}>
      <Text style={styles.timeblock_text}>{props.time}</Text>
    </View>
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

  const timesarray = times.map((time) => {
    return <Timeblock time={time} />;
  });

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
        renderItem={({ time }) => <Timeblock time={time} />}
        horizontal={true}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ alignItems: "stretch" }}
        style={{ width: "100%" }}
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
    backgroundColor: "rgba(255,255,255,0.1)",
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
});
