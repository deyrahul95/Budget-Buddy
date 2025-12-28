/* eslint-disable react-hooks/exhaustive-deps */
import TransactionList from "@/components/transaction/TransactionList";
import TransactionSummery from "@/components/transaction/TransactionSummery";
import { DBQuery } from "@/config/dbConfig";
import { calculateTimeStamp } from "@/helpers/calculateTimeStamp";
import { Category, Transaction } from "@/types";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { ScrollView } from "react-native";

export default function Home() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [lastUpdated, setLastUpdated] = useState<number>(0);

  const db = useSQLiteContext();

  const getCategories = async () => {
    const result = await db.getAllAsync<Category>(DBQuery.GetAllCategories);
    setCategories(result);
  };

  const getTransactions = async () => {
    const filterTimeStamp = calculateTimeStamp({ filter: "1m" });

    const result = await db.getAllAsync<Transaction>(
      DBQuery.GetAllTransactions,
      [filterTimeStamp.startTimeStamp, filterTimeStamp.endTimeStamp]
    );
    setTransactions(result);
  };

  useEffect(() => {
    db.withTransactionAsync(async () => {
      await getCategories();
      await getTransactions();
    });
  }, [db]);

  const deleteTransaction = async (id: number) => {
    db.withTransactionAsync(async () => {
      await db.runAsync(DBQuery.DeleteTransaction, [id]);
      await getTransactions();
      setLastUpdated(new Date().getMilliseconds());
    });
  };

  return (
    <ScrollView
      contentContainerStyle={{
        marginHorizontal: 18,
        marginVertical: 15,
        gap: 15,
      }}
    >
      <TransactionSummery lastUpdated={lastUpdated} />
      <TransactionList
        categories={categories}
        transactions={transactions}
        deleteTransaction={deleteTransaction}
      />
    </ScrollView>
  );
}
