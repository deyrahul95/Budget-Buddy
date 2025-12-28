import Card from "@/components/ui/Card";
import { CurrencySymbol } from "@/config/currencySymbol";
import { DBQuery } from "@/config/dbConfig";
import { calculateTimeStamp } from "@/helpers/calculateTimeStamp";
import { TimeStampFilter, TransactionAggregate } from "@/types";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TextStyle } from "react-native";

const TransactionSummery = ({ lastUpdated }: any) => {
  const [transactionAggregate, setTransactionAggregate] =
    useState<TransactionAggregate>({
      totalExpenses: 0,
      totalIncome: 0,
    });
  const [filter, setFilter] = useState<TimeStampFilter>({ filter: "1m" });

  const db = useSQLiteContext();

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

  const { totalIncome, totalExpenses } = transactionAggregate;
  const savings = totalIncome - totalExpenses;

  // TODO: need to change it depends on filters
  const readablePeriod = new Date().toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  const getMoneyTextStyle = (value: number): TextStyle => ({
    fontWeight: "bold",
    color: value < 0 ? "#ff4500" : "#2e8b57",
  });

  const formatMoney = (value: number) => {
    const absValue = Math.abs(value).toFixed(2);
    return `${value < 0 ? "-" : ""}${CurrencySymbol.INR}${absValue}`;
  };

  return (
    <Card>
      <Text style={styles.periodTitle}>Summary for {readablePeriod}</Text>
      <Text style={styles.summeryText}>
        Income:{" "}
        <Text style={getMoneyTextStyle(totalIncome)}>
          {formatMoney(totalIncome)}
        </Text>
      </Text>
      <Text style={styles.summeryText}>
        Expenses:{" "}
        <Text style={getMoneyTextStyle(totalExpenses)}>
          {formatMoney(totalExpenses)}
        </Text>
      </Text>
      <Text style={styles.summeryText}>
        Savings:{" "}
        <Text style={getMoneyTextStyle(savings)}>{formatMoney(savings)}</Text>
      </Text>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
    paddingBottom: 7,
  },
  periodTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  summeryText: {
    fontSize: 18,
    color: "#333",
    marginBottom: 10,
  },
});

export default TransactionSummery;
