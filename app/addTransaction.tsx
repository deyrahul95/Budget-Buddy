import { Category } from "@/types";
import { useEffect, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { CategoryDropdown } from "@/components/category/CategoryDropdown";
import { Button } from "@/components/ui/Button";
import { SegmentedTabs } from "@/components/ui/SegmentedTabs";
import { DBQuery } from "@/config/dbConfig";
import { Colors } from "@/config/theme";
import { isValidAmount, sanitizeAmount } from "@/helpers/amount";
import { getDateBounds } from "@/helpers/dateHelper";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useSQLiteContext } from "expo-sqlite";

export default function AddTransaction() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedType, setSelectedType] = useState<"Expense" | "Income">(
    "Expense"
  );
  const [description, setDescription] = useState<string | undefined>(undefined);
  const [amount, setAmount] = useState<string | undefined>(undefined);
  const [categoryId, setCategoryId] = useState<number>(0);
  const [date, setDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

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

  const handleDateChange = (_: any, selectedDate?: Date) => {
    setShowDatePicker(false);

    if (!selectedDate) {
      return;
    }

    setDate(selectedDate);
  };

  const handleSubmit = async () => {
    if (!description || !amount) {
      return;
    }

    const parseAmount = parseFloat(amount);
    const timeStamp = Math.floor(date.getTime() / 1000);

    await db.withTransactionAsync(async () => {
      await db.runAsync(DBQuery.AddTransaction, [
        parseAmount,
        selectedType,
        categoryId,
        description,
        timeStamp,
      ]);
    });

    Alert.alert("Success 🎉", "Expense added successfully!");
    resetForm();
  };

  const resetForm = () => {
    setDescription(undefined);
    setAmount(undefined);
    setCategoryId(0);
    setDate(new Date());
  };

  const categoriesForSelectedType = categories.filter(
    (c) => c.type === selectedType
  );

  const { minDate, maxDate } = getDateBounds();
  const isAmountValid = isValidAmount(amount ?? "");

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
    >
      <SegmentedTabs
        value={selectedType}
        onChange={(v) => {
          setSelectedType(v);
          setCategoryId(0);
        }}
      />

      {/* Amount */}
      <View style={styles.amountContainer}>
        <Text style={styles.currency}>₹</Text>
        <TextInput
          value={amount}
          onChangeText={(text) => {
            const sanitized = sanitizeAmount(text);
            setAmount(sanitized);
          }}
          placeholder="0"
          keyboardType="numeric"
          style={[
            styles.amountInput,
            { color: isAmountValid ? Colors.textPrimary : Colors.danger },
          ]}
          placeholderTextColor={Colors.textSecondary}
        />
      </View>

      {/* Description */}
      <TextInput
        value={description}
        onChangeText={setDescription}
        placeholder="Description"
        style={styles.description}
        placeholderTextColor={Colors.textSecondary}
      />

      {/* Category */}
      <Text style={styles.label}>Category</Text>
      <CategoryDropdown
        value={categoryId}
        onChange={setCategoryId}
        categories={categoriesForSelectedType}
      />

      <Text style={styles.label}>Date</Text>
      <Pressable
        onPress={() => setShowDatePicker(true)}
        style={styles.dateField}
      >
        <Text style={styles.dateText}>{date.toDateString()}</Text>
      </Pressable>

      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          minimumDate={minDate}
          maximumDate={maxDate}
          onChange={handleDateChange}
        />
      )}

      <Button
        variant="primary"
        title={`Save ${selectedType}`}
        onPress={handleSubmit}
        disabled={!description || !amount || !isAmountValid}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 20,
    gap: 24,
  },
  amountContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 32,
  },
  currency: {
    fontSize: 32,
    fontWeight: "700",
    color: Colors.primary,
    marginRight: 6,
  },
  amountInput: {
    fontSize: 42,
    fontWeight: "700",
    textAlign: "center",
    minWidth: 120,
  },
  description: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.textSecondary,
  },
  dateField: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  dateText: {
    fontSize: 16,
    color: Colors.textPrimary,
  },
});
