import { Colors } from "@/config/theme";
import { PropsWithChildren } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";

interface ICardProps extends PropsWithChildren {
  style?: ViewStyle;
}

export default function Card({ children, style = {} }: ICardProps) {
  return <View style={[styles.card, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    padding: 15,
    borderRadius: 15,
    backgroundColor: Colors.white,
    elevation: 8,
    shadowColor: Colors.textPrimary,
    shadowRadius: 8,
    shadowOffset: {
      height: 6,
      width: 0,
    },
    shadowOpacity: 0.15,
  },
});
