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
  categoryName: string | undefined;
  categoryColor: string;
  emoji: string;
};

type ITransactionInfoProps = {
  id: number;
  date: number;
  description: string | null;
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
      <View style={styles.row}>
        <View style={{ width: "40%", gap: 3 }}>
          <Amount
            amount={transaction.amount}
            iconName={iconName}
            color={color}
          />
          <CategoryItem
            categoryName={categoryInfo?.name}
            categoryColor={categoryColor}
            emoji={emoji}
          />
        </View>
        <TransactionInfo
          id={transaction.id}
          date={transaction.date}
          description={transaction.description}
        />
      </View>
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
  categoryName,
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
        {emoji} {categoryName}
      </Text>
    </View>
  );
};

const TransactionInfo = ({ id, date, description }: ITransactionInfoProps) => {
  return (
    <View style={{ flexGrow: 1, gap: 6, flexShrink: 1 }}>
      <Text style={{ fontSize: 16, fontWeight: "bold" }}>{description}</Text>
      <Text>Transaction number {id}</Text>
      <Text style={{ fontSize: 12, color: "gray" }}>
        {new Date(date * 1000).toDateString()}
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
