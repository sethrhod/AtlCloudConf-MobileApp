import React from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  FlatList,
  Image,
  StatusBar,
  Text,
  TouchableHighlight,
  Linking,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { TouchableOpacity } from "react-native-gesture-handler";

const SubItem = (props) => (
  <TouchableHighlight onPress={() => Linking.openURL(props.sponsors.url)}>
    <View style={styles.logo_container}>
      <Image style={styles.logo} source={{ uri: props.sponsors.uri }} />
    </View>
  </TouchableHighlight>
);

const Item = (props) => (
  <View style={styles.sponsor_level_container}>
    <Text style={styles.sponsor_level}>{props.item.sponsor_level}</Text>
    <FlatList
      data={props.item.sponsors}
      renderItem={({ item }) => <SubItem sponsors={item} />}
      contentContainerStyle={{ alignItems: "stretch", }}
      style={{ width: "100%" }}
    />
  </View>
);

function List() {

  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("https://atlcloudconf.com/sponsors.json")
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => console.log("done"));
  }, []);

  return (
    <SafeAreaView style={styles.item_container}>
      <FlatList
        data={data}
        renderItem={({ item }) => <Item item={item} />}
        contentContainerStyle={{ alignItems: "stretch" }}
        style={{ width: "100%" }}
      />
    </SafeAreaView>
  )
}

export default function Sponsors() {
  return (
    <LinearGradient
      Background
      Linear
      Gradient
      colors={["rgba(0,0,0,1)", "rgba(0,47,63,1)"]}
      style={styles.container}
    >
      <List />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  item_container: {
    flex: 1,
    width: "100%",
    marginTop: StatusBar.currentHeight || 0,
  },
  sponsor_level_container : {
    alignItems: "center",
    width: "90%",
    padding: 5,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  sponsor_level: {
    fontSize: 32,
    color: "white",
  },
  logo_container: {
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    borderRadius: 15,
    width: "100%",
    padding: 5,
    marginVertical: 8,
  },
  logo: {
    width: '100%',
    height: 100,
    resizeMode: "contain",
  },
});
