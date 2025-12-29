import { Category } from "@/types";
import { useEffect, useState } from "react";
import {
    Button,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

import { DBQuery } from "@/config/dbConfig";
import { Picker } from "@react-native-picker/picker";
import { useSQLiteContext } from "expo-sqlite";

export default function AddExpensePage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedType, setSelectedType] = useState<"Expense" | "Income">(
    "Expense"
  );
  const [description, setDescription] = useState<string | undefined>(undefined);
  const [amount, setAmount] = useState<string | undefined>(undefined);
  const [categoryId, setCategoryId] = useState<number>(0);

  const db = useSQLiteContext();

  useEffect(() => {
    const loadCategories = async () => {
      const categories = await db.getAllAsync<Category>(
        DBQuery.GetAllCategories
      );
      setCategories(categories);
    };
    loadCategories();
  }, [db]);

  const handleSubmit = async () => {
    if (!description || !amount) {
      return;
    }

    const parseAmount = parseFloat(amount);
    const timeStamp = Math.floor(new Date().getTime() / 1000);

    await db.withTransactionAsync(async () => {
      await db.runAsync(DBQuery.AddTransaction, [
        parseAmount,
        selectedType,
        categoryId,
        description,
        timeStamp,
      ]);
    });

    alert("Expense added successfully!");
    resetForm();
  };

  const categoriesForSelectedType = categories.filter(
    (c) => c.type === selectedType
  );

  // Reset form
  const resetForm = () => {
    setDescription(undefined);
    setAmount(undefined);
    setCategoryId(0);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Add New Expense</Text>
      </View>

      <View style={styles.formContainer}>
        <Picker
          selectedValue={selectedType}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedType(itemValue)}
        >
          <Picker.Item label="Expense" value="Expense" />
          <Picker.Item label="Income" value="Income" />
        </Picker>

        <TextInput
          style={styles.input}
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Amount"
          value={amount}
          onChangeText={setAmount}
        />

        <View style={styles.categoryGroup}>
          <Text style={styles.categoryLabel}>Category:</Text>
          <Picker
            selectedValue={categoryId}
            style={styles.picker}
            onValueChange={(id: number) => setCategoryId(id)}
          >
            {categoriesForSelectedType.map((cat: Category) => (
              <Picker.Item key={cat.id} label={cat.name} value={cat.id} />
            ))}
          </Picker>
        </View>
      </View>

      <Button
        title="Save Expense"
        color="purple"
        onPress={handleSubmit}
        disabled={!description || !amount}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 15,
    color: "#333",
  },
  formContainer: {
    flex: 1,
  },
  picker: {
    height: 50,
    width: "100%",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  categoryGroup: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  categoryLabel: {
    fontWeight: "600",
    fontSize: 16,
    marginLeft: 10,
  },
});
