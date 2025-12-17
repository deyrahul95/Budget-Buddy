import { Category, Transaction } from "@/types";
import { Text } from "react-native";
import Card from "../ui/Card";

type IProps = {
  transaction: Transaction;
  categoryInfo: Category | undefined;
};

export default function TransactionListItem({
  transaction,
  categoryInfo,
}: IProps) {
  return (
    <Card>
      <Text>
        {categoryInfo?.name} | {transaction.description} | {transaction.amount}
      </Text>
    </Card>
  );
}
