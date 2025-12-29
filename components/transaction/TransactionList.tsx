import TransactionListItem from "@/components/transaction/TransactionListItem";
import { Category, Transaction } from "@/types";
import { Alert, StyleSheet, TouchableOpacity, View } from "react-native";

type IProps = {
  categories: Category[];
  transactions: Transaction[];
  deleteTransaction: (id: number) => Promise<void>;
};

export default function TransactionList({
  categories,
  transactions,
  deleteTransaction,
}: IProps) {
  const getCategoryInfo = (category_id: number): Category | undefined => {
    return categories.find((item: Category) => item.id === category_id);
  };

  const confirmDelete = (id: number) => {
    Alert.alert(
      "Delete Transaction ❌",
      "This action cannot be undone. Continue?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Yes",
          onPress: async () => {
            await deleteTransaction(id);
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      {transactions.map((transaction: Transaction) => (
        <TouchableOpacity
          key={transaction.id}
          activeOpacity={0.7}
          onLongPress={() => confirmDelete(transaction.id)}
        >
          <TransactionListItem
            transaction={transaction}
            categoryInfo={getCategoryInfo(transaction.category_id)}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 15,
    marginBottom: 30,
  },
});
