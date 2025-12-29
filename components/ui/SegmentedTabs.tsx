import { Colors } from "@/config/theme";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  value: "Expense" | "Income";
  onChange: (v: "Expense" | "Income") => void;
};

export const SegmentedTabs = ({ value, onChange }: Props) => {
  return (
    <View style={styles.container}>
      {(["Expense", "Income"] as const).map((item) => {
        const active = value === item;
        return (
          <Pressable
            key={item}
            onPress={() => onChange(item)}
            style={[styles.tab, active && styles.activeTab]}
          >
            <Text style={[styles.text, active && styles.activeText]}>
              {item.toUpperCase()}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  activeTab: {
    backgroundColor: Colors.primary,
  },
  text: {
    fontWeight: "600",
    color: Colors.textSecondary,
  },
  activeText: {
    color: Colors.white,
  },
});
