import Card from "@/components/ui/Card";
import { DBQuery } from "@/config/dbConfig";
import { calculateTimeStamp } from "@/helpers/calculateTimeStamp";
import { TimeStampFilter, TransactionAggregate } from "@/types";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { Text } from "react-native";

const TransactionSummery = () => {
  const [transactionAggregate, setTransactionAggregate] =
    useState<TransactionAggregate>({
      totalExpenses: 0,
      totalIncome: 0,
    });

  const [saving] = useState<number>(
    transactionAggregate.totalIncome - transactionAggregate.totalExpenses
  );
  const [filter, setFilter] = useState<TimeStampFilter>({ filter: "1m" });

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
  }, [db, filter]);

  return (
    <Card>
      <Text>Summary for {readablePeriod}</Text>
    </Card>
  );
};

export default TransactionSummery;
