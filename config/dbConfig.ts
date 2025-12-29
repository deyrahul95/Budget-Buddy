export const DBConfig = {
  DBName: "budget.db",
  DBAssetPath: require("@/assets/db/budget.db"),
};

export const DBQuery = {
  // Transaction
  GetAllTransactions:
    "SELECT * FROM transactions WHERE date >= ? AND date <= ? ORDER BY date DESC;",
  TransactionByTimeStamp: `
    SELECT 
    COALESCE(SUM(CASE WHEN type = 'Expense' THEN amount ELSE 0 END), 0) AS totalExpenses,
    COALESCE(SUM(CASE WHEN type = 'Income' THEN amount ELSE 0 END), 0) AS totalIncome
    FROM transactions
    WHERE date >= ? AND date <= ?;
    `,
  DeleteTransaction: "DELETE FROM transactions WHERE id = ?;",
  AddTransaction:
    "INSERT INTO transactions (amount, type, category_id, description, date) VALUES (?,?,?,?,?);",

  // Category
  GetAllCategories: "SELECT * FROM categories;",
};
