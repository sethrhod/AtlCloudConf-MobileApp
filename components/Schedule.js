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

// function Timeblock(props) {
//   const [selected, setSelected] = useState(false);

//   const onClick = () => {
//     setSelected(!selected);
//   };

//   var bg = selected ? "#0099CC" : "#000000";

//   var text_color = selected ? "black" : "white";

//   return (
//     <TouchableOpacity
//       style={[styles.timeblock, { backgroundColor: bg }]}
//       onPressOut={() => onClick()}
//     >
//       <Text style={[styles.timeblock_text, { color: text_color }]}>
//         {props.time}
//       </Text>
//     </TouchableOpacity>
//   );
// }

function Session(props) {
  const [selected, setSelected] = useState(false);

  const onClick = () => {
    setSelected(!selected);
  };

  var bg = selected ? "#0099CC" : "#FFFFFF";
  var text_color = selected ? "white" : "black";

  return (
    <TouchableOpacity
      style={[styles.session, { backgroundColor: bg }]}
      onPressOut={() => onClick()}
    >
      {/* // session title */}

      <Text style={[styles.title, { color: text_color }]}>{props.title}</Text>

      {/* // session room */}

      <Text style={styles.room}>{props.room}</Text>

      {/* // loop through speakers ids and return their profile pics */}

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          alignSelf: "flex-start",
        }}
      >
        {/* // check if there are speakers */}
        {props.speakers.length > 0 &&
          props.speakers.map((speaker, index) => {
            return (
              <>
                <Image
                  key={index}
                  style={styles.logo}
                  source={{ uri: speaker.profilePicture }}
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
  const { sessions } = useContext(SessionizeContext);

  const getNewHours = (item) => {
    const date_object = new Date(item);
    var hours = date_object.getHours();
    if (hours > 12) {
      return hours - 12;
    } else {
      return hours;
    }
  };

  const getNewMinutes = (item) => {
    const date_object = new Date(item);
    var minutes = date_object.getMinutes();
    if (minutes == 0) {
      return "00";
    } else {
      return minutes;
    }
  };

  const Times = (props) => {
    return (
      <View style={{ margin: 10, flex: 0.15 }}>
        <Text style={styles.times}>
          {String(getNewHours(props.starts)) +
            ":" +
            String(getNewMinutes(props.starts))}
        </Text>
        <Text style={styles.times}>-</Text>
        <Text style={styles.times}>
          {String(getNewHours(props.ends)) +
            ":" +
            String(getNewMinutes(props.ends))}
        </Text>
      </View>
    );
  };

  return (
    <LinearGradient
      Background
      Linear
      Gradient
      colors={["rgba(0,0,0,1)", "rgba(0,47,63,1)"]}
      style={styles.container}
    >
      <FlatList
        data={sessions}
        style={{ width: "100%" }}
        renderItem={({ item }) => (
          <View style={styles.list_item}>
            <Times starts={item.startsAt} ends={item.endsAt} />
            <Session session={item} />
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
  room: {
    color: "black",
    textAlign: "center",
    fontSize: 15,
    marginLeft: 8,
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
});
