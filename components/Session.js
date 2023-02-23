import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import SessionizeContext from "../SessionizeContext";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Swipeable from "react-native-gesture-handler/Swipeable";
import Icon from "react-native-vector-icons/FontAwesome5";

export default function Session(props) {
  // the state for the list of bookmarks
  const {bookmarks} = useContext(SessionizeContext);
  const {setBookmarks} = useContext(SessionizeContext);

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
      <Text style={[styles.name]}>{speaker.fullName}</Text>
    </View>
  ));

  const Times = (props) => {
    return (
      <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
        <Text style={[styles.times]}>{props.starts}</Text>
        <Text style={[styles.times]}>-</Text>
        <Text style={[styles.times]}>{props.ends}</Text>
      </View>
    );
  };

  const SwipeableRef = React.useRef(null);

  const addBookmark = () => {
    // either remove or add as bookmark depending on previous state
    if (props.session.bookmarked == true) {
      // remove bookmark
      removeFromBookmarks(props.session);
    } else if (props.session.bookmarked == false) {
      // add new bookmark
      addToBookmarks(props.session);
    }
    // close swipe after 100 ms
    setTimeout(() => {
      if (SwipeableRef.current) {
        SwipeableRef.current.close();
      }
    }, 100);
  };

  const removeFromBookmarks = (session) => {
    session.bookmarked = false;
    var list = bookmarks.filter((bookmark) => bookmark.id !== session.id);
    setBookmarks(list);
    remove(session);
  };

  const remove = async(session) => {
    try {
      await AsyncStorage.removeItem(String(session.id));
    } catch(err) {
      alert(err);
    }
  };

  const addToBookmarks = (session) => {
    session.bookmarked = true;
    var list = [];
    bookmarks.forEach((bookmark) => list.push(bookmark));
    list.push(session);
    setBookmarks(list);
    save(session);
  };

  const save = async(session) => {
    try {
      await AsyncStorage.setItem(String(session.id), JSON.stringify(session));
    } catch(err) {
      alert(err);
    }
  };

  // close swipeable ref when component renders
  useEffect(() => {
    if (SwipeableRef.current) {
      SwipeableRef.current.close();
    }
  }, []);

  const LeftSwipeActions = () => {
    return (
      <Pressable
        style={{
          flex: 1,
          flexDirection: "row",
          borderRadius: 10,
          backgroundColor: "#C0D6DF",
          margin: 10,
          padding: 10,
        }}
        onPress={() => addBookmark()}
      >
        <Text
          style={{
            flex: 1,
            color: "#40394a",
            fontWeight: "600",
            fontSize: 25,
          }}
        >
          Add to Timeline
        </Text>
        {props.session.bookmarked ? (
          <Icon name="bookmark" color={"#40394a"} size={30} solid />
        ) : (
          <Icon name="bookmark" color={"#40394a"} size={30} />
        )}
      </Pressable>
    );
  };

  var bg = props.session.bookmarked ? "#00F2F2" : "#DBE9EE";

  return (
    <Swipeable
      renderLeftActions={LeftSwipeActions}
      overshootLeft={false}
      leftThreshold={100}
      friction={2}
      overshootFriction={8}
      ref={SwipeableRef}
    >
      <View style={[styles.session, { backgroundColor: bg }]}>
        {/* // session title */}

        <View
          style={{
            flex: 1,
            height: "100%",
            flexDirection: "row",
            flexWrap: "wrap",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={[styles.title, { width: 300 }]}>
            {props.session.title}
          </Text>
        </View>

        <Times starts={props.starts} ends={props.ends} />

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
                height: "100%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              {/* // loop through speakers ids and return their profile pics */}
              {speakers}

              {/* // session room */}
              <Text style={[styles.speaker_room]}>{props.session.room}</Text>
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
              <Text style={[styles.main_room]}>{props.session.room}</Text>
            </View>
          )}
        </View>
      </View>
    </Swipeable>
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
    color: '#166088'
  },
  name: {
    fontSize: 12,
    textAlign: "center",
    color: "#166088",
  },
  speaker_room: {
    color: "#166088",
    textAlign: "center",
    fontSize: 15,
    fontWeight: "semi-bold",
  },
  main_room: {
    color: "#166088",
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
    color: "#166088",
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
