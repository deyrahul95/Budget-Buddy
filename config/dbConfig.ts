export const DBConfig = {
  DBName: "budget.db",
  DBAssetPath: require("@/assets/db/budget.db"),
};

export const DBQuery = {
  // Transaction
  GetAllTransactions: "SELECT * FROM transactions;",
  DeleteTransaction: "DELETE FROM transaction WHERE id = ?;",

  // Category
  GetAllCategories: "SELECT * FROM categories;",
};
