import { CategoryInfo } from "@/components/category/CategoryInfo";
import { TransactionInfo } from "@/components/transaction/TransactionInfo";
import { Amount } from "@/components/ui/Amount";
import Card from "@/components/ui/Card";
import { Colors } from "@/config/theme";
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
  const color =
    transaction.type === "Expense" ? Colors.danger : Colors.secondary;
 

  return (
    <Card>
      <View style={styles.row}>
        <View style={{ width: "40%", gap: 3 }}>
          <Amount
            amount={transaction.amount}
            iconName={iconName}
            color={color}
          />
          <CategoryInfo categoryName={categoryInfo?.name} />
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
