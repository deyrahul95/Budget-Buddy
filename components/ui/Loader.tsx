import { Colors } from "@/config/theme";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

export default function Loader() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={"large"} color={Colors.primary} />
      <Text style={styles.title}> Loading... </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    color: Colors.textSecondary,
  },
  title: {
    fontSize: 20,
    color: Colors.primary,
    marginVertical: 10,
    fontWeight: "bold",
  },
});
