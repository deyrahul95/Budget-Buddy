import { CategoryColors, CategoryEmojis } from "@/config/constants";
import { Category, Transaction } from "@/types";
import { AntDesign } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { AutoSizeText, ResizeTextMode } from "react-native-auto-size-text";
import Card from "../ui/Card";

type ITransactionListItemProps = {
  transaction: Transaction;
  categoryInfo: Category | undefined;
};

type IAmountProps = {
  iconName: "minus-circle" | "plus-circle";
  color: string;
  amount: number;
};

type ICategoryItemProps = {
  categoryInfo: Category | undefined;
  categoryColor: string;
  emoji: string;
};

export default function TransactionListItem({
  transaction,
  categoryInfo,
}: ITransactionListItemProps) {
  const iconName =
    transaction.type === "Expense" ? "minus-circle" : "plus-circle";
  const color = transaction.type === "Expense" ? "red" : "green";
  const categoryColor =
    CategoryColors[categoryInfo?.name ?? "Default"] ??
    CategoryColors["Default"];
  const emoji =
    CategoryEmojis[categoryInfo?.name ?? "Default"] ??
    CategoryEmojis["Default"];

  return (
    <Card>
      <Amount amount={transaction.amount} iconName={iconName} color={color} />
      <CategoryItem
        categoryInfo={categoryInfo}
        categoryColor={categoryColor}
        emoji={emoji}
      />
    </Card>
  );
}

const Amount = ({ iconName, color, amount }: IAmountProps) => {
  return (
    <View style={styles.row}>
      <AntDesign name={iconName} size={18} color={color} />
      <AutoSizeText
        fontSize={32}
        mode={ResizeTextMode.max_lines}
        numberOfLines={1}
        style={styles.amount}
      >
        ${amount}
      </AutoSizeText>
    </View>
  );
};

const CategoryItem = ({
  categoryInfo,
  categoryColor,
  emoji,
}: ICategoryItemProps) => {
  return (
    <View
      style={[
        styles.categoryContainer,
        { backgroundColor: categoryColor + "40" },
      ]}
    >
      <Text style={styles.categoryText}>
        {emoji} {categoryInfo?.name}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
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
  categoryContainer: {
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 3,
    alignSelf: "flex-start",
  },
  categoryText: {
    fontSize: 12,
  },
});
