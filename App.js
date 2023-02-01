import { StyleSheet, Text, View, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome5 } from "@expo/vector-icons";
import Overview from "./components/Overview";

export default function App() {
  return (
    <LinearGradient
    // Background Linear Gradient
    colors={["rgba(0,0,0,1)", "rgba(0,47,63,1)"]}
    style={styles.container}
  >

      {/* Header */}

      <View style={styles.header}>
        <View style={{ padding: "7%" }}>
          <FontAwesome5.Button
            name="bars"
            size={24}
            color="white"
            backgroundColor="transparent"
          />
        </View>
        <Text
          style={{
            color: "white",
            fontSize: 35,
            fontWeight: "bold",
            marginRight: "33%",
          }}
        >
          Overview
        </Text>
      </View>
      <Overview />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  header: {
    height: "15%",
    width: "100%",
    borderWidth: 1,
    borderColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
