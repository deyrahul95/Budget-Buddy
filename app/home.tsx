/* eslint-disable react-hooks/exhaustive-deps */
import TransactionList from "@/components/transaction/TransactionList";
import TransactionSummery from "@/components/transaction/TransactionSummery";
import { Button } from "@/components/ui/Button";
import Loader from "@/components/ui/Loader";
import { DBQuery } from "@/config/dbConfig";
import { calculateTimeStamp } from "@/helpers/calculateTimeStamp";
import { Category, Transaction } from "@/types";
import { useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";

export default function Home() {
  const [loading, SetLoading] = useState<boolean>(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [lastUpdated, setLastUpdated] = useState<number>(0);

  const db = useSQLiteContext();
  const router = useRouter();

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
    SetLoading(true);

    db.withTransactionAsync(async () => {
      await getCategories();
      await getTransactions();
    });

    SetLoading(false);
  }, [db]);

  const deleteTransaction = async (id: number) => {
    db.withTransactionAsync(async () => {
      await db.runAsync(DBQuery.DeleteTransaction, [id]);
      await getTransactions();
      setLastUpdated(new Date().getMilliseconds());
    });
    // Todo: Please update this to toaster
    alert(`Transaction ${id} is deleted successfully.`);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <ScrollView
      contentContainerStyle={{
        marginHorizontal: 18,
        marginVertical: 15,
        gap: 15,
      }}
    >
      <View
        style={{
          flex: 1,
          borderRadius: 20,
          overflow: "hidden",
        }}
      >
        <Button
          title="Add Expense / Income"
          onPress={() => router.navigate("/addTransaction")}
        />
      </View>
      <TransactionSummery lastUpdated={lastUpdated} />
      <TransactionList
        categories={categories}
        transactions={transactions}
        deleteTransaction={deleteTransaction}
      />
    </ScrollView>
  );
}
