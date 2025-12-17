/* eslint-disable react-hooks/exhaustive-deps */
import TransactionList from "@/components/transaction/TransactionList";
import { DBQuery } from "@/config/dbConfig";
import { Category, Transaction } from "@/types";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { ScrollView } from "react-native";

export default function Home() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const db = useSQLiteContext();

  const getCategories = async () => {
    const result = await db.getAllAsync<Category>(DBQuery.GetAllCategories);
    setCategories(result);
  };

  const getTransactions = async () => {
    const result = await db.getAllAsync<Transaction>(
      DBQuery.GetAllTransactions
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
    });
  };

  return (
    <ScrollView
      contentContainerStyle={{
        padding: 15,
        paddingVertical: 17,
      }}
    >
      <TransactionList
        categories={categories}
        transactions={transactions}
        deleteTransaction={deleteTransaction}
      />
    </ScrollView>
  );
}
