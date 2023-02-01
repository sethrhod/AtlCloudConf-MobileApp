import { StyleSheet, Text, View, Image } from "react-native";
import CountDown from "react-native-countdown-component";

export default function Overview() {
  return (
    <View style={styles.container}>
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
        <Text style={{ color: "white", fontSize: 27, fontWeight: "bold" }}>
          Register
        </Text>
        <Image
          style={styles.image}
          source={require("../assets/pricing-style-6.png")}
        />
        <View style={{ width: 270 }}>
          <Text
            style={{
              color: "#C4C4C4",
              fontSize: 15,
              fontWeight: "semi-bold",
              lineHeight: 16,
              textAlign: "center",
            }}
          >
            Price increases to $15.00 on Feb 12, 2023, and again to $20.00 on
            Mar 11th. 2023.
          </Text>
        </View>
      </View>
      <Image
        style={{ width: "100%" }}
        source={require("../assets/bottom-image.png")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  topcontainer: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  midcontainer: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  bottomcontainer: {
    flex: 2,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  image: {
    width: 197,
    height: 71,
    resizeMode: "contain",
  },
});
