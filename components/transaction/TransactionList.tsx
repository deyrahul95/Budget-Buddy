import { Category, Transaction } from "@/types";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import TransactionListItem from "./TransactionListItem";

type IProps = {
  categories: Category[];
  transactions: Transaction[];
  deleteTransaction: (id: number) => void;
};

export default function TransactionList({
  categories,
  transactions,
  deleteTransaction,
}: IProps) {
  const getCategoryInfo = (category_id: number): Category | undefined => {
    return categories.find((item: Category) => item.id === category_id);
  };

  return (
    <View style={styles.container}>
      {transactions.map((transaction: Transaction) => (
        <TouchableOpacity
          key={transaction.id}
          activeOpacity={0.7}
          onLongPress={() => deleteTransaction(transaction.id)}
          style={styles.itemContainer}
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
  },
  itemContainer: {
    marginHorizontal: 18,
    marginTop: 12,
  },
});
