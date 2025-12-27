export const DBConfig = {
  DBName: "budget.db",
  DBAssetPath: require("@/assets/db/budget.db"),
};

export const DBQuery = {
  // Transaction
  GetAllTransactions: "SELECT * FROM transactions ORDER BY date DESC;",
  DeleteTransaction: "DELETE FROM transactions WHERE id = ?;",

  // Category
  GetAllCategories: "SELECT * FROM categories;",
};
