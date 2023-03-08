import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  Linking,
} from "react-native";
import CountDown from "react-native-countdown-component";
import { FontAwesome5 } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";

export default function Overview(props) {

  const { colors } = useTheme();

  const customData = require('../custom-data.json')

  //if props is not null, then set the date object to the date passed in from the props
  //if props is null, then set the date object to the date of the event
  const date_object = props.date
    ? new Date(props.date)
    : new Date(customData.eventDate);

  // a function that gets the seconds until the event starts for the countdown
  const getSecondsUntilEvent = (date) => {
    const now = new Date();
    const difference = date.getTime() - now.getTime();
    return Math.floor(difference / 1000);
  };

  // a on press function that will open the registration page in a browser
  const onPress = () => {
    Linking.openURL(customData.registrationLink);
  };

  return (
    <View style={styles.container}>
      {/* Event Title and Countdown */}

      <View style={styles.topcontainer}>
        <Text style={{ color: colors.text, fontSize: 35, fontWeight: "bold" }}>
          Atlanta Developers' Conference 2023
        </Text>
        <Text
          style={{ color: colors.text, fontSize: 15, fontWeight: "semi-bold" }}
        >
          TBA
        </Text>
        <CountDown
          until={getSecondsUntilEvent(date_object)}
          size={30}
          digitStyle={{ backgroundColor: "transparent" }}
          digitTxtStyle={{ color: colors.primary }}
          timeToShow={["D", "H", "M", "S"]}
          timeLabels={{ d: "Days", h: "Hours", m: "Minutes", s: "Seconds" }}
          timeLabelStyle={{ color: colors.primary }}
        />
      </View>

      {/* Register Button and Price Increase Text */}

      <View style={styles.bottomcontainer}>
        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center" }}
          onPress={() => onPress()}
        >
          <FontAwesome5 name="ticket-alt" size={30} color={colors.notification} />
          <Text
            style={{
              color: colors.text,
              fontSize: 27,
              fontWeight: "bold",
              padding: 10,
            }}
          >
            Register
          </Text>
        </TouchableOpacity>
        <View style={{ width: 270 }}>
          <Text
            style={{
              color: colors.text,
              fontSize: 15,
              fontWeight: "semi-bold",
              lineHeight: 16,
              textAlign: "center",
              paddingTop: 25,
            }}
          >
            {/* Price increases to $20.00 on Mar 11th. 2023. */}
          </Text>
        </View>
      </View>

      {/* Logo */}

      <View style={styles.midcontainer}>
        <Image
          resizeMode="center"
          source={require("../assets/atldevcon-logo.png")}
        />
      </View>
    </View>
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
