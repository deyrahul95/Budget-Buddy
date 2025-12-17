import { Category, Transaction } from "@/types";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

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
  return (
    <View style={styles.container}>
      {transactions.map((transaction: Transaction) => (
        <TouchableOpacity
          key={transaction.id}
          activeOpacity={0.7}
          onLongPress={() => deleteTransaction(transaction.id)}
        >
          <Text>
            {transaction.type} | {transaction.description} |{" "}
            {transaction.amount}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
