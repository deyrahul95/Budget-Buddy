import { Category, Transaction } from "@/types";
import { StyleSheet, Text, View } from "react-native";

type IProps = {
  transaction: Transaction;
  categoryInfo: Category | undefined;
};

export default function TransactionListItem({
  transaction,
  categoryInfo,
}: IProps) {
  return (
    <View style={styles.card}>
      <Text>
        {categoryInfo?.name} | {transaction.description} | {transaction.amount}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { flex: 1 },
});
