import Card from "@/components/ui/Card";
import { DBQuery } from "@/config/dbConfig";
import { calculateTimeStamp } from "@/helpers/calculateTimeStamp";
import { TimeStampFilter, TransactionAggregate } from "@/types";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";

const TransactionSummery = ({ lastUpdated }: any) => {
  const [transactionAggregate, setTransactionAggregate] =
    useState<TransactionAggregate>({
      totalExpenses: 0,
      totalIncome: 0,
    });
  const [filter, setFilter] = useState<TimeStampFilter>({ filter: "1m" });

  const saving =
    transactionAggregate.totalIncome - transactionAggregate.totalExpenses;

  const db = useSQLiteContext();

  // TODO: need to change it depends on filters
  const readablePeriod = new Date().toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  const getAggregatedValues = async () => {
    const filterTimeStamps = calculateTimeStamp(filter);
    const result = await db.getAllAsync<TransactionAggregate>(
      DBQuery.TransactionByTimeStamp,
      [filterTimeStamps.startTimeStamp, filterTimeStamps.endTimeStamp]
    );
    setTransactionAggregate(result[0]);
  };

  useEffect(() => {
    getAggregatedValues();
  }, [db, filter, lastUpdated]);

  return (
    <Card>
      <Text>Summary for {readablePeriod}</Text>
      <Text>Saving ₹{saving}</Text>
      <Text>Total Income ₹{transactionAggregate.totalIncome}</Text>
      <Text>Total Expenses ₹{transactionAggregate.totalExpenses}</Text>

      <View style={{ marginTop: 10 }}>
        <Button onPress={getAggregatedValues} title="Refresh" />
      </View>
    </Card>
  );
};

export default TransactionSummery;
