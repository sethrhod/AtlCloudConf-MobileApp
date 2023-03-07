import React, { useContext } from "react";
import { SectionList, View, Button, RefreshControl, SafeAreaView } from "react-native";
import { StyleSheet, Text } from "react-native";
import SessionizeContext from "../SessionizeContext.js";
import { getNewTime } from "./Schedule.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Session from "./Session.js";

export default function MyTimeline() {
  const { bookmarks } = useContext(SessionizeContext);
  const { setBookmarks } = useContext(SessionizeContext);
  const { sessions } = useContext(SessionizeContext);

  const sectionListRef = React.useRef(null);

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  // a function that costructs a list of session data thats compatible with the SectionList component
  const constructSectionListData = (bookmarks) => {
    // create an empty array to store the data
    let data = [];
    // loop through the sessions
    sessions.start_times.forEach((time) => {
      // create an empty object to store the data
      let obj = {};
      // set the title of the object to the start time of the session and add to the same hour sessions
      obj.title = getNewTime(time);
      // set the data of the object to the sessions that start at the same time
      obj.data = bookmarks.filter((bookmark) => bookmark.startsAt === time);

      if (obj.data.length > 0) {
        // change the bookmarked state of the session to true
        obj.data.forEach((session) => {
          session.bookmarked = true;
        });
        // push the object to the data array
        data.push(obj);
      }
    });
    // return the data array
    return data;
  };

  // a function that clears all asyncstorage data
  const clearAll = async () => {
    try {
      await AsyncStorage.clear();
      setBookmarks([]);
      console.log("cleared");
    } catch (e) {
      // clear error
      console.log("clear error");
    }
  };

  const conditionalRender =
    bookmarks.length === 0 ? (
      <View style={{ flex: 0.8, justifyContent: "center" }}>
        <Text style={{ color: "white", fontSize: 40, textAlign: "center" }}>
          No Sessions Added
        </Text>
      </View>
    ) : (
      <SafeAreaView style={styles.container}>
        <Button title="Clear My Timeline" onPress={() => clearAll()} />

        <SectionList
          sections={constructSectionListData(bookmarks)}
          ref={sectionListRef}
          style={{ height: "100%", flex: 1, margin: 10 }}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 50 }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          renderItem={({ item }) => (
            <View style={styles.list_item}>
              <Session
                session={item}
                starts={getNewTime(item.startsAt)}
                ends={getNewTime(item.endsAt)}
              />
            </View>
          )}
          renderSectionHeader={({ section: { title } }) => (
            <View style={styles.timeblock}>
              <Text style={styles.timeblock_text}>{title}</Text>
            </View>
          )}
        />
      </SafeAreaView>
    );

  return conditionalRender;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
