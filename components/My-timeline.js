import { StyleSheet, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function MyTimeline() {
    return (
        <LinearGradient
        Background
        Linear
        Gradient
        colors={["rgba(0,0,0,1)", "rgba(0,47,63,1)"]}
        style={styles.container}
        >
            <Text>My Timeline</Text>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
});