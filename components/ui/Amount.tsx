import { CurrencySymbol } from "@/config/currencySymbol";
import { AntDesign } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import { AutoSizeText, ResizeTextMode } from "react-native-auto-size-text";

type IAmountProps = {
  iconName: "minus-circle" | "plus-circle";
  color: string;
  amount: number;
};

export const Amount = ({ iconName, color, amount }: IAmountProps) => {
  return (
    <View style={styles.row}>
      <AntDesign name={iconName} size={18} color={color} />
      <AutoSizeText
        fontSize={32}
        mode={ResizeTextMode.max_lines}
        numberOfLines={1}
        style={styles.amount}
      >
        {CurrencySymbol.INR}
        {amount}
      </AutoSizeText>
    </View>
  );
};

export const styles = StyleSheet.create({
  amount: {
    fontSize: 32,
    fontWeight: "800",
    maxWidth: "80%",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
});
