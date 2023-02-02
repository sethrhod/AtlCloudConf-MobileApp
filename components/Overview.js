import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import CountDown from "react-native-countdown-component";
import { FontAwesome5 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function Overview() {
  return (
    <LinearGradient
      Background
      Linear
      Gradient
      colors={["rgba(0,0,0,1)", "rgba(0,47,63,1)"]}
      style={styles.container}
    >
      {/* Event Title and Countdown */}

      <View style={styles.topcontainer}>
        <Text style={{ color: "white", fontSize: 35, fontWeight: "bold" }}>
          Atl Cloud Conf
        </Text>
        <Text style={{ color: "white", fontSize: 15, fontWeight: "semi-bold" }}>
          March 25th, 2023
        </Text>
        <CountDown
          until={100000}
          size={30}
          digitStyle={{ backgroundColor: "transparent" }}
          digitTxtStyle={{ color: "#00FFFF" }}
          timeToShow={["D", "H", "M", "S"]}
          timeLabels={{ d: "Days", h: "Hours", m: "Minutes", s: "Seconds" }}
          timeLabelStyle={{ color: "grey" }}
        />
      </View>

      {/* Rocket */}

      <View style={styles.midcontainer}>
        <Image resizeMode="center" source={require("../assets/rocket.png")} />
      </View>

      {/* Register Button and Price Increase Text */}

      <View style={styles.bottomcontainer}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <FontAwesome5 name="ticket-alt" size={30} color="#00FFFF" />
          <Text
            style={{
              color: "white",
              fontSize: 27,
              fontWeight: "bold",
              padding: 10,
            }}
          >
            Register
          </Text>
        </View>
        <View style={{ width: 270 }}>
          <Text
            style={{
              color: "#C4C4C4",
              fontSize: 15,
              fontWeight: "semi-bold",
              lineHeight: 16,
              textAlign: "center",
              paddingTop: 25,
            }}
          >
            Price increases to $15.00 on Feb 12, 2023, and again to $20.00 on
            Mar 11th. 2023.
          </Text>
        </View>
      </View>
      <Image
        style={styles.image}
        source={require("../assets/bottom-image.png")}
      />
    </LinearGradient>
  );
}

const windowWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  topcontainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  midcontainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 20,
  },
  bottomcontainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  image: {
    flex: 0.28,
    width: windowWidth,
  },
});
