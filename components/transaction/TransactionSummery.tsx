import Card from "@/components/ui/Card";
import { CurrencySymbol } from "@/config/currencySymbol";
import { DBQuery } from "@/config/dbConfig";
import { Colors } from "@/config/theme";
import { calculateTimeStamp } from "@/helpers/dateHelper";
import { TimeStampFilter, TransactionAggregate } from "@/types";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TextStyle, View } from "react-native";
import BudgetPieChart from "../ui/BudgetPieChart";

const TransactionSummery = ({ lastUpdated }: any) => {
  const [transactionAggregate, setTransactionAggregate] =
    useState<TransactionAggregate>({
      totalExpenses: 0,
      totalIncome: 0,
    });
  const [filter] = useState<TimeStampFilter>({ filter: "1m" });

  const db = useSQLiteContext();

  useEffect(() => {
    const getAggregatedValues = async () => {
      const filterTimeStamps = calculateTimeStamp(filter);
      const result = await db.getAllAsync<TransactionAggregate>(
        DBQuery.TransactionByTimeStamp,
        [filterTimeStamps.startTimeStamp, filterTimeStamps.endTimeStamp]
      );
      setTransactionAggregate(result[0]);
    };

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
    color: value < 1000 ? Colors.danger : Colors.secondary,
  });

  const formatMoney = (value: number) => {
    const absValue = Math.abs(value).toFixed(2);
    return `${value < 0 ? "-" : ""}${CurrencySymbol.INR}${absValue}`;
  };

  return (
    <Card style={styles.container}>
      <Text style={styles.periodTitle}>Summary for {readablePeriod}</Text>
      <View style={{ flex: 1, flexDirection: "row", gap: 3 }}>
        <View style={{ width: "55%" }}>
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
            <Text style={getMoneyTextStyle(savings)}>
              {formatMoney(savings)}
            </Text>
          </Text>
        </View>

        <View style={{ width: "45%" }}>
          <BudgetPieChart expense={totalExpenses} income={totalIncome} />
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    paddingBottom: 7,
  },
  periodTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.textPrimary,
    marginBottom: 15,
  },
  summeryText: {
    fontSize: 18,
    color: Colors.textPrimary,
    marginBottom: 10,
  },
});

export default TransactionSummery;
