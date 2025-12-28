import { CategoryInfo } from "@/components/category/CategoryInfo";
import { TransactionInfo } from "@/components/transaction/TransactionInfo";
import { Amount } from "@/components/ui/Amount";
import Card from "@/components/ui/Card";
import { CategoryColors, CategoryEmojis } from "@/config/constants";
import { Category, Transaction } from "@/types";
import { StyleSheet, View } from "react-native";

type ITransactionListItemProps = {
  transaction: Transaction;
  categoryInfo: Category | undefined;
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
          <CategoryInfo
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

export const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
});
