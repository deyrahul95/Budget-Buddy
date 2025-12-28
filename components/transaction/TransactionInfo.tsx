import { Text, View } from "react-native";

type ITransactionInfoProps = {
  id: number;
  date: number;
  description: string | null;
};

export const TransactionInfo = ({
  id,
  date,
  description,
}: ITransactionInfoProps) => {
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
